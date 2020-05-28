import { connect } from 'react-redux';
import CategoriesListItem from './CategoriesListItem';
import { RootState, DataOperationState, DataFetchState } from '../../store';
import { Dispatch } from 'redux';
import {
  SetEditableForCategoriesAction,
  GetCategoriesListDispatch,
  DeleteCategoryDispatch,
  DeleteCategoryDispatchProp,
  GetCategoriesListDispatchProp,
  OpenModalAction,
} from '../../action-types';
import { setEditableForCategories, deleteCategory, getCategories, openConfirmationModal } from '../../action-creators';

type CategoriesListItemDispatch = Dispatch<SetEditableForCategoriesAction | OpenModalAction> &
  DeleteCategoryDispatch &
  GetCategoriesListDispatch;

export interface CategoriesListItemStateToPropsMapResult {
  categoryOperationStatus: DataOperationState;
  productOperationStatus: DataOperationState;
  productItemsFetchState: DataFetchState;
  editableCategoriesIds: number[];
}

export interface CategoriesListItemDispatchToPropsMapResult {
  setEditableForCategories: (categoriesIds: number[], editable: boolean) => void;
  openConfirmationModal: (title: string, message: string, confirm: () => void) => void;
  deleteCategory: DeleteCategoryDispatchProp;
  getCategories: GetCategoriesListDispatchProp;
}

const mapStateToProps = (state: RootState): CategoriesListItemStateToPropsMapResult => {
  return {
    categoryOperationStatus: state.categories.operations.status,
    productOperationStatus: state.products.operations.productOperationStatus,
    productItemsFetchState: state.products.list.productItemsFetchState,
    editableCategoriesIds: state.categories.list.editableCategoriesIds,
  };
};

const mapDispatchToProps = (dispatch: CategoriesListItemDispatch): CategoriesListItemDispatchToPropsMapResult => {
  const deleteCategoryProp: DeleteCategoryDispatchProp = (categoryId: number) => {
    return dispatch(deleteCategory(categoryId));
  };

  const getCategoriesProp: GetCategoriesListDispatchProp = () => {
    return dispatch(getCategories());
  };

  return {
    setEditableForCategories: (categoriesIds: number[], editable: boolean): void => {
      dispatch(setEditableForCategories(categoriesIds, editable));
    },

    openConfirmationModal: (title: string, message: string, confirm: () => void): void => {
      dispatch(openConfirmationModal(title, message, confirm));
    },

    deleteCategory: deleteCategoryProp,
    getCategories: getCategoriesProp,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListItem);
