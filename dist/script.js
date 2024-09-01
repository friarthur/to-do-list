"use strict";
document.addEventListener('DOMContentLoaded', () => {
    let tasks = [];
    function addTask(event) {
        event.preventDefault();
        const dateInput = document.getElementById("task-date");
        const timeInput = document.getElementById("task-time");
        const descInput = document.getElementById("task-desc");
        const statusInput = document.getElementById("task-status");
        const newTask = {
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
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
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
        // Adiciona eventos aos botões
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                editTask(index);
            });
        });
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                removeTask(index);
            });
        });
        document.querySelectorAll('.status-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                changeTaskStatus(index);
            });
        });
    }
    function editTask(index) {
        const task = tasks[index];
        document.getElementById("task-date").value = task.date;
        document.getElementById("task-time").value = task.time;
        document.getElementById("task-desc").value = task.description;
        document.getElementById("task-status").value = task.status;
        tasks.splice(index, 1);
        renderTasks();
    }
    function removeTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }
    function changeTaskStatus(index) {
        const statuses = ["pendente", "em-progresso", "concluída"];
        const currentStatus = tasks[index].status;
        const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
        tasks[index].status = nextStatus;
        renderTasks();
    }
    const taskForm = document.getElementById("task-form");
    taskForm.addEventListener("submit", addTask);
    renderTasks();
});
