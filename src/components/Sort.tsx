import { useEffect, useRef, useState } from 'react'

import { GoTriangleUp, GoTriangleDown } from 'react-icons/go'

import { useAppDispatch } from '../hooksReduxTypes/reduxTypes'
import { useAppSelector } from '../hooksReduxTypes/reduxTypes'
import {
	SortListType,
	SortOrderType,
	selectSort,
	selectSortOrder,
	setSort,
	setSortOrder,
} from '../redux/slices/sortSlice'

export const sortlist = [
	{ name: 'рейтингу', sortProperty: 'rating' },
	{ name: 'цене', sortProperty: 'price' },
	{ name: 'имени', sortProperty: 'title' },
]

const SortPopup: React.FC = () => {
	const dispatch = useAppDispatch()
	const sort = useAppSelector(selectSort)
	const sortOrder = useAppSelector(selectSortOrder)
	const sortRef = useRef<HTMLDivElement>(null)

	const [open, setOpen] = useState(false)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
				setOpen(false)
			}
		}

		document.body.addEventListener('click', handleClickOutside)

		return () => document.body.removeEventListener('click', handleClickOutside)
	}, [])

	const goSortListClick = (obj: SortListType) => {
		dispatch(setSort(obj))
		setOpen(prev => !prev)
	}

	const renderSortArrow = () => {
		if (sortOrder.valueOrder === true) {
			return (
				<GoTriangleUp
					size={20}
					onClick={() =>
						goSortOrderListtClick({ valueOrder: false, orderProperty: -1 })
					}
				/>
			)
		} else {
			return (
				<GoTriangleDown
					size={20}
					onClick={() =>
						goSortOrderListtClick({ valueOrder: true, orderProperty: 1 })
					}
				/>
			)
		}
	}

	const goSortOrderListtClick = (obj: SortOrderType) => {
		dispatch(setSortOrder(obj))
	}

	return (
		<div ref={sortRef} className='sort'>
			<div className='sort__label'>
				<b> Сортировать: </b>
				<span onClick={() => setOpen(!open)}> {sort?.name}</span>
				<div> {renderSortArrow()}</div>
			</div>

			{open && (
				<div className='sort__popup'>
					<ul>
						{sortlist.map((obj, i) => (
							<li
								key={i}
								onClick={() => goSortListClick(obj)}
								className={sort.name === obj.name ? 'active' : ''}
							>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default SortPopup
