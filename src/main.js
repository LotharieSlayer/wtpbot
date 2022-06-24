/**
 * @author Lothaire Guée
 * @description
 * 		The base file of the bot.
 */


const { Client, Collection, Intents } = require( "discord.js" );
const { loadCommands, loadEvents, loadCommandToAllGuilds } = require( "./utils/loadAssets" );
const { loadCommandsToGuild } = require( "./utils/loadAssets" );

require( "dotenv" ).config( { path: '.env' } );

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_BANS
	],
	partials: [
		"MESSAGE",
		"REACTION",
		"GUILD_MEMBER",
		"USER"
	]
});

// This Map keeps the guilds' player, voice connection and channel's ID to allow multi-server use.
client.guildsData = new Map();

client.commands = new Collection();
(async () => {
	await loadCommands( client );
	await loadEvents( client );
	await client.login( process.env.TOKEN );
	// for(guild of process.env.DEV_GUILD_ID)
		// await loadCommandsToGuild( client, process.env.DEV_GUILD_ID );
	await loadCommandToAllGuilds(client)
})();


/* ----------------------------------------------- */
/* DATABASES INITILIZATION                         */
/* ----------------------------------------------- */

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */

module.exports = {
	client: client
}