/**
 * @author Lothaire Guée
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
	const dateFormat = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} `
		+ `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}:`
		+ `${String(date.getSeconds()).padStart(2, '0')}`;

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