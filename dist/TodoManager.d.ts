import { TodoItem } from './TodoItem.js';
export declare class TodoManager {
    private tasks;
    private nextId;
    private saveToLocalStorage;
    private loadFromLocalStorage;
    constructor();
    toggle(id: number): void;
    addTask(title: string): TodoItem;
    getAllTasks(): TodoItem[];
    deleteTask(id: number): void;
    updateTitle(id: number, newTitle: string): string;
    deleteCompletedTasks(): void;
    deleteAllTasks(): void;
    moveTask(draggedId: number, targetId: number): void;
}
//# sourceMappingURL=TodoManager.d.ts.map