export interface Ingredient {
  name: string;
  default: boolean;
  price: number;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: Ingredient[];
}