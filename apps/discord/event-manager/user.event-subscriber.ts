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

        discord.on("messageCreate", msg => {
            this.sendTag(msg);
            this.sendAutoReply(msg);
        });
    }

    async sendTag(m: Message) {
        if (!m.content.startsWith("-")) return;

        const member = await this.deps.discordUtils?.fetchMember(m.author.id);

        let cachedTags = this.deps.tagsCache.get();
        if (!cachedTags) {
            const tags = await dynamicConfigService.get("tags");
            if (!tags) return this.deps.logger.error("Tags not found");
            this.deps.tagsCache.set(tags);
            cachedTags = tags;
        }

        if (!member?.roles.cache.hasAny(...cachedTags.privilegedRoles)) return;
        
        const tag = m.content.slice(1).toLowerCase();
        const metadata = await dynamicConfigService.get("tags");
        if (!metadata) return;

        if (metadata.data[tag]) {
            m.channel.isSendable() && m.channel.send(
                `${metadata.data[tag].response}\n-# ${tag} - ${member.displayName}`
            );
        }
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