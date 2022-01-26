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

    // DEPRECATED / BUGGED
    /*if (oldMember.roles.cache.size !== newMember.roles.cache.size) {

        // Message à ceux qui prennent le role Démo
        if (!oldMember.roles.cache.some(role => role.id === DEMO_ID) && newMember.roles.cache.some(role => role.id === DEMO_ID)) {
            newMember.send({ embeds: [NEW] });
            console.log(new Date())
            console.log(`DEMO : J'envoie un mp à ${newMember.user.tag} (${newMember.id}) car le cache de l'ancien membre est de ${oldMember.roles.cache.size} et que le nouveau membre a ${newMember.roles.cache.size}`)
            console.log(`${newMember.user.tag} (${newMember.id}), la recherche du role dans l'ancien membre était ${oldMember.roles.cache.some(role => role.id === DEMO_ID)} et le nouveau ${newMember.roles.cache.some(role => role.id === DEMO_ID)}`)
        }
        // Message à ceux qui prennent le role Non Certifié
        if (!oldMember.roles.cache.some(role => role.id === NCERTIFY_ID) && newMember.roles.cache.some(role => role.id === NCERTIFY_ID)) {
            newMember.send({ embeds: [NEW] });
            console.log(new Date())
            console.log(`NON CERTIFIE : J'envoie un mp à ${newMember.user.tag} (${newMember.id}) car le cache de l'ancien membre est de ${oldMember.roles.cache.size} et que le nouveau membre a ${newMember.roles.cache.size}`)
            console.log(`${newMember.user.tag} (${newMember.id}), la recherche du role dans l'ancien membre était ${oldMember.roles.cache.some(role => role.id === NCERTIFY_ID)} et le nouveau ${newMember.roles.cache.some(role => role.id === NCERTIFY_ID)}`)
        }
        // Message à ceux qui ont passé la certification
        if (!oldMember.roles.cache.some(role => role.id === CERTIFY_ID) && newMember.roles.cache.some(role => role.id === CERTIFY_ID)) {
            newMember.send({ embeds: [VERIFIED] });
            console.log(new Date())
            console.log(`CERTIFIE : J'envoie un mp à ${newMember.user.tag} (${newMember.id}) car le cache de l'ancien membre est de ${oldMember.roles.cache.size} et que le nouveau membre a ${newMember.roles.cache.size}`)
            console.log(`${newMember.user.tag} (${newMember.id}), la recherche du role dans l'ancien membre était ${oldMember.roles.cache.some(role => role.id === CERTIFY_ID)} et le nouveau ${newMember.roles.cache.some(role => role.id === CERTIFY_ID)}`)
        }

    }*/

}

module.exports ={
    welcomeRole
}