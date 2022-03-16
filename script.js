const input = document.querySelector("input");
const ul = document.querySelector("ul");
const remaining = document.querySelector("#remaining");
const KEY = "K2n4-Eq35-Nd10-Xp69-z78b-HELLO-FOLLOW-EESAZAHED-ON-GITHUB";
const todoArray = localStorage.getItem(KEY)
  ? JSON.parse(localStorage.getItem(KEY))
  : [];
const saveTodos = () => localStorage.setItem(KEY, JSON.stringify(todoArray));

const iterate = () => {
  ul.innerHTML = "";
  let count = 0;
  todoArray.forEach((todo) => {
    todo.id = count++;
    const newTodo = document.createElement("li");
    newTodo.className = todo.type;
    newTodo.innerHTML = `<span onclick="deleteTodo(${todo.id})"><i class="fa fa-trash"></i>
 </span> ${todo.text}`;
    newTodo.addEventListener("click", function () {
      if (this.className === "active") {
        this.className = "completed";
        todoArray[todo.id].type = "completed";
      } else {
        this.className = "active";
        todoArray[todo.id].type = "active";
      }
      saveTodos();
    });
    ul.prepend(newTodo);
  });
  saveTodos();
};

const deleteTodo = (id) => {
  todoArray.splice(id, 1);
  update();
};

const update = () => {
  iterate();
  remaining.innerHTML = todoArray.length;
};

input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13 && input.value !== "") {
    todoArray.push({
      text: input.value,
      type: "active",
    });
    input.value = "";
    update();
  }
});

update();
