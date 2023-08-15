import fs from 'fs';
import { commandsArray } from '@lib/types';
import { green, red, yellow } from 'ansicolor';
import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import { Client, ClientOptions, Collection, ApplicationCommandDataResolvable, REST, Routes } from 'discord.js';

import { Premium } from '@lib/collectionsCommons/premium';


const NodeCache = require('node-cache');


const LOG_LEVELS = ['INFO', 'WARNING', 'ERROR'];


export class Bot extends Client {
	public static instance: Bot;
	public commands: commandsArray;
	private readonly _pluginsPath: string;

	public readonly mongo: MongoClient;
	public readonly db: Db;
	public readonly dbFranceBot: Db;
	public readonly dbCommons: Db;
	public readonly cache: typeof NodeCache;

	public m_premium: Premium;

	public customAttributes: { [key: string]: unknown };


	constructor(options: ClientOptions) {
		super(options);
		Bot.instance = this;

		// This variable is necessary to load the plugins from dist and
		// not src (and the opposite) when running the code after compilation.
		this._pluginsPath = `${__dirname}/../plugins`;
		this.commands = new Collection();
		this.cache = new NodeCache({ stdTTL: 86400 });
		this.customAttributes = {};

		if(process.env.MONGO_URI !== undefined) {
			const mongo = new MongoClient(process.env.MONGO_URI, {
				serverApi: {
					version: ServerApiVersion.v1,
					strict: true,
					deprecationErrors: true,
				},
			});
			
			this.mongo = mongo;
			this.db = mongo.db('wtpbot');
			this.dbFranceBot = mongo.db('francebot');
			this.dbCommons = mongo.db('commons');

			this.m_premium = new Premium(this);
		}

		this.loadPlugins();
	}

	/**
	 * Démarre le bot avec un log.
	 * @param token Le token du bot.
	 */
	async start(token: string) {
		this.log('Démarrage du bot.');
		await super.login(token);
	}

	/* ----------------------------------------------- */
	/* LOGGING                                         */
	/* ----------------------------------------------- */
	/**
	 * Génère le texte coloré pour le niveau du log.
	 * @param level Le niveau du log.
	 * @returns Une string colorée.
	 */
	_getLevelTxt(level: number): string {
		switch (level) {
			case 0:
				return green(LOG_LEVELS[level]);
			case 1:
				return yellow(LOG_LEVELS[level]);
			case 2:
				return red(LOG_LEVELS[level]);
			default:
				return 'UNKNOWN';
		}
	}

