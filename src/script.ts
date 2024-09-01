document.addEventListener('DOMContentLoaded', () => {
    interface Task {
        date: string;
        time: string;
        description: string;
        status: string;
    }

    let tasks: Task[] = [];

    function addTask(event: Event) {
        event.preventDefault();

        const dateInput = document.getElementById("task-date") as HTMLInputElement;
        const timeInput = document.getElementById("task-time") as HTMLInputElement;
        const descInput = document.getElementById("task-desc") as HTMLInputElement;
        const statusInput = document.getElementById("task-status") as HTMLSelectElement;

        const newTask: Task = {
            date: dateInput.value,
            time: timeInput.value,
            description: descInput.value,
            status: statusInput.value
        };

        tasks.push(newTask);

        dateInput.value = '';
        timeInput.value = '';
        descInput.value = '';
        statusInput.value = 'pendente';

        renderTasks();
    }

    function renderTasks() {
        const taskList = document.getElementById("task-list") as HTMLUListElement;
        taskList.innerHTML = '';

        tasks.forEach((task: Task, index: number) => {
            const taskCard = document.createElement("li");
            taskCard.className = 'task-card';

            taskCard.innerHTML = `
                <div class="task-content">
                    <h3 class="task-desc">${task.description}</h3>
                    <p>${task.date} às ${task.time}</p>
                    <p class="task-status ${task.status}">${task.status}</p>
                </div>
                <div class="task-actions">
                    <button class="edit-btn" data-index="${index}">Editar</button>
                    <button class="remove-btn" data-index="${index}">Remover</button>
                    <button class="status-btn" data-index="${index}">Mudar Status</button>
                </div>
            `;

            taskList.appendChild(taskCard);
        });

       
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt((e.target as HTMLButtonElement).dataset.index!);
                editTask(index);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt((e.target as HTMLButtonElement).dataset.index!);
                removeTask(index);
            });
        });

        document.querySelectorAll('.status-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt((e.target as HTMLButtonElement).dataset.index!);
                changeTaskStatus(index);
            });
        });
    }

    function editTask(index: number) {
        const task = tasks[index];

        (document.getElementById("task-date") as HTMLInputElement).value = task.date;
        (document.getElementById("task-time") as HTMLInputElement).value = task.time;
        (document.getElementById("task-desc") as HTMLInputElement).value = task.description;
        (document.getElementById("task-status") as HTMLSelectElement).value = task.status;

        tasks.splice(index, 1); 
        renderTasks();
    }

    function removeTask(index: number) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function changeTaskStatus(index: number) {
        const statuses = ["pendente", "em-progresso", "concluída"];
        const currentStatus = tasks[index].status;
        const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];

        tasks[index].status = nextStatus;
        renderTasks();
    }

    const taskForm = document.getElementById("task-form") as HTMLFormElement;
    taskForm.addEventListener("submit", addTask);

    renderTasks();
});
