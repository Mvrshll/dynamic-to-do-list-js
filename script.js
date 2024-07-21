document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      storedTasks.forEach((taskText) => addTask(taskText, false)); // Don't save again when loading
    }
  
    function addTask(taskText, save = true) {
      const taskTextTrimmed = taskText.trim();
  
      if (!taskTextTrimmed) {
        alert("Please enter a task!");
        return;
      }
  
      const listItem = document.createElement("li");
      listItem.textContent = taskTextTrimmed;
  
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");
  
      removeButton.onclick = function() {
        taskList.removeChild(listItem);
  
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskIndex = storedTasks.indexOf(taskTextTrimmed);
        storedTasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
      };
  
      listItem.appendChild(removeButton);
      taskList.appendChild(listItem);
  
      taskInput.value = ""; // Clear input field after adding task
  
      if (save) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        storedTasks.push(taskTextTrimmed);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
      }
    }
  
    // Load tasks from Local Storage on page load
    loadTasks();

    // Call addTask on initial load 
    addTask(); // This line ensures an empty task is added on load
  
    addButton.addEventListener("click", addTask);
  
    taskInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  
    // Call addTask on initial load (optional)
    // addTask(); // Uncomment this line to add an empty task on page load (optional)
  });
  