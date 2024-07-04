import { format, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

class TodoItem {

    constructor(title, description, dueDate, priority, dueTime = "12:00") {
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

        if (dueTime !== null && dueTime !== "") {
            const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(dueTime)) {
                throw new Error('Due time must be in HH:mm format (24-hour clock)');
            }
            this.dueDate = new Date(dueDate.toDateString() + " " + dueTime);
        } else {
            this.dueDate = new Date(dueDate.toDateString() + " 12:00");
        }

        this.priority = priority;
    }

    calculateTimeUntilDueDate() {
        const currentDate = new Date();
        const daysUntilDue = differenceInDays(this.dueDate, currentDate);
        const hoursUntilDue = differenceInHours(this.dueDate, currentDate);
        const minutesUntilDue = differenceInMinutes(this.dueDate, currentDate);

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
        console.log(`Title: ${this.title}`);
        console.log(`Description: ${this.description}`);
        console.log(`Due Date: ${format(this.dueDate, 'MM/dd/yyyy')}`);
        console.log(`Time until Due Date: ${this.calculateTimeUntilDueDate()}`);
        console.log(`Priority: ${this.priority}`);
    }
}

export default TodoItem;