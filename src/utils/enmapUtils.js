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

// CHANNELS SETUP
const setupDiscussion = new Enmap({name: "setupDiscussion"});
const setupProposition = new Enmap({name: "setupProposition"});
const setupPresentation = new Enmap({name: "setupPresentation"});

// ROLES SETUP
const setupActiveRole = new Enmap({name: "setupActiveRole"});
const setupCertifyRole = new Enmap({name: "setupCertifyRole"});
const setupNCertifyRole = new Enmap({name: "setupNCertifyRole"});
const setupDemoRole = new Enmap({name: "setupDemoRole"});
const setupLibraryRole = new Enmap({name: "setupLibraryRole"});

/*memes = new Enmap({name: "memes"});
presence = new Enmap({name: "presence"});*/
const isSetupDone = new Enmap({name: "isSetupDone"});


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
            setupDiscussion.fetchEverything()
            setupDiscussion.forEach( async (value, key) => {
                if(value === guild){
                    result = key;
                }
            })
            break;
        case "proposition":
            setupProposition.fetchEverything()
            setupProposition.forEach( async (value, key) => {
                if(value === guild){
                    result = key;
                }
            })
            break;
        case "presentation":
            setupPresentation.fetchEverything()
            setupPresentation.forEach( async (value, key) => {
                if(value === guild){
                    result = key;
                }
            })
            break;
        case "active_role":
            setupActiveRole.fetchEverything()
            setupActiveRole.forEach( async (value, key) => {
                if(value === guild){
                    result = key;
                }
            })
            break;
        case "certify":
            setupCertifyRole.fetchEverything()
            setupCertifyRole.forEach( async (value, key) => {
                if(value === guild){
                    result = key;
                }
            })
            break;
        case "ncertify":
            setupNCertifyRole.fetchEverything()
            setupNCertifyRole.forEach( async (value, key) => {
                if(value === guild){
                    result = key;
                }
            })
            break;
        case "demo":
            setupDemoRole.fetchEverything()
            setupDemoRole.forEach( async (value, key) => {
                if(value === guild){
                    result = key;
                }
            })
            break;
        case "library":
            setupLibraryRole.fetchEverything()
            setupLibraryRole.forEach( async (value, key) => {
                if(value === guild){
                    result = key;
                }
            })
            break
        case "is_setup":
            isSetupDone.get(guild) ? result = true : result = false;
    }
    return result;
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
    setupActiveRole,
    setupCertifyRole,
    setupNCertifyRole,
    setupDemoRole,
    setupLibraryRole,
    isSetupDone
    /*memes: memes,
    status: status*/
}