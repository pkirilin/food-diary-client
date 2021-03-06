import { configureStore } from '@reduxjs/toolkit';
import pagesReducer from './features/pages/slice';
import categoriesReducer from './features/categories/slice';
import productsReducer from './features/products/slice';
import notesReducer from './features/notes/slice';

const store = configureStore({
  reducer: {
    pages: pagesReducer,
    categories: categoriesReducer,
    products: productsReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
