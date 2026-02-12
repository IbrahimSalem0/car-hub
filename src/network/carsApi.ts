import type { Car } from '@/types/car';
import { CARS } from '@/constants/cars';

const MOCK_DELAY_MS = 1200;

export async function fetchCars(): Promise<Car[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...CARS]);
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
