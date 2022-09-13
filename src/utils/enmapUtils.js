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
const setupContest = new Enmap({name: "setup_contest"});
const setupPremium = new Enmap({name: "setup_premium"});

// PRESENCE AND MEMES DATABASE INIT
const memes = new Enmap({name: "memes"});
const presence = new Enmap({name: "presence"});

// WARNS
const warnedUsers = new Enmap({name: "warned_users"});

// COUNTER
const counter = new Enmap({name: "counter"});

// CONTEST
const contestPosts = new Enmap({name: "contest_posts"});
const contestSupervotes = new Enmap({name: "contest_supervotes"});
const contestKarmas = new Enmap({name: "contest_karmas"});


// Un-comment to set memes and presences into the database
// const { MEMES } = require("../files/memes");
// const { STATES } = require("../files/memes");
// setMemes();

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
            // Here id is the member
            return await getResultsValue(setupWelcome, id)
        case "contest":
            // Here id is the guild
            return await getResultsValue(setupContest, id)
        case "premium":
            // Here id is the guild
            return await getResultsValue(setupPremium, id)
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

/*
async function setMemes(){
    // PRESENCE
    for(let i=0; i < STATES.length; i++){
        presence.set(STATES[i])
    }
    // MEMES
    for(let i=0; i < MEMES.length; i++){
        memes.set(MEMES[i].command, MEMES[i].message)
    }
    console.log("Toutes les données memes / presence ont été chargé !")
}
*/


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
    setupContest,
    setupPremium,

    contestPosts,
    contestSupervotes,
    contestKarmas,
    warnedUsers,
    dbModifyPresentation,
    memes,
    presence,
    counter
}