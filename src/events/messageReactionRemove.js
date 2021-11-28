/**
 * @author Lothaire Guée
 * @description
 *      This event is used to track the likes and repost of the messages.
 *      If a message with a meme is not in the database, then it will be added.
 */


const { MessageReaction, Client, User } = require( "discord.js" );


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the event 'messageReactionRemove' is emitted.
 * @param {MessageReaction} reaction The reaction object.
 * @param {User} user The user that applied the guild or reaction emoji.
 * @param {Client} client The client that emitted the event.
 */
async function execute( reaction, user, client ) {

}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "messageReactionRemove",
	execute
}
