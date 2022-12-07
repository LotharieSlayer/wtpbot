/**
 * @author Lothaire Guée
 * @description
 *      Contains the function linked to the database.
 */


/* ----------------------------------------------- */
/* DATABASES INITILIZATION                         */
/* ----------------------------------------------- */
const Enmap = require("enmap");

const dbModifyPresentation = new Enmap({name: "modifyP"});

// SETUP
const setupMemes = new Enmap({name: "setup_memes"});
const setupSuggestions = new Enmap({name: "setup_suggestions"});
const setupPresentations = new Enmap({name: "setup_presentations"});
const setupLogs = new Enmap({name: "setup_logs"});
const setupCertify = new Enmap({name: "setup_certify"});
const setupActiveRole = new Enmap({name: "setup_active_role"});
const setupArchives = new Enmap({name: "setup_archives"});
const setupThread = new Enmap({name: "setup_thread"});
const setupWelcome = new Enmap({name: "setup_welcome"});
const setupReport = new Enmap({name: "setup_report"});
const setupSupport = new Enmap({name: "setup_support"});
const setupContest = new Enmap({name: "setup_contest"});
const setupPremium = new Enmap({name: "setup_premium"});

// PRESENCE AND MEMES DATABASE INIT
const memes = new Enmap({name: "memes"});
const presence = new Enmap({name: "presence"});
const advices = new Enmap({name: "advices"})

// WARNS
const warnedUsers = new Enmap({name: "warned_users"});

// COUNTER
const counter = new Enmap({name: "counter"});

// CONTEST
const contestPosts = new Enmap({name: "contest_posts"});
const contestSupervotes = new Enmap({name: "contest_supervotes"});
const contestKarmas = new Enmap({name: "contest_karmas"});

// REPORTS
const reports = new Enmap({name: "reports"})

// INVITES
const setupSubgiving = new Enmap({name: "setup_subgiving"});
const personnesEntrantes = new Enmap({name: "personnes_entrantes"});
const subgiving = new Enmap({name: "subgiving"});
const subgivingInviter = new Enmap({name: "subgiving_inviter"});

// Un-comment to set memes and presences into the database
const { MEMES } = require("../files/memes");
const { STATES } = require("../files/memes");
setMemes();

// Un-comment to set advices into the database
const { ADVICES } = require("../files/advices")
setAdvices();

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

/**
 * Commentaires
 * @returns {String} Channel ID by passing the Guild ID and the type of
 * the channel you want to search.
 * Example : getSetupData(GUILD_ID, "presentation") but it can be : "proposition" or "discussion"
 */
async function getSetupData(id, type){

    switch (type) {
        case "discussion":
            // Here id is the channel
            // Because we are searching all channels from a guild setup for memes
            // It allows multiple discussions channels for example
            return await getResultsKey(setupMemes, id)
        case "proposition":
            // Here id is the channel
            return await getResultsKey(setupSuggestions, id)
        case "presentation":
            // Here id is the channel
            return await getResultsKey(setupPresentations, id)
        case "thread":
            // Here id is the channel
            return await getResultsKey(setupThread, id)
        case "logs":
            // Here id is the guild
            // Because we are searching for the logs channel ID of the current guild
            // It allows only a single channel for logging for example
            return await getResultsValue(setupLogs, id)
        case "active_role":
            // Here id is the guild
            return await getResultsValue(setupActiveRole, id)
        case "archives":
            // Here id is the guild
            return await getResultsValue(setupArchives, id)
        case "certify":
            // Here id is the guild
            return await getResultsValue(setupCertify, id)
        case "warn_user":
            // Here id is the member
            return await getResultsValue(warnedUsers, id)
        case "welcome":
            // Here id is the guild
            return await getResultsValue(setupWelcome, id)
        case "report":
            // Here id is the guild
            // WARNING : It returns an array [0 = channelThread, 1 = guildOutput, 2 = channelOutput]
            return await getResultsValue(setupReport, id)
        case "support":
            // Here id is the guild
            // WARNING : It returns an array [0 = forumChannel, 1 = guildOutput, 2 = channelOutput]
            return await getResultsValue(setupReport, id)
        case "contest":
            // Here id is the guild
            return await getResultsValue(setupContest, id)
        case "premium":
            // Here id is the guild
            return await getResultsValue(setupPremium, id)
        case "subgiving":
            // Here id is the guild
            // WARNING : It returns an array [0 = enabled, 1 = channelOutput, 2 = roleOutput, 3 = endDateTime]
            return await getResultsValue(setupSubgiving, id)
        default:
            break;
    }

}

async function getResultsKey(db, id){
    let result;
    db.fetchEverything()?.forEach( async (value, key) => {
        if(key === id)
            result = key;
    })
    return result;
}

async function getResultsValue(db, id){
    let result;
    db.fetchEverything()?.forEach( async (value, key) => {
        if(key === id)
            result = value;
    })
    return result;
}

async function setMemes(){
    // PRESENCE
    presence.clear();
    for(let i=0; i < STATES.length; i++){
        presence.set(STATES[i])
    }
    // MEMES
    memes.clear();
    for(let i=0; i < MEMES.length; i++){
        memes.set(MEMES[i].command, MEMES[i].message)
    }
    console.log("Toutes les données memes / presence ont été chargé !")
}


// Only for first starting
async function setAdvices(){
    // CONSEILS
    advices.clear();
    for(let i=0; i < ADVICES.length; i++){
        advices.set(ADVICES[i])
    }
    console.log("Toutes les données des advices ont été chargé !")
}



/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	getSetupData,
    setupCertify,
    setupLogs,
    setupMemes,
    setupActiveRole,
    setupPresentations,
    setupSuggestions,
    setupThread,
    setupArchives,
    setupWelcome,
    setupReport,
    setupSupport,
    setupContest,
    setupPremium,
    setupSubgiving,

    reports,
    contestPosts,
    contestSupervotes,
    contestKarmas,
    warnedUsers,
    dbModifyPresentation,
    memes,
    presence,
    advices,
    counter,
    personnesEntrantes,
    subgiving,
    subgivingInviter
}