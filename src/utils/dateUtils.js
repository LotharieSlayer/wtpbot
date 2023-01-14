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

/**
 * Convertie une date en ms.
 * La date doit respecter les indicateurs de temps suivant (d, h, m, s).
 * L'ordre n'importe pas.
 * @param {string} string_date La date (ex : 3d12h30m5s).
 * @returns La date convertie en ms.
 */
function getMsTime(string_date) {
    const multipliers = {
        'd': 24 * 3600 * 1000,
        'h': 3600 * 1000,
        'm': 60 * 1000,
        's': 1000,
    };
    let ms_time = 0;
    let last_pos = 0;

    string_date = string_date.replace(' ', '');
    for (let k = 0; k < string_date.length; k++) {
        const char_code = string_date.charCodeAt(k);
        if (char_code < 48 || char_code > 57) {
            ms_time += parseInt(string_date.substring(last_pos, k)) * multipliers[string_date.charAt(k)];
            last_pos = k + 1;
        }
    }
    return ms_time;
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	getDayFormatDate,
	getMonthFormatDate,
	getMs,
	getMsTime
}