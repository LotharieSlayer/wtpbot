/**
 * @author Lothaire Guée
 * @description
 *      Contains the command 'certify'.
 *      Allow mods to certify someone in the server.
 */

const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const { VERIFIED } = require("../../data/welcomeMessages");
const { Certify } = require("../../files/modules");
const { getSetupData } = require("../../utils/enmapUtils");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const cmCommand = new ContextMenuCommandBuilder()
	.setName( "Certifier" )
	.setType( 3 )
    .setDefaultPermission(false);


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Handler pour la SlashCommande.
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

    member.send({ embeds: [VERIFIED] });

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