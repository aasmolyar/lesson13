'use strict'

const todoControl = document.querySelector('.todo-control');  //верхняя форма для ввода задания
const headerInput = document.querySelector('.header-input');  //верхний ввод задания
const todoList = document.querySelector('.todo-list');        // поле введенной задачи
const todoCompleted = document.querySelector('.todo-completed'); // поле выполненной задачи
const toDoData = []     // массив всех toDo, формиоуемый при submit формы

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
        console.log(toDoData)

        console.log('toDoData.text', toDoData.text) //////////////////////////////////////////////////////

        if (item.completed) {      // если флажок нажат ?????
            todoCompleted.append(li)  // заносим в конец поля выполненной задачи
        } else {                   // иначе
            todoList.append(li)    // в поле невыполненой задачи
        }

        li.querySelector('.todo-complete').addEventListener('click', function () { // вешаем слушателя на кнопку выполнено
            item.completed = !item.completed  // при клике меняет значение с false на true
            render()    // вызывает саму себя
        })

        li.querySelector('.todo-remove').addEventListener('click', function (event) {  // вешаем слушателя на кнопку УДАЛИТЬ  
            console.log('нажали на кнопку удалить');

            const clickedLi = event.target.closest('li')  // получаем кликнутый Li
            console.log('clickedLi', clickedLi)

            const liTextContent = clickedLi.textContent  // получили текст li
            console.log('liTextContent', liTextContent)

            toDoData.forEach(function (item, index) {  // перебираем массив ======================================
                console.log('зашли в перебор массива');

                if (liTextContent === item.text) {  // если текст li = туксту элемента массива
                    console.log('зашли в if', 'liTextContent = ', liTextContent);

                    const toDoDataIndex = index;   // получаем index элемента
                    console.log('toDoDataIndex', toDoDataIndex);

                    li.remove()        // Удаляем li
                    toDoData.splice(toDoDataIndex, 1) // удаляем элемент из массива по индексу  в массиве
                    console.log('toDoData', toDoData);
                }
            })
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
        render()                   // вызываем render
    }
})

function setJsonToDoData() {
    localStorage.toDoData = JSON.stringify(toDoData);
}

todoControl.addEventListener('submit', function (event) {     //вешаем слушателя на форму
    setJsonToDoData();
})

function showToDoData() {
    console.log('Страница загрузилась');
    console.log('localStorage', localStorage);

    const li = document.createElement('li')  // создаем новый li
    li.classList.add('todo-item')            // присваиваем li свойства класса todo-item
    li.innerHTML = '<span class="text-todo">' + 'text' + '</span>' +   // кладем из свойства toDoData текст
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +   // делаем кнопку удалить
        '<button class="todo-complete"></button>' + // делаем кнопку завершено
        '</div>'

    /*     const localStorageParse = JSON.parse(localStorage.getItem('toDoData'));
        console.log('localStorageParse', localStorageParse);
        console.log('localStorageParse.length', localStorageParse.length);
    
        for (let item of localStorageParse) {
    
            const localStorageParseText = item.text;
            console.log(localStorageParseText);
    
            const localStorageParseCOmpleted = item.completed;
            console.log(localStorageParseCOmpleted);
    
            const li = document.createElement('li')  // создаем новый li
            li.classList.add('todo-item')            // присваиваем li свойства класса todo-item
            li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +   // кладем из свойства toDoData текст
                '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +   // делаем кнопку удалить
                '<button class="todo-complete"></button>' + // делаем кнопку завершено
                '</div>'
        } */
}

document.addEventListener('DOMContentLoaded', showToDoData)

