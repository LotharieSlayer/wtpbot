/**
 * @author Benjamin Guirlet
 * @description
 * 		The file contains the functions to load the commands and events in the bot at startup.
 */


// Used to get all the directory of the commands and events.
const { promisify } = require( "util" );
const { glob } = require( "glob" );
const globPromise = promisify( glob );
const { getSetupData } = require("../utils/enmapUtils");
const { Subgiving } = require("../files/modules");
const { Collection } = require("discord.js");


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

/**
 * Load the main file from plugins in the client.
 * @param {Client} client The client of the bot.
 */
 async function loadPlugins( client ) {
    const mainFilesPlugins = await globPromise( `${process.cwd()}/plugins/*/*.js` );
    mainFilesPlugins.map( file => {
        try {
            const plugin = require( file );
            file = file.split("/");
            file = file[file.length - 1];
            if(file.substring(file.length - 3, file.length) == ".js")
                file = file.substring(0, file.length - 3);
            plugin ? client.plugins[file] = true : client.plugins[file] = false;
            plugin.execute(client);
            console.log("[Plugin] " + file + " chargé.");
        } catch (error) {
            console.log("[Plugin] Impossible de charger le plugin " + file + " : " + error);
        }
    });
}

/**
 * Load the commands in the client.
 * @param {Client} client The client of the bot.
 */
async function loadCommands( client ) {
    const files = await globPromise( `${process.cwd()}/commands/*/*.js` );
    files.map( file => {
        const command = require( file );
        client.commands.set( command.data.name, command );
    });
    const plugins = await globPromise( `${process.cwd()}/plugins/*/commands/*.js` );
    plugins.map( file => {
        const command = require( file );
        client.commands.set( command.data.name, command );
    });
}


/**
 * Load the events in the client.
 * @param {Client} client The client of the bot.
 */
async function loadEvents( client ) {
    const files = await globPromise( `${process.cwd()}/events/*.js` );
    files.map( file => {
        const event = require( file );
        if ( event.once )
            client.once( event.name, ( ...args ) => event.execute( ...args, client ) );
        else
            client.on( event.name, ( ...args ) => event.execute( ...args, client ) );
    });
}


/**
 * Load the commands into the specified guild.
 * @param {Client} client The client of the bot.
 * @param {string} guildId The guild's ID.
 */
async function loadCommandsToGuild( client, guildId ) {
    const commandsArray = [];
    client.commands.map( command => {
        commandsArray.push( command.data.toJSON() );
    });

    // Retirer la condition pour charger en prod
    // if(guildId === "724408079550251080"){
    //     await client.guilds.cache.get( guildId ).commands.set([]);
    //     return
    // }

    await client.guilds.cache.get( guildId ).commands.set( commandsArray );
    console.log( `Loaded application (/) commands to the guild! (${guildId})` );
}


/**
 * Used to load the commands in all the guids where the client is present.
 * @param {Client} client The bot's client.
 */
async function loadCommandToAllGuilds( client ) {
    client.guilds.cache.forEach( (value, key) => {
        loadCommandsToGuild( client, key )
    });
    // console.log( "Loaded application (/) commands to the guild!\nThe commands may take up to an hour before being available on the guilds." );
}


/**
 * Load toutes les invitations de tous les serveurs dans la base de données.
 * @param {Client} client The bot's client.
 */
async function loadInvites( client ) {
    // Loop over all the guilds
    client.guilds.cache.forEach(async (guild) => {
        const setup = await getSetupData(guild.id, "subgiving")
        if(setup != undefined)
            if(Subgiving == false || setup[0] == false)
                return;
        // Fetch all Guild Invites
        const firstInvites = await guild.invites.fetch();
        // Set the key as Guild ID, and create a map which has the invite code, and the number of uses
        client.invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
    });
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    loadPlugins,
    loadCommands,
    loadEvents,
    loadCommandsToGuild,
    loadCommandToAllGuilds,
    loadInvites
}
