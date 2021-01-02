import { CategoryCreateEdit, CategoryEditRequest } from '../../models';
import { ThunkHelperAllActions } from '../../helpers';

export enum CategoriesOperationsActionTypes {
  CreateRequest = 'CATEGORIES_OPERATIONS__CREATE_REQUEST',
  CreateSuccess = 'CATEGORIES_OPERATIONS__CREATE_SUCCESS',
  CreateError = 'CATEGORIES_OPERATIONS__CREATE_ERROR',

  EditRequest = 'CATEGORIES_OPERATIONS__EDIT_REQUEST',
  EditSuccess = 'CATEGORIES_OPERATIONS__EDIT_SUCCESS',
  EditError = 'CATEGORIES_OPERATIONS__EDIT_ERROR',

  DeleteRequest = 'CATEGORIES_OPERATIONS__DELETE_REQUEST',
  DeleteSuccess = 'CATEGORIES_OPERATIONS__DELETE_SUCCESS',
  DeleteError = 'CATEGORIES_OPERATIONS__DELETE_ERROR',
}

export type CreateCategoryActions = ThunkHelperAllActions<
  CategoriesOperationsActionTypes.CreateRequest,
  CategoriesOperationsActionTypes.CreateSuccess,
  CategoriesOperationsActionTypes.CreateError,
  number,
  CategoryCreateEdit
>;

export type EditCategoryActions = ThunkHelperAllActions<
  CategoriesOperationsActionTypes.EditRequest,
  CategoriesOperationsActionTypes.EditSuccess,
  CategoriesOperationsActionTypes.EditError,
  {},
  CategoryEditRequest
>;

export type DeleteCategoryActions = ThunkHelperAllActions<
  CategoriesOperationsActionTypes.DeleteRequest,
  CategoriesOperationsActionTypes.DeleteSuccess,
  CategoriesOperationsActionTypes.DeleteError,
  {},
  number
>;

export type CategoriesOperationsActions = CreateCategoryActions | EditCategoryActions | DeleteCategoryActions;