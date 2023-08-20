const editor = document.getElementById("editor");
editor.addEventListener("input", saveText);

editor.value = localStorage.getItem('text');

let input = document.createElement("input")
editor.after(input);
input.outerHTML = '<input type="button" value="Очистить содержимое" id="clear">';
input = document.getElementById("clear");
input.addEventListener("click", textCleaning);


function saveText () {
    localStorage.setItem('text', editor.value);
};

function textCleaning () {
    editor.value = "";
    localStorage.removeItem('text');
};