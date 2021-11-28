/**
 * @author Lothaire Guée
 * @description
 *		This event is used to store the memes in the database and add their initial reactions.
 */


const { LIKE_EMOJI_MENTION, REPOST_EMOJI_MENTION } = require( "../files/config.json" );
const { Client, Message } = require( "discord.js" );


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */


/**
 * Function called when the event 'messageCreate' is emitted.
 * @param {Message} message The message created.
 * @param {Client} client The client that emitted the event.
 */
async function execute( message, client ) {
	
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "messageCreate",
	execute
}
