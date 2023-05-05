import { configureStore } from '@reduxjs/toolkit'

import filter from './slices/filterSlice'
import sortSlice from './slices/sortSlice'
import cart from './slices/cartSlice'
import icecreams from './slices/icecreamsSlice'
import icecreamById from './slices/icecreamByIdSlaice'

export const store = configureStore({
	reducer: {
		filter,
		sortSlice,
		cart,
		icecreams,
		icecreamById,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
