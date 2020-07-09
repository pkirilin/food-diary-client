import { Action, ActionCreator } from 'redux';
import { ProductItem, ProductsFilter } from '../../models';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export enum ProductsListActionTypes {
  Request = 'PRODUCTS_LIST__REQUEST',
  Success = 'PRODUCTS_LIST__SUCCESS',
  Error = 'PRODUCTS_LIST__ERROR',
}

export interface GetProductsListRequestAction extends Action<ProductsListActionTypes.Request> {
  type: ProductsListActionTypes.Request;
  loadingMessage?: string;
}

export interface GetProductsListSuccessAction extends Action<ProductsListActionTypes.Success> {
  type: ProductsListActionTypes.Success;
  productItems: ProductItem[];
  totalProductsCount: number;
}

export interface GetProductsListErrorAction extends Action<ProductsListActionTypes.Error> {
  type: ProductsListActionTypes.Error;
  errorMessage: string;
}

export type GetProductsListActions =
  | GetProductsListRequestAction
  | GetProductsListSuccessAction
  | GetProductsListErrorAction;

export type ProductListActions = GetProductsListActions;

export type GetProductsListActionCreator = ActionCreator<
  ThunkAction<
    Promise<GetProductsListSuccessAction | GetProductsListErrorAction>,
    ProductItem[],
    ProductsFilter,
    GetProductsListSuccessAction | GetProductsListErrorAction
  >
>;

export type GetProductsListDispatch = ThunkDispatch<
  ProductItem[],
  ProductsFilter,
  GetProductsListSuccessAction | GetProductsListErrorAction
>;

export type GetProductsListDispatchProp = (
  filter: ProductsFilter,
) => Promise<GetProductsListSuccessAction | GetProductsListErrorAction>;
