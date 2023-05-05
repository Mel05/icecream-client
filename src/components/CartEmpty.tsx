import React from 'react'
import cartEmptyImg from '../assets/img/empty-cart.png'
import BackButton from './BackButton'

const CartEmpty: React.FC = () => {
	return (
		<>
			<div className='cart cart--empty'>
				<h2>
					Корзина пустая <span> 😕 </span>
				</h2>
				<p>
					Вероятней всего, вы не заказывали ещё мороженое.
					<br />
					Для того, чтобы заказать мороженое, перейди на главную страницу.
				</p>
				<img src={cartEmptyImg} alt='Empty cart' />

				<BackButton />
			</div>
		</>
	)
}

export default CartEmpty
