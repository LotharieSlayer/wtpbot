/**
 * @author Lothaire Guée
 * @description
 */


const { Message, Client } = require( "discord.js" );


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * The handler for the event 'messageDelete'.
 * It is called whenever an interaction is created.
 * It can be a button pressed, a slash command executed, etc.
 * @param {Message} message The message that triggered the event.
 * @param {Client} client The client that created the interaction.
 */
function execute( message, client ) {

}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "messageCreate",
	execute
}