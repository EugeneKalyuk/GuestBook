'use strict';

var items = JSON.parse(localStorage.getItem('items')) || [],
    curentPage = 1,
    activePage;


function findCurent() {
    if (curentPage != (Math.floor(items.length / 10)) + 1) {
        curentPage = (Math.floor(items.length / 10)) + 1;
    } else return false;
    pageList();
}

function pageList() {
    var pages = '';
    for( var i =1; i <= curentPage; i++){
        pages += '<li class="pagination__itm" onclick = "render(' + i + ', 10)"><a href="#">' + i + '</a></li>'
    }
    document.getElementById('page').innerHTML = pages;
}

function addItem(){
    items.push({
        name: document.getElementById("inputName").value,
        text: document.getElementById("inputText").value
    });

    document.getElementById("inputName").value = "";
    document.getElementById("inputText").value = "";

    render(curentPage, 10);
}

function render(page, count){
    activePage = page;
    if(!items.length){
        return;
    }

    var startIndex = (page - 1) * count;
    var total = items.length > startIndex + count ? startIndex + count: items.length;

    var html = "";

    var container = document.getElementById('comments');
    for(var i = startIndex ;  i < total; i++ ){
        html += "<li><em>" + items[i].name + "</em>:" +
            "<button data-id = "+i+" onclick='editElem("+i+")' type='button' class='btn btn-primary btn__edit'> <i class='fa fa-pencil' aria-hidden='true'></i></button>" +
            "<button data-id = "+i+" onclick='delElem("+i+")' type='button' class='btn btn-primary btn__del'> <i id='bla' class='fa fa-times' aria-hidden='true''></i></button>" +
            "<br><p>" + items[i] .text+ "</p></li><hr>";

    }
    container.innerHTML = html;
    activatePage()
}

window.delElem = function (index) {
  items.splice(index,1);

    render(curentPage, 10);

    localStorage.setItem('items', JSON.stringify(items));

    findCurent()
};

window.editElem = function (index) {
    items[index].text = '<input class="edit__text" onblur="returnP('+index +')" data-id=' + index + ' value=' + items[index].text  + '>';

    render(curentPage, 10);
};

window.returnP = function (index) {
    var newValue,
        newComent = document.getElementsByClassName('edit__text');

    for (var i = 0; i < newComent.length; i++){
        newValue = newComent[i].value;
    }

    items[index].text = newValue;

    render(curentPage,10);

    localStorage.setItem('items', JSON.stringify(items));
};


var loadScripts = document.querySelector('body');

loadScripts.onload = function () {
    render(1, 10);
    findCurent();
    activatePage()
};

var form = document.getElementById('myForm');

form.onsubmit = function(event) {
    event.preventDefault();
    addItem();
    localStorage.setItem('items', JSON.stringify(items));
    findCurent();
    activatePage()
};

function activatePage() {
    var list = document.getElementsByClassName('pagination__itm');
    for (var i = 0; i < list.length; i++) {
        list[i].className = 'pagination__itm';
        list[activePage-1].className += ' active'
    }
}