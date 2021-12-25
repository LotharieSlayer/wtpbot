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

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
async function proposition(client, msg){
    if(Proposition == false) return;
    if(msg.author.bot) return;
    const PROPOSITION_ID = await getSetupData(msg.guild.id, "proposition")
    
    if (msg.channel.id === PROPOSITION_ID){
        
        //Créer un embed de la proposition + y ajouter les réactions.
        var messageContent = msg.content;
        var messageAuthor = msg.author;
        var Attachment = msg.attachments;

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