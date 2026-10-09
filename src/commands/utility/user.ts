import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js";

const data: SlashCommandBuilder = new SlashCommandBuilder()
  .setName("user")
  .setDescription("Replies with information about the user.");

async function execute(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  await interaction.reply({
    content: `This command was executed by ${interaction.user.username}.`,
  });
}

export default {
  data: data,
  execute: execute,
};
