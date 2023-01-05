/* eslint-disable no-case-declarations */
/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'setup'.
 *      Allow admin to setup the JSON configuration file.
 */

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
    .setDefaultPermission(false)
    

    globPromise( `${process.cwd()}/plugins/*/commands/setup.js` ).then((pluginsSetup) => {
        pluginsSetup.map(file => {
            const setup = require( file );
            setup.addSetupCommand(slashCommand)
        });
    });

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'setup'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    
    const pluginsSetup = await globPromise( `${process.cwd()}/plugins/*/commands/setup.js` );
    pluginsSetup.map(file => {
        const setup = require( file );
        setup.execute(interaction)
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
