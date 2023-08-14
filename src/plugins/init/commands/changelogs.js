/**
 * @author Lotharie
 * @description
 *      Contient la commande 'changelogs'.
 *      Allows anyone to see the changelogs of the bot.
 */

/*      IMPORTS      */
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const pjson = require("../../../package.json");
const fs = require("fs");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("changelogs")
    .setDescription("[other] Affiche les récents changements de votre ami WTPBot.")
    .setDefaultPermission(false);

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'changelogs'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {

    const messageContent = fs.readFileSync("./files/changelogs.txt", "utf8");

    //EMBED
    // inside a command, event listener, etc.
    const embed = new EmbedBuilder()
        .setColor(0xe15dd9)
        .setTitle(`Changelogs v${pjson.version} :`)
        .setAuthor({name: "WhatThePhoqueBot", iconURL: interaction.client.user.avatarURL()})
        .setDescription(messageContent)
        .setTimestamp(new Date())
        .setFooter({
            text: "Merci !",
            value: interaction.client.user.avatarURL()
        });

    await interaction.reply({ embeds: [embed], ephemeral: false });
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
