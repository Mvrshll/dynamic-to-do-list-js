// Wait for the document to finish loading before running the script
document.addEventListener('DOMContentLoaded', function() {

  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));  // Don't save again when loading
  }

  // Function to add a new task
  function addTask(taskText, save = true) {
    // Get the task text and trim any whitespace
    const text = taskText.trim();

    // Check if the task text is empty
    if (text === '') {
      alert('Please enter a task!');
      return;
    }

    // Create a new list item (li) element
    const newTask = document.createElement('li');
    newTask.textContent = text;

    // Create a remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');  // Add class for styling

    // Add click event listener to remove button
    removeBtn.addEventListener('click', function () {
      taskList.removeChild(this.parentElement);  // Remove the parent li element
      
      // Update tasks array and Local Storage
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const taskIndex = storedTasks.indexOf(text);  // Find task index
      storedTasks.splice(taskIndex, 1);  // Remove task from array
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    });

    // Append the remove button to the list item
    newTask.appendChild(removeBtn);

    // Append the list item to the task list
    taskList.appendChild(newTask);

    // Clear the task input field
    taskInput.value = '';

    // Save tasks to Local Storage (if applicable)
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(text);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }

  // Add event listener to the "Add Task" button
  addButton.addEventListener('click', function () {
    addTask(taskInput.value);
  });

  // Add event listener to the task input field for pressing Enter key
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });

  // Load tasks on page load
  loadTasks();
});
