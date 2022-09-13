/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'audit'.
 *      Obtenir l'audit et l'état du compte de n'importe quel utilisateur.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { warnedUsers } = require("../../utils/enmapUtils");
const JSONPenalties = require(`${process.cwd()}/files/sanctions.json`);

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("audit")
    .setDescription(
        "[mod] Faire l'audit de n'importe quel utilisateur."
    )
    .addUserOption(user =>
        user
            .setName("user")
            .setDescription("L'utilisateur atteingable ciblé à l'audit.")
    )
    .addStringOption(userId =>
        userId
            .setName("user_id")
            .setDescription("ID de l'utilisateur inatteignable ciblé à l'audit. (inatteignable par le bot)")
    )
    .setDefaultPermission(false);


    
/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */


/**
 * Fonction appelé quand la commande est 'audit'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {

    if(interaction.options.getString("user_id") != null && interaction.options.getMember("user") != null){
        interaction.reply("Merci de ne pas mettre les deux options à la fois.");
        return;
    }

    let member;
    let userDB;
    let tag;
    let avatarURL;
    if(interaction.options.getMember("user")){
        member = interaction.options.getMember("user");
        userDB = warnedUsers.get(member.id);
        tag = member.user.tag;
        avatarURL = member.user.avatarURL();
    }
    else if (interaction.options.getString("user_id")) {
        member = interaction.options.getString("user_id");
        userDB = warnedUsers.get(member);
        tag = userDB.user.tag;
        avatarURL = userDB.user.avatarURL;
    }
    else {
        member = interaction.member;
        userDB = warnedUsers.get(member.id);
        tag = member.user.tag;
        avatarURL = member.user.avatarURL();
    }

    if(userDB === undefined) {
        await interaction.reply({
            content: `L'utilisateur ${tag} n'a jamais été warn !\nIl est bien plus clean qu'on ne le pense !`,
            ephemeral: true,
        });
        return;
    }
    
    const embedMessage = new EmbedBuilder()
    .setTitle("Audit de l'utilisateur " + tag)
    .setThumbnail(avatarURL)

    let nbWarns = 0;
    for(let sanction in userDB.sanctions){
        userDB.sanctions[sanction] += 1;
        nbWarns += userDB.sanctions[sanction];
    }

    if(nbWarns > 10)
        embedMessage.setColor('RED')
    else if(nbWarns > 5)
        embedMessage.setColor('YELLOW')
    else if(nbWarns > 0)
        embedMessage.setColor('GREEN')


    let sanctions = JSON.stringify(userDB.sanctions)
    sanctions = sanctions.replace("{", "")
    sanctions = sanctions.replace("}", "")
    sanctions = sanctions.replaceAll("\"", "")
    sanctions = sanctions.replaceAll(":", " : ")
    sanctions = sanctions.replaceAll(",", "\n")
    sanctions += "\n\nTri dans l'ordre des plus récents :"

    embedMessage.addField("Warns", sanctions)

    // for(let i = 0; i < userDB.warns.length; i++){
    for(let i = userDB.warns.length - 1; i >= 0; i--){
        let reasonS = userDB.warns[i].reasonS;
        reasonS === null ? reasonS = "" : reasonS += "\n";
        let timestamp = "";
        timestamp += userDB.warns[i].timestamp;

        embedMessage.addField(
            JSONPenalties.enum[userDB.warns[i].reason].emoji + " **" + JSONPenalties.enum[userDB.warns[i].reason].name + "** ",
            reasonS + " <t:"+ timestamp.slice(0, -3) + ":R>" + " par <@" + userDB.warns[i].mod + ">\n",
            true
        );

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
