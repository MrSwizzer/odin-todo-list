import { format } from "date-fns";

const wrapper = document.querySelector(".wrapper");

function createTodoItem(todoItem) {
    const card = document.createElement("div");
    card.classList.add("card");

    const ul = document.createElement("ul");
    ul.classList.add("cardList");

    const todoTitle = document.createElement("li");
    todoTitle.classList.add("todoTitle");
    todoTitle.textContent = todoItem.title;
    ul.appendChild(todoTitle);

    const todoDescription = document.createElement("li");
    todoDescription.classList.add("todoTitle");
    todoDescription.textContent = todoItem.description;
    ul.appendChild(todoDescription);

    const todoDueDate = document.createElement("li");
    todoDueDate.classList.add("todoDueDate");
    todoDueDate.textContent = `Due Date: ${format(todoItem.dueDate, 'dd/MM/yyyy')}`;
    ul.appendChild(todoDueDate);

    const todoTimeUntilDueDate = document.createElement("li");
    todoTimeUntilDueDate.classList.add("todoTimeUntilDueDate");
    todoTimeUntilDueDate.textContent = `Time until Due Date: ${todoItem.calculateTimeUntilDueDate()}`;
    ul.appendChild(todoTimeUntilDueDate);

    const todoPriority = document.createElement("li");
    todoPriority.classList.add("todoPriority");
    todoPriority.textContent = `Priority: ${todoItem.priority}`;
    ul.appendChild(todoPriority);

    card.appendChild(ul);

    return card;
}

function displayTodoList(todoList) {
    wrapper.textContent = "";

    todoList.todos.forEach(todo => {
        const todoElement = createTodoItem(todo);
        wrapper.appendChild(todoElement);
    });
}

export {displayTodoList};