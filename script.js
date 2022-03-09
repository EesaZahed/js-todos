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
    newTodo.innerHTML = `<span onclick="deleteTodo(${todo.id})"> <i>X</i> </span> ${todo.text}`;
    newTodo.className = todo.type;
    ul.prepend(newTodo);
  });
};

const deleteTodo = (id) => {
  todoArray.splice(id, 1);
  update();
};

const update = () => {
  iterate();

  const li = document.querySelectorAll("li");

  for (let i = 0; i < todoArray.length; i++) {
    li[i].addEventListener("click", function () {
      if (todoArray[i].type === "active") {
        this.className = "completed";
        todoArray[i].type = "completed";
      } else {
        this.className = "active";
        todoArray[i].type = "active";
      }
      saveTodos();
    });
  }
  remaining.innerHTML = todoArray.length;
  saveTodos();
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
