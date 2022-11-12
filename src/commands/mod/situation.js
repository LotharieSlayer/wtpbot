/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'sitation'.
 *      Auditez-vous vous-mêmes.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { warnedUsers } = require("../../utils/enmapUtils");
const JSONPenalties = require(`${process.cwd()}/files/sanctions.json`);

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("situation")
    .setDescription(
        "[mod] Obtenir l'état de votre compte au sein du serveur."
    );

    
/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */


/**
 * Fonction appelé quand la commande est 'situation'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {

    let member;
    let userDB;
    let tag;
    let avatarURL;
  
    member = interaction.member;
    userDB = warnedUsers.get(member.id);
    tag = member.user.tag;
    avatarURL = member.user.avatarURL();

    if(userDB === undefined) {
        await interaction.reply({
            content: `Aussi clean que de l'eau de roche ${tag} ! \n Tu n'as jamais été warn !`,
            ephemeral: true,
        });
        return;
    }
    
    const embedMessage = new EmbedBuilder()
    .setTitle("Situation de " + tag)
    .setThumbnail(avatarURL)

    let nbWarns = 0;
    for(let sanction in userDB.sanctions){
        userDB.sanctions[sanction] += 1;
        nbWarns += userDB.sanctions[sanction];
    }

    if(nbWarns > 10)
        embedMessage.setColor('Red')
    else if(nbWarns > 5)
        embedMessage.setColor('Yellow')
    else if(nbWarns > 0)
        embedMessage.setColor('Green')


    let sanctions = JSON.stringify(userDB.sanctions)
    sanctions = sanctions.replace("{", "")
    sanctions = sanctions.replace("}", "")
    sanctions = sanctions.replaceAll("\"", "")
    sanctions = sanctions.replaceAll(":", " : ")
    sanctions = sanctions.replaceAll(",", "\n")
    sanctions += "\n\nTri dans l'ordre des plus récents :"

    embedMessage.addFields({name: "Warns", value: sanctions})

    // for(let i = 0; i < userDB.warns.length; i++){
    for(let i = userDB.warns.length - 1; i >= 0; i--){
        let reasonS = userDB.warns[i].reasonS;
        reasonS === null ? reasonS = "" : reasonS += "\n";
        let timestamp = "";
        timestamp += userDB.warns[i].timestamp;

        embedMessage.addFields({
            name: JSONPenalties.enum[userDB.warns[i].reason].emoji + " **" + JSONPenalties.enum[userDB.warns[i].reason].name + "** ",
            value: reasonS + " <t:"+ timestamp.slice(0, -3) + ":R>" + " par <@" + userDB.warns[i].mod + ">\n",
            inline: true
        });

    }

    interaction.reply({embeds:[embedMessage], ephemeral: true});
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
