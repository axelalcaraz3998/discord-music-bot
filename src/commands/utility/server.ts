import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js";

const data: SlashCommandBuilder = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Replies with information about the server.");

async function execute(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  await interaction.reply({
    content: `Server ${interaction.guild?.name} has ${interaction.guild?.memberCount} members.`,
  });
}

export default {
  data: data,
  execute: execute,
};
