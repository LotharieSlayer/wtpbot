/**
 * @author Lothaire Guée
 * @description
 * 		The base file of the bot.
 */

const { Client, Collection, GatewayIntentBits, Partials  } = require( "discord.js" );
const { loadCommands, loadEvents, loadCommandToAllGuilds, connectToDatabase } = require( "./utils/loadAssets" );
// const { loadCommandsToGuild } = require( "./utils/loadAssets" );
require( "dotenv" ).config( { path: '.env' } );
const events = require('events');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageTyping,
	],
	partials: [
		Partials.Message,
		Partials.Reaction,
		Partials.GuildMember,
		Partials.User,
		Partials.Channel,
		Partials.ThreadMember,
		
	]
});

client.commands = new Collection();
client.invites = new Collection();

// WARNING: Ces eventsEmitter ne sont en aucun cas lié à ceux de discord.js mais à ceux de l'application en local. Ils sont généralement utilisés pour les plugins/.
client.eventsEmitter = new events.EventEmitter();

(async () => {
	await connectToDatabase(client);
	await loadCommands(client);
	await loadEvents(client);
	await client.login(process.env.TOKEN);
	// for(guild of process.env.DEV_GUILD_ID)
		// await loadCommandsToGuild( client, process.env.DEV_GUILD_ID );
	await loadCommandToAllGuilds(client);
})();

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */

module.exports = {
	client: client
}