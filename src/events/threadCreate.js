/**
 * @author Lothaire Guée
 * @description
 *      This event is used to track the threads created / guildposts.
 */


const { ChannelType } = require( "discord.js" );
const { supportNotify } = require("../services/report/report");


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the event 'messageReactionAdd' is emitted.
 * @param {ThreadChannel} thread The thread channel object.
 * @param {boolean} newlyCreated Whether the thread was newly created.
 * @param {Client} client The client that emitted the event.
 */
async function execute( thread, newlyCreated, client ) {
    if (thread.type == ChannelType.PublicThread){
        supportNotify(thread, client);
    }

}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    name: "threadCreate",
    execute
}
