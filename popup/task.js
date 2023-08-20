const popup = document.getElementById("subscribe-modal");

// Для удаления Cookie
// setCookie("Окно закрыто", "да", -1);

if (getCookie("Окно закрыто") === undefined) {
    popup.classList.add("modal_active");
};

const modalClose = document.querySelector(".modal__close");
modalClose.addEventListener("click", closePopup);


function closePopup () {
    popup.classList.remove("modal_active");
    setCookie("Окно закрыто", "да", 3600);
};

// уcтанавливает cookie
function setCookie(name, value, time) {
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + "; max-age=" + time;
};

// возвращает cookie если есть или undefined
function getCookie(name) {

    name = encodeURIComponent(name);
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}