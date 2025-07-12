 document.addEventListener("DOMContentLoaded",()=>{
    const storedTask = JSON.parse(localStorage.getItem('tasks'))
      
    if(storedTask){
        storedTask.forEach((task)=> tasks.push(task))
        updateTaskList()
        updateStats()
    }
    
 })
let tasks = [];
     
const saveTask = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text !== '') {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        updateTaskList();
        saveTask();
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete(${index})" />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="pen-to-square-solid.svg" onclick="editTask(${index})" />
                    <img src="trash-solid.svg" onclick="deleteTask(${index})" />
                </div>
            </div>
        `;
        taskList.appendChild(listItem);
    });

    updateStats();
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
     saveTask();

     if (tasks[index].completed) {
    blastcofetti();
  }
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
     saveTask();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        updateTaskList();
         saveTask();
    }
};

const updateStats = () => {
    const numbers = document.getElementById('numbers');
    const progress = document.getElementById('progress');
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    numbers.innerText = `${completed} / ${total}`;

    const progressPercent = total === 0 ? 0 : (completed / total) * 100;
    progress.style.width = `${progressPercent}%`;
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
 
const blastcofetti=()=>{
    const defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["star"],
  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ["star"],
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 0.75,
    shapes: ["circle"],
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
}