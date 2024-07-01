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

    constructor(title) {
        this.title = title;
        this.todos = [];
    }

    addTodoItem(todoItem) {
        this.todos.push(todoItem)
    }

    displayTodos() {
        console.log(this.title);
        console.log(this.todos);
        //this.todos.forEach((todo, index) => {
        //    console.log(`Todo ${index + 1}:`);
        //    todo.displayInfo();
        //    console.log('----------------------');
        //});
    }

    deleteTodoItem(todoItem) {
        if (this.todos) {
            const index = this.todos.findIndex(todo => todo === todoItem);
            if (index !== -1) {
                this.todos.splice(index, 1);
                console.log('Todo got deleted.');
            } else {
                console.log("Couldn't find Todo.");
            }
        } else {
            console.log('TodoList is empty.');
        }
    }
}

const firstTodoList = new TodoList("First Todo List");

const todo1 = new TodoItem('Einkaufen', 'Milch, Brot, Eier kaufen', '2022-12-31', 'High');
const todo2 = new TodoItem('Sport machen', 'Eine Stunde joggen im Park', '2022-12-30', 'Medium');
const todo3 = new TodoItem('Hausputz', 'Badezimmer und Küche putzen', '2023-01-15', 'Low');
const todo4 = new TodoItem('Geburtstagsgeschenk besorgen', 'Geschenk für Freundin kaufen', '2023-02-10', 'High');


firstTodoList.addTodoItem(todo1);
firstTodoList.addTodoItem(todo2);
firstTodoList.addTodoItem(todo3);
firstTodoList.addTodoItem(todo4);
firstTodoList.displayTodos();

const secondTodoList = new TodoList("Second Todo List");

const todo5 = new TodoItem('Arzttermin', 'Zum Zahnarzt gehen', '2023-01-20', 'Medium');
const todo6 = new TodoItem('Buch lesen', 'Neues Buch aus der Bibliothek lesen', '2023-01-05', 'Low');
const todo7 = new TodoItem('Meeting', 'Teammeeting um 10 Uhr', '2023-01-10', 'High');
const todo8 = new TodoItem('Gartenarbeit', 'Rasen mähen und Blumen gießen', '2023-01-25', 'Medium');
const todo9 = new TodoItem('Reise planen', 'Sommerurlaub buchen', '2023-02-28', 'High');

secondTodoList.addTodoItem(todo5);
secondTodoList.addTodoItem(todo6);
secondTodoList.addTodoItem(todo7);
secondTodoList.addTodoItem(todo8);
secondTodoList.addTodoItem(todo9);
secondTodoList.displayTodos();

secondTodoList.deleteTodoItem(todo9);
secondTodoList.deleteTodoItem(todo6);
secondTodoList.displayTodos();