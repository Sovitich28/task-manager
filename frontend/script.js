const backendUrl = 'https://task-manager-rh47.onrender.com';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Fetch tasks from the server
async function fetchTasks() {
  const response = await fetch('http://localhost:3000/tasks');
  const tasks = await response.json();
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `${task.name} 
      <button onclick="deleteTask(${task.id})">Delete</button>`;
    taskList.appendChild(li);
  });
}

// Add a task
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const taskName = taskInput.value;
  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: taskName })
  });
  taskInput.value = '';
  fetchTasks();
});

// Delete a task
async function deleteTask(id) {
  await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
  fetchTasks();
}

// Load tasks on page load
fetchTasks();
