import { Collection, SlashCommandBuilder } from 'discord.js';


export type discordId = string | null;
export type commandsArray = Collection<string, { data: SlashCommandBuilder, execute: Function }>;

export interface ChannelType {
	_id: discordId;
	plugins: { [key: string]: boolean };
}


export interface MessageType {
	_id: discordId;
	authorId: discordId;
	channelId: discordId;
	feedMessageId?: discordId
	likes: number;
	sentToFeed: boolean;
	sentToTwitter: boolean;
	sentToReddit: boolean;
	removed: boolean;
	date: number;
	jumpUrl: string;
	content: string;
	memes: Array<AttachmentType>;
}


export interface AttachmentType {
	type: string;
	url: string;
}

