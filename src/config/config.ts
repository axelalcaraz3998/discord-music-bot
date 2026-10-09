import dotenv from "dotenv";

// Load environment variables from .env file in the root directory
dotenv.config({
  path: "./.env",
});

// Build config object
const config = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || "",
};

export default config;
