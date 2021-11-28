/**
 * @author Benjamin Guirlet
 * @description
 *      Contains the function linked to the dates.
 */


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Returns the current date in an int with the following format :
 * 		year_number * 365 + month_number * 12 + day_number
 * @returns {int} The day format date.
 */
function getDayFormatDate() {
	const date = new Date();
	return date.getFullYear() * 365 +
		( date.getMonth() + 1 ) * 12 +
		date.getDate();
}


/**
 * Returns the current date in an int with the following format :
 * 		year_number * 12 + month_number
 * @returns {int} The month format date.
 */
function getMonthFormatDate() {
	const date = new Date();
	return date.getFullYear() * 12 +
		( date.getMonth() + 1 );
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	getDayFormatDate,
	getMonthFormatDate
}