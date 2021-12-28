/**
 * @author Lothaire Guée
 * @description
 * 		The base file of the bot.
 */


const { TOKEN, DEV_GUILD_ID } = require( "./files/config.json" );
const { Client, Collection, Intents } = require( "discord.js" );
const { loadCommands, loadEvents } = require( "./utils/loadAssets" );
const { loadCommandsToGuild } = require( "./utils/registerCommands" );
const { loadPermissions } = require("./events/ready");

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_VOICE_STATES
	],
	partials: [
		"MESSAGE",
		"REACTION"
	]
});

// This Map keeps the guilds' player, voice connection and channel's ID to allow multi-server use.
client.guildsData = new Map();

client.commands = new Collection();
(async () => {
	await loadCommands( client );
	await loadEvents( client );
	await client.login( TOKEN );
	await loadCommandsToGuild( client.user.id, DEV_GUILD_ID, TOKEN );
	await loadPermissions(client);
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