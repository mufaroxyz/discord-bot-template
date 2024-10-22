import type { Snowflake } from "discord.js";
import { config } from "../config/index.ts";
import { discordContainer } from "../discord.ts";

export class DiscordService {
    public deps = discordContainer;

    public async getGuild() {
        return await this.deps.discordService?.guilds.fetch(config.DISCORD_SERVER_ID);
    }   
    
    public async fetchMember(memberId: Snowflake) {
        try {
            return (await this.getGuild())!.members.fetch(memberId);
        } catch (error) {
            throw new Error(`User not found - ${memberId}`)
        }
    }

    public async getMember(memberId: Snowflake) {
        return (await this.getGuild())?.members.cache.get(memberId) || (await this.fetchMember(memberId));
    }
}