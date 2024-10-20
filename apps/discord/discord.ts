import { IntentsBitField } from "discord.js";
import DiscordService from "./services/client.ts";
import {LoggerService} from "../../packages/shared/services/logger.ts";
import { DiscordEventSubscriber } from "./event-manager/discord.event-subscriber.ts";
import { DiscordUserEventSubscriber } from "./event-manager/user.event-subscriber.ts";

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