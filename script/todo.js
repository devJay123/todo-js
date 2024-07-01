const todoForm = document.getElementById('todo-form');
const todo = document.getElementById('todo');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');

let todos = [];
let dones = [];

// todo 만들기
function makeTodo(txt) {
  //
  // li요소 만들기
  const todoItem = document.createElement('li');

  // li에 완료버튼 만들기 (이미지)
  const doneBtn = document.createElement('img');
  doneBtn.classList.add('done');
  doneBtn.src = 'src/empty-check.png';
  todoItem.appendChild(doneBtn);

  // li에 txt 내용 넣기
  todoItem.appendChild(document.createTextNode(txt));

  //  li에 삭제버튼 만들기
  const deleteBtn = document.createElement('img');
  deleteBtn.classList.add('delete');
  deleteBtn.src = 'src/delete.png';
  todoItem.appendChild(deleteBtn);

  return todoItem;
}

function addLocalStorage(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

function getLocalStorage(key) {
  // 배열로 변환
  let parsed = JSON.parse(localStorage.getItem(key));
  return parsed;
}

function deleteLocalStorage(key, item) {
  let tmpArr = getLocalStorage(key);
  idx = tmpArr.findIndex((el) => el === item);
  tmpArr.splice(idx, 1);

  localStorage.setItem(key, JSON.stringify(tmpArr));
}

// todo 추가하기
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (todo.value === '') {
    alert('할일을 입력해주세요.');
    return;
  }

  // todo-list 안에 만든 todoItem 추가하기
  todoList.appendChild(makeTodo(todo.value));

  // todos 배열에 추가하기
  todos.push(todo.value);

  // localstorage에 넣기
  addLocalStorage('todo', todos);

  // todo 작성 칸 공백 만들기
  todo.value = '';
});

// todoItem의 완료, 취소 버튼 클릭시 이벤트 핸들러
todoList.addEventListener('click', (e) => {
  const btn = e.target;
  // 완료버튼 누르면 완료되도록
  if (
    btn.classList.contains('done') &&
    !btn.parentElement.classList.contains('completed')
  ) {
    btn.parentElement.classList.add('completed');
    btn.src = 'src/check.png';

    // doneList에 추가하기
    doneList.appendChild(btn.parentElement);

    // 배열에 추가 후 localstorage 변경
    dones.push(btn.parentElement.innerText);
    addLocalStorage('done', dones);

    // todos에서 지우기
    todos = todos.filter((item) => item !== btn.parentElement.innerText);

    // localstorage에서 지우기
    deleteLocalStorage('todo', btn.parentElement.innerText);
  }

  // 삭제 버튼 누르면 삭제되도록
  if (btn.classList.contains('delete')) {
    btn.parentElement.remove();
    // todos에서 지우기
    todos = todos.filter((item) => item !== btn.parentElement.innerText);
    deleteLocalStorage('todo', btn.parentElement.innerText);
  }
});

// doneList에서 완료 버튼 다시 체크하면 위로 올라가고,
// 취소 버튼 클릭하면 삭제하기
doneList.addEventListener('click', (e) => {
  const btn = e.target;
  if (btn.classList.contains('done')) {
    btn.parentElement.classList.remove('completed');
    btn.src = 'src/empty-check.png';

    // todoList에 추가하기
    todoList.appendChild(btn.parentElement);

    // todos 배열에 추가
    todos.push(btn.parentElement.innerText);

    // dones 배열에서 삭제
    dones = dones.filter((item) => item !== btn.parentElement.innerText);

    // localstorage에도 추가
    addLocalStorage('todo', todos);

    // localstorage done에서 삭제
    deleteLocalStorage('done', btn.parentElement.innerText);
  }

  // 삭제 버튼 누르면 삭제되도록
  if (btn.classList.contains('delete')) {
    btn.parentElement.remove();
    deleteLocalStorage('done', btn.parentElement.innerText);
    dones = dones.filter((item) => item !== btn.parentElement.innerText);
  }
});

// 로드될 때 localStorage에 있을 경우 화면에 그리기
if (getLocalStorage('todo') !== null) {
  getLocalStorage('todo').forEach((todo) => {
    todos.push(todo);
    todoList.appendChild(makeTodo(todo));
  });
}

if (getLocalStorage('done') !== null) {
  getLocalStorage('done').forEach((done) => {
    dones.push(done);
    let todo = makeTodo(done);
    todo.classList.add('completed');
    todo.querySelector('.done').src = 'src/check.png';
    doneList.appendChild(todo);
  });
}
