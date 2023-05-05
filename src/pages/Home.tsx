import qs from 'qs'

import { useEffect, useRef } from 'react'

import { useNavigate } from 'react-router-dom'

import { Categories, SortPopup } from '../components'
import { Pagination } from '../components/Pagination'
import { IcecreamBlock, Skeleton } from '../components/IcecreamBlock'

import { selectFilter, setFilters } from '../redux/slices/filterSlice'
import {
	fetchIcecreams,
	SearchIcecreamParams,
	selectIcecreamsData,
} from '../redux/slices/icecreamsSlice'

import { useAppDispatch, useAppSelector } from '../hooksReduxTypes/reduxTypes'
import { selectSort, selectSortOrder } from '../redux/slices/sortSlice'

const Home = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const { items, status } = useAppSelector(selectIcecreamsData)

	const { searchValue, categoryId, currentPage, limit } =
		useAppSelector(selectFilter)
	const sort = useAppSelector(selectSort)
	const sortOrder = useAppSelector(selectSortOrder)

	const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)

	const icecreams = items.map(item => (
		<IcecreamBlock key={item._id} {...item} />
	))

	const getIcecreams = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const sortBy = sort.sortProperty
		const order = sortOrder.orderProperty
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(
			fetchIcecreams({
				category,
				sortBy,
				order,
				search,
				currentPage: String(currentPage),
				limit,
			})
		)

		window.scrollTo(0, 0)
	}

	// Если изменили параметры и был первый	рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				categoryId,
				currentPage,
			})

			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, searchValue, sort, sortOrder, currentPage]) // sort

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as SearchIcecreamParams

			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					limit: params.limit,
				})
			)
			isSearch.current = true
		}
	}, [])

	// Если был первый рендер, то запрашиваем мороженое
	useEffect(() => {
		window.scrollTo(0, 0)
		if (!isSearch.current) {
			getIcecreams()
		}

		isSearch.current = false
	}, [categoryId, searchValue, sort, sortOrder, currentPage]) // sort

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories />
				<SortPopup />
			</div>
			<h2 className='content__title'> Всё мороженое </h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2> Произошла ошибка 😕 </h2>
					<p>
						К сожелению, не удалось получить мороженое. Попробуйте повторить
						попытку позже
					</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : icecreams}
				</div>
			)}
			<Pagination />
		</div>
	)
}

export default Home
