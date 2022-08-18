import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBook, IGutendex } from '../../@types/gutendex'

export interface BooksyState {
  count: number,
  next: string,
  previous: string,
  results: Array<IBook>,
  allResults: Array<IBook>,
  allCategories: Array<{
    name: string,
    books: Array<IBook>,
  }>,
}
const initialState: BooksyState = {
  count: 0,
  next: '',
  previous: '',
  results: [],
  allResults: [],
  allCategories: [],
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
      state.allCategories = []
    },
    setBooksy: (state, action: PayloadAction<IGutendex>) => {
      const { count, next, previous, results } = action.payload
      state.count = count
      state.next = next
      state.previous = previous
      state.results = results
      state.allResults = results
      results.forEach((book: IBook) => {
        book.bookshelves.forEach((category: string) => {
          const categoryIndex = state.allCategories.findIndex((c) => c.name === category)
          if (categoryIndex === -1) {
            state.allCategories.push({
              name: category,
              books: [book],
            })
          } else {
            state.allCategories[categoryIndex].books.push(book)
          }
        })
      })
    },
    addResults: (state, action: PayloadAction<IGutendex>) => {
      const { count, next, previous, results } = action.payload
      state.next = next
      state.previous = previous
      state.allResults = {...state.allResults, ...results}
      results.forEach((book: IBook) => {
        book.bookshelves.forEach((category: string) => {
          const categoryIndex = state.allCategories.findIndex((c) => c.name === category)
          if (categoryIndex === -1) {
            state.allCategories.push({
              name: category,
              books: [book],
            })
          } else {
            state.allCategories[categoryIndex].books.push(book)
          }
        })
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { resetBooks, setBooksy, addResults } = booksySlice.actions

export default booksySlice.reducer