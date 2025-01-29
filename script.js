document.addEventListener('DOMContentLoaded', loadTodos);
setInterval(updateDateTime, 1000);

function updateDateTime() {
    document.getElementById('date-time').innerText = new Date().toLocaleString();
}

function addTodo() {
    let input = document.getElementById('todo-input');
    let errorMessage = document.getElementById('error-message');
    let todoText = input.value.trim();

    if (todoText === '') {
        errorMessage.innerText = 'Todo cannot be empty!';
        return;
    }

    errorMessage.innerText = '';
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text: todoText, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
    input.value = '';
    displayTodos();
}

function displayTodos(filter = 'all') {
    let todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.forEach((todo, index) => {
        if (filter === 'completed' && !todo.completed) return;
        if (filter === 'pending' && todo.completed) return;

        let li = document.createElement('li');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onchange = () => toggleTodoStatus(index);

        let span = document.createElement('span');
        span.innerText = todo.text;
        if (todo.completed) {
            span.classList.add('completed');
        }

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.onclick = () => deleteTodo(index);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

function toggleTodoStatus(index) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}

function deleteTodo(index) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}

function filterTodos(filter) {
    displayTodos(filter);
}

function loadTodos() {
    displayTodos();
}
