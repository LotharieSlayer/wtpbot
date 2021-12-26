/**
 * @author Lothaire Guée
 * @description
 *		This event is used to store the memes in the database and add their initial reactions.
 */


const { Client, Message } = require( "discord.js" );
const { activeMember } = require("../utils/modules/activeMember.js");
const { proposition } = require("../utils/modules/proposition.js");
const { presentation } = require("../utils/modules/presentation");
const { thread } = require("../utils/modules/thread.js");
const { memes } = require("../utils/enmapUtils.js");

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */


/**
 * Function called when the event 'messageCreate' is emitted.
 * @param {Message} message The message created.
 * @param {Client} client The client that emitted the event.
 */
async function execute( message, client ) {
	activeMember(client, message);
	proposition(client, message);
	presentation(message)
	thread(message)
	loadMemes(message)
}

async function loadMemes(msg){
    if(msg.author.bot) return;

	// Génère un nombre random entre 1 et 10
	const randomValue = Math.floor(Math.random() * 10 + 1);
	if(randomValue > 2) return

	memes.fetchEverything()
	memes.forEach( async (value, key) => {
		if(msg.content.includes(key))
			msg.reply(value)
	});
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "messageCreate",
	execute
}
