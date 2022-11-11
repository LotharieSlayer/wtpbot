/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'e_penis'.
 *      Obtenir l'e-penis de n'importe quel modérateur.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { warnedUsers } = require("../../utils/enmapUtils");
const JSONPenalties = require(`${process.cwd()}/files/sanctions.json`);

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("e_penis")
    .setDescription(
        "[mod] Obtenir l'e-penis de n'importe quel modérateur."
    )
    .addUserOption(user =>
        user
            .setName("mod")
            .setDescription("L'utilisateur atteignable ciblé à l'audit.")
    )
    .addStringOption(userId =>
        userId
            .setName("mod_id")
            .setDescription("ID de l'utilisateur inatteignable ciblé à l'audit. (inatteignable par le bot)")
    )
    .setDefaultPermission(false);


     
/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
 
 
/**
 * Fonction appelé quand la commande est 'e_penis'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {

    if(interaction.options.getString("mod_id") != null && interaction.options.getMember("mod") != null){
        interaction.reply("Merci de ne pas mettre les deux options à la fois.");
        return;
    }

    let member;
    let tag;
    let avatarURL;
    let resultsReason = [];
    let resultsUser = [];
    let counter = 0;
    if(interaction.options.getMember("mod")){
        member = interaction.options.getMember("mod");
        warnedUsers.fetchEverything()?.forEach( async (value, key) => {
            for (let i = 0; i < value.warns.length; i++) {
                if(value.warns[i].mod == member.id){
                    resultsReason.push(JSONPenalties.enum[value.warns[i].reason].emoji + " " + JSONPenalties.enum[value.warns[i].reason].name);
                    resultsUser.push("<@" + key + ">");
                    counter++
                }
            }
        })
        tag = member.user.tag;
        avatarURL = member.user.avatarURL();
    }
    else if (interaction.options.getString("mod_id")) {
        member = interaction.options.getString("mod_id");
        warnedUsers.fetchEverything()?.forEach( async (value, key) => {
            for (let i = 0; i < value.warns.length; i++) {
                if(value.warns[i].mod == member){
                    resultsReason.push(JSONPenalties.enum[value.warns[i].reason].emoji + " " + JSONPenalties.enum[value.warns[i].reason].name);
                    resultsUser.push("<@" + key + ">");
                    counter++
                }
            }
        })
        // fetch user
        const user = await interaction.client.users.fetch(interaction.options.getString("mod_id"));
        tag = user.tag;
        avatarURL = user.avatarURL();
    }
    else {
        member = interaction.member;
        warnedUsers.fetchEverything()?.forEach( async (value, key) => {
            for (let i = 0; i < value.warns.length; i++) {
                if(value.warns[i].mod == member.id){
                    resultsReason.push(JSONPenalties.enum[value.warns[i].reason].emoji + " " + JSONPenalties.enum[value.warns[i].reason].name);
                    resultsUser.push("<@" + key + ">");
                    counter++
                }
            }
        })
        tag = member.user.tag;
        avatarURL = member.user.avatarURL();
    }

    if(counter === 0) {
        await interaction.reply({
            content: `Le ${tag} est un eunuque atteint de pénectomie. Aucun e-penis, rien.\nL'entrejambe est on ne peut plus clean !`,
            ephemeral: true,
        });
        return;
    }
    
    const embedMessage = new EmbedBuilder()
    .setTitle("E-penis de " + tag)
    .setThumbnail(avatarURL)

    embedMessage.addFields({ name: "Taille de votre e-penis :", value: counter.toString() })

    // Constructeur des fields
    console.log(resultsReason.length)
    for(let i = resultsReason.length - 1; i > resultsReason.length - 25 ; i--){
        embedMessage.addFields({
            name: resultsReason[i],
            value: resultsUser[i],
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
 