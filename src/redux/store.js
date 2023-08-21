import { configureStore } from '@reduxjs/toolkit'
import { filterSlice, phoneBookSlice } from './slice'


export const store = configureStore({
    reducer: {
        phoneBook: phoneBookSlice.reducer,
        filter: filterSlice.reducer,
  },
})

