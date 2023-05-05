import React from 'react'

import BackButton from '../BackButton'

const NotFoundBlock: React.FC = () => {
	return (
		<div className='cart cart--empty'>
			<h2>
				<span> 😕 </span>
				<br />
				Ничего не найдено
			</h2>
			<p>К сожалению данная страница отсутствует в нашем интернет-магазине</p>

			<BackButton />
		</div>
	)
}

export default NotFoundBlock
