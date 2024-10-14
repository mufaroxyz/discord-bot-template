import { IntentsBitField } from "discord.js";
import DiscordService from "./services/client";
import { LoggerService } from "@discord-bot/shared/services/logger";
import { DiscordEventSubscriber } from "./event-manager/discord.event-subscriber";
import { DiscordUserEventSubscriber } from "./event-manager/user.event-subscriber";

export type DiscordContainer = {
  discordService?: DiscordService;
  discordEventSubscriber?: DiscordEventSubscriber;
  discordUserEventSubscriber?: DiscordUserEventSubscriber;
  logger: LoggerService;
}

const logger = new LoggerService("Discord")

const discordContainer: DiscordContainer = {
  logger,
};

const discordService = new DiscordService({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

discordContainer.discordService = discordService;
discordContainer.discordEventSubscriber = new DiscordEventSubscriber();
discordContainer.discordUserEventSubscriber = new DiscordUserEventSubscriber();

export { discordContainer };