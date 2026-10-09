import { Client, Events } from "discord.js";

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client<true>): void {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
