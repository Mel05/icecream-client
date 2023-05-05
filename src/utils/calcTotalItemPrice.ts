import { CartItem } from '../redux/slices/cartSlice'

export const calcTotalItemPrice = (items: any) => {
	return items.reduce(
		(sum: number, obj: any) =>
			obj['itemDate']?.totalItemPrice * obj['itemDate']?.itemCount + sum,
		0
	)
}
