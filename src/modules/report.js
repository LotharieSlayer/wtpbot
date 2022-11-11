/**
 * @author Lothaire Guée
 * @description
 * 		Event contenant le restart et le process du service contest.
 */

/*      AUTHORISATION      */
const {
    ButtonStyle,
    ChannelType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
} = require("discord.js");
const { Report } = require("../files/modules.js");

/*      IMPORTS      */
const {
    reports,
    setupReport,
    setupSupport,
} = require("../utils/enmapUtils");

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
async function reportAssignButton(interaction, client) {
    if (Report == false) return;

    let cpt = 0;
    while (
        reports.get((reports.count - cpt).toString()).embeds.output
            .outputMessageId != interaction.message.id
    )
        cpt++;

    const report = reports.get((reports.count - cpt).toString());
    report.modAssignee = interaction.user.id;
    reports.update((reports.count - cpt).toString(), report);

    // Update output embed
    const embed = interaction.message.embeds[0];
    embed.fields.push({
        name: "Modérateur assigné",
        value: `<@${interaction.user.id}>`,
    });
    interaction.message.edit({ embeds: [embed] });

    // Update thread embed
    const thread = await client.channels.fetch(
        report.embeds.thread.threadChannelId
    );
    const threadEmbed = await thread.messages.fetch(
        report.embeds.thread.threadMessageId
    );
    threadEmbed.embeds[0].fields.push({
        name: "Modérateur assigné",
        value: `<@${interaction.user.id}>`,
    });
    thread.messages.cache
        .get(report.embeds.thread.threadMessageId)
        .edit({ embeds: [threadEmbed.embeds[0]] });

    // Disable assign button
    interaction.update({
        components: [
            {
                components: [
                    {
                        type: 2,
                        style: ButtonStyle.Primary,
                        emoji: "👤",
                        label: `Assigné à ${interaction.user.username}`,
                        custom_id: "assignReport",
                        disabled: true,
                    },
                    {
                        type: 2,
                        style: ButtonStyle.Success,
                        emoji: "🔒",
                        label: "Fermer le ticket",
                        custom_id: "closeReport",
                    },
                    {
                        type: 2,
                        style: ButtonStyle.Link,
                        label: "Lien du thread",
                        url: `https://discord.com/channels/${report.embeds.thread.threadGuildId}/${report.embeds.thread.threadChannelId}/${report.embeds.thread.threadMessageId}`,
                        emoji: "🔗",
                    },
                ],
            },
        ],
    });
}

async function reportCloseButton(interaction, client) {
    if (Report == false) return;

    let cpt = 0;
    while (
        reports.get((reports.count - cpt).toString()).embeds.output
            .outputMessageId != interaction.message.id
    )
        cpt++;

    const report = reports.get((reports.count - cpt).toString());
    report.status = "closed";
    reports.update((reports.count - cpt).toString(), report);

    // Update thread embed
    const thread = await client.channels.fetch(
        report.embeds.thread.threadChannelId
    );
    const threadEmbed = await thread.messages.fetch(
        report.embeds.thread.threadMessageId
    );
    threadEmbed.embeds[0].fields.push({
        name: "Statut",
        value: "Fermé",
    });
    thread.messages.cache
        .get(report.embeds.thread.threadMessageId)
        .edit({ embeds: [threadEmbed.embeds[0]] });

    // Disable close button
    interaction.update({
        components: [
            {
                components: [
                    {
                        type: 2,
                        style: ButtonStyle.Primary,
                        emoji: "👤",
                        label: `Assigné à ${interaction.user.username}`,
                        custom_id: "assignReport",
                        disabled: true,
                    },
                    {
                        type: 2,
                        style: ButtonStyle.Success,
                        emoji: "✅",
                        label: "Ticket Fermé",
                        custom_id: "closeReport",
                        disabled: true,
                    },
                    {
                        type: 2,
                        style: ButtonStyle.Link,
                        label: "Lien du thread",
                        url: `https://discord.com/channels/${report.embeds.thread.threadGuildId}/${report.embeds.thread.threadChannelId}/${report.embeds.thread.threadMessageId}`,
                        emoji: "🔗",
                    },
                ],
            },
        ],
    });

    // Archive thread
    thread.setArchived(true);
}

