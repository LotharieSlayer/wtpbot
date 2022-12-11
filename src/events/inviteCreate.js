/**
 * @author Lothaire Guée
 * @description
 *      This event is used to track which invite is created.
 */


const { Subgiving } = require("../files/modules");
const { getSetupData } = require("../utils/enmapUtils");


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the event 'inviteCreate' is emitted.
 * @param {InviteGuild} invite Represents an invitation to a guild channel.
 */
async function execute( invite, client ) {
    const setup = await getSetupData(invite.guild.id, "subgiving")
	if(setup != undefined)
		if(Subgiving == false || setup[0] == false)
			return;
	client.invites.get(invite.guild.id).set(invite.code, [invite.uses, invite.inviter.id]);
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "inviteCreate",
	execute
}
