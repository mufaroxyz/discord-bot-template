import { Client } from "discord.js";
import { discordContainer } from "../discord";

export default class DiscordService extends Client {
  public async start(token: string) {
    discordContainer.logger.info("Starting Discord client");
    await this.login(token);
  }
}
