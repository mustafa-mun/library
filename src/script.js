const form = document.querySelector("form");
const bookTitleInput = document.getElementById("book-title");
const bookAuthorInput = document.getElementById("book-author");
const bookPagesInput = document.getElementById("page-number");
const readStatusInput = document.getElementById("read-status");
const addBookMenuBtn = document.getElementById("add-book-menu-btn");
const modal = document.getElementById("add-book-modal");
const booksSection = document.getElementById("books-section");
const infoModal = document.getElementById("info-modal");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const myLibrary = [];
const storageArr = JSON.parse(localStorage.getItem("book"));

function createStorageBookCards(array) {
  // Same with createBookCards function but everything is happening in array.forEach method
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
      } else {
        item.read = false;
      }

      if (item.read) {
        statusBtn.style.backgroundColor = "green";
        statusBtn.textContent = "READ";
      } else {
        statusBtn.style.backgroundColor = "red";
        statusBtn.textContent = "UNREAD";
      }
      localStorage.setItem("book", JSON.stringify(array)); // Update the read status on local storage
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
      storageArr.splice(index, 1);
      localStorage.setItem("book", JSON.stringify(array));
      booksSection.removeChild(div);
    });
  });
}

if (storageArr) {
  // If local storage is not empty display the book cards
  createStorageBookCards(storageArr);
}

function toggleModal() {
  // Toggle the add book form menu
  modal.classList.toggle("visible");
}

function createBookCards(array) {
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

    // THERE IS A BUG !!! FIRST REFRESH ON READ STATUS UPDATE IS NOT WORKING
    statusBtn.addEventListener("click", () => {
      if (!item.read) {
        item.read = true;
      } else {
        item.read = false;
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
      // Delete the book from library array and update the local storage
      const index = storageArr.indexOf(item);
      console.log(index);
      storageArr.splice(index, 1);
      localStorage.setItem("book", JSON.stringify(storageArr));
    });
  });
  closeIcon.addEventListener("click", () => {
    booksSection.removeChild(div);
  });
}

function addBooksToLibrary() {
  const title = bookTitleInput.value;
  const author = bookAuthorInput.value;
  const pages = bookPagesInput.value;
  const readStatusCheck = readStatusInput.checked;
  const book = new Book(title, author, pages, readStatusCheck);
  myLibrary.push(book);
  localStorage.setItem("book", JSON.stringify(myLibrary));
  if (storageArr) {
    storageArr.push(book);
    localStorage.setItem("book", JSON.stringify(storageArr));
  }
}

form.addEventListener("submit", (event) => {
  // Display book with form data
  event.preventDefault();
  addBooksToLibrary();
  createBookCards(myLibrary);
  toggleModal();
});

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
