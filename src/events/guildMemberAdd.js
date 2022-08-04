/**
 * @author Lothaire Guée
 * @description
 *      This event is used to track member who entered.
 */


const { GuildMember } = require( "discord.js" );
const { userLog } = require("../modules/logs");
const { welcomeMember } = require("../modules/welcomeMember");


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the event 'guildMemberAdd' is emitted.
 * @param {GuildMember} member The new member object.
 */
async function execute( member, client ) {
	welcomeMember(member, client)
	userLog(member, client)
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "guildMemberAdd",
	execute
}
