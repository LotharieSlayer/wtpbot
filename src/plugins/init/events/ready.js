/**
 * @author Lotharie
 * @description
 *		Handler for the 'ready' event.
 */


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Event called when the bot is ready after the connection to the api.
 * @param {Client} client The client that emitted the event.
 */
function execute( client ) {
	
	const date = new Date();
	// set date and hours to french format
	const dateFormat = date.toLocaleString("fr-FR", {
		timeZone: "Europe/Paris",
		hour12: false,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	console.log( `${client.user.username} is connected at ${dateFormat} !` );

}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "ready",
	once : true,
	execute
}