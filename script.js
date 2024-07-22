document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      storedTasks.forEach((taskText) => addTask(taskText, false)); // Don't save again when loading
    }
  
    function addTask(taskText, save = true) {
      const text = taskText.trim();
  
      if (text === '') {
        alert("Please enter a task!");
        return;
      }
  
      const newTask = document.createElement("li");
      newTask.textContent = text;
  
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");
  
      removeButton.addEventListener('click', function () {
        taskList.removeChild(this.parentElement);
  
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskIndex = storedTasks.indexOf(text);
        storedTasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
      };
  
      newTask.appendChild(removeButton);
      taskList.appendChild(listItem);
  
      taskInput.value = ""; // Clear input field after adding task
  
      if (save) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        storedTasks.push(text);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
      }
    }

    //Add event listener to the "Add Task" button
    addButton.addEventListener('click', function () {
      addTask(taskInput.value);
    });

    //Add event listener to the task input field for pressing Enter key
    taskInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addTask(taskInput.value);
      }
    });
  
    // Load tasks from Local Storage on page load
    loadTasks();
  });
  