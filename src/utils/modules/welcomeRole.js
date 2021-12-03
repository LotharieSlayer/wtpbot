/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to guide new users by sending DMs.
 *
 */


/*      AUTHORISATION      */
const { WelcomeRole } = require('../../files/modules.js');

/*      IMPORTS      */
const { MessageEmbed } = require("discord.js");


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
function welcomeRole(oldMember, newMember){
    if(WelcomeRole == false) return;
    
    const { NEW, VERIFIED } = require('../../data/welcomeMessages.js');

    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {

        
        // Message à ceux qui prennent le role Démo
        if (!oldMember.roles.cache.some(role => role.id === '875412331746709565')
        && newMember.roles.cache.some(role => role.id === '875412331746709565')) {
            newMember.send({ embeds: [NEW] });
        }
        // Message à ceux qui prennent le role Non Certifié
        if (!oldMember.roles.cache.some(role => role.id === '875412330828169249')
        && newMember.roles.cache.some(role => role.id === '875412330828169249')) {
            newMember.send({ embeds: [NEW] });
        }
        // Message à ceux qui ont passé la certification
        if (!oldMember.roles.cache.some(role => role.id === '875412316362014772')
        && newMember.roles.cache.some(role => role.id === '875412316362014772')) {
            newMember.send({ embeds: [VERIFIED] });
        }

    }

}

module.exports ={
    welcomeRole
}