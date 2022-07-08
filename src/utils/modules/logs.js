/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to logs mod actions in specifics channel.
 *
 */

/*      AUTHORISATION      */
const { Logs } = require("../../files/modules.js");

/*      IMPORTS      */
const { MessageEmbed } = require("discord.js");
const { getSetupData } = require("../../utils/enmapUtils");
const fs = require("fs");

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

async function timeoutLog(oldMember, newMember, client) {
    if (Logs == false) return;

    const LOGS_ID = await getSetupData(newMember.guild.id, "logs");
    const logChannel = await client.channels.cache.find(
        (channel) => channel.id === LOGS_ID
    );

    if (
        oldMember.communicationDisabledUntilTimestamp !=
            newMember.communicationDisabledUntilTimestamp ||
        (newMember.communicationDisabledUntilTimestamp ?? Infinity) < Date.now()
    ) {
        let auditLogs = await oldMember.guild.fetchAuditLogs({
            limit: 5,
            type: "MEMBER_UPDATE",
        });
        let timeoutFirst = auditLogs.entries.first();

        let dateNow = new Date();
        if (
            newMember.communicationDisabledUntil != null &&
            newMember.communicationDisabledUntil > dateNow
        ) {
            const timeoutEmbed = new MessageEmbed()
                .setColor("#e15dd9")
                .setAuthor(
                    `┃ ${newMember.user.username} vient d'être mute.`,
                    newMember.user.avatarURL()
                )
                .setDescription(`(${newMember.user.id})`)
                .setTimestamp(newMember.communicationDisabledUntil)
                .setFooter(
                    `Par ${timeoutFirst.executor.username} jusqu'à`,
                    timeoutFirst.executor.avatarURL()
                );
            if (timeoutFirst.reason){
                timeoutEmbed.setDescription(
                    `(${newMember.user.id})\n${timeoutFirst.reason}\n`
                );
                if(timeoutFirst.reason.startsWith("**Warn :**"))
                    timeoutEmbed.setColor("#ffcc4d");
            }

            logChannel.send({
                embeds: [timeoutEmbed],
            });
        }
    }
}

async function kickLog(member, client) {
    if (Logs == false) return;

    const LOGS_ID = await getSetupData(member.guild.id, "logs");
    const logChannel = await client.channels.cache.find(
        (channel) => channel.id === LOGS_ID
    );
    let kickEmbed;

    kickEmbed = new MessageEmbed()
        .setColor("#e15dd9")
        .setAuthor(
            `┃ ${member.user.username} (${member.id}) a quitté le serveur.`,
            member.user.avatarURL()
        )
        .setTimestamp(new Date())
        .setFooter(`WhatThePhoqueBot`, client.user.avatarURL());

    logChannel.send({
        embeds: [kickEmbed],
    });
}

async function banLog(guildBan, banned, client) {
    if (Logs == false) return;
    const LOGS_ID = await getSetupData(guildBan.guild.id, "logs");
    const logChannel = await client.channels.cache.find(
        (channel) => channel.id === LOGS_ID
    );

    let user = guildBan.user;
    let reason = guildBan.reason;

    let banEmbed = new MessageEmbed()
    
    banEmbed.setColor("#e15dd9");

    if (banned) {
        let auditLogs = await guildBan.guild.fetchAuditLogs({
            limit: 5,
            type: "MEMBER_BAN_ADD",
        });
        let banFirst = auditLogs.entries.first();
        banEmbed.setFooter(
            `Par ${banFirst.executor.username}`,
            banFirst.executor.avatarURL()
        );
        banEmbed.setAuthor(
            `┃ ${user.username} vient d'être ban.`,
            user.avatarURL()
        );

        if (reason){
            banEmbed.setDescription(`(${user.id})\n${reason}\n`);
            if(reason.startsWith("**Warn :**"))
                banEmbed.setColor("#ffcc4d");
        }

        logChannel.send({
            embeds: [banEmbed],
        });
    }
}

async function userLog(member) {
    const path = `${process.cwd()}/files/userEntries.log`;

    const memberLine = `${member.id} - ${new Date()} (${Date.now()})\n`;
    const startingFile =
        "╭――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――╮\n" +
        "|   ID MEMBER      |                   DATE                                            (timestamp)   |\n" +
        "╰――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――╯\n\n" +
        memberLine;

    if (fs.existsSync(path)) {
        fs.appendFile(`${path}`, memberLine, function (err) {
            if (err) throw err;
        });
    } else {
        fs.appendFile(`${path}`, startingFile, function (err) {
            if (err) throw err;
        });
    }
}

module.exports = {
    timeoutLog,
    kickLog,
    banLog,
    userLog,
};
