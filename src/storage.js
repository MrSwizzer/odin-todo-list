import TodoItem from "./todoItem";
import TodoList from "./todoList";

// Converts a TodoItem to a plain object
function serializeTodoItem(todoItem) {
    return {
        title: todoItem.title,
        description: todoItem.description,
        dueDate: todoItem.dueDate.toISOString(),
        priority: todoItem.priority,
        dueTime: todoItem.dueTime,
        finished: todoItem.finished
    };
}

// Converts a plain object back to a TodoItem
function deserializeTodoItem(todoItemData) {
    const todoItem = new TodoItem(
        todoItemData.title,
        todoItemData.description,
        new Date(todoItemData.dueDate),
        todoItemData.priority,
        todoItemData.dueTime
    );
    todoItem.finished = todoItemData.finished;
    return todoItem;
}

// Converts a TodoList to a plain object
function serializeTodoList(todoList) {
    return {
        title: todoList.title,
        todos: todoList.todos.map(serializeTodoItem),
        finishedTodos: todoList.finishedTodos.map(serializeTodoItem)
    };
}

// Converts a plain object back to a TodoList
function deserializeTodoList(todoListData) {
    const todoList = new TodoList(todoListData.title);
    todoListData.todos.forEach(todoItemData => {
        todoList.addTodoItem(deserializeTodoItem(todoItemData));
    });
    todoListData.finishedTodos.forEach(todoItemData => {
        todoList.finishedTodos.push(deserializeTodoItem(todoItemData));
    });
    return todoList;
}

// Saves a single todo list to localStorage
export function saveTodoListToLocalStorage(todoList) {
    try {
        const serializedList = serializeTodoList(todoList);
        localStorage.setItem(`${todoList.title}`, JSON.stringify(serializedList));
    } catch (error) {
        console.error("Failed to save todoList to localStorage", error);
    }
}

// Retrieves all todo lists from localStorage and deserializes them
export function getTodoListsFromLocalStorage() {
    const todoLists = [];
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
        const storedData = localStorage.getItem(key);
        try {
            const parsedData = JSON.parse(storedData);
            const todoList = deserializeTodoList(parsedData);
            todoLists.push(todoList);
        } catch (error) {
            console.error(`Failed to parse todo list with key ${key}:`, error);
        }
    });

    return todoLists;
}
