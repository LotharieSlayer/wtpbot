/**
 * @author Lothaire Guée
 * @description
 *      Contains the command 'ping'.
 *      Pong the user.
 */


const { SlashCommandBuilder } = require( "@discordjs/builders" );
const { CommandInteraction } = require( "discord.js" );
const { ADMINS } = require("../../files/config.json");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
	.setName( "ping" )
	.setDescription( "Ça vous mentionne !" )
	.setDefaultPermission( true );

/* ----------------------------------------------- */
/* PERMISSIONS                                     */
/* ----------------------------------------------- */

	const permissions = [
		{
			id: 'ADMIN_ID',
			type: 'ROLE',
			permission: true,
		},
	];

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the command 'ping'
 * @param {CommandInteraction} interaction The interaction generated by the command's execution.
 */
 async function execute( interaction ) {
	await interaction.reply(
		{ content: "Pong!", ephemeral: true }
	);
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	data: slashCommand,
	permissions: permissions,
	execute
}