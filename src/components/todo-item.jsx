import styles from '/Educational/Projects/VSCode/3-module/project-5/src/App.module.css';
import { useState } from 'react';

export const TodoItem = ({ todo, onDelete, onSave }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [todoValue, setTodoValue] = useState(todo.title);

	const handleSave = () => {
		onSave(todo.id, todoValue);
		setIsEdit(false);
	};

	return (
		<div className={styles.container} key={todo.id}>
			<div className={styles.list}>
				<input type="checkbox" className={styles.checkList}></input>
				{isEdit ? (
					<input
						className={styles.editInput}
						onChange={({ target }) => setTodoValue(target.value)}
						value={todoValue}
					></input>
				) : (
					<span className={styles.listText}>{todo.title}</span>
				)}
			</div>
			<div className={styles.listBtn}>
				{isEdit ? (
					<button className={styles.saveInput} onClick={handleSave}>
						Save
					</button>
				) : (
					<>
						<button
							className={styles.todoBtn}
							onClick={() => onDelete(todo.id)}
						>
							Delete
						</button>
						<button
							className={styles.todoBtn}
							onClick={() => setIsEdit((prev) => !prev)}
						>
							Correct
						</button>
					</>
				)}
			</div>
		</div>
	);
};
