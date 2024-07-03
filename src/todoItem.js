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

export default TodoItem;