/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'setup'.
 *      Allow admin to setup the JSON configuration file.
 */

/*      IMPORTS      */
const path = require('path');
const { SlashCommandBuilder } = require("@discordjs/builders");

const { glob } = require( "glob" );

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("setup")
    .setDescription("[setup] Setup une fonctionnalité du bot sur ce serveur.")
    .setDefaultPermission(false)
    

    glob( `${process.cwd()}/plugins/*/commands/setup.js` ).then((pluginsSetup) => {
        pluginsSetup.map(file => {
            file = path.resolve(file);
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
async function execute(interaction, client) {
    
    const pluginsSetup = await glob( `${process.cwd()}/plugins/*/commands/setup.js` );
    pluginsSetup.map(file => {
        file = path.resolve(file);
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
