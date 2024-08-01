import { useState } from 'react';

export const useRequestEditTodo = (refreshProducts) => {
	const [editId, setEditId] = useState(null);
	const [editInput, setEditInput] = useState('');

	const requestEditTodo = (id, editInput) => {
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: editInput,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				refreshProducts();
			})
			.finally(() => setEditId(null));
	};
	return {
		editId,
		setEditId,
		editInput,
		setEditInput,
		requestEditTodo,
	};
};
