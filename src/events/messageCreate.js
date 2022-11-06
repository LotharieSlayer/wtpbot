/**
 * @author Lothaire Guée
 * @description
 *		This event is used to store the memes in the database and add their initial reactions.
 */

// const { activeMember } = require("../utils/modules/activeMember.js");
const { ChannelType } = require("discord.js");
const { proposition } = require("../modules/proposition.js");
const { thread } = require("../modules/thread.js");
const { memes, getSetupData } = require("../utils/enmapUtils.js");
let warns = new Map();

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

/**
 * Function called when the event 'messageCreate' is emitted.
 * @param {Message} message The message created.
 * @param {Client} client The client that emitted the event.
 */
async function execute(message, client) {
    try {
        // if (!(await isURL(message))) { // depreacted with Automod that block spam and scam links
            proposition(client, message);
            thread(message);
            loadMemes(message);
        // }
    }
    catch(e){console.log(e)}
}

async function loadMemes(msg) {
    if (msg.author.bot) return;
    const discussion = await getSetupData(msg.channel.id, "discussion");
    if (msg.channel.id != discussion) return;

    // Génère un nombre random entre 1 et 30
    let randomValue = Math.floor(Math.random() * 100 + 1);
    if (randomValue > 1) return;

    memes.fetchEverything();
    let isSent = false;
    memes.forEach(async (value, key) => {
        if (isSent) return;
        if (msg.content.includes(key)) {
            msg.reply(value);
            isSent = true;
        }
    });
}

async function isURL(msg) {
    if (msg.author.bot) return true;

    let certify = await getSetupData(msg.guild.id, "certify");
    
    if (certify === undefined || certify === null) return;

    let regex = /(https?|ftp|ssh|mailto):\/\/[a-z0-9/:%_+.,#?!@&=-]+/gi;
    let isMatch = regex.test(msg.content);
    let isRole = msg.member.roles.cache.some((role) => role.id === certify.certifyRoles[0])
        ? true
        : false;

    if (isMatch && !isRole) {
        await msg.delete();

        let cpt = 0;
        if (warns.get(msg.member.id) != null) cpt = warns.get(msg.member.id);
        warns.set(msg.member.id, cpt + 1);

        if (cpt < 2)
            msg.channel
                .send(
                    `Attention <@${msg.author.id}> tu n'a pas le droit de poster des liens sans être certifié !\nMerci de bien vouloir lire le règlement.`
                )
                .then((m) => setTimeout(() => m.delete(), 10000));
        if (cpt >= 2) {
            await msg.member.send(
                `On t'avais prévenu. Tu as été kick de ${msg.guild.name} car tu as posté trop de liens sans être certifié !`
            );
            await msg.member.kick({
                reason: "Spam de liens en étant non certifié",
            });
        }
        return true;
    }

    return false;
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    name: "messageCreate",
    execute,
};
