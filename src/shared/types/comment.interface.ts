import { Entity } from './entity.interface.js';

export interface Comment extends Entity {
	publishedAt: Date;
	rating: number;
	text: string;
	userId: number;
}
