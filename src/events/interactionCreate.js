/**
 * @author Lothaire Guée
 * @description
 *		It manage the slash commands.
 */

const { InteractionType } = require("discord.js");
const { handleResponse } = require("../commands/report/cmReport");
const { handleResponseUser } = require("../commands/report/cuReport");
const { reportAssignButton, reportCloseButton } = require("../modules/report");
/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * The handler for the event 'interactionCreate'.
 * It is called whenever an interaction is created.
 * It can be a button pressed, a slash command executed, etc.
 * @param {CommandInteraction} interaction The interaction that triggered the event.
 * @param {Client} client The client that created the interaction.
 */
function execute(interaction, client) {
    if (interaction.type === InteractionType.ApplicationCommand) {
        client.commands.get(interaction.commandName).execute(interaction);
    }
    if (interaction.type === InteractionType.MessageComponent) {

        if (interaction.customId === "assignReport") {
            reportAssignButton(interaction, client);
        }
        if (interaction.customId === "closeReport") {
            reportCloseButton(interaction, client);
        }
        
    }
    
    if (interaction.type === InteractionType.ModalSubmit) {
        if (interaction.customId === "reportModal") handleResponse(interaction);
        if (interaction.customId === "reportModalUser") handleResponseUser(interaction);
    } else return;

    if (interaction.isContextMenuCommand()) {
        client.commands.get(interaction.commandName).execute(interaction);
    }
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    name: "interactionCreate",
    execute,
};
