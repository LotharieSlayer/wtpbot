/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'certify'.
 *      Allow mods to certify someone in the server.
 */

const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const { VERIFIED } = require("../../files/welcomeMessages");
const { Certify } = require("../../files/modules");
const { getSetupData } = require("../../utils/enmapUtils");
const { ApplicationCommandType } = require("discord.js");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const cmCommand = new ContextMenuCommandBuilder()
	.setName( "Certifier" )
	.setType( ApplicationCommandType.Message )
    .setDefaultPermission(false);


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'cmCertify'
 * @param {ContextMenuInteraction} interaction L'interaction générée par l'exécution de la commande.
 */
async function execute( interaction ) {
	if (Certify == false) return;

    const roles = await getSetupData(interaction.guild.id, "certify");
    if(roles === undefined) return

    const member = await interaction.guild.members.fetch(interaction.channel.messages.cache.get( interaction.targetId ).author.id);
	
    for (let i = 0; i < roles.certifyRoles.length; i++) {
        await member.roles.add(interaction.guild.roles.cache.get(roles.certifyRoles[i]));
    }
    for (let i = 0; i < roles.nCertifyRoles.length; i++) {
        await member.roles.remove(interaction.guild.roles.cache.get(roles.nCertifyRoles[i]));
    }

    await member.send({ embeds: [VERIFIED] });

    await interaction.reply({
        content: `Vous avez bien certifié <@${member.user.id}> !`,
        ephemeral: false,
    });
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	data: cmCommand,
	execute
}