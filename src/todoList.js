class TodoList {

    constructor(title) {
        this.title = title;
        this.todos = [];
        this.finishedTodos = [];
    }

    addTodoItem(todoItem) {
        this.todos.push(todoItem)
    }

    displayTodos() {
        console.log(this.title);
        console.log(this.todos);
        this.todos.forEach((todo, index) => {
            console.log(`Todo ${index + 1}:`);
            todo.displayInfo();
            console.log('----------------------');
        });
    }

    findTodoIndex(todoItem) {
        return this.todos.findIndex(todo => todo === todoItem);
    }

    deleteTodoItem(todoItem) {
        const index = this.findTodoIndex(todoItem);
        if (index !== -1) {
            this.todos.splice(index, 1);
            console.log('Todo deleted.');
        } else {
            console.error("Can't find Todo.");

        }

    }

    markTodoItemFinished(todoItem) {
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
        console.log(this.finishedTodos);
        this.finishedTodos.forEach((todo, index) => {
            console.log(`Todo ${index + 1}:`);
            todo.displayInfo();
            console.log('----------------------');
        });
    }

    editTodoItemTitle(todoItem, newTitle) {
        const index = this.findTodoIndex(todoItem);
        if (index !== -1) {
            if (typeof newTitle === "string" && newTitle !== "") {
                this.todos[index].title = newTitle;
                console.log('Todo title updated successfull');
            } else {
                console.error("New title has to be a not empty string.");
            }
        } else {
            console.error("Can't find Todo.");
        }
    }

    editTodoItemDescription(todoItem, newDescription) {
        const index = this.findTodoIndex(todoItem);
        if (index !== -1) {
            if (typeof newDescription === "string") {
                this.todos[index].description = newDescription;
                console.log('Todo description updated successfully.');
            } else {
                console.error("New description must be a string");
            }

        } else {
            console.error("Can't find Todo.");
        }
    }

    editTodoItemDueDate(todoItem, newDueDate) {
        const index = this.findTodoIndex(todoItem);
        if (index !== -1) {
            if (newDueDate instanceof Date && !isNaN(newDueDate.getTime())) {
                this.todos[index].dueDate = newDueDate;
                console.log('Todo due date updated successfully.');
            } else {
                console.error("New due date must be a valid Date object.");
            }

        } else {
            console.error("Can't find Todo.");
        }
    }

    editTodoItemPriority(todoItem, newPriority) {
        const index = this.findTodoIndex(todoItem);
        if (index !== -1) {
            if (newPriority.toLowerCase() === 'low' || newPriority.toLowerCase() === 'medium' || newPriority.toLowerCase() === 'high') {
                this.todos[index].priority = newPriority;
                console.log('Todo priority updated successfully.');
            } else {
                console.error('Priority must be "low", "medium", or "high"');
            }

        } else {
            console.error("Can't find Todo.");
        }
    }
}

export default TodoList;