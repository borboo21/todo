import styles from '/Educational/Projects/VSCode/3-module/project-5/src/App.module.css';
import { useRequestEditTodo, useRequestDeleteTodo } from '../hooks';

export const TodoItem = ({ id, todo, completed, refreshProducts, todos, setTodos }) => {
	const { editId, editInput, requestEditTodo, handlerEditClick, handleEditChange } =
		useRequestEditTodo(refreshProducts);

	const { requestDeleteTodo } = useRequestDeleteTodo(refreshProducts, setTodos, todos);

	const TodoTitle = ({ todo, completed }) => {
		return (
			<div className={styles.list}>
				<input
					type="checkbox"
					className={styles.checkList}
					onClick={() => !completed}
				></input>
				<span className={styles.listText}>{todo}</span>
			</div>
		);
	};

	const TodoBtns = ({ id, todo }) => {
		return (
			<div className={styles.listBtn}>
				<button className={styles.todoBtn} onClick={() => requestDeleteTodo(id)}>
					Delete
				</button>
				<button
					className={styles.todoBtn}
					onClick={() => handlerEditClick(id, todo)}
				>
					Correct
				</button>
			</div>
		);
	};
	const EditForm = () => {
		return (
			<form className={styles.editForm}>
				<input
					className={styles.editInput}
					onChange={handleEditChange}
					value={editInput}
				></input>
				<button className={styles.saveInput} onClick={() => requestEditTodo()}>
					Save
				</button>
			</form>
		);
	};
	return (
		<>
			{editId === id ? (
				<EditForm />
			) : (
				<>
					<TodoTitle todo={todo} completed={completed} />
					<TodoBtns id={id} todo={todo} />
				</>
			)}
		</>
	);
};
