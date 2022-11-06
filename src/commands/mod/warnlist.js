/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'warnlist'.
 *      Lister les différents warns existants et leur sanctions associées.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const JSONPenalties = require(`${process.cwd()}/files/sanctions.json`);

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("warnlist")
    .setDescription(
        "[mod] Obtenir les sanctions liées au /warn."
    )
    .setDefaultPermission(false);


    
/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */


/**
 * Fonction appelé quand la commande est 'warnlist'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    
    const embedMessage = new EmbedBuilder()
    .setTitle("Tous les warns (⬇️)")
    .setDescription("ℹ️ Sanctions attribués allant de haut en bas et de la forme (jour:heure:minute)")
    .setColor(0xffcc4d)

    for(let raison in JSONPenalties.enum){
        for (let sanction of JSONPenalties.sanctions) {
            for (let i = 0; i < sanction.reasons.length; i++) {
                if (sanction.reasons[i] === raison) {
                    let values = JSON.stringify(sanction.values)
                    values = values.replace("[", "")
                    values = values.replace("]", "")
                    values = values.replaceAll("\"", "")
                    values = values.replaceAll(",", "\n")
                    values = values.toUpperCase()
                    embedMessage.addFields({name:`${JSONPenalties.enum[raison].emoji} ${JSONPenalties.enum[raison].name}`, value: values, inline: true });
                }
            }
            
        }

    }

    await interaction.reply({embeds:[embedMessage], ephemeral: true});
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
