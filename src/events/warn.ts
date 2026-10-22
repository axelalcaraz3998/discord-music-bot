import { Events } from "discord.js";

export default {
  name: Events.Warn,
  once: false,
  execute(message: string): void {
    console.warn("[WARN]", message);
  },
};
