class TodoItem {

    constructor(title, description, dueDate, priority) {
        if (typeof title !== "string" || title === "") {
            throw new Error("Title has to be a not empty string")
        }

        if (typeof description !== "string") {
            throw new Error("Description must be a string")
        }

        if (!(dueDate instanceof Date || isNaN(dueDate.getTime()))) {
            throw new Error('Due date must be a valid Date object');
        }

        if (priority.toLowerCase() !== 'low' && priority.toLowerCase() !== 'medium' && priority.toLowerCase() !== 'high') {
            throw new Error('Priority must be "low", "medium", or "high"');
        }

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
        this.finishedTodos = [];
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

const firstTodoList = new TodoList("First Todo List");

const todo1 = new TodoItem("Einkaufen", "Milch, Brot, Eier kaufen", new Date("2023-12-31"), "High");
const todo2 = new TodoItem("Sport machen", "Eine Stunde joggen im Park", new Date("2023-12-30"), "Medium");
const todo3 = new TodoItem("Hausputz", "Badezimmer und Küche putzen", new Date("2023-01-15"), "Low");
const todo4 = new TodoItem("Geburtstagsgeschenk besorgen", "Geschenk für Freundin kaufen", new Date("2023-02-10"), "High");



firstTodoList.addTodoItem(todo1);
firstTodoList.addTodoItem(todo2);
firstTodoList.addTodoItem(todo3);
firstTodoList.addTodoItem(todo4);
firstTodoList.displayTodos();

const secondTodoList = new TodoList("Second Todo List");

const todo5 = new TodoItem("Arzttermin", "Zum Zahnarzt gehen", new Date("2023-01-20"), "Medium");
const todo6 = new TodoItem("Buch lesen", "Neues Buch aus der Bibliothek lesen", new Date("2023-01-05"), "Low");
const todo7 = new TodoItem("Meeting", "Teammeeting um 10 Uhr", new Date("2023-01-10"), "High");
const todo8 = new TodoItem("Gartenarbeit", "Rasen mähen und Blumen gießen", new Date("2023-01-25"), "Medium");
const todo9 = new TodoItem("Reise planen", "Sommerurlaub buchen", new Date("2023-02-28"), "High");

secondTodoList.addTodoItem(todo5);
secondTodoList.addTodoItem(todo6);
secondTodoList.addTodoItem(todo7);
secondTodoList.addTodoItem(todo8);
secondTodoList.addTodoItem(todo9);
secondTodoList.displayTodos();

secondTodoList.deleteTodoItem(todo9);
secondTodoList.deleteTodoItem(todo6);
secondTodoList.displayTodos();

firstTodoList.markTodoItemFinished(todo3);
firstTodoList.markTodoItemFinished(todo8);
firstTodoList.displayTodos();
firstTodoList.displayFinishedTodos();


firstTodoList.editTodoItemTitle(todo4, "Complete Project Presentation");
firstTodoList.editTodoItemDescription(todo4, "Prepare slides and practice speech");
firstTodoList.editTodoItemDueDate(todo4, new Date("2022-12-15"));
firstTodoList.editTodoItemPriority(todo4, "low");
firstTodoList.displayTodos();

