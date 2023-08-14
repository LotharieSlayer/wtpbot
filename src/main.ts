import { Bot } from '@lib/bot';
require( "dotenv" ).config( { path: '.env' } );
import { GatewayIntentBits, Partials } from 'discord.js';


const client = new Bot({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessageTyping,
	],
	partials: [
		Partials.Message,
		Partials.Channel,
		Partials.Reaction,
		Partials.GuildMember,
		Partials.User,
		Partials.ThreadMember,
	],
});


// Ajout d'un listener pour afficher des précisions sur les erreurs non-gérées.
process.on('unhandledRejection', error => {
	client.log('Erreur non-gérée !', 1);
	console.error(error);
});


(async () => {
	await client.start(process.env.TOKEN);

	if (process.argv.includes('-l')) {
		await client.uploadCommands();
	}
})();
