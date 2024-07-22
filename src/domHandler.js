import { format } from "date-fns";
import TodoItem from "./todoItem";

// Function to re-render the Todo list and selection menu
function reRenderUI(todoLists, targetElement) {
  // Clear the target element
  targetElement.textContent = "";

  // Re-render the todo list selection menu
  renderTodoListSelectMenu(todoLists, targetElement);

  // Optionally, re-render the summary of the first todo list
  /* const todosWrapper = document.createElement("div");
  targetElement.appendChild(todosWrapper);
  renderTodoListSummary(todoLists[0], todosWrapper); */
}

// Function to create a summary view of a todo item
function createDetailedTodoView(todoItem) {
  // Create expand button for the todo item
  const expandTodoButton = document.createElement("button");
  expandTodoButton.classList.add("expandTodoButton");
  expandTodoButton.style.display = "block";

  // Create elements for displaying title and due date
  const todoTitle = document.createElement("span");
  todoTitle.classList.add("todoTitle");
  todoTitle.textContent = todoItem.title;

  const todoDueDate = document.createElement("span");
  todoDueDate.classList.add("todoDueDate");
  todoDueDate.textContent = format(todoItem.dueDate, "dd/MM/yyyy");

  // Append title and due date to the expand button
  expandTodoButton.appendChild(todoTitle);
  expandTodoButton.appendChild(todoDueDate);

  // Event listener to toggle details when the button is clicked
  expandTodoButton.addEventListener("click", () => {
    toggleTodoItemDetailsVisibility(todoItem);
  });

  return expandTodoButton;
}

// Function to create detailed view of a todo item
function createTodoItemDetails(todoItem) {
  // Create a card element to hold the details
  const card = document.createElement("div");
  card.classList.add("card");

  // Create a form within the card
  const form = document.createElement("form");
  form.classList.add("cardForm");

  // Create input fields for title, description, due date, and priority
  const todoTitle = document.createElement("input");
  todoTitle.classList.add("todoTitle");
  todoTitle.type = "text";
  todoTitle.value = todoItem.title;

  const todoDescription = document.createElement("textarea");
  todoDescription.classList.add("todoDescription");
  todoDescription.value = todoItem.description;

  const todoDueDate = document.createElement("input");
  todoDueDate.classList.add("todoDueDate");
  todoDueDate.type = "date";
  todoDueDate.value = todoItem.dueDate.toISOString().split('T')[0];

  const todoPriority = document.createElement("select");
  todoPriority.classList.add("todoPriority");
  const priorities = ["Low", "Medium", "High"];
  priorities.forEach((priority) => {
    const option = document.createElement("option");
    option.textContent = priority;
    option.value = priority.toLowerCase();
    if (priority.toLowerCase() === todoItem.priority.toLowerCase()) {
      option.selected = true;
    }
    todoPriority.appendChild(option);
  });

  // Create save button to update todo item details
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    todoItem.editTitle(todoTitle.value);
    todoItem.editDescription(todoDescription.value);
    todoItem.editDueDate(new Date(todoDueDate.value));
    todoItem.editPriority(todoPriority.value);

  });

  // Append input fields and save button to the form
  form.appendChild(todoTitle);
  form.appendChild(todoDescription);
  form.appendChild(todoDueDate);
  form.appendChild(todoPriority);
  form.appendChild(saveButton);

  // Append the form to the card
  card.appendChild(form);

  return card;
}

// Function to toggle display of todo item details
function toggleTodoItemDetailsVisibility(todoItem) {
  const detailSection = document.querySelector(".detailSection");
  detailSection.textContent = "";

  // Create close button to hide the details section
  const closeDetailsButton = document.createElement("button");
  closeDetailsButton.classList.add("closeDetailsButton");
  closeDetailsButton.textContent = "X";

  // Create detailed view of the todo item
  const todoItemDetails = createTodoItemDetails(todoItem);

  detailSection.appendChild(closeDetailsButton);
  detailSection.appendChild(todoItemDetails);

  // Event listener to close the details section
  closeDetailsButton.addEventListener("click", () => {
    detailSection.classList.remove("expanded");
    detailSection.querySelector(".card").remove();
    detailSection.querySelector(".closeDetailsButton").remove();
  });
}

// Function to display a list of todo items
function renderTodoListSummary(todoList, targetElement) {
  targetElement.textContent = "";

  todoList.todos.forEach((todo) => {
    const todoElement = createDetailedTodoView(todo);
    targetElement.appendChild(todoElement);
  });
}

// Function to display a selection of todo lists
function renderTodoListSelectMenu(todoLists, targetElement) {
  targetElement.textContent = "";

  const selection = document.createElement("select");
  selection.setAttribute("id", "todoListSelection")
  todoLists.forEach((todoList, index) => {
    const option = document.createElement("option");
    option.textContent = `${todoList.title}`;
    option.value = index;
    selection.appendChild(option);
  });
  targetElement.appendChild(selection);

  const todosWrapper = document.createElement("div");
  targetElement.appendChild(todosWrapper);
  renderTodoListSummary(todoLists[0], todosWrapper);

  selection.addEventListener("change", () => {
    renderTodoListSummary(todoLists[selection.value], todosWrapper);
  });
}

// Function to add a new todo item
function addTodos(todoLists) {
  const addTodoButton = document.querySelector("#addNewTodoButton");
  const todoForm = document.querySelector("#todoForm");

  addTodoButton.addEventListener("click", () => {
    if (todoForm.style.display === 'none') {
      todoForm.style.display = 'block';
    } else {
      todoForm.style.display = 'none';
    }
  })

  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = new Date(document.getElementById('dueDate').value);
    const dueTime = document.getElementById('dueTime').value;
    const priority = document.getElementById('priority').value;

    const selection = document.querySelector("#todoListSelection");
    const selectedTodoList = todoLists[selection.value];

    // Create a new Todo Item instance with the user input
    const newTodo = new TodoItem(title, description, dueDate, priority, dueTime);

    // Add the new Todo Item to the Todo List
    selectedTodoList.addTodoItem(newTodo);

    // Reset the form and hide it
    todoForm.reset();
    todoForm.style.display = 'none';

    reRenderUI(todoLists, document.querySelector(".todoListSelectionWrapper"));
  });
  
}


function renderNewTodoMenu() {
  const NewTodoMenuSection = document.createElement("div");

}
function addNewTodo(todoItem) {
  // Function implementation for adding a new todo item can be added here
}

// Function to mark a todo item as completed
function markTodoCompleted(todoItem) {
  // Function implementation for marking a todo item as completed can be added here
}

// Exporting functions for displaying todo lists and todo list selections
export { reRenderUI, addTodos };
