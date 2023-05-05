import { CartItem } from '../redux/slices/cartSlice'
import { calcTotalItemPrice } from './calcTotalItemPrice'
import { calcTotalCount } from './calcTotalCount'

export const getCartFromLS = () => {
	const data = localStorage.getItem('cart')
	const items = data ? JSON.parse(data) : []
	const totalItemPrice = calcTotalItemPrice(items)
	const totalCount = calcTotalCount(items)

	return {
		items: items as any,
		totalItemPrice,
		totalCount,
	}
}
