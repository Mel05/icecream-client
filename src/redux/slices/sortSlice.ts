import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface SortListType {
	name: string
	sortProperty: string
}

export interface SortOrderType {
	valueOrder: boolean
	orderProperty: number
}

export interface SortSliceState {
	sort: SortListType
	sortOrder: SortOrderType
}

const initialState: SortSliceState = {
	sort: {
		name: 'рейтингу',
		sortProperty: 'rating',
	},
	sortOrder: {
		valueOrder: false,
		orderProperty: -1,
	},
}

export const sortSlice = createSlice({
	name: 'sort',
	initialState,
	reducers: {
		setSort: (state, action: PayloadAction<SortListType>) => {
			state.sort = action.payload
		},

		setSortOrder: (state, action: PayloadAction<SortOrderType>) => {
			state.sortOrder = action.payload
		},
	},
})

export const selectSort = (state: RootState) => state.sortSlice.sort
export const selectSortOrder = (state: RootState) => state.sortSlice.sortOrder

export const { setSort, setSortOrder } = sortSlice.actions

export default sortSlice.reducer
