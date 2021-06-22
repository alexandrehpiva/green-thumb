export type ApiError = {
  status: number;
  error: string;
};

export type Plant = {
  id: number;
  name: string;
  sun: string;
  water: string;
  url: string;
  price: number;
  toxicity: boolean;
  staff_favorite: boolean;
};
