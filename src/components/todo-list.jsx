import styles from '/Educational/Projects/VSCode/3-module/project-5/src/App.module.css';
import {useRequestEditTodo,useRequestDeleteTodo,useRequestGetTodo} from '../hooks';

export const TodoList = ({ displayedTasks,refreshProductsFlag, refreshProducts}) => {

	const { isLoading, todos, setTodos } = useRequestGetTodo(refreshProductsFlag);

	const { editId, setEditInput, editInput, requestEditTodo, handlerEditClick } =
		useRequestEditTodo(refreshProducts);

	const { requestDeleteTodo } = useRequestDeleteTodo(refreshProducts, setTodos, todos);

	return(
	<div className={styles.todoList}>
		{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				displayedTasks.map(({ id, todo, completed }) => (
					<div className={styles.container} key={id}>
					{editId === id? (<form className={styles.editForm}>
						<input
						className={styles.editInput}
						onChange={(e) => setEditInput(e.target.value)}
						value={editInput}
						></input>
						<button
						className={styles.saveInput}
						onClick={() => requestEditTodo(id,todo)}>Save</button>
					</form>):(<>
						<div className={styles.list}>
					<input
						type="checkbox"
						className={styles.checkList}
						onClick={() => !completed}
					></input>
					<span className={styles.listText}>{todo}</span>
				</div>
				<div className={styles.listBtn}>
					<button className={styles.todoBtn}
							onClick={() => requestDeleteTodo(id)}>
						Delete
					</button>
					<button className={styles.todoBtn}
							onClick={() => handlerEditClick(id,todo)}>Correct</button>
				</div>
				</>)}
			</div>
				))
			)}
	</div>)}
