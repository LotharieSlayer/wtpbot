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
const setupDiscussion = new Enmap({name: "setupDiscussion"});
const setupProposition = new Enmap({name: "setupProposition"});
const setupPresentation = new Enmap({name: "setupPresentation"});
const setupActiveRole = new Enmap({name: "setupActiveRole"});
const isSetupDone = new Enmap({name: "isSetupDone"});
/*memes = new Enmap({name: "memes"});
presence = new Enmap({name: "presence"});*/


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
    if(type === "discussion"){
        setupDiscussion.fetchEverything()
        setupDiscussion.forEach( async (value, key) => {
            if(value === guild){
                result = key;
            }
        })
    } else if (type === "proposition"){
        setupProposition.fetchEverything()
        setupProposition.forEach( async (value, key) => {
            if(value === guild){
                result = key;
            }
        })
    } else if (type === "presentation"){
        setupPresentation.fetchEverything()
        setupPresentation.forEach( async (value, key) => {
            if(value === guild){
                result = key;
            }
        })
    } else if (type === "active_role"){
        setupActiveRole.fetchEverything()
        setupActiveRole.forEach( async (value, key) => {
            if(value === guild){
                result = key;
            }
        })
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
    isSetupDone
    /*memes: memes,
    status: status*/
}