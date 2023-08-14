import { Bot } from '@lib/bot';
import { Collection, Db } from 'mongodb';
import { guildId } from '@plugins/premium/files/config.json';

import NodeCache = require('node-cache');


export class Premium {
	private _db: Db;
	private _cache: NodeCache;
	private _premium: Collection;

	constructor(client: Bot) {
		this._db = client.dbCommons;
		this._cache = client.cache;
		this._premium = this._db.collection('premium');
	}

	/**
	 * Renvoi les roles premium.
	 */
	// async getPremiumRoles(): Promise<string[]> {
	// 	const premiumCache = this._cache.get(guildId + "_premium") as string[];
	// 	if (premiumCache) return premiumCache;

	// 	const premium = await this._premium.findOne({ _id: guildId });
	// 	if (premium) this._cache.set(guildId + "_premium", premium.value as string[]);
		
	// 	return premium.value as string[];
	// }
}