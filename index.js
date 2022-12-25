var bookName = document.getElementById("bookName");
var bookUrl = document.getElementById("bookUrl");

var bookList = [];

if (localStorage.getItem("Book") != null) {
    bookList = JSON.parse(localStorage.getItem("Book"));
    display(bookList);
} else bookList = [];

function addBook() {
    var book = {
        name: bookName.value,
        url: bookUrl.value,
    };
    if (validationWarningText(book.name, book.url)) {
        bookList.push(book);
        localStorage.setItem("Book", JSON.stringify(bookList));
        display(bookList);
    }
}

function display(bookList) {
    var cartona = "";
    
    for (var i = 0; i < bookList.length; i++) {
        cartona += `
            <div class="border-bottom border-bottom-2 rounded shadow mb-3 section-bg p-4">
            <p class="d-inline-block w-25">${bookList[i].name}</p>
            <button onclick= "displayBooksInFormToUpdate(${i})"  class="btn btn-warning text-light me-4">Update</button>
            <button onclick = "removeBook(${i})" class="btn btn-danger me-4">Delete</button>
            <button id="visit" class="btn btn-primary"><a href = "${bookList[i].url}" target="_blank" class = "links">Visit</a></button>
            </div>
        `;
    }
    document.getElementById("displaySection").innerHTML = cartona;
    updateForm();
}

function removeBook(bookIndex) {
    if ((document.getElementById("submitBtn").innerHTML = "Update")) setAddBtn()
    bookList.splice(bookIndex, 1);
    localStorage.setItem("Book", JSON.stringify(bookList));
    display(bookList);
}

function updateForm(hasInput) {
    bookName.value = hasInput ? hasInput.name : "";
    bookUrl.value = hasInput ? hasInput.url : "";
}

function displayBooksInFormToUpdate(bookIndex) {
    updateForm(bookList[bookIndex]);
    setUpdateBtn(bookIndex)
}

function updateBook(bookIndex) {

    bookList[bookIndex].name = bookName.value;
    bookList[bookIndex].url = bookUrl.value;
    if (validationWarningText(bookList[bookIndex].name, bookList[bookIndex].url))
    {
        localStorage.setItem("Book", JSON.stringify(bookList));
        display(bookList);
        setAddBtn()
    }
}

function clearAll() {
    localStorage.clear();
    bookList.splice(0, bookList.length);
    display(bookList);
    setAddBtn()
}

function validation(token) {
    if (token == "name") {
        var regexName = /^[a-zA-Z0-9 ]{3,}/;
        return regexName;
    } else if (token == "URL") {
        var regexUrl = /^(http:\/\/|https:\/\/)/gi;
        return regexUrl;
    }
}

function validationWarningText(name, URL) {

    if (validation("URL").test(URL) && validation("name").test(name)) {
        document.getElementById("validUrl").classList.replace("d-block", "d-none");
        document.getElementById("validName").classList.replace("d-block", "d-none");
        return 1
    } 
    else if (validation("name").test(name) == false)
    {
        document.getElementById("validName").classList.replace("d-none", "d-block");
        return 0
    }
    else {
        document.getElementById("validUrl").classList.replace("d-none", "d-block");
        document.getElementById("validName").classList.replace("d-block", "d-none");
    }
}

function setAddBtn() {
    document.getElementById("submitBtn").innerHTML = "Add Book";
    document.getElementById("submitBtn").classList.replace("btn-warning", "btn-primary");
    document.getElementById("submitBtn").onclick = function () {addBook()} 
}

function setUpdateBtn(bookIndex) {
    
    document.getElementById("submitBtn").innerHTML = "Update";
    document.getElementById("submitBtn").classList.replace("btn-primary", "btn-warning");
    document.getElementById("submitBtn").classList.add("text-light");
    document.getElementById("submitBtn").onclick = function () {updateBook(bookIndex)}
    
}