import TodoItem from "./todoItem";
import TodoList from "./todoList";

const firstTodoList = new TodoList("First Todo List");

const todo1 = new TodoItem("Einkaufen", "Milch, Brot, Eier kaufen", new Date("2024-07-03"), "High", "14:20");
const todo2 = new TodoItem("Sport machen", "Eine Stunde joggen im Park", new Date("2025-12-30"), "Medium");
const todo3 = new TodoItem("Hausputz", "Badezimmer und Küche putzen", new Date("2025-01-15"), "Low");
const todo4 = new TodoItem("Geburtstagsgeschenk besorgen", "Geschenk für Freundin kaufen", new Date("2025-02-10"), "High");

firstTodoList.addTodoItem(todo1);
firstTodoList.addTodoItem(todo2);
firstTodoList.addTodoItem(todo3);
firstTodoList.addTodoItem(todo4);
firstTodoList.displayTodos();

const secondTodoList = new TodoList("Second Todo List");

const todo5 = new TodoItem("Arzttermin", "Zum Zahnarzt gehen", new Date("2025-01-20"), "Medium");
const todo6 = new TodoItem("Buch lesen", "Neues Buch aus der Bibliothek lesen", new Date("2025-01-05"), "Low");
const todo7 = new TodoItem("Meeting", "Teammeeting um 10 Uhr", new Date("2025-01-10"), "High");
const todo8 = new TodoItem("Gartenarbeit", "Rasen mähen und Blumen gießen", new Date("2025-01-25"), "Medium");
const todo9 = new TodoItem("Reise planen", "Sommerurlaub buchen", new Date("2025-02-28"), "High");

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
firstTodoList.editTodoItemDueDate(todo4, new Date("2024-07-04"));
firstTodoList.editTodoItemPriority(todo4, "low");
firstTodoList.displayTodos();

