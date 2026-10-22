import { Events } from "discord.js";

export default {
  name: Events.Error,
  once: false,
  execute(error: Error): void {
    console.error("[ERROR]", error);
  },
};
