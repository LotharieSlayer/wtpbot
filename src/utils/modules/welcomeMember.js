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

    const WELCOME_ID = await getSetupData(member.guild.id, "welcome")
    const welcomeChannel = await client.channels.cache.find(channel => channel.id === WELCOME_ID)
    let message = `Hey yo <@${member.id}>, bienvenue sur ***${member.guild.name}*** !`;
    
    welcomeChannel.send(message)
    member.send({ embeds: [NEW] });

}

module.exports ={
    welcomeMember
}