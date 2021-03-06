//Book Class: Represents a Book
class Book {
    constructor(title, author, publication) {
        this.title = title;
        this.author = author;
        this.publication = publication;
    }
}

//UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.publication}</td>
        <td><a href="" class="btn btn-danger btn-sm-delete d-none d-md-inline"><i class="fas fa-times-circle"></i></a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }

    /* static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".book-form-container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        //Vanish after 3 seconds
        setTimeout(() => document.querySelector(".alert").remove(), 2000);
    } */

    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#publication").value = "";
    }
}
//Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }
    static removeBook(publication) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.publication === publication) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    //Prevent Actual Submit
    e.preventDefault();

    //Get Form Values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const publication = document.querySelector("#publication").value;

    //Validate
    if (title === "" || author === "" || publication === "") {
        UI.showAlert("Please, fill all the fields.", "danger")
    }
    else {
        //Instatiate Books
        const book = new Book(title, author, publication);

        //Add Book to UI
        UI.addBookToList(book);

        //Add book to Store
        Store.addBook(book)

        // //Show Success Message
        // UI.showAlert("Book added", "success");

        //Clear fields
        UI.clearFields();
    }
});
// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Book Removed', 'success');
  });