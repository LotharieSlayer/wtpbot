/**
 * @author Lothaire Guée
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

function getMs(time){
	time = time.split(":");
	time[0] = parseInt(time[0]) * 24 * 60 * 60 * 1000; // jours
	time[1] = parseInt(time[1]) * 60 * 60 * 1000; // hours
	time[2] = parseInt(time[2]) * 60 * 1000; // minutes
	const ms = time[0] + time[1] + time[2];
	return ms
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	getDayFormatDate,
	getMonthFormatDate,
	getMs
}