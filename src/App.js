import './index.css';
import styles from './App.module.css';
import { useState } from 'react';
import { TodoContainer } from './todo-container';
import { FindBlock } from './find-block';
import { TodoPusher } from './todo-pusher';
import {
	useRequestAddTodo,
	useRequestGetTodo,
	useFilterTodo,
	useFindTodo,
} from './hooks';

export const App = () => {
	const [refreshProductsFlag, setRefreshProductsFlag] = useState(false);
	const refreshProducts = () => setRefreshProductsFlag(!refreshProductsFlag);

	const { isLoading, todos, setTodos } = useRequestGetTodo(refreshProductsFlag);
	const { isCreating, requestAddTodo, todoInput, setTodoInput } = useRequestAddTodo(
		refreshProducts,
		setTodos,
		todos,
	);
	const { findTodo, setFindValue } = useFindTodo(todos);
	const { setIsFilter, displayedTasks, isFilter } = useFilterTodo(findTodo);

	return (
		<div className={styles.app}>
			<div className={styles.title}>Список дел</div>
			<FindBlock
				setFindValue={setFindValue}
				setIsFilter={setIsFilter}
				isFilter={isFilter}
			/>
			<div className={styles.main}>
				<div className={styles.todoList}>
					{isLoading ? (
						<div className={styles.loader}></div>
					) : (
						displayedTasks.map(({ id, todo, completed }) => (
							<TodoContainer
								id={id}
								todo={todo}
								todos={todos}
								setTodos={setTodos}
								completed={completed}
								refreshProducts={refreshProducts}
							/>
						))
					)}
				</div>
			</div>
			<TodoPusher
				todoInput={todoInput}
				setTodoInput={setTodoInput}
				isCreating={isCreating}
				requestAddTodo={requestAddTodo}
			/>
		</div>
	);
};
