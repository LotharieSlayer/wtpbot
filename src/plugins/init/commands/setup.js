/* eslint-disable no-case-declarations */
/**
 * @author Lotharie
 * @description
 *      Contient la commande 'setup'.
 *      Allow admin to setup the JSON configuration file.
 */

import { Bot } from "@src/lib/bot";

/*      IMPORTS      */
const { SlashCommandBuilder } = require("@discordjs/builders");

const { promisify } = require( "util" );
const { glob } = require( "glob" );
const globPromise = promisify( glob );

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("setup")
    .setDescription("[setup] Setup une fonctionnalité du bot sur ce serveur.")
    .setDefaultPermission(false);
    
	
	globPromise( `${__dirname}/../../*/commands/setup.js` ).then(async (pluginsSetup) => {
		await pluginsSetup.map(async file => {
			if(file.includes("plugins/init")) return;
			const setup = require( file );
			await setup.addSetupCommand(slashCommand);
		});
		Bot.instance.commands.set(slashCommand.name, {data: slashCommand, execute});
	});


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'setup'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction, client) {
    
    const pluginsSetup = await globPromise( `${__dirname}/../../*/commands/setup.js` );
    pluginsSetup.map(file => {
		if(file.includes("plugins/init")) return;
        const setup = require( file );
        setup.execute(interaction, client)
    });

    switch (interaction.options._subcommand) {
        default:
            break;
    }
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
