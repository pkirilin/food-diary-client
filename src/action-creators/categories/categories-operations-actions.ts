import { Dispatch } from 'redux';
import {
  CreateCategorySuccessAction,
  CreateCategoryErrorAction,
  CreateCategoryRequestAction,
  CategoriesOperationsActionTypes,
  EditCategorySuccessAction,
  EditCategoryErrorAction,
  EditCategoryRequestAction,
  DeleteCategoryRequestAction,
  DeleteCategorySuccessAction,
  DeleteCategoryErrorAction,
  CreateCategoryActionCreator,
  CreateCategoryActions,
  EditCategoryActionCreator,
  EditCategoryActions,
  DeleteCategoryActionCreator,
  DeleteCategoryActions,
} from '../../action-types';
import { CategoryCreateEdit, CategoryEditRequest } from '../../models';
import { createCategoryAsync, editCategoryAsync, deleteCategoryAsync } from '../../services';
import { readBadRequestResponseAsync } from '../../utils/bad-request-response-reader';

const createCategoryRequest = (category: CategoryCreateEdit, operationMessage: string): CreateCategoryRequestAction => {
  return {
    type: CategoriesOperationsActionTypes.CreateRequest,
    category,
    operationMessage,
  };
};

const createCategorySuccess = (createdCategoryId: number): CreateCategorySuccessAction => {
  return {
    type: CategoriesOperationsActionTypes.CreateSuccess,
    createdCategoryId,
  };
};

const createCategoryError = (error: string): CreateCategoryErrorAction => {
  return {
    type: CategoriesOperationsActionTypes.CreateError,
    error,
  };
};

const editCategoryRequest = (request: CategoryEditRequest, operationMessage: string): EditCategoryRequestAction => {
  return {
    type: CategoriesOperationsActionTypes.EditRequest,
    request,
    operationMessage,
  };
};

const editCategorySuccess = (): EditCategorySuccessAction => {
  return {
    type: CategoriesOperationsActionTypes.EditSuccess,
  };
};

const editCategoryError = (error: string): EditCategoryErrorAction => {
  return {
    type: CategoriesOperationsActionTypes.EditError,
    error,
  };
};

const deleteCategoryRequest = (operationMessage: string): DeleteCategoryRequestAction => {
  return {
    type: CategoriesOperationsActionTypes.DeleteRequest,
    operationMessage,
  };
};

const deleteCategorySuccess = (): DeleteCategorySuccessAction => {
  return {
    type: CategoriesOperationsActionTypes.DeleteSuccess,
  };
};

const deleteCategoryError = (error: string): DeleteCategoryErrorAction => {
  return {
    type: CategoriesOperationsActionTypes.DeleteError,
    error,
  };
};

enum CategoriesOperationsBaseErrorMessages {
  Create = 'Failed to create category',
  Edit = 'Failed to update category',
  Delete = 'Failed to delete category',
}

export const createCategory: CreateCategoryActionCreator = (category: CategoryCreateEdit) => {
  return async (
    dispatch: Dispatch<CreateCategoryActions>,
  ): Promise<CreateCategorySuccessAction | CreateCategoryErrorAction> => {
    dispatch(createCategoryRequest(category, 'Creating category'));
    try {
      const response = await createCategoryAsync(category);

      if (response.ok) {
        const createdCategoryIdStr = await response.text();
        return dispatch(createCategorySuccess(+createdCategoryIdStr));
      }

      switch (response.status) {
        case 400:
          const badRequestResponse = await readBadRequestResponseAsync(response);
          alert(`${CategoriesOperationsBaseErrorMessages.Create}: ${badRequestResponse}`);
          return dispatch(
            createCategoryError(`${CategoriesOperationsBaseErrorMessages.Create}: ${badRequestResponse}`),
          );
        case 500:
          alert(`${CategoriesOperationsBaseErrorMessages.Create}: server error`);
          return dispatch(createCategoryError(`${CategoriesOperationsBaseErrorMessages.Create}: server error`));
        default:
          alert(`${CategoriesOperationsBaseErrorMessages.Create}: unknown response code`);
          return dispatch(
            createCategoryError(`${CategoriesOperationsBaseErrorMessages.Create}: unknown response code`),
          );
      }
    } catch (error) {
      console.error(error);
      alert(CategoriesOperationsBaseErrorMessages.Create);
      return dispatch(createCategoryError(CategoriesOperationsBaseErrorMessages.Create));
    }
  };
};

export const editCategory: EditCategoryActionCreator = (request: CategoryEditRequest) => {
  return async (
    dispatch: Dispatch<EditCategoryActions>,
  ): Promise<EditCategorySuccessAction | EditCategoryErrorAction> => {
    dispatch(editCategoryRequest(request, 'Updating category'));
    try {
      const response = await editCategoryAsync(request);

      if (response.ok) {
        return dispatch(editCategorySuccess());
      }

      switch (response.status) {
        case 400:
          const badRequestResponse = await readBadRequestResponseAsync(response);
          alert(`${CategoriesOperationsBaseErrorMessages.Edit}: ${badRequestResponse}`);
          return dispatch(editCategoryError(`${CategoriesOperationsBaseErrorMessages.Edit}: ${badRequestResponse}`));
        case 500:
          alert(`${CategoriesOperationsBaseErrorMessages.Edit}: server error`);
          return dispatch(editCategoryError(`${CategoriesOperationsBaseErrorMessages.Edit}: server error`));
        default:
          alert(`${CategoriesOperationsBaseErrorMessages.Edit}: unknown response code`);
          return dispatch(editCategoryError(`${CategoriesOperationsBaseErrorMessages.Edit}: unknown response code`));
      }
    } catch (error) {
      console.error(error);
      alert(CategoriesOperationsBaseErrorMessages.Edit);
      return dispatch(editCategoryError(CategoriesOperationsBaseErrorMessages.Edit));
    }
  };
};

export const deleteCategory: DeleteCategoryActionCreator = (categoryId: number) => {
  return async (
    dispatch: Dispatch<DeleteCategoryActions>,
  ): Promise<DeleteCategorySuccessAction | DeleteCategoryErrorAction> => {
    dispatch(deleteCategoryRequest('Deleting category'));
    try {
      const response = await deleteCategoryAsync(categoryId);

      if (response.ok) {
        return dispatch(deleteCategorySuccess());
      }

      switch (response.status) {
        case 400:
          const badRequestResponse = await readBadRequestResponseAsync(response);
          alert(`${CategoriesOperationsBaseErrorMessages.Delete}: ${badRequestResponse}`);
          return dispatch(
            deleteCategoryError(`${CategoriesOperationsBaseErrorMessages.Delete}: ${badRequestResponse}`),
          );
        case 500:
          alert(`${CategoriesOperationsBaseErrorMessages.Delete}: server error`);
          return dispatch(deleteCategoryError(`${CategoriesOperationsBaseErrorMessages.Delete}: server error`));
        default:
          alert(`${CategoriesOperationsBaseErrorMessages.Delete}: unknown response code`);
          return dispatch(
            deleteCategoryError(`${CategoriesOperationsBaseErrorMessages.Delete}: unknown response code`),
          );
      }
    } catch (error) {
      console.error(error);
      alert(CategoriesOperationsBaseErrorMessages.Delete);
      return dispatch(deleteCategoryError(CategoriesOperationsBaseErrorMessages.Delete));
    }
  };
};
