import TodoItem from "./todoItem";
import TodoList from "./todoList";
import { saveToLocalStorage, getTodoListsFromLocalStorage, saveTodoListToLocalStorage } from "./storage";

// Global variables to keep track of the current TodoList and TodoItem
let currentTodoList = null;
let currentTodoItem = null;
let currentTodoLists = [];


// Creates a DOM element for a single Todo item
function createTodoElement(todoItem, onClick) {
    // Create a container for the todo item
    const element = document.createElement("div");
    element.className = "todo-item";

    // Add the title of the todo item
    const title = document.createElement("span");
    title.textContent = todoItem.title;
    element.appendChild(title);

    // Add the due date information
    const dueDate = document.createElement("span");
    dueDate.textContent = `Due in ${todoItem.calculateTimeUntilDueDate()}`;
    element.appendChild(dueDate);

    // Create and configure the 'Done' button
    const doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    // Check if the todo item is already finished
    doneButton.disabled = currentTodoList.finishedTodos.includes(todoItem);
    doneButton.style.display = doneButton.disabled ? "none" : "inline";
    // Prevent event propagation and mark the todo item as finished when the button is clicked
    doneButton.addEventListener("click", (e) => {
        e.stopPropagation();
        markTodoAsFinished(todoItem);
    });

    // Append the 'Done' button to the todo item
    element.appendChild(doneButton);
    // Set up click event to display details of the todo item
    element.addEventListener("click", () => onClick(todoItem));

    return element;
}

// Marks a todo item as finished and updates the display
function markTodoAsFinished(todoItem) {
    // Mark the todo item as finished in the current todo list
    currentTodoList.markTodoItemFinished(todoItem);
    // Refresh the todo list display
    updateTodoDisplay();
}

// Updates the todo display based on whether finished items should be shown
function updateTodoDisplay(showFinished = false) {
    if (currentTodoList) {
        displayTodos(currentTodoList, showFinished);
    }
}

// Displays all todo items in the specified todo list
function displayTodos(todoList, showFinished) {
    const container = document.getElementById("todosContainer");
    container.innerHTML = ""; // Clear previous todos

    // Filter todos based on whether finished items should be displayed
    const todos = showFinished ? todoList.finishedTodos : todoList.todos.filter(todo => !todo.finished);
    todos.forEach(todoItem => {
        // Create a DOM element for each todo item and add it to the container
        const todoElement = createTodoElement(todoItem, displayTodoDetails);
        container.appendChild(todoElement);
    });
}

// Displays all todo lists in the sidebar
function displayTodoLists(todoLists) {
    const container = document.querySelector(".todoListContainer");
    container.innerHTML = ""; // Clear previous todo lists

    // Create and add an element for each todo list
    todoLists.forEach(todoList => {
        const element = document.createElement("div");
        element.textContent = todoList.title;
        // Set up click event to set the current todo list and display its todos
        element.addEventListener("click", () => {
            currentTodoList = todoList;
            updateTodoDisplay();
        });
        container.appendChild(element);
    });

    // Automatically display todos for the first todo list if any exist
    if (todoLists.length > 0) {
        currentTodoList = todoLists[0];
        updateTodoDisplay();
    }
}

// Displays the details of the selected todo item
function displayTodoDetails(todoItem) {
    currentTodoItem = todoItem;

    const details = document.getElementById("todoDetails");
    details.innerHTML = `
        <form id="todoDetailForm">
            <label for="detailTitle">Title:</label>
            <input type="text" id="detailTitle" value="${todoItem.title}" required /><br/>
            <label for="detailDescription">Description:</label>
            <textarea id="detailDescription" required>${todoItem.description}</textarea><br/>
            <label for="detailDueDate">Due Date:</label>
            <input type="date" id="detailDueDate" value="${todoItem.dueDate.toISOString().split('T')[0]}" required /><br/>
            <label for="detailDueTime">Due Time:</label>
            <input type="time" id="detailDueTime" value="${todoItem.dueDate.toTimeString().slice(0, 5)}" /><br/>
            <label for="detailPriority">Priority:</label>
            <select id="detailPriority">
                <option value="low" ${todoItem.priority === 'low' ? 'selected' : ''}>Low</option>
                <option value="medium" ${todoItem.priority === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="high" ${todoItem.priority === 'high' ? 'selected' : ''}>High</option>
            </select><br/>
            <button type="submit">Save Changes</button>
        </form>
        <button id="closeDetailSectionButton">Close</button>
        <button id="deleteTodoButton">Delete</button>
    `;

    // Show the detail section
    document.querySelector(".detailSection").style.display = "block";
    // Set up the form and buttons for the todo details
    setupDetailForm();
}

