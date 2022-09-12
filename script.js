let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;
let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupBtn;
let popupCloseBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');

	popup = document.querySelector('.popup');
	popupInfo = document.querySelector('.popup-info');
	popupInput = document.querySelector('.popup-input');
	popupBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo);
	ulList.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', closePopup);
	popupBtn.addEventListener('click', changeTodoText);
	todoInput.addEventListener('keyup', enterKeyCheck);
};

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li');
		newTodo.textContent = todoInput.value;
		addTools();
		ulList.appendChild(newTodo);
		todoInput.value = '';
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = 'Wpisz tresc zadania!';
	}
	popup.style.display = 'none';
};

const addTools = () => {
	const newTools = document.createElement('div');
	newTools.classList.add('tools');

	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'EDIT';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times">';

	newTools.append(completeBtn, editBtn, deleteBtn);

	newTodo.append(newTools);
};

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		edit(e);
	} else if (e.target.matches('.delete')) {
		deleteTodo(e);
	}
};

const edit = e => {
	todoToEdit = e.target.closest('li');
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = 'flex';
};

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = 'none';
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = 'Nie wprowadziles zadnych zmian!';
	}
};

const closePopup = () => {
	popup.style.display = 'none';
	popupInfo.textContent = '';
};

const deleteTodo = e => {
	e.target.closest('li').remove('li');

	const allTodos = ulList.querySelectorAll('li');

	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadan na liscie!';
	}
};

function enterKeyCheck(e) {
	if (e.key === 'Enter') {
		addNewTodo();
	}
}

document.addEventListener('DOMContentLoaded', main);
