/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'report'.
 *      Permet le signalement et le report des utilisateurs.
 */

const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const { getSetupData } = require("../../utils/enmapUtils");
const { ApplicationCommandType } = require("discord.js");
const { Report } = require("../../files/modules");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const cmCommand = new ContextMenuCommandBuilder()
    .setName( "Signaler le message" )
    .setType( ApplicationCommandType.Message )
    .setDefaultPermission(false);
 
 
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
    const member = await interaction.guild.members.fetch(message.author.id);

    console.log("message", message)
    console.log("member", member)

    await interaction.reply({
        content: `Merci d'avoir signalé ce message ${member.user} !`,
        ephemeral: true,
    });
}

 
 /* ----------------------------------------------- */
 /* MODULE EXPORTS                                  */
 /* ----------------------------------------------- */
module.exports = {
    data: cmCommand,
    execute
}