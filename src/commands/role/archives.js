/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'archives'.
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
 * Fonction appelé quand la commande est 'archives'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    if (Archives == false) return;

    const { getSetupData } = require("../../utils/enmapUtils");
    const ARCHIVES_ID = await getSetupData(interaction.guild.id, "archives");
    
    if (ARCHIVES_ID === null || ARCHIVES_ID === undefined){
        await interaction.reply({
            content: `Désolé, mais l'administrateur n'a pas setup le rôle des archives pour ce serveur !`,
            ephemeral: true,
        });
        return;
    }

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
