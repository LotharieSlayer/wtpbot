/**
 * @author Lothaire Guée
 * @description
 *      Add a thread on each channel if the channel is allowed/present in the database
 *      in order to create a comments section on each message.
 */


/*      AUTHORISATION      */
const { Subgiving } = require('../files/modules.js');

/*      IMPORTS      */
const { getSetupData, personnesEntrantes, subgiving: subgivingTable, setupSubgiving, subgivingInviter } = require('../utils/enmapUtils');
const { Collection } = require("discord.js");

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
async function subgiving(member, client){
    const setup = await getSetupData(member.guild.id, "subgiving")
    if(setup != undefined)
        if(Subgiving == false || setup[0] == false)
        return;

    // Loop over all the guilds
    client.guilds.cache.forEach(async (guild) => {
        const setup = await getSetupData(guild.id, "subgiving")
        if(setup != undefined)
            if(Subgiving == false || setup[0] == false)
                return;
        // Fetch all Guild Invites
        const firstInvites = await guild.invites.fetch();
        // Set the key as Guild ID, and create a map which has the invite code, and the number of uses
        client.invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
    });

    console.log(member.user.username)
    
    // To compare, we need to load the current invite list.
    const newInvites = await member.guild.invites.fetch()
    // This is the *existing* invites for the guild.
    const oldInvites = await client.invites.get(member.guild.id);
    // Look through the invites, find the one for which the uses went up.
    const invite = await newInvites.find(i => i.uses > oldInvites.get(i.code));
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    let inviter;
    while(inviter == null) {
        inviter = await member.guild.members.fetch(invite.inviter.id);
    }
    // Get the log channel (change to your liking)
    const logChannel = await member.guild.channels.cache.find(channel => channel.id === setup[1]);
    // A real basic message with the information we need. 
    inviter
        ? logChannel.send(`<@${member.user.id}> joined using invite code ${invite.code} from <@${inviter.id}>. Invite was used ${invite.uses} times since its creation.`)
        : logChannel.send(`<@${member.user.id}> joined but I couldn't find through which invite.`);

    let noDoublon;
    if(personnesEntrantes.get(member.user.id) === null && personnesEntrantes.get(member.user.id) !== undefined) {
        noDoublon = false
    }
    else {
        noDoublon = true
    }
    console.log("personnesEntrantes :" + personnesEntrantes.get(member.user.id))
    console.log("noDoublon : " + noDoublon)
    await personnesEntrantes.set(member.user.id, null)

    if (noDoublon == true) {
        subgivingInviter.get(inviter.user.id) ?
        subgivingInviter.set(inviter.user.id, subgivingInviter.get(inviter.user.id) + 1) :
        subgivingInviter.set(inviter.user.id, 1)
        console.log("Ajout d'un vote en plus pour l'inviter :" + subgivingInviter.get(inviter.user.id))
    }

    if (noDoublon == false) {
        inviter.send("T'es un ptit malin t'a essayé d'inviter la même personne, ça marche pas comme ça ! OwO")
        console.log("Envoie du mp malin")
    }

    // Maintenant on va mettre le role si son invitation a fait plus de 3 utilisations
    if(subgivingInviter.get(inviter.user.id) >= 3 && noDoublon){
        if(!inviter.roles.cache.find(role => role.id === setup[2])) {
            const role = await inviter.guild.roles.cache.find(role => role.id === setup[2]);
            inviter.roles.add(role)
            subgivingTable.set(inviter.user.id, Date.now())
            inviter.send("**BRAVO !**\nTu as invité 3 personnes, tu as donc le droit au role de subgiving jusqu'au <t:" + setup[3] + ":F> !")
            subgivingInviter.set(inviter.user.id, subgivingInviter.get(inviter.user.id) + 1)
            console.log("Le role a été ajouté")
        }
    }

    if(Date.now() < setup[3]) {
        finishSubgiving(setup, member.guild, client)
        console.log("Subgiving fini, suppression du role")
    }
}

async function finishSubgiving(setup, guild, client){
    subgivingTable.forEach(async (member) => {
        member = guild.members.fetch(member.id);
        const role = member.guild.roles.cache.find(role => role.id === setup[2]);
        await member.roles.remove(role)
        member.send("Merci d'avoir participé à la subgiving ! C'est maintenant terminé, rendez-vous l'année prochaine.")
        await subgivingTable.delete(member.user.id)
    });
    setupSubgiving.set(guild.id, [false])
}


module.exports = {
    subgiving,
}