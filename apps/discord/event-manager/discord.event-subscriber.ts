import { discordContainer } from "../discord";
import type { ClientEvents, Message } from "discord.js";

export class DiscordEventSubscriber {
    private deps = discordContainer;

    public async subscribe() {
        this.deps.logger.info("Subscribing to discord events");

        const discord = this.deps.discordService;
        if (!discord) {
            this.deps.logger.error("Discord client not found");
            return;
        }

        discord.on("ready", this.onReady.bind(this));
        discord.on("messageCreate", this.onMessageCreated.bind(this));
    }

    async onReady() {
        this.deps.logger.info({
            message: "Discord client ready",
            obj: {
                botName: this.deps.discordService?.user?.username,
                botId: this.deps.discordService?.user?.id,
            }
        });
    }

    async onMessageCreated(m: Message) {
        const userId = m.author.id;
        this.deps.logger.info({
            message: `Message received - ${userId}`,
        })
    }
}