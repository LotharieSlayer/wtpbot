/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to set a 'proposition' embed for someone who wrote a message in a specific channel.
 */


/*      AUTHORISATION      */
const { Presentation } = require('../../files/modules.js');

/*      IMPORTS      */
const { dbModifyPresentation, getSetupData } = require("../../utils/enmapUtils")
let PRESENTATION_ID;
//const { JSON } (ça sera l'import de la databse ou le json qui aura l'id du channel proposition)


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
function presentation(msg){

    if(Presentation == false) return;
    PRESENTATION_ID = getSetupData(msg.guild.id, "presentation")

    if(msg.channel.id === PRESENTATION_ID){ //fetch dans le json/DB l'id du channel suite au /setup
        if(dbModifyPresentation.get(msg.author.id) === undefined){    
            // Quand un membre envoie un messaeg dans le salon spécifié alors ça révoque le fait qu'il puisse envoyer des messages
            msg.guild.channels.cache.find(x => x.id === PRESENTATION_ID) //mettre le channel dans un variable pcq c'est degueu
            .permissionOverwrites.edit(msg.author, {
                SEND_MESSAGES: false
            })
            dbModifyPresentation.set(msg.author.id, false)
        }
        else{
            msg.delete()
            msg.guild.channels.cache.find(x => x.id === PRESENTATION_ID)
            .permissionOverwrites.edit(msg.author, {
                SEND_MESSAGES: false
            })
            dbModifyPresentation.set(msg.author.id, false)
            msg.author.send("Haha, bien essayé d'avoir voulu refaire une nouvelle présentation.\nCependant si votre présentation a été supprimé suite à un problème. Contactez l'équipe de modération.\nSi votre message a été modifié même suite à cette erreur c'est tout à fait normal, ça veut juste dire que vous avez modifié votre message après une petite déconnexion de WTPBot.")

        }
        
    }
    
}

// Vérifier si le membre a modifié un message dans un salon spécifique
function isEditedPresentation(newMessage){
    
    const { dbModifyPresentation } = require('../../utils/enmapUtils');
    PRESENTATION_ID = getSetupData(newMessage.guild.id, "presentation")
    
    if(Presentation == false) return;
        if(newMessage.channel.id === PRESENTATION_ID){    //channel presentation
            if(newMessage){
                dbModifyPresentation.set(newMessage.author.id, false)
                newMessage.guild.channels.cache.find(x => x.id === PRESENTATION_ID)   //channel presentation
                .permissionOverwrites.edit(newMessage.author, {
                    SEND_MESSAGES: false
                })
                newMessage.author.send("Vous avez bien modifié votre message dans <#877640807786635324>.")
            }
        }

}

module.exports ={
    presentation,
    isEditedPresentation
}