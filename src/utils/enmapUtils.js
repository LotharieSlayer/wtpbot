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
const activeList = new Enmap({name: "activeList"});

// CHANNELS DATABASE INIT
const setupDiscussion = new Enmap({name: "setupDiscussion"});
const setupProposition = new Enmap({name: "setupProposition"});
const setupPresentation = new Enmap({name: "setupPresentation"});
const setupThread = new Enmap({name: "setupThread"});

// ROLES DATABASE INIT
const setupActiveRole = new Enmap({name: "setupActiveRole"});
const setupCertifyRole = new Enmap({name: "setupCertifyRole"});
const setupNCertifyRole = new Enmap({name: "setupNCertifyRole"});
const setupDemoRole = new Enmap({name: "setupDemoRole"});
const setupLibraryRole = new Enmap({name: "setupLibraryRole"});

const setupAdminRole = new Enmap({name: "setupAdminRole"});
const setupModRole = new Enmap({name: "setupModRole"});

// PRESENCE AND MEMES DATABASE INIT
const memes = new Enmap({name: "memes"});
const presence = new Enmap({name: "presence"});
const isSetupDone = new Enmap({name: "isSetupDone"})

// Un-comment to set memes and presences into the database
// const { MEMES } = require("../data/memes");
// const { STATES } = require("../data/states");
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

async function getSetupData(guild, type){

    let result;
    switch (type) {
        case "discussion":
            setupDiscussion.fetchEverything()?.forEach( async (value, key) => {
                if(value === guild)
                    result = key;
            })
            break;
        case "proposition":
            setupProposition.fetchEverything()?.forEach( async (value, key) => {
                if(value === guild)
                    result = key;
            })
            break;
        case "presentation":
            setupPresentation.fetchEverything()?.forEach( async (value, key) => {
                if(value === guild)
                    result = key;
            })
            break;
        case "active_role":
            setupActiveRole.fetchEverything()?.forEach( async (value, key) => {
                if(value === guild)
                    result = key;
            })
            break;
        case "thread":
            // Here guild is the channel actually
            setupThread.fetchEverything()?.forEach( async (value, key) => {
                if(key === guild)
                    result = key;
            })
            break;
        case "certify":
            setupCertifyRole.fetchEverything()?.forEach( async (value, key) => {
                if(value === guild)
                    result = key;
            })
            break;
        case "ncertify":
            setupNCertifyRole.fetchEverything()?.forEach( async (value, key) => {
                if(value === guild)
                    result = key;
            })
            break;
        case "demo":
            setupDemoRole.fetchEverything()?.forEach( async (value, key) => {
                if(value === guild)
                    result = key;
            })
            break;
        case "library":
            setupLibraryRole.fetchEverything()?.forEach( async (value, key) => {
                if(value === guild)
                    result = key;
            })
            break
        case "admin_id":
            setupAdminRole.fetchEverything()?.forEach( async (value, key) => {
                if(value === guild)
                    result = key;
            })
            break
        case "mod_id":
            setupModRole.fetchEverything()?.forEach( async (value, key) => {
                if(value === guild)
                    result = key;
            })
            break
        case "is_setup":
            isSetupDone.get(guild) ? result = true : result = false;
    }
    return result;
}

async function setMemes(){
    // PRESENCE
    for(let i=0; i < STATES.length; i++){
        presence.set(STATES[i])
    }
    // MEMES
    for(let i=0; i < MEMES.length; i++){
        memes.set(MEMES[i].command, MEMES[i].message)
    }
}



/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	getSetupData,
    dbModifyPresentation,
    activeList,

    setupDiscussion,
    setupPresentation,
    setupProposition,
    setupThread,

    setupActiveRole,
    setupCertifyRole,
    setupNCertifyRole,
    setupDemoRole,
    setupLibraryRole,

    setupAdminRole,
    setupModRole,

    isSetupDone,
    memes,
    presence
}