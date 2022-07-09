const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
const bookList = document.querySelector('.book-list');
let titleValue;
let bookAuthorValue;
const addButton = document.querySelector('form');
let bookArray = [];
const errorMsg = document.querySelector('.error-msg');

class Book {
  static addBookItems(item) {
    bookArray.push(item);
    localStorage.setItem('bookCollection', JSON.stringify(bookArray));
    titleValue = '';
    bookAuthorValue = '';
  }

  static addBook(item, index) {
    if (bookArray.length === 0) {
      bookList.classList.remove('.active');
    } else {
      bookList.classList.add('active');
      const bookData = document.createElement('div');
      bookData.classList.add('book-data');
      bookData.id = index;

      const buttonRemove = document.createElement('button');
      buttonRemove.classList.add('remove-btn');
      buttonRemove.innerText = 'Remove';
      buttonRemove.style.backgroundColor = 'white';
      buttonRemove.style.paddingLeft = '10px';
      buttonRemove.style.paddingRight = '10px';
      buttonRemove.style.width = '85px';
      buttonRemove.style.height = '35px';
      buttonRemove.style.border = '2px solid black';
      buttonRemove.style.boxShadow = '2px 2px 2px 0px rgba(0, 0, 0, 1)';
      buttonRemove.style.fontSize = '15.2px';
      buttonRemove.style.fontWeight = 'bold';

      bookData.innerHTML = `
        <p class="book-title-text">"${item.title}" by 
          <span class="book-author-text">${item.author}</span>
        </p>
      `;

      bookData.style.paddingTop = '4px';
      bookData.style.paddingBottom = '4px';
      bookData.style.paddingLeft = '10px';
      bookData.style.paddingRight = '10px';

      if (index % 2 === 0) {
        bookData.style.backgroundColor = 'white';
      } else {
        bookData.style.backgroundColor = '#d3d3d3';
      }

      const bookTitleText = bookData.querySelector('.book-title-text');
      bookTitleText.style.fontWeight = 'bolder';
      const bookAuthorText = bookData.querySelector('.book-author-text');
      bookAuthorText.style.fontWeight = 'bolder';
      bookData.appendChild(buttonRemove);
      bookList.prepend(bookData);
      buttonRemove.onclick = () => {
        Book.removeBook(item, index);
      };
    }
  }

  static removeBook(item, index) {
    const bookCollection2 = document.getElementById(index);
    const { author, title } = item;
    bookArray = bookArray.filter(
      (item1) => item1.author !== author && item1.title !== title,
    );
    localStorage.setItem('bookCollection', JSON.stringify(bookArray));
    bookList.removeChild(bookCollection2);
  }
}

if (localStorage.getItem('bookCollection')) {
  bookArray = JSON.parse(localStorage.getItem('bookCollection'));
  bookArray.forEach((item, index) => {
    Book.addBook(item, index);
  });
} else {
  localStorage.setItem('bookCollection', '');
  bookArray = [];
}

addButton.addEventListener('submit', (e) => {
  e.preventDefault();
  let item;
  titleValue = bookTitle.value;
  bookAuthorValue = bookAuthor.value;

  if (titleValue !== '' && bookAuthorValue !== '') {
    errorMsg.innerText = '';
    errorMsg.classList.remove('active2');
    item = { title: titleValue, author: bookAuthorValue };
    Book.addBookItems(item);
    Book.addBook(item, bookArray.length - 1);
  } else {
    errorMsg.innerText = 'Enter name of book and author.';
    errorMsg.classList.add('active2');
  }
  window.location.reload()
});
