import { TodoItem } from './TodoItem.js';
export class TodoManager {
    tasks = [];
    nextId = 1;
    saveToLocalStorage() { localStorage.setItem('tasks', JSON.stringify(this.tasks)); }
    loadFromLocalStorage() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks);
            this.tasks = parsedTasks.map((taskData) => {
                return new TodoItem(taskData.id, taskData.title, taskData.completed);
            });
        }
    }
    constructor() { this.loadFromLocalStorage(); }
    toggle(id) {
        const task = this.tasks.find(task => task.id == id);
        task.completed = !task.completed;
    }
    addTask(title) {
        const newItem = new TodoItem(this.nextId++, title, false);
        this.tasks.push(newItem);
        this.saveToLocalStorage();
        return newItem;
    }
    getAllTasks() {
        return this.tasks;
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveToLocalStorage();
    }
    updateTitle(id, newTitle) {
        const item = this.tasks.find(task => task.id == id);
        if (item) {
            item.title = newTitle;
            this.saveToLocalStorage();
            return `Titel of Task ${id} change to ${newTitle}.`;
        }
        else {
            return `No task found with ID ${id}.`;
        }
    }
    deleteCompletedTasks() {
        this.tasks = this.tasks.filter(task => task.completed == false);
        this.saveToLocalStorage();
    }
    deleteAllTasks() {
        this.tasks = [];
        this.saveToLocalStorage();
    }
    moveTask(draggedId, targetId) {
        const from = this.tasks.findIndex(t => t.id === draggedId);
        const to = this.tasks.findIndex(t => t.id === targetId);
        if (from === -1 || to === -1)
            return;
        const [task] = this.tasks.splice(from, 1);
        this.tasks.splice(to, 0, task);
        this.saveToLocalStorage();
    }
}
//# sourceMappingURL=TodoManager.js.map