export type Car = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  images: string[];
  availableColors: string[];
  year: number;
  mileage?: string;
  fuelType?: string;
  transmission?: string;
};
