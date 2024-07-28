import styles from './App.module.css';

export const FindBlock = ({setFindValue,setIsFilter,isFilter}) => {
	return(
	<div className={styles.findBlock}>
				<input
					placeholder="Find your todo!"
					className={styles.finder}
					onChange={(e) => setFindValue(e.target.value)}
				></input>
				<button
					onClick={() => setIsFilter(!isFilter)}
					className={styles.filterBtn}
					style={{
						backgroundColor: isFilter ? 'lightgray' : 'buttonFace',
					}}
				>
					Аа
				</button>
			</div>
			)
}
