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

	loadPresence(client)

	// Out-comment when we need to actualise the commands' permissions on ready event.
	// loadPermissions( client )
}


/**
 * This function is used to load the permissions to the commands.
 * After the setup on the guild finished it calls loadPermissions below to load the
 * right permissions to others commands.
 * @param {Client} client The bot's client.
 */
 async function loadPermissions( client ) {	
    const { isSetupDone } = require("../utils/enmapUtils")

	client.guilds.cache.map(async guild => {

		const permissionsOnSetup = [
			{
				id: guild.id,
				type: "ROLE",
				permission: false
			}
		]
		const permissionsForSetup = [
			{
				id: guild.ownerId,
				type: "USER",
				permission: true
			}
		]
		const permissionsDev = [
			{
				id: guild.id,
				type: "ROLE",
				permission: true
			}
		]

		if(isSetupDone.get(guild.id)){
			await client.guilds.cache.get( guild.id ).commands.fetch();
			await client.guilds.cache.get( guild.id ).commands.cache.forEach( command => {
				// Uncomment 'permissionsDev' for devtest
				// command.permissions.add( { permissions: permissionsDev } )

				// Or these two lines for live server
				let slashCommandPermissions = client.commands.get( command.name ).permissions(guild.id)
				slashCommandPermissions.then(r => command.permissions.set( { permissions : r } ))
			})
		}
		else {
			await client.guilds.cache.get( guild.id ).commands.fetch();
			await client.guilds.cache.get( guild.id ).commands.cache.forEach( command => {
				// permissionsDev for devtest or permissionsOnSetup for live server
				command.permissions.set( { permissions: permissionsOnSetup } )
				if(command.name === "setup")
					command.permissions.set( { permissions: permissionsForSetup } )
			})
		}
	})
}

async function loadPresence( client ){
    const { presence } = require("../utils/enmapUtils")
	setInterval(() => {
		// Met la phrase dans le statut du bot.
        client.user.setActivity(presence.randomKey(1)[0], { type: "WATCHING" });
    }, 10000);
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "ready",
	loadPermissions,
	execute
}