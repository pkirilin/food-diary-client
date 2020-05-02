import { connect } from 'react-redux';
import PageContentHeader from './PageContentHeader';
import { FoodDiaryState } from '../../store';
import { PageItem } from '../../models';

export interface PageContentHeaderStateToPropsMapResult {
  pageItems: PageItem[];
  isPageContentLoading: boolean;
  isPageOperationInProcess: boolean;
}

const mapStateToProps = (state: FoodDiaryState): PageContentHeaderStateToPropsMapResult => {
  return {
    pageItems: state.pages.list.pageItems,
    isPageContentLoading: state.notes.list.notesForPageFetchState.loading,
    isPageOperationInProcess: state.pages.operations.status.performing,
  };
};

export default connect(mapStateToProps)(PageContentHeader);
