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
const setup = new Enmap({name : "setup"})

// CHANNELS THREAD
const setupThread = new Enmap({name: "setupThread"});

// PRESENCE AND MEMES DATABASE INIT
const memes = new Enmap({name: "memes"});
const presence = new Enmap({name: "presence"});
const isSetupDone = new Enmap({name: "isSetupDone"})

// Un-comment to set memes and presences into the database
// const { MEMES } = require("../data/memes");
// const { STATES } = require("../data/memes");
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
    const possibilities = [
        "discussion",
        "proposition",
        "presentation",
        "active_role",
        "certify",
        "ncertify",
        "demo",
        "library",
        "admin_id",
        "mod_id",
        "logs"
    ]

    for(let search of possibilities){
        if(search === type){
            setup.fetchEverything()?.forEach( async (value, key) => {
                if(key === guild){
                    result = eval("value." + type);
                }
            })
        }
    }    

    switch (type) {
        case "thread":
            // Here guild is the channel actually
            setupThread.fetchEverything()?.forEach( async (value, key) => {
                if(key === guild)
                    result = key;
            })
            break;
        case "is_setup":
            isSetupDone.get(guild) ? result = true : result = false;
            break;
        default:
            break;
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
    console.log("Toutes les données memes / presence ont été chargé !")
}



/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	getSetupData,
    dbModifyPresentation,
    activeList,

    setup,
    setupThread,

    isSetupDone,
    memes,
    presence
}