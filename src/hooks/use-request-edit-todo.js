import { useState } from 'react';

export const useRequestEditTodo = (refreshProducts) => {
	const [editId, setEditId] = useState(null);
	const [editInput, setEditInput] = useState('');
	const handleEditClick = (id, todo) => {
		setEditId(id);
		setEditInput(todo);
		console.log(editId, editInput);
	};
	const requestEditTodo = (id, todo) => {
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
			.finally(() => setEditId(null), setEditInput(''));
	};
	return { editId, setEditId, setEditInput, requestEditTodo, handleEditClick };
};
