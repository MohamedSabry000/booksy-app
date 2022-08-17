import { configureStore } from '@reduxjs/toolkit'
import booksyReducer from './reducers/books'
import favouritesReducer from './reducers/favourites'

export const store = configureStore({
  reducer: {
    books: booksyReducer,
    favourites: favouritesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch