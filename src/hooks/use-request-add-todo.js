import { useState } from 'react';

export const useRequestAddTodo = (refreshProducts, setTodos, todos) => {
	const [isCreating, setIsCreating] = useState(false);
	const [todoInput, setTodoInput] = useState('');
	const newTodo = {
		id: Date.now().toString(),
		title: todoInput,
		complete: false,
	};
	const requestAddTodo = () => {
		setIsCreating(true);
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(newTodo),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo add:', response);
				setTodos([...todos, response]);
				setTodoInput('');
				refreshProducts();
			})

			.finally(() => setIsCreating(false));
	};
	return {
		isCreating,
		requestAddTodo,
		todoInput,
		setTodoInput,
	};
};
