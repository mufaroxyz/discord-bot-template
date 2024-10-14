import { discordContainer } from "../discord";
import type { ClientEvents, Message } from "discord.js";

import autoReplyConfig from "../temp-config/auto-reply.json";

export class DiscordUserEventSubscriber {
    private deps = discordContainer;

    public async subscribe() {
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
        if (userId === this.deps.discordService?.user?.id) {
            return;
        }

        const content = m.content.toLowerCase();

        for (const entry of autoReplyConfig) {
            const { trigger, response } = entry;
            if (content.includes(trigger)) {
                this.deps.logger.info({
                    message: "Auto-reply triggered",
                    obj: {
                        userId,
                        trigger,
                    }
                });
                m.reply(response);
            }
        }
    }
}