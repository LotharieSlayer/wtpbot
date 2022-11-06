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
exports.Certify = false;
exports.Archives = false;
exports.Changelogs = false;
exports.Proposition = false;
exports.Presentation = false; // false deprecated
exports.Setup = true;
exports.Thread = true;
exports.Memes = false;
exports.Presence = false;

// v1.1
exports.Music = false; // false deprecated

// v1.2
exports.Logs = false;

// v2.0.2
exports.WelcomeMember = false;

// v2.1.0
exports.Warn = false;

// v2.2.0
exports.Contest = false; // false not finished
exports.Advices = true;
exports.Report = true;