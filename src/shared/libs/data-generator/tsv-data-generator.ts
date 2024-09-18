import { DataGenerator } from './data-generator.interface.js';
import { MockServerData } from '../../types/mock-sever-data.interface.js';
import { generateRandomNumber, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { dataConfig } from './data.config.js';
import dayjs from 'dayjs';
import { FIRST_WEEK_DAY, LAST_WEEK_DAY } from '../../constants/index.js';

export class TSVDataGenerator implements DataGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const city = getRandomItem<string>(this.mockData.city);
    const commentsCount = generateRandomNumber(
      dataConfig.commentsCount.min,
      dataConfig.commentsCount.max,
    ).toString();
    const countOfGuests = generateRandomNumber(
      dataConfig.countOfGuests.min,
      dataConfig.countOfGuests.max,
    ).toString();
    const countOfRooms = generateRandomNumber(
      dataConfig.countOfRooms.min,
      dataConfig.countOfRooms.max,
    ).toString();
    const description = getRandomItem<string>(this.mockData.description);
    const facilities = getRandomItems<string>(this.mockData.facilities).join(';');
    const isFavorite = String(Boolean(generateRandomNumber(0, 1)));
    const isPremium = String(Boolean(generateRandomNumber(0, 1)));
    const [latitude, longitude] = this.mockData.coordinates[this.mockData.city.indexOf(city)];
    const name = getRandomItem<string>(this.mockData.name);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const previewUrl = getRandomItem<string>(this.mockData.previewUrl);
    const publishedAt = dayjs()
      .subtract(generateRandomNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .unix();
    const createdAt = dayjs()
      .subtract(generateRandomNumber(LAST_WEEK_DAY, LAST_WEEK_DAY * 2), 'day')
      .unix();
    const rating = generateRandomNumber(dataConfig.rating.min, dataConfig.rating.max).toString();
    const rentPrice = generateRandomNumber(
      dataConfig.rentPrice.min,
      dataConfig.rentPrice.max,
    ).toString();
    const type = getRandomItem<string>(this.mockData.type);
    const userId = generateRandomNumber(dataConfig.userId.min, dataConfig.userId.max).toString();

    return [
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
    ].join('\t');
  }
}
