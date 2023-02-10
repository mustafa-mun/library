const form = document.querySelector("form");
const bookTitleInput = document.getElementById("book-title");
const bookAuthorInput = document.getElementById("book-author");
const bookPagesInput = document.getElementById("page-number");
const readStatusInput = document.getElementById("read-status");
const addBookMenuBtn = document.getElementById("add-book-menu-btn");
const modal = document.getElementById("add-book-modal");
const booksSection = document.getElementById("books-section");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const myLibrary = [];
const newArr = JSON.parse(localStorage.getItem("book"));

if (newArr) {
  createStorageElements(newArr);
}

function toggleModal() {
  modal.classList.toggle("visible");
}

function addBooksToLibrary() {
  const title = bookTitleInput.value;
  const author = bookAuthorInput.value;
  const pages = bookPagesInput.value;
  const readStatusCheck = readStatusInput.checked;
  const book = new Book(title, author, pages, readStatusCheck);
  myLibrary.push(book);
  localStorage.setItem("book", JSON.stringify(myLibrary));
  if (newArr) {
    newArr.push(book);
    localStorage.setItem("book", JSON.stringify(newArr));
  }
}

function createElements(array) {
  // Create book card

  const div = document.createElement("div");
  const iconsContainer = document.createElement("div");
  const infoIcon = document.createElement("img");
  const closeIcon = document.createElement("img");
  const bookInfo = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const statusBtn = document.createElement("button");
  array.forEach((item) => {
    iconsContainer.className = "close-i-container";
    infoIcon.setAttribute("src", "assets/letter-i.png");
    infoIcon.setAttribute("name", "info-icon");
    closeIcon.setAttribute("src", "assets/close.png");
    closeIcon.setAttribute("name", "close-icon");
    infoIcon.id = "i-icon";
    closeIcon.id = "close-icon";
    bookInfo.className = "book-information";
    bookTitle.textContent = `TITLE:  ${item.title}`;
    bookAuthor.textContent = `AUTHOR: ${item.author}`;
    bookPages.textContent = `${item.pages} pages`;
    statusBtn.className = "read-unread-btn";

    if (!item.read) {
      statusBtn.style.backgroundColor = "red";
      statusBtn.textContent = "UNREAD";
    } else {
      statusBtn.style.backgroundColor = "green";
      statusBtn.textContent = "READ";
    }

    statusBtn.addEventListener("click", () => {
      if (item.read) {
        item.read = false;
      } else {
        item.read = true;
      }
      if (!item.read) {
        statusBtn.style.backgroundColor = "green";
        statusBtn.textContent = "READ";
      } else {
        statusBtn.style.backgroundColor = "red";
        statusBtn.textContent = "UNREAD";
      }
    });
  });
  booksSection.appendChild(div);
  div.appendChild(iconsContainer);
  iconsContainer.appendChild(infoIcon);
  iconsContainer.appendChild(closeIcon);
  div.appendChild(bookInfo);
  bookInfo.appendChild(bookTitle);
  bookInfo.appendChild(bookAuthor);
  bookInfo.appendChild(bookPages);
  div.appendChild(statusBtn);
  array.forEach((item) => {
    closeIcon.addEventListener("click", () => {
      const index = array.indexOf(item);
      newArr.splice(index, 1);
      localStorage.setItem("book", JSON.stringify(newArr));
      booksSection.removeChild(div);
    });
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBooksToLibrary();
  createElements(myLibrary);
  toggleModal();
});

function createStorageElements(array) {
  array.forEach((item) => {
    const div = document.createElement("div");
    const iconsContainer = document.createElement("div");
    const infoIcon = document.createElement("img");
    const closeIcon = document.createElement("img");
    const bookInfo = document.createElement("div");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const statusBtn = document.createElement("button");
    iconsContainer.className = "close-i-container";
    infoIcon.setAttribute("src", "assets/letter-i.png");
    infoIcon.setAttribute("name", "info-icon");
    closeIcon.setAttribute("src", "assets/close.png");
    closeIcon.setAttribute("name", "close-icon");
    infoIcon.id = "i-icon";
    closeIcon.id = "close-icon";
    bookInfo.className = "book-information";
    bookTitle.textContent = `TITLE:  ${item.title}`;
    bookAuthor.textContent = `AUTHOR: ${item.author}`;
    bookPages.textContent = `${item.pages} pages`;
    statusBtn.className = "read-unread-btn";
    // let {read: readed} = item
    statusBtn.addEventListener("click", () => {
      if (!item.read) {
        item.read = true;
        localStorage.setItem("book", JSON.stringify(array));
      } else {
        item.read = false;
        localStorage.setItem("book", JSON.stringify(array));
      }

      if (item.read) {
        statusBtn.style.backgroundColor = "green";
        statusBtn.textContent = "READ";
      } else {
        statusBtn.style.backgroundColor = "red";
        statusBtn.textContent = "UNREAD";
      }
    });

    if (!item.read) {
      statusBtn.style.backgroundColor = "red";
      statusBtn.textContent = "UNREAD";
    } else {
      statusBtn.style.backgroundColor = "green";
      statusBtn.textContent = "READ";
    }

    booksSection.appendChild(div);
    div.appendChild(iconsContainer);
    iconsContainer.appendChild(infoIcon);
    iconsContainer.appendChild(closeIcon);
    div.appendChild(bookInfo);
    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookAuthor);
    bookInfo.appendChild(bookPages);
    div.appendChild(statusBtn);

    closeIcon.addEventListener("click", () => {
      const index = array.indexOf(item);
      newArr.splice(index, 1);
      localStorage.setItem("book", JSON.stringify(array));
      booksSection.removeChild(div);
    });
  });
}

addBookMenuBtn.addEventListener("click", () => {
  // Toggle book add menu
  toggleModal();
});

// Try to make a modal book information menu with this api

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "fcb893824cmsh1a10f5c1a7e2fe5p104ffbjsnaf212e4f6007",
//     "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://hapi-books.p.rapidapi.com/search/a+song+of+ice+and+fire",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
