import styles from '/Educational/Projects/VSCode/3-module/project-5/src/App.module.css';
import { useRequestGetTodo } from '../hooks';
import { TodoItem } from './todo-item';

export const TodoList = ({ displayedTasks, refreshProducts }) => {
	const { isLoading, todos, setTodos } = useRequestGetTodo();

	return (
		<div className={styles.todoList}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				displayedTasks.map(({ id, todo, completed }) => (
					<div className={styles.container} key={id}>
						<TodoItem
							key={id}
							id={id}
							todo={todo}
							todos={todos}
							setTodos={setTodos}
							completed={completed}
							refreshProducts={refreshProducts}
						/>
					</div>
				))
			)}
		</div>
	);
};
