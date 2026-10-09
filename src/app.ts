import { Client, Collection, GatewayIntentBits } from "discord.js";
import { loadCommands } from "./utils/loadCommands.js";
import { loadEvents } from "./utils/loadEvents.js";
import config from "./config/config.js";

// Create client instance
const client: Client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Add commands property for easy access
client.commands = new Collection();

// Load command files
await loadCommands(client);

// Load event files
await loadEvents(client);

// Log in to Discord
client.login(config.DISCORD_TOKEN);