	/**
	 * Affiche un log.
	 * @param text Le message de log.
	 * @param level Le niveau du log.
	 */
	log(text: string, level: number = 0) {
		const date = new Date();
		const dateFormat = date.toLocaleString("fr-FR", {
			timeZone: "Europe/Paris",
			hour12: false,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
		console.log(`${dateFormat} ${this._getLevelTxt(level)} : ${text}`);
	}

	/**
	 * Affiche un log indiquant qu'une erreur est survenue dans une commande.
	 * @param cmd_name Le nom de la commande.
	 * @param error L'erreur.
	 */
	logErrCommand(cmd_name: string, error: unknown) {
		this.log(`Une erreur est survenue dans la commande "${cmd_name}" !`, 1);
		console.log(error);
	}

	/* ----------------------------------------------- */
	/* PLUGINS                                         */
	/* ----------------------------------------------- */
	/**
	 * Charge les plugins dans le bot.
	 */
	loadPlugins() {
		const INIT_FILENAME = __dirname.includes('dist') ? 'init.js' : 'init.ts';

		const plugins = fs.readdirSync(this._pluginsPath, { withFileTypes: true })
			.filter(dirent => dirent.isDirectory())
			.map(dirent => dirent.name);

		this.log(`${plugins.length} plugin(s) trouvé(s) !`);
		let nb_plugins_charges = 0;

		for (const plugin of plugins) {
			this.log(`Chargement du plugin '${plugin}'.`);

			const folders = fs.readdirSync(`${this._pluginsPath}/${plugin}`, { withFileTypes: true })
				.filter(dirent => dirent.isDirectory() || dirent.name === INIT_FILENAME)
				.map(dirent => dirent.name);

			if (folders.includes(INIT_FILENAME)) {
				const plug_conf = require(`${this._pluginsPath}/${plugin}/${INIT_FILENAME}`);
				if ('ENABLED' in plug_conf && !plug_conf.ENABLED) {
					this.log('Plugin ignoré car désactivé (plugin.json) !', 1);
					continue;
				}
				if ('init' in plug_conf) {
					plug_conf.init(this).then();
				}
			}

			if (folders.includes('commands')) { this.loadCommands(plugin); }
			if (folders.includes('events')) { this.loadEvents(plugin); }
			nb_plugins_charges++;
		}

		this.log(`${nb_plugins_charges} plugin(s) chargé(s) !`);
	}

	/**
	 * Charge les commandes d'un plugin dans le bot.
	 * @param plugin Le nom du plugin.
	 */
	loadCommands(plugin: string) {
		const commandsPath = `${this._pluginsPath}/${plugin}/commands`;
		// Removing the '.map' files from the resulting list to avoid a runtime error.
		// The map files are used by the Typescript debugger.
		const commands = fs.readdirSync(commandsPath, { withFileTypes: true })
			.filter(filent => filent.isFile() && !filent.name.endsWith('.map'))
			.map(filent => filent.name);

		for (const command of commands) {
			this.log(`\t commande : ${command}`);
			const data = require(`${commandsPath}/${command}`);
			if(command.split('.')[0] !== 'setup')
				this.commands.set(data.data.name, data);
		}
	}

	/**
	 * Charge les évènements d'un plugin dans le bot.
	 * @param plugin Le nom du plugin.
	 */
	loadEvents(plugin: string) {
		const eventsPath = `${this._pluginsPath}/${plugin}/events`;
		const events = fs.readdirSync(eventsPath, { withFileTypes: true })
			.filter(filent => filent.isFile() && !filent.name.endsWith('.map'))
			.map(filent => filent.name);

		for (const event of events) {
			this.log(`\t évènement : ${event}`);

			const data = require(`${eventsPath}/${event}`);
			const data_exc = async (...args: any[]) => { await data.execute(...args, this); };

			if (data.once) {
				this.once(data.name, data_exc);
			}
			else {
				this.on(data.name, data_exc);
			}
		}
	}

	/**
	 * Charge les commandes dans un serveur.
	 * @param guildId L'identifiant du serveur ciblé.
	 */
	async uploadCommands() {
		this.guilds.cache.forEach(async guild => {
			const guildId = guild.id;
			this.log('Les commandes vont être chargées dans ' + (guildId
				? `la guild '${guildId}'.`
				: 'toutes les guilds.'
			));

			const commands: ApplicationCommandDataResolvable[] = [];
			const commandsGlobal: ApplicationCommandDataResolvable[] = [];
			this.commands.map(command => {
				if (command.data.dm_permission === true) {
					commandsGlobal.push(command.data.toJSON());
				} else {
					commands.push(command.data.toJSON());
				}
				this.log(`Préparation de la commande : ${command.data.toJSON().name}`);
			});

			const rest = new REST({ version: '10' }).setToken(this.token);

			try {
				await rest.put(
					Routes.applicationGuildCommands(this.user.id, guildId),
					{ body: commands },
				);
				await rest.put(
					Routes.applicationCommands(this.user.id),
					{ body: commandsGlobal },
				);

				this.log('Fin de la mise à jour des application (/) commands !');
			}
			catch (error) {
				this.log('Un erreur est survenue durant l\'upload des commandes !', 2);
				console.error(error);
			}
		});
	}
}