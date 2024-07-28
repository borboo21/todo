import styles from './App.module.css';
import {useRequestEditTodo,useRequestDeleteTodo} from './hooks';

export const TodoContainer = ({ id,completed,todo,refreshProducts,setTodos,todos}) => {

	const { edit, setEdit, setEditInput, requestEditTodo } =
		useRequestEditTodo(refreshProducts);

	const { requestDeleteTodo } = useRequestDeleteTodo(refreshProducts, setTodos, todos);

	return(
	<div className={styles.container} key={id}>
		{edit === id? (<form className={styles.editForm}>
			<input
			className={styles.editInput}
			onChange={(e) => setEditInput(e.target.value)}></input>
			<button
			className={styles.saveInput} onClick={() => requestEditTodo(id)}>Save</button>
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
		<button className={styles.todoBtn} onClick={() => requestDeleteTodo(id)}>
			Delete
		</button>
		<button className={styles.todoBtn} onClick={() => setEdit(id) }>Correct</button>
	</div>
	</>)}

</div>
)
}

