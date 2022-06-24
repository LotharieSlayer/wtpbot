/**
 * @author Lothaire Guée
 * @description
 * 		The file contains authorisation for module to execute.
 */

/**
 * Export if yes or no the module is authorize to execute
 * @export {boolean} Authorisation.
 */

// v1.0
exports.Certify = true;
exports.Archives = true;
exports.Changelogs = true;
exports.ActiveMember = false; // deprecated
exports.WelcomeRole = false; // deprecated
exports.Proposition = true;
exports.Presentation = true;
exports.Setup = true;
exports.Thread = true;
exports.Memes = true;
exports.Presence = true;

// v1.1
exports.Music = false; // deprecated

// v1.2
exports.Logs = true;

// v2.0.2
exports.WelcomeMember = true;

// v2.1.0
exports.Warn = true;