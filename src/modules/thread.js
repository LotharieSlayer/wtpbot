/**
 * @author Lothaire Guée
 * @description
 *      Add a thread on each channel if the channel is allowed/present in the database
 *      in order to create a comments section on each message.
 */


/*      AUTHORISATION      */
const { Thread } = require('../files/modules.js');

/*      IMPORTS      */
const { getSetupData } = require('../utils/enmapUtils');

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
async function thread(msg){
    if(Thread == false) return;
    if(msg.author.bot) return;
    const THREAD_ID = await getSetupData(msg.channel.id, "thread")
    if(THREAD_ID != msg.channel.id) return

    let messageContent
    if(msg.content != ""){
        messageContent = " - " + msg.content
    }
    else{
        messageContent = ""
    }

    var messageTotal = "Réponses ┃ " + msg.author.username + messageContent + " (" + msg.id + ") "
    
    if(messageTotal.length >= 100){
        messageTotal = "Réponses ┃ " + msg.author.username + " (" + msg.id + ") "
    }

    msg.startThread({
        name: messageTotal,
        autoArchiveDuration: 1440,
    });
}

async function threadDelete(msg){
    if(Thread == false) return;
    if(msg.thread != null)
        msg.thread.delete("Message supprimé")
    
}

module.exports ={
    thread,
    threadDelete
}