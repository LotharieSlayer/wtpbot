/**
 * @author Lothaire Guée
 * @description
 *		Handler for the 'ready' event.
 */


const { ActivityType } = require( "discord.js" );

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Event called when the bot is ready after the connection to the api.
 * @param {Client} client The client that emitted the event.
 */
function execute( client ) {
	console.log( `${client.user.username} is connected!` );

	loadPresence(client)

}

async function loadPresence( client ){
    const { presence } = require("../utils/enmapUtils")
	setInterval(() => {
		// Met la phrase dans le statut du bot.
        client.user.setActivity(presence.randomKey(1)[0], { type: ActivityType.Watching });
    }, 10000);
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "ready",
	once : true,
	execute
}