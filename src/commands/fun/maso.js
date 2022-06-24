/**
 * @author Dayamond
 * @author Lothaire Guée
 * @description
 *      Contains the command 'maso'.
 *      Rolling a dice, mute the user who execute the command if the dice is 1.
 */

// IMPORTS
const { SlashCommandBuilder } = require("@discordjs/builders");

// COMMANDE BUILD


/////////////////////////////////////////

// METTRE A JOUR ENTRE 12H ET 4 JOURS

/////////////////////////////////////////

const slashCommand = new SlashCommandBuilder()
    .setName("maso")
    .setDescription(
        "[fun] 1 chance sur 6 de se faire mute (7j max). Prendrez-vous ce risque ?"
    );


const timeOutList = [
    "fallait pas faire le malin.",
    "cheh !",
    "bah alors on parle plus maintenant ?",
    "tu t'es bien fais baisé !",
    "bon chien.",
    "ça c'est mon mute enculé de ta mère ! PAPAPAAAAA !",
    "hiihihihihihihihihiihihiii !",
    "même sucer les modos ne suffira pas !",
    "retournes chez ta mère !",
];

const savedList = [
    "on se reverra.",
    "le Karma va retomber.",
    "tout va bien, petit tout va bien.",
    "un repos bien merité.",
    "tu peux festoyer ça !",
    "tu peux gambader dans le pré, sans te soucier du temps qu'il passe.",
];

// FUNCTION

async function execute(interaction) {

    if (
        interaction.member.permissions.has("ADMINISTRATOR") ||
        interaction.guild.ownerID === interaction.member.id
    ) {
        return interaction.reply({
            content:
                "Vous êtes un administrateur, vous ne pouvez pas vous mute.",
            ephemeral: false,
        });
    }

    const randomTimeOut = Math.floor(Math.random() * timeOutList.length);
    const randomSaved = Math.floor(Math.random() * savedList.length);
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    const randomDays = Math.floor(Math.random() * 7) + 1;

    if (randomNumber === 1) {
        await interaction.member.timeout(
            randomDays * 24 * 60 * 60 * 1000,
            "Mute via /maso"
        );
        return interaction.reply({
            content: `<@${interaction.member.id}>, ${timeOutList[randomTimeOut]} T'es mute **${randomDays}J** !`,
            ephemeral: false,
        });
    }

    return interaction.reply({
        content: `<@${interaction.member.id}>, ${savedList[randomSaved]}`,
        ephemeral: false,
    });
}

// EXPORTS

module.exports = {
    data: slashCommand,
    execute,
};
