import { Entity } from './entity.interface.js';

export type HotelType = 'apartment' | 'house' | 'room' | 'hotel';
export type Facility =
  | 'Breakfast'
  | 'Air conditioning'
  | 'Laptop friendly workspace'
  | 'Baby seat'
  | 'Washer'
  | 'Towels'
  | 'Fridge';
export type City = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export interface Hotel extends Entity {
  city: City;
  commentsCount: number;
  countOfGuests: number;
  countOfRooms: number;
  description: string;
  facilities: Facility[];
  isFavorite: boolean;
  isPremium: boolean;
  latitude: number;
  longitude: number;
  name: string;
  photos: string[];
  previewUrl: string;
  publishedAt: string;
  rating: number;
  rentPrice: number;
  type: HotelType;
  userId: number;
}
