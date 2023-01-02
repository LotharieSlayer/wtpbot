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
const setupCertify = new Enmap({name: "setup_certify"});
const setupActiveRole = new Enmap({name: "setup_active_role"});
const setupArchives = new Enmap({name: "setup_archives"});
const setupThread = new Enmap({name: "setup_thread"});
const setupWelcome = new Enmap({name: "setup_welcome"});
const setupPremium = new Enmap({name: "setup_premium"});

// PRESENCE AND MEMES DATABASE INIT
const memes = new Enmap({name: "memes"});
const presence = new Enmap({name: "presence"});
const advices = new Enmap({name: "advices"})

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
        case "active_role":
            // Here id is the guild
            return await getResultsValue(setupActiveRole, id)
        case "archives":
            // Here id is the guild
            return await getResultsValue(setupArchives, id)
        case "certify":
            // Here id is the guild
            return await getResultsValue(setupCertify, id)
        case "welcome":
            // Here id is the guild
            return await getResultsValue(setupWelcome, id)
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
    setupMemes,
    setupActiveRole,
    setupPresentations,
    setupSuggestions,
    setupThread,
    setupArchives,
    setupWelcome,
    setupPremium,

    dbModifyPresentation,
    memes,
    presence,
    advices,
}