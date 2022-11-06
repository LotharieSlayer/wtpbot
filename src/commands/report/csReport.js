/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'report'.
 *      Permet le signalement et le report des utilisateurs.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { reports } = require("../../utils/enmapUtils");
const { Report } = require("../../files/modules");
const { reportWorker } = require("../../services/report/report");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
.setName("report")
.setDescription("[report] Signaler une personne.")
.addStringOption(option =>
    option.setName("raison")
        .setDescription("Raison du signalement")
        .setRequired(true)
)
.addStringOption(option =>
    option.setName("description")
        .setDescription("Description du signalement")
        .setRequired(true)
)
.addUserOption((option) =>
    option
        .setName("user")
        .setDescription("Entrez l'utilisateur à signaler.")
        .setRequired(true)
)
.addAttachmentOption((option) =>
    option
        .setName("attachment")
        .setDescription("Ajoutez une pièce jointe.")
        .setRequired(true)
)

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'report'
 * @param {ContextMenuInteraction} interaction L'interaction générée par l'exécution de la commande.
 */
async function execute(interaction) {
    if (Report == false) return;

    const raison = interaction.options.getString("raison");
    const description = interaction.options.getString("description");
    const user = interaction.options.getUser("user");
    const attachment = interaction.options.getAttachment("attachment");

    // On récupère les données du serveur pour les mettre dans la base de données
    reports.set((reports.count + 1).toString(), {
        date: Date.now().toString(),
        message: null,
        modAssignee: null,
        targetUser: user.id,
        reporter: interaction.member.id,
        link: attachment.url,
        status: "open",
        reporterMessage: {
            title: raison,
            description: description,
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

    // On get le signalement de la base de données pour le mettre dans la variable
    let cpt = 0;
    while (
        reports.get((reports.count - cpt).toString()).reporter !=
        interaction.member.id
    )
        cpt++;

    const report = reports.get((reports.count - cpt).toString());

    const threadUrl = await reportWorker(interaction, report, cpt);

    await interaction.reply({
        content: `Report envoyé avec succès !\nVous pouvez suivre votre signalement ici dans ce thread privé avec les modérateurs du serveur : ${threadUrl}\nNote : Si vous n'avez pas eu assez d'une pièce jointe pour votre signalement, vous pouvez aussi ajouter des preuves et/ou pièces jointes dans le thread privé qu'on vient de vous créer.`,
        ephemeral: true,
    });
    return;
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
