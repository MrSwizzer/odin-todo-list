import "./normalize.css";
import "./style.css";

import TodoItem from "./todoItem";
import TodoList from "./todoList";
import { initializeApp } from "./domHandler";

const todoLists = [];

const firstTodoList = new TodoList("General Todo List");
todoLists.push(firstTodoList);

const todo1 = new TodoItem("Einkaufen", "Milch, Brot, Eier kaufen", new Date("2024-07-03"), "High", "14:20");
const todo2 = new TodoItem("Sport machen", "Eine Stunde joggen im Park", new Date("2025-12-30"), "Medium");
const todo3 = new TodoItem("Hausputz", "Badezimmer und Küche putzen", new Date("2025-01-15"), "Low");
const todo4 = new TodoItem("Geburtstagsgeschenk besorgen", "Geschenk für Freundin kaufen", new Date("2025-02-10"), "High");

todoLists[0].addTodoItem(todo1);
todoLists[0].addTodoItem(todo2);
todoLists[0].addTodoItem(todo3);
todoLists[0].addTodoItem(todo4);
//todoLists[0].displayTodos();

const secondTodoList = new TodoList("Daily Todo List");
todoLists.push(secondTodoList);

const todo5 = new TodoItem("Arzttermin", "Zum Zahnarzt gehen", new Date("2025-01-20"), "Medium");
const todo6 = new TodoItem("Buch lesen", "Neues Buch aus der Bibliothek lesen", new Date("2025-01-05"), "Low");
const todo7 = new TodoItem("Meeting", "Teammeeting um 10 Uhr", new Date("2025-01-10"), "High");
const todo8 = new TodoItem("Gartenarbeit", "Rasen mähen und Blumen gießen", new Date("2025-01-25"), "Medium");
const todo9 = new TodoItem("Reise planen", "Sommerurlaub buchen", new Date("2025-02-28"), "High");

todoLists[1].addTodoItem(todo5);
todoLists[1].addTodoItem(todo6);
todoLists[1].addTodoItem(todo7);
todoLists[1].addTodoItem(todo8);
todoLists[1].addTodoItem(todo9);
//todoLists[1].displayTodos();
todoLists[1].deleteTodoItem(todo9);
todoLists[1].deleteTodoItem(todo6);
//todoLists[1].displayTodos();

todoLists[0].markTodoItemFinished(todo3);
todoLists[0].markTodoItemFinished(todo8);
//todoLists[0].displayTodos();
//todoLists[0].displayFinishedTodos();

todo4.editTitle("Yellow");
todo4.editDescription("Moin");
todo4.editDueDate(new Date("2024-07-18"));
todo4.editPriority("low");
//todoLists[0].displayTodos();

initializeApp(todoLists);