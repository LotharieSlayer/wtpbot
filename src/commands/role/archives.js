/**
 * @author Lothaire Guée
 * @description
 *      Contains the command 'archives'.
 *      Allows anyone to get a "Bibliothécaire"
 *      role to access to some archives.
 */

/*      IMPORTS      */
const { SlashCommandBuilder } = require("@discordjs/builders");

/*      AUTHORISATION      */
const { Archives } = require("../../files/modules.js");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("archives")
    .setDescription("[role] Activer/Désactiver l'accès aux archives.");

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the command 'ping'
 * @param {CommandInteraction} interaction The interaction generated by the command's execution.
 */
async function execute(interaction) {
    if (Archives == false) return;

    const { getSetupData } = require("../../utils/enmapUtils");
    const ARCHIVES_ID = await getSetupData(interaction.guild.id, "archives");

    const member = interaction.member;
    let archivesRole = interaction.guild.roles.cache.get(ARCHIVES_ID);

    if (member.roles.cache.some((role) => role.id === ARCHIVES_ID)) {
        member.roles.remove(archivesRole);
        await interaction.reply({
            content: `Vous n'avez désormais plus accès aux archives !`,
            ephemeral: true,
        });
    } else {
        member.roles.add(archivesRole);
        await interaction.reply({
            content: `Vous avez désormais accès aux archives !`,
            ephemeral: true,
        });
    }
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
