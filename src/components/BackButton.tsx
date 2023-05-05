import { useNavigate } from 'react-router-dom'

const BackButton: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div className='cart__bottom-button'>
			<button
				className='button button--outline button--add go-back-btn'
				onClick={() => navigate(-1)}
			>
				<svg
					width='10'
					height='10'
					viewBox='0 0 8 14'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M7 13L1 6.93015L6.86175 1'
						stroke='#D3D3D3'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>

				<span>Вернуться назад</span>
			</button>
		</div>
	)
}

export default BackButton
