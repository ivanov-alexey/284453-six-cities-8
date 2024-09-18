import { FileParser } from './file-parser.interface.js';
import { Hotel } from '../../types/index.js';
import { generateRandomNumber } from '../../helpers/index.js';

export class TSVFileParser implements FileParser {
  private parseBoolean(value: string): boolean {
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        throw new Error(`Value ${value} must be a boolean`);
    }
  }

  private parseNumber(value: string): number {
    const convertedValue = +value;

    if (isNaN(convertedValue)) {
      throw new Error(`Value ${value} must be a number`);
    }

    return convertedValue;
  }

  private parseArrayOfStrings(value: string): string[] {
    return value.split(';');
  }

  public parseLine(line: string): Hotel {
    const [
      name,
      description,
      createdAt,
      publishedAt,
      city,
      previewUrl,
      photos,
      isPremium,
      isFavorite,
      rating,
      type,
      countOfRooms,
      countOfGuests,
      rentPrice,
      facilities,
      userId,
      commentsCount,
      latitude,
      longitude,
    ] = line.split('\t');

    // todo: fix types
    return {
      id: generateRandomNumber(100, 1000),
      name,
      description,
      createdAt: this.parseNumber(createdAt),
      publishedAt: this.parseNumber(publishedAt),
      city: city as Hotel['city'],
      previewUrl,
      photos: this.parseArrayOfStrings(photos),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: this.parseNumber(rating),
      type: type as Hotel['type'],
      countOfRooms: this.parseNumber(countOfRooms),
      countOfGuests: this.parseNumber(countOfGuests),
      rentPrice: this.parseNumber(rentPrice),
      facilities: this.parseArrayOfStrings(facilities) as Hotel['facilities'],
      userId: this.parseNumber(userId),
      commentsCount: this.parseNumber(commentsCount),
      latitude: this.parseNumber(latitude),
      longitude: this.parseNumber(longitude),
    };
  }
}
