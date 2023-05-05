import React from 'react'

import {
	selectCategoryId,
	setCategoryId,
	setCurrentPage,
} from '../redux/slices/filterSlice'

import { useAppDispatch } from '../hooksReduxTypes/reduxTypes'
import { useAppSelector } from '../hooksReduxTypes/reduxTypes'

const categoriesNames = ['Все', 'PiuPiU', 'Рожок', 'Эскимо']

const Categories: React.FC = () => {
	const dispatch = useAppDispatch()
	const categoryId = useAppSelector(selectCategoryId)

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id))
		dispatch(setCurrentPage(1))
	}

	return (
		<div className='categories'>
			<ul>
				{categoriesNames.map((name, i) => (
					<li
						key={i}
						onClick={() => onChangeCategory(i)}
						className={categoryId === i ? 'active' : ''}
					>
						{name}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
