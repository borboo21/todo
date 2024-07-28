import { useState } from 'react';

export const useFilterTodo = (findTodo) => {
	const [isFilter, setIsFilter] = useState(false);
	const displayedTasks = isFilter
		? [...findTodo].sort((a, b) => a.todo.localeCompare(b.todo))
		: findTodo;
	return {
		setIsFilter,
		displayedTasks,
		isFilter,
	};
};
