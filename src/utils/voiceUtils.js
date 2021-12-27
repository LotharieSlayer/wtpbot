/**
 * @author Benjamin Guirlet
 * @description
 *      This file contains utilities functions that may be used multiples times in different files.
 */


const { CommandInteraction, MessageEmbed} = require( "discord.js" );
const { EMBED_COLOR } = require( "../files/config.json" );


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Check if an user is connected to a voice channel.
 * @param {CommandInteraction} interaction The user's ID.
 * @returns {Promise<string>} Returns the voiceChannelId if the user is connected, else replies to the interaction
 * and returns null.
 */
async function checkUserIsConnected( interaction ) {
	const member = await interaction.guild.members.fetch( interaction.user.id );
	const voiceChannelId = member.voice.channelId;
	if ( !voiceChannelId ) {
		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor( EMBED_COLOR )
					.setTitle( "Tu dois être dans un salon vocal pour utiliser cette commande!" )
					.setAuthor( interaction.user.username, interaction.user.avatarURL() )

			]} );
		return null;
	}
	return voiceChannelId;
}


/**
 * Generates an integer based on the current date and time both converted in seconds.
 * @returns {number} The integer generated.
 */
function getIntDate() {
	const date = new Date();
	return (date.getDay() * 3600 * 24) + (date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds();
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	checkUserIsConnected,
	getIntDate
}