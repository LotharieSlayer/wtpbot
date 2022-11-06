/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'report'.
 *      Permet le signalement et le report des utilisateurs.
 */

const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const { reports } = require("../../utils/enmapUtils");
const {
    ApplicationCommandType,
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require("discord.js");
const { Report } = require("../../files/modules");
const { reportWorker } = require("../../services/report/report");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const cmCommand = new ContextMenuCommandBuilder()
    .setName("Signaler cet utilisateur")
    .setType(ApplicationCommandType.User)

const modal = new ModalBuilder()
    .setCustomId("reportModalUser")
    .setTitle("Signaler l'utilisateur");

// Add components to modal

// Create the text input components
const reportTitle = new TextInputBuilder()
    .setCustomId("reportTitle")
    // The label is the prompt the user sees for this input
    .setLabel("Résumé du signalement")
    .setPlaceholder(
        "Donnez un résumé de l'action commise, ex : 'Harcèlement' ou 'Propos racistes'"
    )
    .setMinLength(5)
    .setMaxLength(240)
    // Short means only a single line of text
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

const reportDescription = new TextInputBuilder()
    .setCustomId("reportDescription")
    .setLabel("Description et détails du signalement")
    .setPlaceholder(
        "Donnez une description détaillée, ex : 'Cet utilisateur m'a insulté pour la raison suivante...'"
    )
    .setMinLength(5)
    // Paragraph means multiple lines of text.
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);
// An action row only holds one text input,
// so you need one action row per text input.
const firstActionRow = new ActionRowBuilder().addComponents(reportTitle);
const secondActionRow = new ActionRowBuilder().addComponents(reportDescription);

// Add inputs to the modal
modal.addComponents(firstActionRow, secondActionRow);

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'report'
 * @param {ContextMenuInteraction} interaction L'interaction générée par l'exécution de la commande.
 */
async function execute(interaction) {
    if (Report == false) return;
    const user = await interaction.guild.members.fetch(interaction.targetId);

    reports.set((reports.count + 1).toString(), {
        date: Date.now().toString(),
        message: null,
        modAssignee: null,
        targetUser: user.id,
        reporter: interaction.member.id,
        link: null,
        status: "not achieved",
        reporterMessage: {
            title: null,
            description: null,
        },
        embeds: {
            thread: {
                threadGuildId: interaction.guild.id,
                threadChannelId: null,
                threadMessageId: null,
            },
            output: {
                outputGuildId: null,
                outputChannelId: null,
                outputMessageId: null,
            }
        }
    });

    await interaction.showModal(modal);
}

async function handleResponseUser(interaction) {

    let cpt = 0;
    while (
        reports.get((reports.count - cpt).toString()).reporter !=
        interaction.member.id
    )
        cpt++;

    const report = reports.get((reports.count - cpt).toString());
    report.reporterMessage.title =
        interaction.fields.getTextInputValue("reportTitle");
    report.reporterMessage.description =
        interaction.fields.getTextInputValue("reportDescription");
    report.status = "open";
    reports.update((reports.count - cpt).toString(), report);

    const threadUrl = await reportWorker(interaction, report, cpt);

    await interaction.reply({
        content: `Report envoyé avec succès !\nVous pouvez suivre le report ici dans ce thread privé avec les modérateurs du serveur : ${threadUrl}\nNote : En signalant l'utilisateur de cette façon il ne vous a pas été permis de mettre des preuves ou des pièces jointes, vous pouvez les ajouter dans le thread privé qu'on vient de vous créer.`,
        ephemeral: true,
    });
    return;
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: cmCommand,
    execute,
    handleResponseUser,
};