// Sets up form submission and button click handlers for the todo details
function setupDetailForm() {
    const form = document.getElementById("todoDetailForm");

    form.onsubmit = (e) => {
        e.preventDefault();
        try {
            // Retrieve and validate the updated details
            const title = document.getElementById("detailTitle").value;
            const description = document.getElementById("detailDescription").value;
            const dueDate = new Date(document.getElementById("detailDueDate").value);
            const dueTime = document.getElementById("detailDueTime").value;
            const priority = document.getElementById("detailPriority").value;

            if (!title || !description || !dueDate || !priority) {
                throw new Error("All fields are required.");
            }

            // Update the todo item with the new details
            currentTodoItem.editTitle(title);
            currentTodoItem.editDescription(description);
            currentTodoItem.editDueDate(new Date(`${dueDate.toDateString()} ${dueTime}`));
            currentTodoItem.editPriority(priority);

            // Refresh the todo list display
            updateTodoDisplay();
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };

    // Close the detail section when the 'Close' button is clicked
    document.getElementById("closeDetailSectionButton").onclick = () => {
        document.querySelector(".detailSection").style.display = "none";
    };

    // Delete the todo item when the 'Delete' button is clicked
    document.getElementById("deleteTodoButton").onclick = () => {
        if (currentTodoItem) {
            currentTodoList.deleteTodoItem(currentTodoItem);
            updateTodoDisplay();
            document.querySelector(".detailSection").style.display = "none";
        }
    };
}

// Event listener for the button to show finished todos
document.getElementById("showFinishedTodosButton").addEventListener("click", () => {
    updateTodoDisplay(true);
});

// Event listener for the button to toggle the visibility of the new todo form
document.getElementById("addNewTodoButton").addEventListener("click", () => {
    const form = document.getElementById("todoForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
});

// Handles form submission for adding a new todo
document.getElementById("todoForm").onsubmit = (e) => {
    e.preventDefault();

    const title = document.getElementById("formTitle").value;
    const description = document.getElementById("formDescription").value;
    const dueDate = new Date(document.getElementById("formDueDate").value);
    const dueTime = document.getElementById("formDueTime").value;
    const priority = document.getElementById("formPriority").value;

    try {
        // Validate input fields
        if (!title || !description || !dueDate || !priority) {
            throw new Error("All fields are required.");
        }

        // Add the new todo item to the current todo list
        if (currentTodoList) {
            const newTodo = new TodoItem(title, description, dueDate, priority, dueTime);
            currentTodoList.addTodoItem(newTodo);
            updateTodoDisplay();
            document.getElementById("todoForm").reset();
            document.getElementById("todoForm").style.display = "none";
        }
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
};

// New event listeners for adding and deleting todo lists
document.getElementById("addNewTodoListButton").addEventListener("click", () => {
    document.getElementById("newTodoListForm").style.display = "block";
});

document.getElementById("saveTodoListButton").addEventListener("click", () => {
    const title = document.getElementById("todoListTitle").value;
    if (title) {
        const newTodoList = new TodoList(title);
        currentTodoLists.push(newTodoList);
        displayTodoLists(currentTodoLists);
        displayTodos(newTodoList);
        document.getElementById("newTodoListForm").style.display = "none";
        saveTodoListToLocalStorage(newTodoList);
    }
});

document.getElementById("cancelTodoListButton").addEventListener("click", () => {
    document.getElementById("newTodoListForm").style.display = "none";
});

document.getElementById("deleteCurrentTodoListButton").addEventListener("click", () => {
    if (currentTodoList) {
        const index = currentTodoLists.indexOf(currentTodoList);
        if (index !== -1) {
            currentTodoLists.splice(index, 1);
            currentTodoList = currentTodoLists.length > 0 ? currentTodoLists[0] : null;
            displayTodoLists(currentTodoLists);
        }
    }
});

// Initializes the application with the provided todo lists
function initializeApp(todoLists) {
    const savedTodoLists = getTodoListsFromLocalStorage();
    if (savedTodoLists.length > 0) {
        currentTodoLists = savedTodoLists;
    } else {
        currentTodoLists = todoLists;
    }
    displayTodoLists(currentTodoLists);
}

export { initializeApp, displayTodos, displayTodoDetails, displayTodoLists };
