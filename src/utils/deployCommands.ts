import fs from "node:fs";
import path from "node:path";
import { REST, Routes } from "discord.js";
import config from "./../config/config.js";

const isLoadableFile = (file: string): boolean =>
  (file.endsWith(".ts") || file.endsWith(".js")) && !file.endsWith(".d.ts");

const commands: JSON[] = [];

const projectRoot: string = path.resolve(import.meta.dirname, "..");
const foldersPath: string = path.join(projectRoot, "commands");
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

    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.error(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

// Construct an instance of the REST module
const rest: REST = new REST().setToken(config.DISCORD_TOKEN);

// Deploy commands
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    // Fully refresh all commands with the current set
    await rest.put(Routes.applicationCommands(config.DISCORD_CLIENT_ID), {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${commands.length} application (/) commands.`,
    );
  } catch (error: any) {
    console.error(error);
  }
})();
