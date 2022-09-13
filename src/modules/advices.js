/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to set a 'proposition' embed for someone who wrote a message in a specific channel.
 */


/*      AUTHORISATION      */
const { Proposition } = require('../files/modules.js');

/*      IMPORTS      */
const { EmbedBuilder } = require("discord.js");
const { getSetupData } = require('../utils/enmapUtils');

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
async function advices(client, msg){
    if(Advices == false) return;
    if(msg.author.bot) return;
    const DISCUSSION_ID = await getSetupData(msg.channel.id, "discussion")    
    
    
    if (msg.channel.id === DISCUSSION_ID) return

    // Génère un nombre random entre 1 et 100
    const randomValue = Math.floor(Math.random() * 100 + 1);
    if (randomValue > 1) return;

    advicesDB.fetchEverything();
    let isSent = false;
    advicesDB.forEach(async (value, key) => {
        if (isSent) return;
        if (msg.content.includes(key)) {
            msg.reply(value);
            isSent = true;
        }
    });

}

module.exports ={
    advices
}