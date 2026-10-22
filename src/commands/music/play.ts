import {
  SlashCommandBuilder,
  type SlashCommandOptionsOnlyBuilder,
  type ChatInputCommandInteraction,
  type SlashCommandStringOption,
} from "discord.js";
import { isValidURL } from "../../utils/utils.js";

const data: SlashCommandOptionsOnlyBuilder = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Plays a given song.")
  .addStringOption((option: SlashCommandStringOption) => {
    return option
      .setName("song")
      .setDescription("The URL or name of the song.")
      .setRequired(true);
  });

async function execute(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  // TODO: Check that bot is not in a different channel
  // TODO: Check that bot has permissions to read from text channel
  // TODO: Check that bot has permissions to join voice channel

  // Check that user is in a voice channel
  const guildMember = await interaction.guild?.members.fetch(
    interaction.user.id,
  );
  const voiceChannel = guildMember?.voice.channel;

  if (!voiceChannel) {
    await interaction.reply({
      content: "You must be in a voice channel to play a song.",
    });

    return;
  }

  // Get user input
  const userInput: string | null = interaction.options.getString("song");

  // Check that userInput is not empty
  if (userInput == null || userInput.trim().length === 0) {
    await interaction.reply("You must provide a valid URL or song name.");

    return;
  }

  let message;
  if (isValidURL(userInput)) {
    // TODO: Get song information and play it
    // Bot should accept links from YouTube and Spotify
    message = `Now playing: ${userInput}.`;
  } else {
    // TODO: Search for song and play it
    // Bot should search for the song in YouTube and play the first option
    message = `Now playing: ${userInput}.`;
  }

  await interaction.reply({
    content: message,
  });
}

export default {
  data: data,
  execute: execute,
};
