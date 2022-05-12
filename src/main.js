/**
 * @author Lothaire Guée
 * @description
 * 		The base file of the bot.
 */


const { TOKEN, DEV_GUILD_ID } = require( "./files/config.json" );
const { Client, Collection, Intents } = require( "discord.js" );
const { loadCommands, loadEvents, loadCommandsToGuild, loadCommandToAllGuilds } = require( "./utils/loadAssets" );

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
	await client.login( TOKEN );
	for(guild of DEV_GUILD_ID)
		await loadCommandsToGuild( client, guild );
	// await loadCommandToAllGuilds(client)
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