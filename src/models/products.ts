export interface ProductItem {
  id: number;
  name: string;
  caloriesCost: number;
  categoryId: number;
  categoryName: string;
}

export interface ProductDropdownItem {
  id: number;
  name: string;
}

export interface ProductCreateEdit {
  name: string;
  caloriesCost: number;
  categoryId: number;
}

export interface ProductsFilter {
  pageNumber?: number;
  pageSize: number;
  categoryId?: number;
  productName?: string;
}

export interface ProductDropdownSearchRequest {
  productNameFilter?: string;
}

export interface ProductEditRequest {
  id: number;
  product: ProductCreateEdit;
}
