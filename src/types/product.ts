// types/product.ts
export interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
}

// types/ApiResponse.ts
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}