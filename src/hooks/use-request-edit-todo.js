import { useState } from 'react';

export const useRequestEditTodo = (refreshProducts) => {
	const [editId, setEditId] = useState(null);
	const [editInput, setEditInput] = useState('');

	const handlerEditClick = (id, todo) => {
		setEditId(id);
		setEditInput(todo);
		console.log(editId, editInput);
	};

	const requestEditTodo = (id, todo) => {
		setEditId(id);
		setEditInput(todo);
		fetch(`http://localhost:3005/todos/${editId}`, {
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
			.finally(() => setEditId(null));
	};
	return {
		editId,
		setEditId,
		editInput,
		setEditInput,
		requestEditTodo,
		handlerEditClick,
	};
};
