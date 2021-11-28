/**
 * @author Benjamin Guirlet
 * @description
 * 		The file contains the functions to load the commands and events in the bot at startup.
 */


const fs = require( "fs" );
const { Client } = require( "discord.js" );


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Load all the commands into the client.
 * @param {Client} client The client where the commands will be loaded.
 */
async function loadCommands( client ) {
	const dir = "./commands";

	// Reading the commands' folders.
	fs.readdirSync( dir ).forEach( sub_dir => {
		// Reading the commands in the current folder.
		const commandFiles = fs.readdirSync( `${dir}/${sub_dir}` ).filter( file => file.endsWith( ".js" ) );

		for ( const file of commandFiles ) {
			// Using another pathname because require works from the current file path and not the project path.
			const command = require( `../commands/${sub_dir}/${file}` );
			client.commands.set( command.data.name, command );
		}
	})
}


/**
 * Load all the events into the client.
 * @param {Client} client The client where the events will be loaded.
 */
async function loadEvents( client ) {
	const dir = "./events";

	// Reading the events' files.
	const eventFiles = fs.readdirSync( dir ).filter(file => file.endsWith('.js'));
	for ( const file of eventFiles ) {
		const event = require( `../events/${file}` );
		if ( event.once ) {
			client.once( event.name, ( ...args ) => event.execute( ...args, client ) );
		} else {
			client.on( event.name, ( ...args ) => event.execute( ...args, client ) );
		}
	}
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	loadCommands,
	loadEvents
}
