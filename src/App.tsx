import './scss/app.scss'

import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './pages/Home'

const Cart = React.lazy(
	() => import(/* webpackChunkName: "Cart" */ './pages/Cart')
)
const FullIcecream = React.lazy(
	() => import(/* webpackChunkName: "FullIcecream" */ './pages/FullIcecream')
)
const NotFound = React.lazy(
	() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
)

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<Routes>
					<Route path='/' element={<Home />} />

					<Route
						path='/cart'
						element={
							<Suspense
								fallback={<div className='container'> Идет загрузка ... </div>}
							>
								<Cart />
							</Suspense>
						}
					/>
					<Route
						path='/icecream/:id'
						element={
							<Suspense
								fallback={<div className='container'> Идет загрузка ... </div>}
							>
								<FullIcecream />
							</Suspense>
						}
					/>
					<Route
						path='*'
						element={
							<Suspense
								fallback={<div className='container'> Идет загрузка ... </div>}
							>
								<NotFound />
							</Suspense>
						}
					/>
				</Routes>
			</div>
		</div>
	)
}

export default App
