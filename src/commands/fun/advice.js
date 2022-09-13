/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande "advice"
 *      Réponds un des nombreux conseils pour mieux utiliser le serveur.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
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
    
    // Génère un nombre random entre 1 et 100
    const randomValue = Math.floor(Math.random() * 100 + 1);
    if (randomValue > 1) return;

    // random sur advices.length
    // peut etre enmapRandom ou enmapRandomKey
    // ensuite
    await interaction.reply({content: "conseil", ephemeral: true})

}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
