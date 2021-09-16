const input = document.getElementById('input');
const addBtn = document.getElementById('btn');
const list = document.getElementById('list');

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addBtn.addEventListener('click', function(){
    if (input.value === '') return;
    let newToDo = {
        todo : input.value,
        checked : false,
        important : false
    }

    todoList.push(newToDo);
    displayMessages();
    input.value = '';
    localStorage.setItem('todo', JSON.stringify(todoList));
});

function displayMessages() {
    if (todoList.length === 0) list.innerHTML = '';
    let displayMessage = '';

    todoList.forEach(function(item,i){
        displayMessage += 
        `<li>
            <input type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>
            <label for="item_${i}" class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>`;
        list.innerHTML = displayMessage;
    })
}

list.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let forLabel = list.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;
    todoList.forEach(function(item){
        if (valueLabel === item.todo){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
});

list.addEventListener('contextmenu', function(event){
    event.preventDefault();

    todoList.forEach(function(item, i){
        if (event.target.innerHTML === item.todo) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
})