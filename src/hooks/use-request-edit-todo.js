import { useState } from 'react';

export const useRequestEditTodo = (refreshProducts) => {
	const [edit, setEdit] = useState(null);
	const [editInput, setEditInput] = useState('');
	const requestEditTodo = (id) => {
		setEdit(id);
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				todo: editInput,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				refreshProducts();
			})
			.finally(() => setEdit(null));
	};
	return { edit, setEdit, setEditInput, requestEditTodo };
};
