/**
 * @author Lothaire Guée
 * @description
 *		It manage the logs for the new bans.
 */


const { GuildBan, Client } = require( "discord.js" );
const { banLog } = require( "../utils/modules/logs" );


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * The handler for the event 'guildBanAdd'.
 * It is called whenever someone is banned.
 * @param {GuildBan} guildBan The new ban.
 * @param {Client} client The client that created the interaction.
 */
async function execute( guildBan, client ) {
	if ( guildBan.partial ) await guildBan.fetch();
	banLog( guildBan, true, client );
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "guildBanAdd",
	execute
}