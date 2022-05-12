// IMPORTS

const Enmap = require("enmap");
const fs = require("fs");
const { SlashCommandBuilder, time } = require("@discordjs/builders");
const { CommandInteraction, Message } = require("discord.js");
const { getSetupData } = require("../../utils/enmapUtils");

// COMMANDE BUILD

const slashCommand = new SlashCommandBuilder()
  .setName("maso")
  .setDescription(
    "[fun] 1 chance sur 6 de se faire mute(24H). Prendrez vous ce risque ?"
  )

// FUNCTION

async function execute(interaction) {
  if (interaction.member.permissions.has("ADMINISTRATOR") || interaction.guild.ownerID === interaction.member.id) {

    await interaction.reply({
      content: "Vous êtes un administrateur, vous ne pouvez pas vous mute.",
      ephemeral: false,
    });
  }

  const timeOutList = [
    "fallait pas faire le malin.",
    "cheh !",
    "bah alors on parle plus maintenant ?",
    "tu t'es bien fais baisé !",
    "bon chien.",
    "ca c'est mon mute enculé de ta mère ! PAPAPAAAAA !",
    "hiihihihihihihihihiihihiii !",
    "même sucer les modos ne suffira pas !",
    "retournes chez ta mère !"
  ];
  const savedList = [
    "on se reverra.",
    "le Karma va retomber.",
    "tout va bien, petit tout va bien.",
    "un repos bien merité.",
    "tu peux festoyer ça !",
    "tu peux gambader dans le pré, sans te soucier du temps qu'il passe."
  ];
  const randomTimeOut = Math.floor(Math.random() * timeOutList.length);
  const randomSaved = Math.floor(Math.random() * savedList.length);
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  const randomHours = Math.floor(Math.random() * 24) + 1;

  if (randomNumber === 1) {

    await interaction.member.timeout(randomHours * 60 * 60 * 1000, "S'est fait tuer...");
    await interaction.reply({
      content: `<@${interaction.member.id}>, ${timeOutList[randomTimeOut]} T'es mute **${randomHours}H** !`,
      ephemeral: false,
    });

  } else {

    await interaction.reply({
      content: `<@${interaction.member.id}>, ${savedList[randomSaved]}`,
      ephemeral: false,
    });
  }
}

// EXPORTS

module.exports = {
  data: slashCommand,
  execute,
};
