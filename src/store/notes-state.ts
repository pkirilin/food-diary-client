import { DataFetchState } from './data-fetch-state';
import { MealType, NoteItem } from '../models';
import { DataOperationState } from './data-operation-state';

export interface NotesState {
  list: NotesListState;
  operations: NotesOperationsState;
}

export interface NotesListState {
  noteItems: NoteItem[];
  notesForPageFetchState: DataFetchState;
  notesForMealFetchStates: NotesForMealFetchState[];
  editableNotesIds: number[];
}

export interface NotesOperationsState {
  mealOperationStatuses: MealOperationStatus[];
}

export interface NotesForMealFetchState extends DataFetchState {
  mealType: MealType;
}

export interface MealOperationStatus extends DataOperationState {
  mealType: MealType;
}
