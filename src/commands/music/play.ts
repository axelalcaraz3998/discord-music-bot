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
      .setName("url")
      .setDescription("The URL of the song.")
      .setRequired(true);
  });

async function execute(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  const url: string | null = interaction.options.getString("url");

  let message;
  if (url != null && isValidURL(url)) {
    message = `Now playing: ${url}.`;

    // TODO: Get song information and play it
    // Bot should accept links from YouTube, SoundCloud, Spotify and Apple Music
  } else {
    message = `[ERROR] Must be valid URL.`; // Temporal

    // TODO: Search for song and play it
    // Bot should search for the song in YouTube and play the first option
  }

  await interaction.reply({
    content: message,
  });
}

export default {
  data: data,
  execute: execute,
};
