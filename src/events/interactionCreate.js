/**
 * @author Lothaire Guée
 * @description
 *		It manage the slash commands.
 */


const { InteractionType } = require( "discord.js" );


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
function execute( interaction, client ) {

	if ( interaction.type === InteractionType.ApplicationCommand ) {
		client.commands.get( interaction.commandName ).execute( interaction );
	}

	if ( interaction.isContextMenuCommand() ) {
		client.commands.get( interaction.commandName ).execute( interaction );
	}

    if ( interaction.isButton() ){
		if (client.services.contest) { 
			const { contestInteractionButton } = require("../services/contest/contest");
			contestInteractionButton(interaction, client);
		}
	}
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "interactionCreate",
	execute
}