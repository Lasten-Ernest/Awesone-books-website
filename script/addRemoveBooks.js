const title = document.getElementById('title');
const author = document.getElementById('author');
const bookDiv = document.getElementById('book-div');
let id = 0;

class Book {
  constructor(bookTitle, bookAuthor, bookId) {
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookId = bookId;
  }

  static addBook(newBook) {
    const book = document.createElement('div');
    book.classList.add('book-dynamic');
    newBook.bookId = id;
    book.innerHTML = `
        <h4 class = "title-author">"${newBook.bookTitle}" by ${newBook.bookAuthor}</h4>
          <button class="remove-button remove-btn" id="${id}">Remove</button><br>

        `;
    bookDiv.appendChild(book);
    id += 1;
  }

  static displayBooks() {
    const books = Book.getBooks();
    books.forEach((newBook) => Book.addBook(newBook));
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static storeBook(newBook) {
    const books = Book.getBooks();
    books.unshift(newBook);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(bookId) {
    const books = Book.getBooks();
    const number = parseInt(bookId, 10);
    let bookArray = [];
    books.forEach((book, index) => {
      if (book.bookId === number) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
    bookArray = this.getBooks();
    if (bookArray.length === 1) {
      if (bookArray[0].bookId === 1) {
        bookArray[0].bookId = 0;
      }
    } else {
      for (let i = bookId; i < bookArray.length; i += 1) {
        bookArray[bookId].bookId = number;
      }
    }
    localStorage.setItem('books', JSON.stringify(bookArray));
  }
}

const newBook = new Book(title, author, id);

document.querySelector('#book-div').addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    e.target.parentElement.remove();
  }
  Book.removeBook(e.target.id);
});

document.querySelector('.form-book').addEventListener('submit', (e) => {
  e.preventDefault();
  newBook.bookTitle = title.value;
  newBook.bookAuthor = author.value;
  newBook.bookId = id;
  if (newBook.bookTitle && newBook.bookAuthor) {
    Book.storeBook(newBook);
    window.location.reload();
  }
});

document.addEventListener('DOMContentLoaded', Book.displayBooks);

// Book Navigation

const list = document.getElementById('list-display');
const addBookInList = document.getElementById('add-new-display');
const contact = document.getElementById('contact-display');

function Navigation() {
  list.addEventListener('click', () => {
    list.classList.add('active');
    addBookInList.classList.remove('active');
    contact.classList.remove('active');
    document.getElementById('add-book').style.display = 'none';
    document.getElementById('list').style.display = 'block';
    document.getElementById('contact').style.display = 'none';
  });
  addBookInList.addEventListener('click', () => {
    list.classList.remove('active');
    addBookInList.classList.add('active');
    contact.classList.remove('active');
    document.getElementById('list').style.display = 'none';
    document.getElementById('add-book').style.display = 'block';
    document.getElementById('contact').style.display = 'none';
  });
  contact.addEventListener('click', () => {
    list.classList.remove('active');
    addBookInList.classList.remove('active');
    contact.classList.add('active');
    document.getElementById('list').style.display = 'none';
    document.getElementById('add-book').style.display = 'none';
    document.getElementById('contact').style.display = 'block';
  });
}

Navigation();

const date = new Date();
const currentDate = document.querySelector('.date');
currentDate.innerHTML = date.toLocaleString();