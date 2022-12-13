/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande "advice"
 *      Donne le nombre de personnes entrées grâce à l'invitation du membre qui l'a actionné.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { Subgiving } = require("../../files/modules");
const { subgivingInviter } = require("../../utils/enmapUtils");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("subgiving")
    .setDescription(
        "Obtenir le nombre de personnes que vous avez fait entrées pendant le subgiving."
    );

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est "subgiving"
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {

    if(Subgiving == false) return;
    const inviterCount = await subgivingInviter.get(interaction.user.id);
    if(inviterCount == undefined) return interaction.reply({content: "Vous n'avez pas fait entrer de personnes pendant le subgiving.", ephemeral: true})
    
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Subgiving 2022');
        
        if(inviterCount < 3)
            embed.setDescription('Vous avez fait entrer ' + inviterCount + ' personnes pendant le subgiving.')
        
        if(inviterCount >= 3)
            embed.setDescription('**Félicitations pour avoir fait entrer ' + inviterCount + ' personnes pendant le subgiving !**\nSi vous n\'avez pas encore reçu votre rôle, contactez <@310430388336197632>.')

        const newInvites = await interaction.guild.invites.fetch();
        const userInvites = newInvites.filter(i => i.inviter.id === interaction.user.id);
        
        if(userInvites.size == 0)
            return interaction.reply({content: "Vous n'avez pas générer de lien d'invitation.", ephemeral: true})
        
        userInvites.forEach((invite, key) => {
            embed.addFields({name: `${invite.code}`, value: `Compteur: ${invite.uses}`, inline: true});
        });
        
    
    await interaction.reply({embeds:[embed], ephemeral: true})
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
