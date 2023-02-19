/**
 * @author Lothaire Guée
 * @author Benjamin Guirlet
 * @description
 * 		The file contains the functions to load the commands and events in the bot at startup.
 */


// Used to get all the directory of the commands and events.
const { promisify } = require( "util" );
const { glob } = require( "glob" );
const globPromise = promisify( glob );
const { MongoClient, ServerApiVersion } = require('mongodb');

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

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
        let fileName = file.split("/");
        fileName = fileName[fileName.length - 1];
        if(fileName === "setup.js" || fileName === "setup" ) return;
        const command = require( file );
        client.commands.set( command.data.name, command );
    });
    const pluginsFolder = await globPromise( `${process.cwd()}/plugins/*` );
    pluginsFolder.map( file => {
        file = file.split("/");
        file = file[file.length - 1];
        console.log("[Plugin] " + file);
    })
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
    const pluginsFiles = await globPromise( `${process.cwd()}/plugins/*/events/*.js` );
    pluginsFiles.map( file => {
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

// Connect to the database MongoDB
async function connectToDatabase(client) {
    client.mongo = new MongoClient(process.env.MONGO_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    client.mongo.wtpbot = client.mongo.db('wtpbot');
    client.mongo.francebot = client.mongo.db('francebot');
    client.mongo.commons = client.mongo.db('commons');

    console.log("Connected to MongoDB database")
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    loadCommands,
    loadEvents,
    loadCommandsToGuild,
    loadCommandToAllGuilds,
    connectToDatabase
}
