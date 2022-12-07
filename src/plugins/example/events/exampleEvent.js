/**
 * @author Lothaire Guée
 * @description
 * 		Event des updates du service contest.
 */

/*      IMPORTS      */
const { ExampleModule4Plugin } = require("../files/modules.js");

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
async function exampleEvent(client) {
    if (ExampleModule4Plugin == false) return;

    client.eventsEmitter.on("exampleEvent", async (client) => {
        console.log("Je suis un super event yaaaaaaaaaaaaaaaaaa !");
    });
}

module.exports = {
    exampleEvent,
};