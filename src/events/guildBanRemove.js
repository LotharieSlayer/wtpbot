/**
 * @author Lothaire Guée
 * @description
 *		It manage the logs for the new unbans.
 */


const { GuildBan, Client } = require( "discord.js" );
const { banLog } = require( "../utils/modules/logs" );


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * The handler for the event 'guildBanRemove'.
 * It is called whenever someone is unbanned.
 * @param {GuildBan} guildBan The new unban.
 * @param {Client} client The client that created the interaction.
 */
async function execute( guildBan, client ) {
	if ( guildBan.partial ) await guildBan.fetch();
	banLog( guildBan, false, client );
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "guildBanRemove",
	execute
}