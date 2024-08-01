import styles from '/Educational/Projects/VSCode/3-module/project-5/src/App.module.css';
import { useRequestGetTodo } from '../hooks';
import { TodoItem } from './todo-item';

export const TodoList = ({ displayedTasks, refreshProducts, ...rest }) => {
	const { isLoading } = useRequestGetTodo();

	return (
		<div className={styles.todoList}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				displayedTasks.map((todo) => (
					<TodoItem
						{...rest}
						key={todo.id}
						todo={todo}
						completed={todo.completed}
						refreshProducts={refreshProducts}
					/>
				))
			)}
		</div>
	);
};
