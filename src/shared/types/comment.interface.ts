import { Entity } from './entity.interface.js';

export interface Comment extends Entity {
  publishedAt: number;
  rating: number;
  text: string;
  userId: number;
}
