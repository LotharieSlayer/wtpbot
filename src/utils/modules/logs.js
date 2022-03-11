/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to logs mod actions in specifics channel.
 *
 */


/*      AUTHORISATION      */
const { Mod } = require('../../files/modules.js');

/*      IMPORTS      */
const { MessageEmbed } = require("discord.js");
const { getSetupData } = require("../../utils/enmapUtils")

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
async function timeoutLog(oldMember, newMember, client){
    if(Mod == false) return;

    let timeoutEmbed;
    const LOGS_ID = await getSetupData(newMember.guild.id, "logs")
    const logChannel = await client.channels.cache.find(channel => channel.id === LOGS_ID)


    // TIMEOUT
    // console.log(".")
    // console.log(oldMember.communicationDisabledUntil)
    // console.log(newMember.communicationDisabledUntil)
    // console.log(new Date())
    
    if (oldMember.communicationDisabledUntilTimestamp != newMember.communicationDisabledUntilTimestamp ||
        (newMember.communicationDisabledUntilTimestamp ?? Infinity) < Date.now()) {

        let auditLogs = await oldMember.guild.fetchAuditLogs({ limit: 5, type: 'MEMBER_UPDATE' });
        let timeoutFirst = auditLogs.entries.first();


        let dateNow = new Date()
        if(newMember.communicationDisabledUntil != null && newMember.communicationDisabledUntil > dateNow){

            timeoutEmbed = new MessageEmbed()
                .setColor('#e15dd9')
                .setAuthor( `┃ ${newMember.user.username} vient d'être mute.`, newMember.user.avatarURL() )
                .setDescription(`(${newMember.user.id})`)
                .setTimestamp(newMember.communicationDisabledUntil)
                .setFooter(`Par ${timeoutFirst.executor.username} jusqu'à`, timeoutFirst.executor.avatarURL())
          if ( timeoutFirst.reason ) timeoutEmbed.setDescription( `${timeoutFirst.reason} (${newMember.user.id})` );

        }
        else {
            timeoutEmbed = new MessageEmbed()
                .setColor('#e15dd9')
                .setDescription(`(${newMember.user.id})`)
                .setAuthor( `┃ ${newMember.user.username} vient d'être unmute.`, newMember.user.avatarURL() )
                .setFooter(`Par ${timeoutFirst.executor.username}`, timeoutFirst.executor.avatarURL())


            if ( timeoutFirst.reason ) timeoutEmbed.setDescription( `**Raison :** ${timeoutFirst.reason}` );

        }

        logChannel.send({embeds:[timeoutEmbed]})

    }

}

async function kickLog(member, client){
    if(Mod == false) return;

    const LOGS_ID = await getSetupData(member.guild.id, "logs")
    const logChannel = await client.channels.cache.find(channel => channel.id === LOGS_ID)
    let kickEmbed;
    
    kickEmbed = new MessageEmbed()
        .setColor('#e15dd9')
        .setAuthor( `┃ ${member.user.username} (${member.id}) a quitté le serveur.`, member.user.avatarURL() )
        .setTimestamp(new Date())
        .setFooter(`WhatThePhoqueBot`, client.user.avatarURL())

    if ( reason ) kickEmbed.setDescription( reason );

    logChannel.send({embeds:[kickEmbed]})

}


/**
 * The log sent when an user is banned/unbanned.
 * @param {User} user the user that was banned/unbanned.
 * @param {string} reason The reason of the ban if it is a ban.
 * @param {boolean} banned Indicates if the user was banned or unbanned.
 *                          true for banned, false for unbanned.
 */
async function banLog( guildBan, banned, client )
{
    if(Mod == false) return;
    const LOGS_ID = await getSetupData(guildBan.guild.id, "logs")
    const logChannel = await client.channels.cache.find(channel => channel.id === LOGS_ID)

    let user = guildBan.user;
    let reason = guildBan.reason;

    let banEmbed = new MessageEmbed()
        .setColor('#e15dd9')
    
    if ( banned ){
        let auditLogs = await guildBan.guild.fetchAuditLogs({ limit: 5, type: 'MEMBER_BAN_ADD' });
        let banFirst = auditLogs.entries.first();
        banEmbed.setFooter(`Par ${banFirst.executor.username}`, banFirst.executor.avatarURL())
        banEmbed.setAuthor( `┃ ${user.username} (${user.id}) vient d'être ban.`, user.avatarURL() )
    }
    else {
        let auditLogs = await guildBan.guild.fetchAuditLogs({ limit: 5, type: 'MEMBER_BAN_REMOVE' });
        let unbanFirst = auditLogs.entries.first();
        banEmbed.setFooter(`Par ${unbanFirst.executor.username}`, unbanFirst.executor.avatarURL())
        banEmbed.setAuthor( `┃ ${user.username} (${user.id}) vient d'être unban.`, user.avatarURL() )
    }

    if ( reason ) banEmbed.setDescription( `**Raison :** ${reason}` );

    logChannel.send( { embeds: [banEmbed] } );
}
 
 

module.exports ={
    timeoutLog,
    kickLog,
    banLog
}