import { format, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

class TodoItem {
    constructor(title, description, dueDate, priority, dueTime = "12:00") {
        // Validate title input
        if (typeof title !== "string" || title === "") {
            throw new Error("Title has to be a not empty string");
        }

        // Validate description input
        if (typeof description !== "string") {
            throw new Error("Description must be a string");
        }

        // Validate dueDate input
        if (!(dueDate instanceof Date || isNaN(dueDate.getTime()))) {
            throw new Error("Due date must be a valid Date object");
        }

        // Validate priority input
        if (
            priority.toLowerCase() !== "low" &&
            priority.toLowerCase() !== "medium" &&
            priority.toLowerCase() !== "high"
        ) {
            throw new Error('Priority must be "low", "medium", or "high"');
        }

        // Initialize TodoItem properties
        this.title = title;
        this.description = description;

        // Set dueDate with optional dueTime
        if (dueTime !== null && dueTime !== "") {
            const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(dueTime)) {
                throw new Error("Due time must be in HH:mm format (24-hour clock)");
            }
            this.dueDate = new Date(dueDate.toDateString() + " " + dueTime);
        } else {
            this.dueDate = new Date(dueDate.toDateString() + " 12:00");
        }

        this.priority = priority;
    }

    calculateTimeUntilDueDate() {
        // Calculate time difference until due date
        const currentDate = new Date();
        const daysUntilDue = differenceInDays(this.dueDate, currentDate);
        const hoursUntilDue = differenceInHours(this.dueDate, currentDate);
        const minutesUntilDue = differenceInMinutes(this.dueDate, currentDate);

        // Determine and return time remaining until due date
        if (daysUntilDue > 0) {
            return `${daysUntilDue} days`;
        } else if (hoursUntilDue > 0) {
            return `${hoursUntilDue} hours`;
        } else if (minutesUntilDue >= 0) {
            return `${minutesUntilDue} minutes`;
        } else if (hoursUntilDue > -24 && hoursUntilDue < 0) {
            return `${hoursUntilDue} hours`;
        } else {
            return `${daysUntilDue} days`;
        }
    }

    displayInfo() {
        // Display TodoItem information
        console.log(`Title: ${this.title}`);
        console.log(`Description: ${this.description}`);
        console.log(`Due Date: ${format(this.dueDate, "MM/dd/yyyy")}`);
        console.log(`Time until Due Date: ${this.calculateTimeUntilDueDate()}`);
        console.log(`Priority: ${this.priority}`);
    }

    editTitle(newTitle) {
        // Edit TodoItem title
        if (typeof newTitle === "string" && newTitle !== "") {
            this.title = newTitle;
            console.log("Todo title updated successfully");
        } else {
            console.error("New title has to be a not empty string.");
        }
    }

    editDescription(newDescription) {
        // Edit TodoItem description
        if (typeof newDescription === "string") {
            this.description = newDescription;
            console.log("Todo description updated successfully.");
        } else {
            console.error("New description must be a string");
        }
    }

    editDueDate(newDueDate) {
        // Edit TodoItem due date
        if (newDueDate instanceof Date && !isNaN(newDueDate.getTime())) {
            this.dueDate = newDueDate;
            console.log("Todo due date updated successfully.");
        } else {
            console.error("New due date must be a valid Date object.");
        }
    }

    editPriority(newPriority) {
        // Edit TodoItem priority
        if (
            newPriority.toLowerCase() === "low" ||
            newPriority.toLowerCase() === "medium" ||
            newPriority.toLowerCase() === "high"
        ) {
            this.priority = newPriority;
            console.log("Todo priority updated successfully.");
        } else {
            console.error('Priority must be "low", "medium", or "high"');
        }
    }
}

export default TodoItem;
