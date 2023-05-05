import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooksReduxTypes/reduxTypes'
import {
	fetchIcecreamById,
	selectIcecreamByIdData,
} from '../redux/slices/icecreamByIdSlaice'
import BackButton from '../components/BackButton'

const icecreamType = ['традиционное', 'вкусное']
const icecreamSizeType = ['jun', 'mid', 'sen']

const FullIcecream: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [activeIcecreamType, setActiveIcecreamType] = useState(0)
	const [icecreamSize, setIcecreamSize] = useState(0)

	const { id } = useParams<string>()

	const { item, status, picture } = useAppSelector(selectIcecreamByIdData)

	const isLoading = status === 'success'
	const icecream = item

	useEffect(() => {
		const gofetchIcecreamById = async (id: string | undefined) => {
			try {
				dispatch(fetchIcecreamById({ id }))
			} catch (error) {
				alert('Ошибка при получении мороженого')
				navigate('/')
			}
		}

		gofetchIcecreamById(id)
	}, [])

	if (!isLoading) {
		return (
			<div className='container'>
				<h2> 'Загрузка ...' </h2>
			</div>
		)
	}

	return (
		<div className='fullIcecream-block'>
			<div className='fullIcecream-container'>
				<img
					className='fullIcecream-container__image'
					src={picture}
					alt='Icecream'
				/>
				<h4 className='fullIcecream-container__title'>{icecream.title}</h4>

				<div className='fullIcecream-container__selector'>
					<ul>
						{icecream.types.map((type: number, index: number) => (
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
						{icecream.sizes.map((size: number) => (
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

				<div className='fullIcecream-container__price'>
					от {icecream.price} ₽
				</div>

				<div>
					<BackButton />
				</div>
			</div>
		</div>
	)
}

export default FullIcecream
