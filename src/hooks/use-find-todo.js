import { useState } from 'react';

export const useFindTodo = (todos) => {
	const [findValue, setFindValue] = useState('');
	const findTodo = todos.filter((todoValue) => {
		return todoValue.todo.toLowerCase().includes(findValue.toLowerCase());
	});
	return {
		setFindValue,
		findTodo,
	};
};
