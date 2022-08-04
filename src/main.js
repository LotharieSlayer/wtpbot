/**
 * @author Lothaire Guée
 * @description
 * 		The base file of the bot.
 */

const { Client, Collection, GatewayIntentBits, Partials  } = require( "discord.js" );
const { loadCommands, loadEvents, loadCommandToAllGuilds } = require( "./utils/loadAssets" );
// const { loadCommandsToGuild } = require( "./utils/loadAssets" );
require( "dotenv" ).config( { path: '.env' } );

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildBans
	],
	partials: [
		Partials.Message,
		Partials.Reaction,
		Partials.GuildMember,
		Partials.User
	]
});

client.commands = new Collection();

(async () => {
	await loadCommands( client );
	await loadEvents( client );
	await client.login( process.env.TOKEN );
	// for(guild of process.env.DEV_GUILD_ID)
		// await loadCommandsToGuild( client, process.env.DEV_GUILD_ID );
	await loadCommandToAllGuilds(client)
})();


// // Initializing the project
// require("./utils/handler")(client);

// client.login( process.env.TOKEN );

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */

module.exports = {
	client: client
}