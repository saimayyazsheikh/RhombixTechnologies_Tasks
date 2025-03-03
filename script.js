document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';

        // Sort tasks based on priority
        tasks.sort((a, b) => {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = `${task.text} (${task.priority})`;
            li.setAttribute('data-priority', task.priority);

            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';

            const editButton = document.createElement('button');
            editButton.className = 'edit';
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editTask(index));

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(index));

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);

            li.appendChild(buttonContainer);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskPriority = prioritySelect.value;

        if (taskText) {
            tasks.push({ text: taskText, priority: taskPriority });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            renderTasks();
        }
    }

    function editTask(index) {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    addTaskButton.addEventListener('click', addTask);
    renderTasks();
});
