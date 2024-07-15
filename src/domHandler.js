import { format } from "date-fns";

const wrapper = document.querySelector(".wrapper");

function createTodoItemDetails(todoItem) {
    const card = document.createElement("div");
    card.classList.add("card");

    const ul = document.createElement("ul");
    ul.classList.add("cardList");

    const todoTitle = document.createElement("li");
    todoTitle.classList.add("todoTitle");
    todoTitle.textContent = todoItem.title;

    const todoDescription = document.createElement("li");
    todoDescription.classList.add("todoTitle");
    todoDescription.textContent = todoItem.description;

    const todoDueDate = document.createElement("li");
    todoDueDate.classList.add("todoDueDate");
    todoDueDate.textContent = `Due Date: ${format(todoItem.dueDate, 'dd/MM/yyyy')}`;

    const todoTimeUntilDueDate = document.createElement("li");
    todoTimeUntilDueDate.classList.add("todoTimeUntilDueDate");
    todoTimeUntilDueDate.textContent = `Time until Due Date: ${todoItem.calculateTimeUntilDueDate()}`;

    const todoPriority = document.createElement("li");
    todoPriority.classList.add("todoPriority");
    todoPriority.textContent = `Priority: ${todoItem.priority}`;

    ul.appendChild(todoTitle);
    ul.appendChild(todoDescription);
    ul.appendChild(todoDueDate);
    ul.appendChild(todoTimeUntilDueDate);
    ul.appendChild(todoPriority);

    card.appendChild(ul);

    return card;
}

function createTodoItemSummary(todoItem) {
    const expandTodoButton = document.createElement("button");
    expandTodoButton.classList.add("expandTodoButton");
    expandTodoButton.style.display = "block";

    const todoTitle = document.createElement("span");
    todoTitle.classList.add("todoTitle");
    todoTitle.textContent = todoItem.title;

    const todoDueDate = document.createElement("span");
    todoDueDate.classList.add("todoDueDate");
    todoDueDate.textContent = format(todoItem.dueDate, 'dd/MM/yyyy');

    expandTodoButton.appendChild(todoTitle);
    expandTodoButton.appendChild(todoDueDate);

    expandTodoButton.addEventListener("click", () => {
        toggleTodoDetails(todoItem);

    })
    return expandTodoButton;
}

function toggleTodoDetails(todoItem) {
    const detailSection = document.querySelector(".detailSection");
    detailSection.textContent = "";

    const closeDetailsButton = document.createElement("button");
    closeDetailsButton.classList.add("closeDetailsButton");
    closeDetailsButton.textContent = "X";

    const todoItemDetails = createTodoItemDetails(todoItem);

    detailSection.appendChild(closeDetailsButton);
    detailSection.appendChild(todoItemDetails);

    closeDetailsButton.addEventListener("click", () => {
        detailSection.classList.remove('expanded');
        detailSection.querySelector('.card').remove();
        detailSection.querySelector('.closeDetailsButton').remove();
    })
}


function displayTodoList(todoList) {
    wrapper.textContent = "";

    todoList.todos.forEach(todo => {
        const todoElement = createTodoItemSummary(todo);
        wrapper.appendChild(todoElement);
    });
}

export { displayTodoList };