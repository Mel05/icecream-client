import { useCallback, useRef, useState } from 'react'
import debounce from 'lodash.debounce'

import { useAppDispatch } from '../../hooksReduxTypes/reduxTypes'

import { setSearchValue } from '../../redux/slices/filterSlice'

import styles from './search.module.scss'

const Search: React.FC = () => {
	const dispatch = useAppDispatch()
	const inputRef = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState('')

	const onClearInput = () => {
		dispatch(setSearchValue(''))
		setValue('')
		inputRef.current?.focus()
	}

	const updateSearchValue = useCallback(
		debounce(str => {
			dispatch(setSearchValue(str))
		}, 450),
		[]
	)

	const onCgangeInput = (event: any) => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				fill='none'
				height='24'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				viewBox='0 0 24 24'
				width='24'
				xmlns='http://www.w3.org/2000/svg'
			>
				<circle cx='11' cy='11' r='8' />
				<line x1='21' x2='16.65' y1='21' y2='16.65' />
			</svg>

			<input
				ref={inputRef}
				value={value}
				onChange={onCgangeInput}
				className={styles.input}
				placeholder='Поиск мороженого ...'
			/>

			{value && (
				<svg
					onClick={onClearInput}
					className={styles.clearIcon}
					height='48'
					viewBox='0 0 48 48'
					width='48'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z' />
					<path d='M0 0h48v48h-48z' fill='none' />
				</svg>
			)}
		</div>
	)
}

export default Search
