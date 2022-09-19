/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'report'.
 *      Permet le signalement et le report des utilisateurs.
 */

const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const { reports } = require("../../utils/enmapUtils");
const { ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { Report } = require("../../files/modules");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const cmCommand = new ContextMenuCommandBuilder()
    .setName( "Signaler le message" )
    .setType( ApplicationCommandType.Message )
    .setDefaultPermission(false);
 
const modal = new ModalBuilder()
    .setCustomId('reportModal')
    .setTitle('Signaler le message');

// Add components to modal

// Create the text input components
const reportTitle = new TextInputBuilder()
    .setCustomId('reportTitle')
    // The label is the prompt the user sees for this input
    .setLabel("Résumé du signalement")
    // Short means only a single line of text
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

const reportDescription = new TextInputBuilder()
    .setCustomId('reportDescription')
    .setLabel("Description et détails sur le signalement")
    // Paragraph means multiple lines of text.
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);
// An action row only holds one text input,
// so you need one action row per text input.
const firstActionRow = new ActionRowBuilder().addComponents(reportTitle);
const secondActionRow = new ActionRowBuilder().addComponents(reportDescription);

// Add inputs to the modal
modal.addComponents(firstActionRow, secondActionRow);

 
/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
  * Fonction appelé quand la commande est 'report'
  * @param {ContextMenuInteraction} interaction L'interaction générée par l'exécution de la commande.
  */
async function execute( interaction ) {
    if (Report == false) return;

    const message = await interaction.channel.messages.cache.get( interaction.targetId );
    const user = await interaction.guild.members.fetch(message.author.id);

    // faire apparaitre la modal
    // Show the modal to the user
    await interaction.showModal(modal);

    console.log(interaction)

    reports.set(Date.now().toString(), {
        message: message.id,
        targetUser: user.id,
        reporter: interaction.member.id,
        link: `https://discord.com/channels/${message.guild}/${message.channel}/${message.id}`,
        reporterMessage: "get modal"
    })

    // send dans le serv staff dans le channel setup report
}

 
 /* ----------------------------------------------- */
 /* MODULE EXPORTS                                  */
 /* ----------------------------------------------- */
module.exports = {
    data: cmCommand,
    execute
}