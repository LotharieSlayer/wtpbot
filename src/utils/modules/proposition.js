/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to set a 'proposition' embed for someone who wrote a message in a specific channel.
 */


/*      AUTHORISATION      */
const { Proposition } = require('../../files/modules.js');

/*      IMPORTS      */
const { MessageEmbed } = require("discord.js");
const { getSetupData } = require('../../utils/enmapUtils');
//const { JSON } (ça sera l'import de la databse ou le json qui aura l'id du channel proposition)

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
function proposition(client, msg){
    if(Proposition == false) return;
    if(msg.author.bot) return;
    const PROPOSITION_ID = getSetupData(msg.guild.id, "proposition")
    console.log(PROPOSITION_ID)
    
    if (msg.channel.id === PROPOSITION_ID){ //JSON/DB ID trouve un id du channel en question
        
        //Créer un embed de la proposition + y ajouter les réactions.
        var messageContent = msg.content;
        var messageAuthor = msg.author;
        var Attachment = msg.attachments;

        cpt += 1; //Mettre en JSON/DB

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(messageAuthor.tag, messageAuthor.avatarURL())
            .setDescription(messageContent)
            .setTitle(`Proposition n°${msg.id} :`)
            .addFields(
                {name: "Votes :", value: "`✅` Oui\n`⚪` Neutre\n`❌` NON"},
            )
            .setTimestamp(new Date())
            .setFooter(`Proposition de ${messageAuthor.tag} (${messageAuthor.id})`, client.user.avatarURL())
    

        // SI YA PAS D'ATTACHEMENT //
        if (Array.from(Attachment.values()) == null) {

            msg.channel.send({embeds:[embed]})
                .then(sent => { // 'sent' is that message you just sent
                    sent.react('✅');
                    sent.react('⚪');
                    sent.react('❌');
                    sent.startThread({
                        name: 'Réponses ┃ Proposition n°' + msg.id,
                        autoArchiveDuration: 1440,
                    });
                })
        }

        // SI YA UN ATTACHEMENT //
        else {
            
            msg.channel.send({embeds:[embed], files: Array.from(Attachment.values())})
                .then(sent => { // 'sent' is that message you just sent
                    sent.react('✅');
                    sent.react('⚪');
                    sent.react('❌');
                    sent.startThread({
                        name: 'Réponses ┃ Proposition n°' + msg.id,
                        autoArchiveDuration: 1440,
                    });
                })
        }               

        msg.delete() //Suppression du message si l'embed est fait
    }
}

module.exports ={
    proposition
}