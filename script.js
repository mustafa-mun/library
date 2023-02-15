const form = document.querySelector("form");
const bookTitleInput = document.getElementById("book-title");
const bookAuthorInput = document.getElementById("book-author");
const bookPagesInput = document.getElementById("page-number");
const readStatusInput = document.getElementById("read-status");
const addBookMenuBtn = document.getElementById("add-book-menu-btn");
const modal = document.getElementById("add-book-modal");
const booksSection = document.getElementById("books-section");
const infoModal = document.getElementById("info-modal");
const infoCloseBtn = document.getElementById("info-close-btn");
const infoCover = document.getElementById("info-book-cover");
const infoTitle = document.getElementById("info-book-title");
const infoRating = document.getElementById("info-book-rating");
const infoYear = document.getElementById("info-book-year");
const infoAuthor = document.getElementById("info-book-author");
const clearBtn = document.getElementById("clear-btn");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

let myLibrary = [];
let storageArr = JSON.parse(localStorage.getItem("book"));

function createStorageBookCards() {
  // Display the local storage books on the page
  storageArr.forEach((item) => {
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
      localStorage.setItem("book", JSON.stringify(storageArr)); // Update the read status on local storage
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

    infoIcon.addEventListener("click", () => {
      infoModal.classList.toggle("not-hidden");

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "fcb893824cmsh1a10f5c1a7e2fe5p104ffbjsnaf212e4f6007",
          "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
        },
      };
      const url = "https://hapi-books.p.rapidapi.com/search/";
      const { title } = item;
      const replacedTitle = title.replace(/\s/g, "+").toLowerCase();

      fetch(`${url}${replacedTitle}`, options)
        .then((response) => response.json())
        .then((response) => {
          const book = response[0];
          infoCover.setAttribute("src", book.cover);
          infoTitle.textContent = book.name;
          infoRating.textContent = `Rating: ${book.rating}`;
          infoYear.textContent = `Year: ${book.year}`;
          infoAuthor.textContent = `From ${book.authors[0]}`;
        })
        .catch(() => {
          infoTitle.textContent =
            "Book is not found or api request reached the limit.";
        });
    });

    closeIcon.addEventListener("click", () => {
      // Remove div from books section and remove storage array
      const index = storageArr.indexOf(item);
      storageArr.splice(index, 1);
      localStorage.setItem("book", JSON.stringify(storageArr));
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

function toggleInfo() {
  // Toggle book info section
  infoModal.classList.toggle("not-hidden");
}

function removeCards(parent) {
  // Remove all book cards
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

infoCloseBtn.addEventListener("click", () => {
  toggleInfo();
});

function createBookCards() {
  // Create book card (This function handles the first form submits)
  removeCards(booksSection);
  createStorageBookCards();
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
  createBookCards();
  toggleModal();
});

addBookMenuBtn.addEventListener("click", () => {
  // Toggle book add menu
  toggleModal();
});

clearBtn.addEventListener("click", () => {
  removeCards(booksSection);
  myLibrary = [];
  storageArr = [];
  localStorage.clear();
});
