import { IntentsBitField } from "discord.js";
import DiscordService from "./services/client.ts";
import {LoggerService} from "../../packages/shared/services/logger.ts";
import { DiscordEventSubscriber } from "./event-manager/discord.event-subscriber.ts";
import { DiscordUserEventSubscriber } from "./event-manager/user.event-subscriber.ts";
import {KvCache} from "./services/kv.ts";
import { DiscordService as DiscordUtils } from "./services/discord.service.ts";
import type { DynamicConfig } from "../../packages/dbgate/src/schemas/dynamic-config.schema.ts";
import { ObjCache } from "./services/obj-cache.ts";

export type DiscordContainer = {
  discordService?: DiscordService;
  discordUtils?: DiscordUtils;
  discordEventSubscriber?: DiscordEventSubscriber;
  discordUserEventSubscriber?: DiscordUserEventSubscriber;
  autoReplyCache: KvCache<DynamicConfig["auto_response"][0]>;
  tagsCache: ObjCache<DynamicConfig["tags"]>;
  logger: LoggerService;
}

const logger = new LoggerService("Discord")
const autoReplyCache = new KvCache<DynamicConfig["auto_response"][0]>(30 * 1000 * 60);
const tagsCache = new ObjCache<DynamicConfig["tags"]>(10 * 1000 * 60);

const discordContainer: DiscordContainer = {
  logger,
  autoReplyCache,
  tagsCache,
};

const discordService =  new DiscordService({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

discordContainer.discordService = discordService;
discordContainer.discordUtils = new DiscordUtils();
discordContainer.discordEventSubscriber = new DiscordEventSubscriber();
discordContainer.discordUserEventSubscriber = new DiscordUserEventSubscriber();

export { discordContainer };