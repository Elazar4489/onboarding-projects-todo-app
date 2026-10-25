import { TodoItem } from './TodoItem.js'

export class TodoManager{
    private tasks: TodoItem[] = [];
    private nextId: number = 1;
    private saveToLocalStorage(): void {localStorage.setItem('tasks', JSON.stringify(this.tasks));}
    private loadFromLocalStorage(): void {const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks);
            this.tasks = parsedTasks.map((taskData: any) => {
                return new TodoItem(taskData.id, taskData.title, taskData.completed);});}}
    
    
    constructor() {this.loadFromLocalStorage();}
    public toggle(id: number): void {
        const task = this.tasks.find(task => task.id == id)!;
        task.completed = !task.completed;
    }
    public addTask(title: string): TodoItem{
        const newItem = new TodoItem(this.nextId++, title, false);
        this.tasks.push(newItem);
        this.saveToLocalStorage();
        return newItem;
    }
    public getAllTasks(): TodoItem[]{
        return this.tasks;
    }
    public deleteTask(id: number): void{
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveToLocalStorage();
    }
    public updateTitle(id: number, newTitle: string): string {
        const item = this.tasks.find(task => task.id == id);
        if (item){
            item.title = newTitle;
            this.saveToLocalStorage();
            return `Titel of Task ${id} change to ${newTitle}.`
        }
        else{
            return `No task found with ID ${id}.`
        }
    }
    public deleteCompletedTasks(): void{
        this.tasks = this.tasks.filter(task => task.completed == false);
        this.saveToLocalStorage();
    }
    public deleteAllTasks(): void{
        this.tasks = []
        this.saveToLocalStorage();
    }
    public moveTask(draggedId: number, targetId: number): void {
        const from = this.tasks.findIndex(t => t.id === draggedId);
        const to = this.tasks.findIndex(t => t.id === targetId);
        if (from === -1 || to === -1) return;
        
        const [task] = this.tasks.splice(from, 1);
        this.tasks.splice(to, 0, task!);
        this.saveToLocalStorage();
    }
}