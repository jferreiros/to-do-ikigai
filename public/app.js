const socket = io(); 

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const dueDateInput = document.getElementById('dueDate');
    const isDoneInput = document.getElementById('isDone');
    const taskList = document.getElementById('task-list');

    function fetchTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = ''; 
                tasks.forEach(addTaskToList);
            })
            .catch(console.error);
    }
    fetchTasks(); 

    taskForm.addEventListener('submit', e => {
        e.preventDefault();
        const taskData = {
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            dueDate: dueDateInput.value,
            isDone: isDoneInput.checked
        };

        fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        })
        .then(response => response.json())
        .then(task => {
            if (!document.querySelector(`[data-task-id="${task._id}"]`)) {
                addTaskToList(task);
            }
            titleInput.value = '';
            descriptionInput.value = '';
            dueDateInput.value = '';
            isDoneInput.checked = false;
        })
        .catch(console.error);
    });

    function addTaskToList(task) {
        const taskElement = document.createElement('li');
        taskElement.setAttribute('data-task-id', task._id);
        taskElement.classList.add('grid', 'grid-cols-3', 'md:grid-cols-5', 'gap-4', 'p-4', 'border');
        taskElement.innerHTML = `
            <div>${task.title}</div>
            <div class="hidden md:block">${task.description}</div> <!-- Hide on mobile, show on md screens and up -->
            <div class="hidden md:block">${new Date(task.dueDate).toLocaleDateString()}</div> <!-- Hide on mobile, show on md screens and up -->
            <div class="text-center"><input type="checkbox" onclick="toggleTaskCompletion('${task._id}', this)" ${task.isDone ? 'checked' : ''}></div>
            <div class="text-center"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" onclick="deleteTask('${task._id}')">Delete</button></div>
        `;
        document.getElementById('task-list').appendChild(taskElement);
    }
    

    window.toggleTaskCompletion = (taskId, checkbox) => {
        fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDone: checkbox.checked })
        })
        .then(response => response.json())
        .then(updatedTask => {
            console.log('Task updated:', updatedTask);
        })
        .catch(console.error);
    };

    window.deleteTask = (taskId) => {
        fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
        })
        .then(() => {
            document.querySelector(`[data-task-id="${taskId}"]`).remove();
        })
        .catch(console.error);
    };

    socket.on('taskAdded', task => fetchTasks()); 
    socket.on('taskUpdated', task => fetchTasks()); 
    socket.on('taskDeleted', () => fetchTasks());
});
