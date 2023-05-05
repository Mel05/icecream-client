import React, { useState } from 'react'

import { getRequestPath } from './../../utils/getRequestPath'

import { Link } from 'react-router-dom'

import { useAppDispatch } from '../../hooksReduxTypes/reduxTypes'
import { useAppSelector } from '../../hooksReduxTypes/reduxTypes'

import {
	addItem,
	setItemId,
	selectCartItemById,
} from '../../redux/slices/cartSlice'

type IcecreamBlockProps = {
	_id: string
	title: string
	types: number[]
	sizes: number[]
	price: number
	count: number
	imageUrl: string
}

const icecreamType = ['традиционное', 'вкусное']
const icecreamSizeType = ['jun', 'mid', 'sen']

const IcecreamBlock: React.FC<IcecreamBlockProps> = ({
	_id,
	imageUrl,
	title,
	types,
	sizes,
	price,
}) => {
	const dispatch = useAppDispatch()
	const cartItem = useAppSelector(selectCartItemById(_id))
	const cartItemObj = cartItem.length ? cartItem[0] : undefined

	const [activeIcecreamType, setActiveIcecreamType] = useState(0)
	const [icecreamSize, setIcecreamSize] = useState(0)

	const addedCount = cartItemObj ? cartItemObj.itemDate?.itemCount : 0

	const onClickAdd = (_id: string, types: number[], sizes: number[]) => {
		const itemType = activeIcecreamType ? activeIcecreamType : types[0]
		const type = icecreamType[itemType]

		const itemSize = icecreamSize ? icecreamSize : sizes[0]
		const size = icecreamSizeType[itemSize]

		const cartItemId = `${_id}${type}${size}` as const

		const item: any = {
			[cartItemId]: {
				cartItemId,
				_id,
				title,
				price,
				imageUrl,
				type,
				size,
				count: 1,
			},
			itemDate: {
				cartItemId,
				_id,
				itemCount: 1,
				totalItemPrice: price,
			},
		}

		dispatch(setItemId(cartItemId))
		dispatch(addItem(item))
	}

	const { requestPath } = getRequestPath()
	const picture = `${requestPath}/uploads/${imageUrl}`

	return (
		<div className='icecream-block-wrapper'>
			<div className='icecream-block'>
				<Link to={`/icecream/${_id}`}>
					<img className='icecream-block__image' src={picture} alt='Icecream' />
					<h4 className='icecream-block__title'>{title}</h4>
				</Link>
				<div className='icecream-block__selector'>
					<ul>
						{types.map((type, index) => (
							<li
								key={type}
								onClick={() => setActiveIcecreamType(index)}
								className={activeIcecreamType === index ? 'active' : ''}
							>
								{icecreamType[type]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map(size => (
							<li
								key={size}
								onClick={() => setIcecreamSize(size)}
								className={icecreamSize === size ? 'active' : ''}
							>
								{icecreamSizeType[size]}
							</li>
						))}
					</ul>
				</div>
				<div className='icecream-block__bottom'>
					<div className='icecream-block__price'>от {price} ₽</div>
					<button
						className='button button--outline button--add'
						onClick={() => onClickAdd(_id, types, sizes)}
					>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Добавить</span>
						{cartItem?.length > 0 && addedCount > 0 && <i> {addedCount} </i>}
					</button>
				</div>
			</div>
		</div>
	)
}

export default IcecreamBlock
