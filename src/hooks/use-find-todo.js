import { useState } from 'react';

export const useFindTodo = (todos) => {
	const [findValue, setFindValue] = useState('');
	const findTodo = findValue
		? todos.filter((todoValue) => {
				return todoValue.title.toLowerCase().includes(findValue.toLowerCase());
			})
		: todos;
	return {
		setFindValue,
		findTodo,
	};
};
