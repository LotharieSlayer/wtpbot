/**
 * @author Lothaire Guée
 * @description
 *		This event is used to store the memes in the database and add their initial reactions.
 */


const { Client, Message } = require( "discord.js" );
const { isEditedPresentation } = require("../utils/modules/presentation");

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */


/**
 * Function called when the event 'messageUpdate' is emitted.
 * @param {Message} oldMessage The previous message.
 * @param {Message} newMessage The new message.
 */
async function execute( oldMessage, newMessage ) {
	isEditedPresentation(newMessage)
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "messageUpdate",
	execute
}
