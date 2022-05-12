/**
 * @author Lothaire Guée
 * @description
 *      Contains the command 'setup'.
 *      Allow admin to setup the JSON configuration file.
 */

/*      IMPORTS      */
const { SlashCommandBuilder } = require( "@discordjs/builders" );
const { CommandInteraction } = require( "discord.js" );
const {
    setup, isSetupDone, getSetupData
} = require("../../utils/enmapUtils")
 
 /*      AUTHORISATION      */
const { Setup } = require('../../files/modules.js');
 
 /* ----------------------------------------------- */
 /* COMMAND BUILD                                   */
 /* ----------------------------------------------- */
 const slashCommand = new SlashCommandBuilder()
    .setName( "setup" )
    .setDescription( "[setup] Setup le bot sur ce serveur." )
    .setDefaultPermission( false )
    .addChannelOption(option =>
        option.setName('discussion_chan')
            .setDescription("Entrez le channel de discussion. C'est là où seront les memes envoyé selon les conversations.")
            .setRequired(true))  
    .addChannelOption(option =>
        option.setName('proposition_chan')
        .setDescription("Entrez le channel où seront fait les propositions par les membres.")
        .setRequired(true))
    .addChannelOption(option =>
        option.setName('presentation_chan')
            .setDescription("Entrez le channel de présentation des membres.")
            .setRequired(true))
    .addChannelOption(option =>
        option.setName('logs_chan')
            .setDescription("Entrez où seront les logs publiques. (timeout, kick, ban)")
            .setRequired(true))
    .addRoleOption(option =>
        option.setName('active_role')
            .setDescription("Entrez le rôle du membre actif.")
            .setRequired(true))
    .addRoleOption(option =>
        option.setName('certify_role')
            .setDescription("Entrez le rôle du membre certifié.")
            .setRequired(true))
    .addRoleOption(option =>
        option.setName('ncertify_role')
            .setDescription("Entrez le rôle du membre non certifié.")
            .setRequired(true))
    .addRoleOption(option =>
        option.setName('demo_role')
            .setDescription("Entrez le rôle du membre démo.")
            .setRequired(true))
    .addRoleOption(option =>
        option.setName('library_role')
            .setDescription("Entrez le rôle des archives de votre serveur.")
            .setRequired(true))
    .addRoleOption(option =>
        option.setName('admin_role')
            .setDescription("Entrez le rôle des administrateurs.")
            .setRequired(true))
    .addRoleOption(option =>
        option.setName('mod_role')
            .setDescription("Entrez le rôle des modérateurs.")
            .setRequired(true));



 /* ----------------------------------------------- */
 /* FUNCTIONS                                       */
 /* ----------------------------------------------- */
 /**
  * Function called when the command 'ping'
  * @param {CommandInteraction} interaction The interaction generated by the command's execution.
  */
  async function execute( interaction ) {
    if(Setup == false) return;

    discussionChannel = interaction.options.getChannel('discussion_chan')
    propositionChannel = interaction.options.getChannel('proposition_chan')
    presentationChannel = interaction.options.getChannel('presentation_chan')
    logsChannel = interaction.options.getChannel('logs_chan')

    activeMemberRole = interaction.options.getRole('active_role')
    certifyRole = interaction.options.getRole('certify_role')
    ncertifyRole = interaction.options.getRole('ncertify_role')
    demoRole = interaction.options.getRole('demo_role')
    libraryRole = interaction.options.getRole('library_role')
    adminRole = interaction.options.getRole('admin_role')
    modRole = interaction.options.getRole('mod_role')

    setup.set(interaction.guild.id, {
        discussion: discussionChannel.id,
        proposition: propositionChannel.id,
        presentation: presentationChannel.id,
        logs: logsChannel.id,
        active_role: activeMemberRole.id,
        certify: certifyRole.id,
        ncertify: ncertifyRole.id,
        demo: demoRole.id,
        library: libraryRole.id,
        admin_id: adminRole.id,
        mod_id: modRole.id
    })
    isSetupDone.set(interaction.guild.id, true)


    await interaction.reply({
        content: `Configuration :
        <#${discussionChannel.id}> est l'endroit où vous pourrez discuter avec des memes.
        <#${propositionChannel.id}> est l'endroit où les propositions de vos membres seront.
        <#${presentationChannel.id}> est l'endroit où seront les présentations des membres.
        <#${logsChannel.id}> est l'endroit où seront stockés les logs publiques.\n
        <@!${activeMemberRole.id}> est le rôle des membres actifs sur votre serveur.
        <@!${certifyRole.id}> est le rôle des membres certifiés par votre serveur.
        <@!${ncertifyRole.id}> est le rôle des membres non certifiés par votre serveur.
        <@!${demoRole.id}> est le rôle des membres souhaitant voir ce qu'il se passe avant de rejoindre complètement votre serveur.
        <@!${libraryRole.id}> est le rôle des membres souhaitant accéder aux archives.\n
        <@!${adminRole.id}> est le rôle des administrateurs de votre serveur.
        <@!${modRole.id}> est le rôle des modérateurs de votre serveur.\n
        Votre setup est terminé, veuillez patienter nous activons au fur et à mesure les commandes pour chacun des rôles !
        `,
        ephemeral: true
    });
     
 }
 
 
 /* ----------------------------------------------- */
 /* MODULE EXPORTS                                  */
 /* ----------------------------------------------- */
 module.exports = {
    data: slashCommand,
    execute
 }