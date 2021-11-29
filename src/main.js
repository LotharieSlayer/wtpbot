/**
 * @author Lothaire Guée
 * @description
 * 		The base file of the bot.
 */


const { TOKEN, DEV_GUILD_ID } = require( "./files/config.json" );
const { Client, Collection, Intents } = require( "discord.js" );
const { loadCommands, loadEvents } = require( "./utils/loadAssets" );
const { loadCommandsToGuild } = require( "./utils/registerCommands" );


const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
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
const Enmap = require("enmap");
const dbModifyPresentation = new Enmap({name: "modifyP"});
const activeList = new Enmap({name: "activeList"});
const memes = new Enmap({name: "memes"});
const status = new Enmap({name: "status"});

module.exports = {
	client: client,
	dbModifyPresentation: dbModifyPresentation,
	activeList: activeList,
	memes: memes,
	status: status
}

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
