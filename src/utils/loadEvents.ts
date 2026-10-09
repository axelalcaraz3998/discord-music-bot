import fs from "node:fs";
import path from "node:path";
import type { Client } from "discord.js";
import { isLoadableFile } from "./utils.js";

export async function loadEvents(client: Client): Promise<void> {
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
}
