const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");
const count = document.getElementById("count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = task.text;
    li.appendChild(span);

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      save();
      render();
    });
    li.appendChild(delBtn);

    li.addEventListener("click", () => {
      task.done = !task.done;
      save();
      render();
    });

    list.appendChild(li);
  });
  const tasksLeft = tasks.filter((task) => !task.done).length;
  count.textContent = tasksLeft + (tasksLeft === 1 ? " task left" : " tasks left")
}

function addTask() {
  const text = input.value.trim();
  if (text === "") return;
  tasks.push({ text: text, done: false });
  save();
  render();
  input.value = "";
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", () => {
  if (!confirm("Delete all tasks")) return;
  tasks = [];
  save();
  render();
});
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTask();
});

render();