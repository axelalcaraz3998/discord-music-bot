import fs from "node:fs";
import path from "node:path";
import type { Client } from "discord.js";
import { isLoadableFile } from "./utils.js";

export async function loadCommands(client: Client): Promise<void> {
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
}
