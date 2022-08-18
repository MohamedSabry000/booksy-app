import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBook, IGutendex } from '../../@types/gutendex'

export interface BooksyState {
  apiPage: number,
  count: number,  // total number of results
  next: string,  // url for next page of results
  previous: string, // url for previous page of results
  results: Array<IBook>, // array of books
  allResults: Array<IBook>, // array of all books
  allCategories: Array<{  // array of all categories
    name: string,
    books: Array<IBook>,
  }>,
  favourites: Array<IBook>, // array of favourite books
}
const initialState: BooksyState = {
  apiPage: 1,
  count: 0,
  next: '',
  previous: '',
  results: [],
  allResults: [],
  allCategories: [],
  favourites: [],
}

export const booksySlice = createSlice({
  name: 'booksy',
  initialState,
  reducers: {
    resetBooks: (state) => {
      state.apiPage = 1
      state.count = 0
      state.next = ''
      state.previous = ''
      state.results = []
      state.allResults = []
      state.allCategories = []
      state.favourites = []
    },
    setBooksy: (state, action: PayloadAction<IGutendex>) => {
      const { count, next, previous, results } = action.payload
      state.apiPage += 1
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
      console.log(action.payload)
      state.apiPage += 1
      state.next = next
      state.previous = previous
      state.allResults = [...state.allResults, ...results]
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
      // console.log(state.allResults)
    },
    toggleFavourite: (state, action: PayloadAction<IBook>) => {
      const { id } = action.payload
      const favouriteIndex = state.favourites.findIndex((book) => book.id === id)
      if (favouriteIndex === -1) {
        state.favourites.push(action.payload)
      } else {
        state.favourites.splice(favouriteIndex, 1)
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { resetBooks, setBooksy, addResults, toggleFavourite } = booksySlice.actions

export default booksySlice.reducer