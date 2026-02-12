import type { Car } from '@/types/car';
import { CARS } from '@/constants/cars';

const MOCK_DELAY_MS = 1200;
const PAGE_SIZE = 10;

export type FetchCarsPageResult = {
  data: Car[];
  hasMore: boolean;
};

export async function fetchCarsPage(page: number): Promise<FetchCarsPageResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = page * PAGE_SIZE;
      const slice = CARS.slice(start, start + PAGE_SIZE);
      resolve({
        data: [...slice],
        hasMore: start + slice.length < CARS.length,
      });
    }, MOCK_DELAY_MS);
  });
}

export async function fetchCarById(id: string): Promise<Car | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = CARS.find((item) => item.id === id) ?? null;
      resolve(found);
    }, MOCK_DELAY_MS);
  });
}
