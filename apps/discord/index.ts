import { config } from "./config";
import { discordContainer } from "./discord";

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