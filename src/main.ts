import { TodoManager } from "./TodoManager.js";
// יצירת אובייקט מנהל
const manager = new TodoManager();
// יצירת משתני ט"ס שמשתמשים עם האלמנטים שיש בHTML.
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addTaskBtn = document.getElementById('addTaskBtn') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;
const clearCompletedBtn = document.getElementById('clearCompletedBtn') as HTMLButtonElement;
const clearAllBtn = document.getElementById('clearAllBtn') as HTMLButtonElement;


function renderTasks(){
    taskList.innerHTML = "";
    const tasks = manager.getAllTasks();
    const sortedTasks = [...tasks].sort((a, b) => {
        return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
    });
    sortedTasks.forEach(task => {
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add('completed');
        }   
        // יצירת/הגדרת שלוש כפתורים על כל פריט ברשימה
        li.innerHTML = `
            <span>${task.title}</span>
            <div class="task-actions">
                <button class="toggle-btn">${task.completed ? 'Cancel completion' : 'Completed'}</button>
                <button class="edit-btn">Update</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;


        // גרירה עם העכבר


        // לאפשר גרירה
        li.draggable = true;
        // תחילת גרירה
        li.addEventListener('dragstart', (e) => {
            e.dataTransfer!.setData('text', task.id.toString());
        });
        // לאפשר שחרור
        li.addEventListener('dragover', (e) => e.preventDefault());
        // כפילות
        // li.addEventListener('dragstart', (e) => {
        //     e.dataTransfer!.setData('text', task.id.toString());
        // });
        // הזזת המשימה הנגררת למיקום החדש
        li.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedId = Number(e.dataTransfer!.getData('text'));
            manager.moveTask(draggedId, task.id);
            renderTasks();
        });
        li.querySelector('.toggle-btn')?.addEventListener('click', () => {
            manager.toggle(task.id); 
            renderTasks(); 
        });

        li.querySelector('.delete-btn')?.addEventListener('click', () => {
            manager.deleteTask(task.id); 
            renderTasks();
        });
        li.querySelector('.edit-btn')?.addEventListener('click', () => {
            const originTitle = task.title;
            const spanElement = li.querySelector('span') as HTMLSpanElement;
            const inputElement = document.createElement('input');
            inputElement.type = 'text';
            inputElement.value = originTitle;
            inputElement.className = 'edit-input';
            spanElement.replaceWith(inputElement);
            inputElement.focus();
            let isCancelled = false;
            const saveEdit = () => {
                if (isCancelled) return;
                const newTitle = inputElement.value.trim();
                if (newTitle !== '') {
                    manager.updateTitle(task.id, newTitle);
                }
                renderTasks(); 
            };

            const cancelEdit = () => {
                isCancelled = true;
                renderTasks(); 
            };
            inputElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    saveEdit();
                } else if (e.key === 'Escape') {
                    cancelEdit();
                }
            });
            inputElement.addEventListener('blur', () => {
                saveEdit();
            });
        });
        taskList.appendChild(li);
    });
}

function handleAddTask(){
    const text = taskInput.value.trim();
    if (text === '') return;
    manager.addTask(text);

    taskInput.value = '';
    renderTasks();
}

function handleClearCompleted() {
    manager.deleteCompletedTasks();
    renderTasks();
}

function handleClearAll() {
    manager.deleteAllTasks();
    renderTasks();
}

addTaskBtn.addEventListener('click', handleAddTask);
clearCompletedBtn.addEventListener('click', handleClearCompleted);
clearAllBtn.addEventListener('click', handleClearAll);

taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleAddTask();
    }
});


renderTasks();