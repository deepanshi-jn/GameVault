import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bookmarkedGames: [],
}

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      if (!state.bookmarkedGames.some(game => game.id === action.payload.id)) {
        state.bookmarkedGames.push(action.payload)
      }
    },
    removeBookmark: (state, action) => {
      state.bookmarkedGames = state.bookmarkedGames.filter(
        game => game.id !== action.payload
      )
    },
  },
})

export const { addBookmark, removeBookmark } = bookmarksSlice.actions

export default bookmarksSlice.reducer