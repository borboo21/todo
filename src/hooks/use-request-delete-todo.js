import { useState } from 'react';

export const useRequestDeleteTodo = (refreshProducts, setTodos, todos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodo = (id) => {
		setIsDeleting(true);
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				const newTodos = todos.filter((todo) => todo.id !== id);
				setTodos(newTodos);
				refreshProducts();
			})
			.finally(() => setIsDeleting(false));
	};
	return {
		isDeleting,
		requestDeleteTodo,
	};
};
