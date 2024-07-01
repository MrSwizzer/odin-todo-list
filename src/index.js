class TodoItem {

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    displayInfo() {
        console.log(`Title: ${this.title}`);
        console.log(`Description: ${this.description}`);
        console.log(`Due Date: ${this.dueDate}`);
        console.log(`Priority: ${this.priority}`);
    }
}


class TodoList {

    constructor(title, todos) {
        this.title = title;
        this.todos = [];
    }

    addTodo(todoItem) {
        this.todos.push(todoItem)
    }

    displayTodos() {
        this.todos.forEach((todo, index) => {
            console.log(`Todo ${index + 1}:`);
            todo.displayInfo();
            console.log('----------------------');
        });
    }
}

const todoList = new TodoList();

const todo1 = new TodoItem('Einkaufen', 'Milch, Brot, Eier kaufen', '2022-12-31', 'High');
const todo2 = new TodoItem('Sport machen', 'Eine Stunde joggen im Park', '2022-12-30', 'Medium');

todoList.addTodo(todo1);
todoList.addTodo(todo2);

todoList.displayTodos();