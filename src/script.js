const form = document.querySelector("form");
const bookTitleInput = document.getElementById("book-title");
const bookAuthorInput = document.getElementById("book-author");
const bookPagesInput = document.getElementById("page-number");
const readStatusInput = document.getElementById("read-status");
const addBookMenuBtn = document.getElementById("add-book-menu-btn");
const addBookBtn = document.getElementById("add-book-btn");
const modal = document.getElementById("add-book-modal");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = bookTitleInput.value;
  const author = bookAuthorInput.value;
  const pages = bookPagesInput.value;
  const readStatusCheck = readStatusInput.checked;
  console.log(readStatusCheck);
});

addBookMenuBtn.addEventListener("click", () => {
  // Toggle book add menu
  modal.classList.toggle("visible");
});

// function toggleModal() {}

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
