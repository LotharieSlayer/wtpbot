/**
 * @author Lothaire Guée
 * @description
 * 		The file contains authorisation for module to execute.
 */

/**
 * Export if yes or no the module is authorize to execute
 * @export {boolean} Authorisation.
 */

exports.Certify = true;
exports.Library = true;
exports.Changelogs = true;
exports.ActiveMember = true;
exports.WelcomeRole = true;
exports.Proposition = true;
exports.Presentation = true;
exports.Setup = true;
//il faut faire le truc de vérification de setup, genre si un serv a pas fait le setup ça return un message d'erreur sur certains fonctions
exports.Memes = true;
exports.Status = true;