import { CartItem } from '../redux/slices/cartSlice'

export const calcTotalCount = (items: any) => {
	return items.reduce(
		(sum: number, obj: any) => obj['itemDate']?.itemCount + sum,
		0
	)
}
