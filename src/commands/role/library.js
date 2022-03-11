/**
 * @author Lothaire Guée
 * @description
 *      Contains the command 'library'.
 *      Allows anyone to get a "Bibliothécaire"
 *      role to access to some archives.
 */

/*      IMPORTS      */
const { SlashCommandBuilder } = require( "@discordjs/builders" );
const { CommandInteraction } = require( "discord.js" );
 
 /*      AUTHORISATION      */
const { Library } = require('../../files/modules.js');
 
 /* ----------------------------------------------- */
 /* COMMAND BUILD                                   */
 /* ----------------------------------------------- */
 const slashCommand = new SlashCommandBuilder()
     .setName( "library" )
     .setDescription( "[role] Activer/Désactiver l'accès aux archives." )
     .setDefaultPermission( false );
 
/* ----------------------------------------------- */
/* PERMISSIONS                                     */
/* ----------------------------------------------- */

async function permissions(guild){
	const permissions = [
		{
			id: guild,
			type: 'ROLE',
			permission: true,
		},
	];
	return permissions;
}

 /* ----------------------------------------------- */
 /* FUNCTIONS                                       */
 /* ----------------------------------------------- */
 /**
  * Function called when the command 'ping'
  * @param {CommandInteraction} interaction The interaction generated by the command's execution.
  */
  async function execute( interaction ) {
    if(Library == false) return;
    const { getSetupData } = require("../../utils/enmapUtils")
    const LIBRARY_ID = await getSetupData(interaction.guild.id, "library")

    member = interaction.member
    let libraryRole = interaction.guild.roles.cache.get(LIBRARY_ID);
    
    if(member.roles.cache.some(role => role.id === LIBRARY_ID)){
        member.roles.remove(libraryRole);
        await interaction.reply(
            { content: `Vous n'avez désormais plus accès aux archives !`, ephemeral: true }
        );
    }
    else {
        member.roles.add(libraryRole);
        await interaction.reply(
            { content: `Vous avez désormais accès aux archives !`, ephemeral: true }
        );
    }

     
 }
 
 
 /* ----------------------------------------------- */
 /* MODULE EXPORTS                                  */
 /* ----------------------------------------------- */
 module.exports = {
    data: slashCommand,
    permissions,
    execute
 }