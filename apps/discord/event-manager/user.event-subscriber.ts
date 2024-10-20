import { discordContainer } from "../discord.ts";
import type { Message } from "discord.js";
import {dynamicConfigService} from "../index.ts";

export class DiscordUserEventSubscriber {
    private deps = discordContainer;

    public subscribe() {
        this.deps.logger.info("Subscribing to discord user events");

        const discord = this.deps.discordService;
        if (!discord) {
            this.deps.logger.error("Discord client not found");
            return;
        }

        discord.on("messageCreate", this.sendAutoReply.bind(this));
    }

    async sendAutoReply(m: Message) {
        const userId = m.author.id;
        const cache = this.deps.autoReplyCache;
        if (userId === this.deps.discordService?.user?.id) {
            return;
        }

        const content = m.content.toLowerCase();
        const autoReply = cache.getAll();
        if (autoReply.size === 0) {
            const autoReplyConfig = await dynamicConfigService.get("auto_response");

            if (!autoReplyConfig || autoReplyConfig.length === 0) {
                return;
            }

            autoReplyConfig.forEach((response) => {
                cache.set(response.trigger, response);
            });
        }

        for (const [trigger, response] of autoReply) {
            if (content.includes(trigger)) {
                this.deps.logger.info({
                    message: `Auto-replying to ${m.author.username}#${m.author.discriminator}`,
                    obj: {
                        trigger,
                        response: response.response
                    }
                });
                m.reply(response.response);
            }
        }
    }
}