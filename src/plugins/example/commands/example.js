/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'ping'.
 *      Pong the user.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("example_plugin")
    .setDescription(
        "[other] Donne la latence du bot et de l'API Discord en millisecondes."
    )
    .setDefaultPermission(false);

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'ping'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {

    await interaction.reply({
        content: `🏓 **PING**
		La latence du bot est de ${interaction.createdTimestamp - Date.now()}ms.
		Latence API Discord : ${Math.round(interaction.client.ws.ping)}ms`,
        ephemeral: false,
    });
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
