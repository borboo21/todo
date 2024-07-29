import styles from '/Educational/Projects/VSCode/3-module/project-5/src/App.module.css';

export const TodoPusher = ({todoInput,setTodoInput,isCreating,requestAddTodo}) => {
	return(
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
	)
}
