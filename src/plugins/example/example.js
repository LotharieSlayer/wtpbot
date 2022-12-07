/**
 * @author Lothaire Guée
 * @description
 * 		Plugin d'exemple dédié à montrer comment tout cela fonctionne.
 *      Et un plugin marche de la même manière qu'un bot classique !
 *      Vous pouvez y créer tous les dossiers et fichiers que vous voulez.
 *      Il faudra respecter ces quelques règles :
 *          - Le dossier et le fichier principal du plugin doivent avoir le même nom.
 *          - Le fichier principal du plugin doit être un fichier .js et doit contenir une fonction 'execute' qui prend en paramètre le client.
 *          - Le dossier commands/ aura tous les fichiers de Commands de votre plugin (CommandSlash, CommandMessage, CommandUser).
 *          - Ce même dossier commands/ ne contiendra que des fichiers .js et n'aura pas de sous dossiers.
 *          - Le reste c'est vous qui le décidez !
 */

/*      IMPORTS      */
const { exampleEvent } = require("./events/exampleEvent.js");
const { ExampleModule4Plugin } = require("./files/modules.js");

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
async function execute(client) {
    if (ExampleModule4Plugin == false) return;

    // Un super événement
    exampleEvent(client)

    console.log("[Example] Plugin d'exemple démarré !");
}

module.exports = {
    execute
}