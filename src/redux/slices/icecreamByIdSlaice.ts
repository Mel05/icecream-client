//@ts-nocheck
import { getRequestPath } from './../../utils/getRequestPath'

import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../store'

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

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface IcecreamSliceState {
	item: IcecreamItemp
	picture: string
	status: Status
}

const initialState: IcecreamSliceState = {
	item: {},
	picture: '',
	status: Status.LOADING, // loading | success | error
}

export interface SearchIcecreamByIdParams {
	id: string | undefined
}
const { requestPath } = getRequestPath()

export const fetchIcecreamById = createAsyncThunk<
	IcecreamItem,
	SearchIcecreamByIdParams
>('icecreamById/fetchIcecreamByIdStatus', async params => {
	const { id } = params
	const { data } = await axios.get<IcecreamItem>(
		`${requestPath}/icecream/${id}`
	)

	const itemData = data

	return itemData
})

export const icecreamByIdSlice = createSlice({
	name: 'icecreamById',
	initialState,
	reducers: {},

	extraReducers: builder => {
		builder.addCase(fetchIcecreamById.pending, state => {
			state.status = Status.LOADING
			state.item = {}
		})

		builder.addCase(fetchIcecreamById.fulfilled, (state, action) => {
			state.item = action.payload
			state.picture = `${requestPath}/uploads/${action.payload.imageUrl}`
			state.status = Status.SUCCESS
		})

		builder.addCase(fetchIcecreamById.rejected, state => {
			state.status = Status.ERROR
			state.item = {}
		})
	},
})

export const selectIcecreamByIdData = (state: RootState) => state.icecreamById

export default icecreamByIdSlice.reducer
