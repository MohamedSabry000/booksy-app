import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBook, IGutendex } from '../../@types/gutendex'

export interface BooksyState {
  count: number,
  next: string,
  previous: string,
  results: Array<IBook>,
  allResults: Array<IBook>,

}
const initialState: BooksyState = {
  count: 0,
  next: '',
  previous: '',
  results: [],
  allResults: []
}

export const booksySlice = createSlice({
  name: 'booksy',
  initialState,
  reducers: {
    resetBooks: (state) => {
      state.count = 0
      state.next = ''
      state.previous = ''
      state.results = []
      state.allResults = []
    },
    setBooksy: (state, action: PayloadAction<IGutendex>) => {
      const { count, next, previous, results } = action.payload
      state.count = count
      state.next = next
      state.previous = previous
      state.results = results
      state.allResults = results
    },
    addResults: (state, action: PayloadAction<IGutendex>) => {
      const { count, next, previous, results } = action.payload
      state.next = next
      state.previous = previous
      state.allResults = {...state.allResults, ...results}
    }
  },
})

// Action creators are generated for each case reducer function
export const { resetBooks, setBooksy, addResults } = booksySlice.actions

export default booksySlice.reducer