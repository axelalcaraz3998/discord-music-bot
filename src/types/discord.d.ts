import type {
  ChatInputCommandInteraction,
  Collection,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";

declare module "discord.js" {
  interface Client {
    commands: Collection<
      string,
      {
        data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
        execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
      }
    >;
  }
}
