import { getCartFromLS } from './../../utils/getCartFromLS'
import { calcTotalItemPrice } from '../../utils/calcTotalItemPrice'
import { calcTotalCount } from '../../utils/calcTotalCount'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

/////////// сложная типизация Item-а которую не получилось применить
const id = '15'
const tupe = 'pam'
const suze = 'pum'

const cartItemId = `${id}${tupe}${suze}` as const

export type CartItem<T extends string> = {
	[key in T]: {
		cartItemId: string
		_id: string
		title: string
		price: number
		imageUrl: string
		type: string
		size: string
		count: number
	}
} & {
	itemDate: {
		cartItemId: string
		_id: string
		itemCount: number
	}
}

const itemTest: CartItem<typeof cartItemId> = {
	[cartItemId]: {
		cartItemId: 'blabla',
		_id: 'blabla',
		title: 'blabla',
		price: 3,
		imageUrl: 'blabla',
		type: 'blabla',
		size: 'blabla',
		count: 3,
	},
	itemDate: {
		_id: 'blabla',
		cartItemId: 'blabla',
		itemCount: 1,
	},
}

// console.log(itemTest)
///////////

interface CartSliceState {
	itemId: string
	itemCount: number
	items: any
	totalItemPrice: number
	totalCount: number
}
const { items, totalItemPrice, totalCount } = getCartFromLS()

const initialState: CartSliceState = {
	itemId: '',
	itemCount: 0,
	items,
	totalItemPrice,
	totalCount,
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setItemId: (state, action: PayloadAction<string>) => {
			state.itemId = action.payload
		},

		setItemCount: (state, action: PayloadAction<number>) => {
			state.itemCount = action.payload
		},

		addItem: (state, action: PayloadAction<any>) => {
			const stateItemId = state.itemId

			const findProduct = state.items.find(
				(obj: any) => obj[stateItemId]?.cartItemId === stateItemId
			)

			const findProductCount = state.items.find(
				(obj: any) => obj.itemDate._id === action.payload[stateItemId]._id
			)

			if (findProduct) {
				findProduct[stateItemId].count++
				findProduct.itemDate.itemCount++
			} else if (findProductCount) {
				findProductCount.itemDate.itemCount++

				findProductCount[stateItemId] = {
					...action.payload[stateItemId],
				} as any
			} else {
				state.items.push({ ...action.payload })
			}
			state.totalItemPrice = calcTotalItemPrice(state.items)
			state.totalCount = calcTotalCount(state.items)
		},

		minusItem: (state, action: PayloadAction<string>) => {
			const stateItemId = state.itemId

			const findProduct = state.items.find(
				(obj: any) => obj[stateItemId]?.cartItemId === stateItemId
			)

			if (findProduct) {
				findProduct[stateItemId].count--
				findProduct.itemDate.itemCount--
			}

			state.totalItemPrice = calcTotalItemPrice(state.items)
			state.totalCount = calcTotalCount(state.items)
		},

		removeItem: (state, action: PayloadAction<any>) => {
			const stateItemId = state.itemId

			const findProduct = state.items.find(
				(obj: any) => obj[stateItemId]?.cartItemId === stateItemId
			)

			if (findProduct) {
				const stateItemCount = state.itemCount
				const countProduct = findProduct.itemDate.itemCount

				const count = countProduct - stateItemCount

				findProduct.itemDate.itemCount = count

				state.items = state.items.filter(
					(obj: any) => (obj = delete obj[stateItemId])
				)
			}

			state.totalItemPrice = calcTotalItemPrice(state.items)
			state.totalCount = calcTotalCount(state.items)
		},

		clearItems: state => {
			state.itemId = ''
			state.items = []
			state.totalItemPrice = 0
			state.totalCount = 0
		},
	},
})

export const selectCart = (state: RootState) => state.cart
export const selectitemId = (state: RootState) => state.cart.itemId

export const selectCartItemById = (_id: string) => (state: RootState) =>
	state.cart.items.filter((obj: any) => obj.itemDate?._id === _id)

export const {
	addItem,
	setItemId,
	setItemCount,
	minusItem,
	removeItem,
	clearItems,
} = cartSlice.actions

export default cartSlice.reducer
