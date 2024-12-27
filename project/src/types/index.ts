export interface Client {
  id: number;
  name: string;
  age: number;
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  matricule: string;
  clientId: number;
}