async function reportWorker(interaction, report, cpt) {
    const reportSetup = setupReport.get(interaction.guild.id);
    if (reportSetup[0] == undefined) {
        await interaction.reply({
            content: `Impossible de finaliser le processus, l'envoi c'est bien effectué mais le propriétaire du serveur n'a pas configuré où se trouvait les threads privés !`,
            ephemeral: true,
        });
        return;
    }

    // Création du thread
    const targetMember = await interaction.guild.members.fetch(
        report.targetUser
    );
    const threadChannel = await interaction.guild.channels.fetch(
        reportSetup[0]
    );
    const thread = await threadChannel.threads.create({
        name: `Signalement de ${targetMember.user.username}`,
        autoArchiveDuration: 4320,
        reason: `Signalement de ${targetMember.user.username} pour ${report.reporterMessage.title}`,
        type: ChannelType.PrivateThread,
    });

    // Compte le nombre de signalements du membre pour l'embed suivant
    let nbSignalements = 0;
    reports.forEach((value) => {
        if (value.targetUser === report.targetUser) nbSignalements += 1;
    });

    // EmbedBuilder
    const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle(`Report #${reports.count} - ${report.reporterMessage.title}`)
        .setURL(report.link)
        .setAuthor({
            name: `${targetMember.user.username} (${targetMember.user.id})`,
            iconURL: targetMember.user.avatarURL(),
        })
        .setDescription(report.reporterMessage.description)
        .addFields(
            {
                name: "Liens",
                value: `[Preuve](${report.link})\n\`${report.link} (Anti-hack)\`\n[Thread privé](${thread.url})`,
            },
            {
                name: "Nombre de signalements à ce jour",
                value: `${nbSignalements}`,
            }
        )
        .setTimestamp()
        .setFooter({
            text: `par ${interaction.member.user.username}`,
            iconURL: interaction.member.user.avatarURL(),
        });

    await thread.setInvitable(false);
    await thread
        .send({
            content: `${interaction.member}`,
        })
        .then(async (message) => {
            await message.delete();
        });
    await thread.send({ embeds: [embed] }).then(async (message) => {
        report.embeds.thread.threadChannelId = thread.id;
        report.embeds.thread.threadMessageId = message.id;
        reports.update((reports.count - cpt).toString(), report);
    });

    await thread.send(
        "Bienvenue dans le thread privé de votre signalement !\n" +
            "Merci de patienter, un modérateur va étudier votre signalement et peut-être en parler avec vous.\n" +
            "Si cela prends trop de temps, vous pouvez mentionner un des modérateurs connecté dans ce thread pour l'inviter.\n"
    );

    // Boutons pour l'embed du serveur staff
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("assignReport")
            .setEmoji("👋")
            .setLabel("Prendre le ticket")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("closeReport")
            .setEmoji("🔒")
            .setLabel("Fermer le ticket")
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setEmoji("🔗")
            .setLabel("Lien du thread")
            .setStyle(ButtonStyle.Link)
            .setURL(thread.url)
    );

    // Envoie de l'embed dans le serveur staff
    const outputGuild = await interaction.client.guilds.fetch(reportSetup[1]);
    const outputChannel = await outputGuild.channels.fetch(reportSetup[2]);
    await outputChannel
        .send({ embeds: [embed], components: [row] })
        .then(async (message) => {
            report.embeds.output.outputGuildId = outputGuild.id;
            report.embeds.output.outputChannelId = outputChannel.id;
            report.embeds.output.outputMessageId = message.id;
            reports.update((reports.count - cpt).toString(), report);

            // Création du thread pour le staff
            await outputChannel.threads.create({
                name: `Report n°${reports.count - cpt} - Signalement de ${
                    targetMember.user.username
                }`,
                autoArchiveDuration: 4320,
                reason: `Signalement de ${targetMember.user.username} pour ${
                    report.reporterMessage.title
                } (Report #${reports.count - cpt})`,
                type: ChannelType.PublicThread,
                startMessage: message,
            });
        });
    return thread.url;
}

async function supportNotify(thread, client) {
    const support = setupSupport.get(thread.guild.id);
    if (support == undefined) return;
    if (thread.parentId === support[0]) {

        // build component open link
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji("🔗")
                .setLabel("Lien du post")
                .setStyle(ButtonStyle.Link)
                .setURL(thread.url)
        );

        // fetch ownerId of this thread
        const threadOwner = await thread.guild.members.fetch(thread.ownerId);

        // build embed
        const embed = new EmbedBuilder()
            .setColor("#2f3136")
            .setTitle(`Nouveau ticket dans le support`)
            .setURL(thread.url)
            .setAuthor({
                name: `${thread.name}`,
                iconURL: thread.guild.iconURL(),
            })
            .setDescription(
                `Un nouveau ticket de support a été ouvert avec le tag ${thread.appliedTags[0]} !`
            )
            .setTimestamp()
            .setFooter({
                text: `par ${threadOwner.user.username}`,
                iconURL: threadOwner.user.avatarURL(),
            });

        // Envoie de l'embed dans le serveur staff
        const outputGuild = await client.guilds.fetch(support[1]);
        const outputChannel = await outputGuild.channels.fetch(support[2]);
        await outputChannel.send({ embeds: [embed], components: [row] });
    }
}

module.exports = {
    reportAssignButton,
    reportCloseButton,
    reportWorker,
    supportNotify,
};
