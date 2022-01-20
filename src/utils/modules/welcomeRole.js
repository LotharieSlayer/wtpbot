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
const { getSetupData } = require("../../utils/enmapUtils")
const { NEW, VERIFIED } = require('../../data/welcomeMessages.js');

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
async function welcomeRole(oldMember, newMember){
    if(WelcomeRole == false) return;

    const CERTIFY_ID = await getSetupData(newMember.guild.id, "certify")
    const NCERTIFY_ID = await getSetupData(newMember.guild.id, "ncertify")
    const DEMO_ID = await getSetupData(newMember.guild.id, "demo")

    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {

        // Message à ceux qui prennent le role Démo
        if (!oldMember.roles.cache.some(role => role.id === DEMO_ID) && newMember.roles.cache.some(role => role.id === DEMO_ID)) {
            newMember.send({ embeds: [NEW] });
        }
        // Message à ceux qui prennent le role Non Certifié
        if (!oldMember.roles.cache.some(role => role.id === NCERTIFY_ID) && newMember.roles.cache.some(role => role.id === NCERTIFY_ID)) {
            newMember.send({ embeds: [NEW] });
        }
        // Message à ceux qui ont passé la certification
        if (!oldMember.roles.cache.some(role => role.id === CERTIFY_ID) && newMember.roles.cache.some(role => role.id === CERTIFY_ID)) {
            newMember.send({ embeds: [VERIFIED] });
        }

    }

}

module.exports ={
    welcomeRole
}