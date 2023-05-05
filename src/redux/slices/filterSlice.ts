import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface FilterSliceState {
	searchValue: string
	currentPage: number
	limit: string
	categoryId: number
}

const initialState: FilterSliceState = {
	searchValue: '',
	currentPage: 1,
	limit: '3',
	categoryId: 0,
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload
		},
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload
		},

		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},

		setFilters: (state, action: PayloadAction<FilterSliceState>) => {
			state.currentPage = Number(action.payload.currentPage)
			state.categoryId = Number(action.payload.categoryId)
		},
	},
})

export const selectFilter = (state: RootState) => state.filter
export const selectCategoryId = (state: RootState) => state.filter.categoryId

export const { setSearchValue, setCategoryId, setCurrentPage, setFilters } =
	filterSlice.actions

export default filterSlice.reducer
