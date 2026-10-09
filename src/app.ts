import { Client, Events, GatewayIntentBits } from "discord.js";
import config from "./config/config.js";

// Create client instance
const client: Client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord
client.login(config.DISCORD_TOKEN);
