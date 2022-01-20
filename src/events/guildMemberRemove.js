/**
 * @author Lothaire Guée
 * @description
 *      This event is used to track member who leaves.
 */


const { GuildMember } = require( "discord.js" );
const { kickLog } = require("../utils/modules/logs");


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the event 'guildMemberRemove' is emitted.
 * @param {GuildMember} member The new member object.
 */
async function execute( member, client ) {
	// kickLog(member, client)
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "guildMemberRemove",
	execute
}
