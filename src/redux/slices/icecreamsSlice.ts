//@ts-nocheck
import { getRequestPath } from './../../utils/getRequestPath'

import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../store'

export interface DataTypes {
	dbData: IcecreamItem[]
	paginationData: PaginationDataItem[]
}

interface IcecreamItem {
	_id: string
	title: string
	price: number
	imageUrl: string
	sizes: number[]
	types: number[]
	rating: number
	count: number
}

interface PaginationDataItem {
	lengthData: number
	totalPage: number
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface IcecreamSliceState {
	items: IcecreamItem[]
	totalPage: number
	status: Status
}

const initialState: IcecreamSliceState = {
	items: [],
	totalPage: 1,
	status: Status.LOADING, // loading | success | error
}

export interface SearchIcecreamParams {
	category: string
	sortBy: string
	order: number
	search: string
	currentPage: string
	limit: string
}

const { requestPath } = getRequestPath()

export const fetchIcecreams = createAsyncThunk<
	DataTypes[],
	SearchIcecreamParams
>('icecreams/fetchIcecreamsStatus', async params => {
	const { category, sortBy, order, search, currentPage, limit } = params
	const { data } = await axios.get<DataTypes>(
		`${requestPath}/?page=${currentPage}&limit=${limit}&${category}&sortBy=${sortBy}&order=${order}${search}`
	)

	const newData = data.dbData
	const paginationData = data.paginationData

	return { newData, paginationData }
})

export const icecreamsSlice = createSlice({
	name: 'icecreams',
	initialState,
	reducers: {},

	extraReducers: builder => {
		builder.addCase(fetchIcecreams.pending, state => {
			state.status = Status.LOADING
			state.totalPage = 1
			state.items = []
		})

		builder.addCase(fetchIcecreams.fulfilled, (state, action) => {
			state.items = action.payload.newData
			state.totalPage = action.payload.paginationData.totalPage
			state.status = Status.SUCCESS
		})

		builder.addCase(fetchIcecreams.rejected, state => {
			state.status = Status.ERROR
			state.totalPage = 1
			state.items = []
		})
	},
})

export const selectIcecreamsData = (state: RootState) => state.icecreams

export default icecreamsSlice.reducer
