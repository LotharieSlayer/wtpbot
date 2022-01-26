/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to welcome members in the discussion channel.
 *
 */


/*      AUTHORISATION      */
const { WelcomeMember } = require('../../files/modules.js');

/*      IMPORTS      */
const { getSetupData } = require("../enmapUtils")
const { NEW } = require('../../data/welcomeMessages.js');

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

async function welcomeMember(member, client){
    if(WelcomeMember == false) return;

    const DISCUSSION_ID = await getSetupData(member.guild.id, "discussion")
    const discussionChannel = await client.channels.cache.find(channel => channel.id === DISCUSSION_ID)
    let message = `Hey yo <@${member.id}>, bienvenue sur ***FRANCE MEMES*** ! <:frMeme1:759475543652565023><:frMeme2:759475544684757002>`;
    
    discussionChannel.send(message)
    member.send({ embeds: [NEW] });

}

module.exports ={
    welcomeMember
}