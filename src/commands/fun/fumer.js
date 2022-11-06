/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande "advice"
 *      Réponds un des nombreux conseils pour mieux utiliser le serveur.
 */

 const { SlashCommandBuilder } = require("@discordjs/builders");
 
 /* ----------------------------------------------- */
 /* COMMAND BUILD                                   */
 /* ----------------------------------------------- */
 const slashCommand = new SlashCommandBuilder()
     .setName("fumer")
     .setDescription(
         "[fun] Fumer le bot, cette sale victime bolosse. *mollard dans ses yeux*"
     );
 
 /* ----------------------------------------------- */
 /* FUNCTIONS                                       */
 /* ----------------------------------------------- */
 /**
  * Fonction appelé quand la commande est "advice"
  * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
  */
 async function execute(interaction) {
    const phrases = [
        "https://tenor.com/view/hasbulla-hasbik-cute-meme-influencer-gif-21732737",
        "https://tenor.com/view/spongebob-meme-spongebob-squarepants-patrick-star-patrick-fight-spongebob-fight-gif-17721615",
        "https://tenor.com/view/ricky-berwick-freaking-out-fight-gif-11085983",
        "https://tenor.com/view/cats-fighting-fighting-cats-anniehasleftoop-gif-23317332",
        "https://tenor.com/view/fight-smash-girl-fight-gif-15340791",
        "https://tenor.com/view/cute-cute-couple-punch-fight-gif-16876274",
        "https://tenor.com/view/hit-couple-fighting-argue-mad-gif-16715542",
        "https://tenor.com/view/fight-couple-gif-26407590",
        "https://tenor.com/view/funny-fight-air-punches-gif-11019923",
        "https://tenor.com/view/jujutsu-kaisen-anime-fight-animation-gojo-satoru-gif-20850159",
        "https://tenor.com/view/anime-battle-arena-aba-gif-21526070",
        "https://tenor.com/view/cat-meme-fight-gif-25469942",
        "https://tenor.com/view/dragonballsuper-fight-super-saiyan-power-gif-7576909",
        "https://tenor.com/view/pelea-batalla-super-sayayin-super-poderes-kamejameja-gif-16297638",
        "https://tenor.com/view/markiplier-punch-markiplier-punch-attack-fight-gif-23206537",
        "https://tenor.com/view/meme-memes-memes2022funny-meme-face-punch-gif-25436787",
        "https://tenor.com/view/chunli-lightning-legs-kicks-street-fighter-fast-kick-gif-16557621",
        "https://tenor.com/view/anime-love-after-world-domination-kick-kicking-kick-out-gif-25869776",
        "https://tenor.com/view/calme-toi-calmez-vous-calmer-calme-au-calme-gif-15618438",
        "https://tenor.com/view/hoseokmaraj-stan-twitter-gif-21872629",
        "https://tenor.com/view/one-punch-man-star-punch-rip-stern-gif-24971113",
        "https://tenor.com/view/one-punch-man-gif-23006509",
        "https://tenor.com/view/fucked-bam-jackass-flying-kick-kick-gif-15175869",
        "https://tenor.com/view/fight-fighting-mad-angry-anger-gif-17771554",
        "https://tenor.com/view/vilebrequin-vilebrequin-tellement-pt-vilebrequin-a-la-recherche-du-respect-vilebrequin-hacker-vilebrequin-sylvain-levy-gif-21366111",
        "https://cdn.discordapp.com/attachments/1038528645712584704/1038824755215732878/image0.gif",
        "https://tenor.com/view/anime-slap-dog-gif-13278667",
        "https://tenor.com/view/anime-fight-gif-20685230",
        "https://tenor.com/view/im-so-excited-chucmungnammoi-gif-13475255",
        "https://tenor.com/view/anime-slap-girl-boy-gif-7919028",
        "https://tenor.com/view/fight-girl-power-punch-anime-gif-17372966",
    ]

    const random = Math.floor(Math.random() * phrases.length);
    await interaction.reply({content: phrases[random], ephemeral: true})
 }
 
 /* ----------------------------------------------- */
 /* MODULE EXPORTS                                  */
 /* ----------------------------------------------- */
 module.exports = {
     data: slashCommand,
     execute,
 };
 