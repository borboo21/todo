import './index.css';
import styles from './App.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.app}>
			<div className={styles.title}>Список дел</div>
			<div className={styles.main}>
				<div className={styles.todoList}>
					{isLoading ? (
						<div className={styles.loader}></div>
					) : (
						todos.map(({ id, title, completed }) => (
							<div className={styles.container} key={id}>
								<input
									type="checkbox"
									className={styles.checkList}
									onClick={() => !completed}
								></input>
								<div className={styles.list}>
									<span className={styles.listText}>
										{id} {title}
									</span>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};
