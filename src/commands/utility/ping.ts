import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js";

const data: SlashCommandBuilder = new SlashCommandBuilder()
  .setName("ping")
  .setDescription('Replies with "Pong!".');

async function execute(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  await interaction.reply({
    content: "Pong!",
  });
}

export default {
  data: data,
  execute: execute,
};
