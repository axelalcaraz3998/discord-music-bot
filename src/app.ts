import fs from "node:fs";
import path from "node:path";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import config from "./config/config.js";

// Create client instance
const client: Client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Add commands property for easy access
client.commands = new Collection();

// Load command files
const isLoadableFile = (file: string): boolean =>
  (file.endsWith(".ts") || file.endsWith(".js")) && !file.endsWith(".d.ts");

const foldersPath: string = path.join(import.meta.dirname, "commands");
const commandFolders: string[] = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath: string = path.join(foldersPath, folder);
  const commandFiles: string[] = fs
    .readdirSync(commandsPath)
    .filter((file: string) => isLoadableFile(file));

  for (const file of commandFiles) {
    const filePath: string = path.join(commandsPath, file);
    const module = await import(filePath);
    const command: any = module.default ?? module;

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.error(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

// Load event files
const eventsPath: string = path.join(import.meta.dirname, "events");
const eventFiles: string[] = fs
  .readdirSync(eventsPath)
  .filter((file) => isLoadableFile(file));

for (const file of eventFiles) {
  const filePath: string = path.join(eventsPath, file);
  const module = await import(filePath);
  const event: any = module.default ?? module;

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Log in to Discord
client.login(config.DISCORD_TOKEN);
