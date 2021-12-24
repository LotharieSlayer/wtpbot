/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to set a role "Actif" on active members of the server.
 */


/*      AUTHORISATION      */
const { ActiveMember } = require('../../files/modules.js');

/*      DATABASE      */
const { activeList, getSetupData } = require('../../utils/enmapUtils');


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
function activeMember(client, msg){
    // Ask if this module is authorized
    if(ActiveMember == false) return;
    let ACTIVE_ROLE_ID = getSetupData(msg.guild.id, "active_role")

    activeList.set(msg.author.id, Date.now())
    let activeRole = msg.guild.roles.cache.get(ACTIVE_ROLE_ID);
    msg.member.roles.add(activeRole)
    
    // Fetch
    activeList.fetchEverything();

    // Calcul de l'expiration de 2 mois
    let dateExpiration = Date.now() - 5259600000;
    // 5259600000 = 2 mois en ms
    
    // Pour toutes les clés du fetch, si ya une clé qui a une valeur en dessous de dateExpiration alors on détruit la clé et sa valeur (.delete)
    activeList.forEach( async (value, key) => {
        if(value < dateExpiration ){
            let actualServer = msg.guild.id
            let server = await client.guilds.fetch(actualServer)
            let actualMember = await server.members.fetch(key)
            actualMember.roles.remove(activeRole)
            activeList.delete(key)
        }
    })
}

module.exports ={
    activeMember
}