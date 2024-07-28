import { useEffect, useState } from 'react';

export const useRequestGetTodo = (refreshProductsFlag) => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshProductsFlag]);
	return {
		isLoading,
		todos,
		setTodos,
	};
};
