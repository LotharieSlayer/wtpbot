/**
 * @author Lothaire Guée
 * @description
 *		This event is used to store the memes in the database and add their initial reactions.
 */

// const { activeMember } = require("../utils/modules/activeMember.js");
const { ChannelType, PermissionsBitField } = require("discord.js");
const { proposition } = require("../modules/proposition.js");
const { thread } = require("../modules/thread.js");
const { memes, getSetupData, setupContest } = require("../utils/enmapUtils.js");
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
        proposition(client, message);
        thread(message);
        loadMemes(message);
        isMessageInPostsContestChannel(message, client);
    } catch (e) {
        console.log(e);
    }
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

async function isMessageInPostsContestChannel(message, client) {
    //foreach de setupContest
    setupContest.forEach(async (value) => {
        if (
            message.channel.id == value.setup.setupChannelPosts &&
            message.author.id != client.user.id &&
            !message.member.permissions.has(
                PermissionsBitField.Flags.ManageMessages
            )
        )
            message.delete();
    });
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    name: "messageCreate",
    execute,
};
