import './index.css';
import styles from './App.module.css';
import { useState } from 'react';
import { FindBlock } from './components/find-block';
import { TodoPusher } from './components/todo-pusher';
import { TodoList } from './components/todo-list';
import {
	useRequestAddTodo,
	useRequestGetTodo,
	useFilterTodo,
	useFindTodo,
	useRequestDeleteTodo,
	useRequestEditTodo,
} from './hooks';

export const App = () => {
	const [refreshProductsFlag, setRefreshProductsFlag] = useState(false);
	const refreshProducts = () => setRefreshProductsFlag(!refreshProductsFlag);

	const { todos, setTodos } = useRequestGetTodo(refreshProductsFlag);
	const { isCreating, requestAddTodo, todoInput, setTodoInput } = useRequestAddTodo(
		refreshProducts,
		setTodos,
		todos,
	);
	const { findTodo, setFindValue } = useFindTodo(todos);
	const { setIsFilter, displayedTasks, isFilter } = useFilterTodo(findTodo);
	const { requestDeleteTodo } = useRequestDeleteTodo(refreshProducts, setTodos, todos);
	const { requestEditTodo } = useRequestEditTodo(refreshProducts);

	return (
		<div className={styles.app}>
			<div className={styles.title}>Список дел</div>
			<FindBlock
				setFindValue={setFindValue}
				setIsFilter={setIsFilter}
				isFilter={isFilter}
			/>
			<div className={styles.main}>
				<TodoList
					displayedTasks={displayedTasks}
					refreshProducts={refreshProducts}
					onDelete={requestDeleteTodo}
					onSave={requestEditTodo}
				/>
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
