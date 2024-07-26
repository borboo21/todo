import './index.css';
import styles from './App.module.css';
import { useState, useEffect } from 'react';
import { TodoContainer } from './todo-container';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshProductsFlag, setRefreshProductsFlag] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [todoInput, setTodoInput] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const [edit, setEdit] = useState(null);
	const [editInput, setEditInput] = useState('');
	const [findValue, setFindValue] = useState('');
	const [isFilter, setIsFilter] = useState(false);

	const refreshProducts = () => setRefreshProductsFlag(!refreshProductsFlag);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshProductsFlag]);

	const newTodo = {
		id: Date.now(),
		todo: todoInput,
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

	const filtredTodo = todos.filter((todoValue) => {
		return todoValue.todo.toLowerCase().includes(findValue.toLowerCase());
	});

	const displayedTasks = isFilter
		? [...filtredTodo].sort((a, b) => a.todo.localeCompare(b.todo))
		: filtredTodo;

	return (
		<div className={styles.app}>
			<div className={styles.title}>Список дел</div>
			<div className={styles.findBlock}>
				<input
					placeholder="Find your todo!"
					className={styles.finder}
					onChange={(e) => setFindValue(e.target.value)}
				></input>
				<button
					onClick={() => setIsFilter(!isFilter)}
					className={styles.filterBtn}
					style={{
						backgroundColor: isFilter ? 'lightgray' : 'buttonFace',
					}}
				>
					Аа
				</button>
			</div>
			<div className={styles.main}>
				<div className={styles.todoList}>
					{isLoading ? (
						<div className={styles.loader}></div>
					) : (
						displayedTasks.map(({ id, todo, completed }) => (
							<TodoContainer
								id={id}
								todo={todo}
								completed={completed}
								requestDeleteTodo={requestDeleteTodo}
								requestEditTodo={requestEditTodo}
								setEdit={setEdit}
								edit={edit}
								setEditInput={setEditInput}
							/>
						))
					)}
				</div>
			</div>
			<form className={styles.todoPusher}>
				<input
					className={styles.todoText}
					value={todoInput}
					onChange={(e) => setTodoInput(e.target.value)}
					placeholder="What you wanna do?"
				></input>
				<button
					className={styles.todoAdd}
					disabled={isCreating || !todoInput}
					onClick={requestAddTodo}
				>
					Add
				</button>
			</form>
		</div>
	);
};
