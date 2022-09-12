'use strict'

const todoControl = document.querySelector('.todo-control');  //верхняя форма для ввода задания
const headerInput = document.querySelector('.header-input');  //верхний ввод задания
const todoList = document.querySelector('.todo-list');        // поле введенной задачи
const todoCompleted = document.querySelector('.todo-completed'); // поле выполненной задачи
let toDoData = []     // массив всех toDo, формиоуемый при submit формы

const render = function () {
    todoList.innerHTML = ''        //удаляем из HTML поле введенной задачи
    todoCompleted.innerHTML = ''   //удаляем из HTML поле выполненной задачи

    toDoData.forEach(function (item) {      // перебираем массив всех toDo, формиоуемый при submit формы
        const li = document.createElement('li')  // создаем новый li
        li.classList.add('todo-item')            // присваиваем li свойства класса todo-item
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +   // кладем из свойства toDoData текст
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +   // делаем кнопку удалить
            '<button class="todo-complete"></button>' + // делаем кнопку завершено
            '</div>'

        if (item.completed) {      // если флажок нажат ?????
            todoCompleted.append(li)  // заносим в конец поля выполненной задачи
        } else {                   // иначе
            todoList.append(li)    // в поле невыполненой задачи
        }

        li.querySelector('.todo-complete').addEventListener('click', function () { // вешаем слушателя на кнопку выполнено
            item.completed = !item.completed  // при клике меняет значение с false на true
            render()    // вызывает саму себя
            setJsonToDoDataToLocalStorage()
        })

        li.querySelector('.todo-remove').addEventListener('click', function (event) {  // вешаем слушателя на кнопку УДАЛИТЬ  

            const clickedLi = event.target.closest('li')  // получаем кликнутый Li

            const liTextContent = clickedLi.textContent  // получили текст li

            toDoData = toDoData.filter((item) => liTextContent !== item.text); // фильтруем массив 
            render()
            setJsonToDoDataToLocalStorage()
        })
    })
}

todoControl.addEventListener('submit', function (event) {     //вешаем слушателя на форму
    event.preventDefault()    // запрещаем презагрузку страницы при отправке формы

    const newToDo = {         // создаем объект
        text: headerInput.value,  // введенное дело
        completed: false      // флажок не нажат
    }
    if (newToDo.text.trim() != '') { // Проверяем на пустую строку
        toDoData.push(newToDo)  // заносим сщзданный объект в toDoData
        headerInput.value = ''     // заносим в окно ввода пустую строку
        render();
        setJsonToDoDataToLocalStorage();
    }
})

function setJsonToDoDataToLocalStorage() {
    localStorage.toDoData = JSON.stringify(toDoData);
}

function showToDoData() {
    const localStorageParse = JSON.parse(localStorage.getItem('toDoData'));

    if (localStorageParse.length != 0) {

        toDoData = localStorageParse;
        render()
    }
}

document.addEventListener('DOMContentLoaded', showToDoData)

