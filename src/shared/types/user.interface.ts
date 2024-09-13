import { Entity } from './entity.interface.js';

export type UserType = 'pro' | 'user';

export interface User extends Entity {
  avatarUrl?: string;
  email: string;
  name: string;
  password: string;
  type: UserType;
}
