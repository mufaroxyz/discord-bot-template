import { config } from "./config/index.ts";
import { discordContainer } from "./discord.ts";
import DynamicConfigService from "../../packages/dbgate/src/services/dynamic-config.service.ts";

export const dynamicConfigService = new DynamicConfigService();

const main = async () => {
    const deps = discordContainer;
    const discord = deps.discordService;

    if (!discord) {
        deps.logger.error("Discord client not found");
        return;
    }

    await discord.login(config.DISCORD_TOKEN);
    await deps.discordEventSubscriber?.subscribe();
    await deps.discordUserEventSubscriber?.subscribe();
};

main();