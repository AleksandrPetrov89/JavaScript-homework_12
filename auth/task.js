const form = document.getElementById("signin__form");
const welcome = document.getElementById("welcome");
const signin = document.getElementById("signin");

//Добавляем блок с кнопкой "Выход" в блок приветствия
let exit = document.createElement("div");
welcome.append(exit);
exit.innerHTML = "<button class='btn'>Выход</button>";


if (localStorage.getItem("userId")) {
    greeting();
} else {
    const controls = document.querySelectorAll(".control");
    for (let control of controls) {
        control.setAttribute("required", true);
    };
    form.addEventListener("submit", authorization);
};


//Прячет форму авторизации и отображает блок приветствия 
//с сохраненным в локальном хранилище id пользователя
function greeting () {
    signin.classList.remove("signin_active");
    welcome.classList.add("welcome_active");
    welcome.querySelector("#user_id").textContent = localStorage.getItem("userId");
    welcome.querySelector(".btn").addEventListener("click", deauthorization);
};

// Передает данные формы по указанному адресу
function authorization (event) {
    event.preventDefault();
    const formData = new FormData(form);
    let xhr = request("POST", "https://students.netoservices.ru/nestjs-backend/auth", formData);
    event.target.reset();
    xhr.addEventListener("load", responseCheck);
};

//Формирует и отправляет AJAX-запрос с указанными параметрами.
//  method - метод запроса ("GET", "POST")
//  url - адрес, куда нужно отправить запрос
//  body - тело запроса (необязательный параметр) 
function request (method, url, body="") {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.send(body);
    return xhr;
};

//Проверяет ответ сервера. 
//При успешной авторизации сохраняет в локальном хранилище id пользователя и вызывает функцию "greeting"
//При ошибке в логине/пароле - выдает соответствующее сообщение
function responseCheck (event) {
    if (event.target.response.success) {
        localStorage.setItem("userId", event.target.response.user_id);
        greeting();
    } else if (event.target.status == 201) {
        alert("Неверный логин/пароль");
    } else {
        alert("Какая-то ошибка!!!");
    };
};

//Удаляет из локального хранилища id пользователя и перезагружает страницу
function deauthorization () {
    localStorage.removeItem("userId");
    location.reload();
};