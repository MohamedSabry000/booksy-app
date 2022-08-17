import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBook, IGutendex } from '../../@types/gutendex'

export interface FavouritesState {
  favouriteResults: Array<IBook>,
}
const initialState: FavouritesState = {
  favouriteResults: [],
}

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    resetFavourites: (state) => {
      state.favouriteResults = []
    },
    addBook: (state, action: PayloadAction<IBook>) => {
      state.favouriteResults = [...state.favouriteResults, action.payload]
    },
    removeBook: (state, action: PayloadAction<IBook>) => {
      state.favouriteResults = state.favouriteResults.filter(book => book.id !== action.payload.id)
    }
  },
})

// Action creators are generated for each case reducer function
export const { resetFavourites, addBook, removeBook } = favouritesSlice.actions

export default favouritesSlice.reducer