import React from 'react'
import ReactPaginate from 'react-paginate'

import { selectFilter, setCurrentPage } from '../../redux/slices/filterSlice'

import { useAppDispatch } from '../../hooksReduxTypes/reduxTypes'
import { useAppSelector } from '../../hooksReduxTypes/reduxTypes'

import styles from './pagination.module.scss'
import { selectIcecreamsData } from '../../redux/slices/icecreamsSlice'

const Pagination: React.FC = () => {
	const dispatch = useAppDispatch()
	const { currentPage } = useAppSelector(selectFilter)
	const { totalPage } = useAppSelector(selectIcecreamsData)
	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page))
	}

	if (totalPage === 1 || totalPage === 0) return null

	return (
		<>
			<ReactPaginate
				className={styles.root}
				breakLabel='...'
				nextLabel='>'
				previousLabel='<'
				onPageChange={event => onChangePage(event.selected + 1)}
				// pageRangeDisplayed={1}
				pageCount={totalPage}
				forcePage={currentPage - 1}
			/>
		</>
	)
}

export default Pagination
