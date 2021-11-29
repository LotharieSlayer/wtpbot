/**
 * @author Lothaire Guée
 * @description
 *		Handler for the 'ready' event.
 */


const { Client } = require( "discord.js" );


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Event called when the bot is ready after the connection to the api.
 * @param {Client} client The client that emitted the event.
 */
function execute( client ) {
	console.log( `${client.user.username} is connected!` );

	// Out-comment when we need to actualise the commands' permissions.
	// loadPermissions( client )
}

/**
 * This function is used to load the permissions to the commands.
 * It only need to be called one time after updating the commands or adding concerned commands.
 * @param {Client} client The bot's client.
 */
 async function loadPermissions( client ) {
	// refaire toute cette partie pour prendre en compte le module exports dans les fichiers du dossier commands
	const permission = [
		{
			id: MODERATOR_ROLE,
			type: "ROLE",
			permission: true
		}
	]
	await client.guilds.cache.get( GUILD_ID ).commands.fetch();
	await client.guilds.cache.get( GUILD_ID ).commands.cache.forEach( command => {
		command.permissions.add( { permissions: permission } );
	});
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "ready",
	execute
}