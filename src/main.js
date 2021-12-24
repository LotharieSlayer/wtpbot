/**
 * @author Lothaire Guée
 * @description
 * 		The base file of the bot.
 */


const { TOKEN, DEV_GUILD_ID } = require( "./files/config.json" );
const { Client, Collection, Intents } = require( "discord.js" );
const { loadCommands, loadEvents } = require( "./utils/loadAssets" );
const { loadCommandsToGuild } = require( "./utils/registerCommands" );
const { initDB, dbModifyPresentation, activeList, setupDiscussion, setupPresentation, setupProposition } = require("./utils/enmapUtils.js");


const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_MEMBERS
	],
	partials: [
		"MESSAGE",
		"REACTION"
	]
});


client.commands = new Collection();
(async () => {
	await loadCommands( client );
	await loadEvents( client );
	await client.login( TOKEN );
	await loadCommandsToGuild( client.user.id, DEV_GUILD_ID, TOKEN );
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