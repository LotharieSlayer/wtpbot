/**
 * @author Lothaire Guée
 * @description
 *      This event is used to track changes of the member.
 */


const { GuildMember } = require( "discord.js" );
// const { welcomeRole } = require("../utils/modules/welcomeRole");
const { timeoutLog } = require("../modules/logs");


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the event 'guildMemberUpdate' is emitted.
 * @param {GuildMember} oldMember The previous member object.
 * @param {GuildMember} newMember The new member object.
 */
async function execute( oldMember, newMember, client ) {
	timeoutLog(oldMember, newMember, client)
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "guildMemberUpdate",
	execute
}
