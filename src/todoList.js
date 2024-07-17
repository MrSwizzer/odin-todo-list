class TodoList {

    constructor(title) {
        // Initialize TodoList properties
        this.title = title;
        this.todos = [];
        this.finishedTodos = [];
    }

    addTodoItem(todoItem) {
        // Add a new TodoItem to the list
        this.todos.push(todoItem);
    }

    displayTodos() {
        // Display all todos in the list with their information
        console.log(this.title);
        console.log(this.todos);
        this.todos.forEach((todo, index) => {
            console.log(`Todo ${index + 1}:`);
            todo.displayInfo();
            console.log('----------------------');
        });
    }

    findTodoIndex(todoItem) {
        // Find the index of a TodoItem in the list
        return this.todos.findIndex(todo => todo === todoItem);
    }

    deleteTodoItem(todoItem) {
        // Delete a TodoItem from the list
        const index = this.findTodoIndex(todoItem);
        if (index !== -1) {
            this.todos.splice(index, 1);
            console.log('Todo deleted.');
        } else {
            console.error("Can't find Todo.");
        }
    }

    markTodoItemFinished(todoItem) {
        // Mark a TodoItem as finished and move it to the finishedTodos list
        const index = this.findTodoIndex(todoItem);
        const finishedTodo = this.todos[index];
        if (index !== -1) {
            this.todos.splice(index, 1);
            this.finishedTodos.push(finishedTodo);
            console.log('Todo marked as finished.');
        } else {
            console.error("Can't find Todo.");
        }
    }

    displayFinishedTodos() {
        // Display all finished todos in the list with their information
        console.log(this.finishedTodos);
        this.finishedTodos.forEach((todo, index) => {
            console.log(`Todo ${index + 1}:`);
            todo.displayInfo();
            console.log('----------------------');
        });
    }
}

export default TodoList;
