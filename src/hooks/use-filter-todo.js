import { useState } from 'react';

export const useFilterTodo = (findTodo) => {
	const [isFilter, setIsFilter] = useState(false);
	const displayedTasks = isFilter
		? [...findTodo].sort((a, b) => a.title.localeCompare(b.title))
		: findTodo;
	return {
		setIsFilter,
		displayedTasks,
		isFilter,
	};
};
