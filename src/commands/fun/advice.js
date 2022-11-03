/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande "advice"
 *      Réponds un des nombreux conseils pour mieux utiliser le serveur.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { Advices } = require("../../files/modules");
const { advices } = require("../../utils/enmapUtils");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("advice")
    .setDescription(
        "[fun] Obtenir un conseil pour mieux utiliser le serveur."
    );

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est "advice"
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {

    if(Advices == false) return;
    const advice = await advices.randomKey();
    await interaction.reply({content: advice, ephemeral: true})
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
