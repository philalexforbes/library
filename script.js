const myLibrary = [];
const bookTable = document.querySelector('#tableBody');
const addBookBtn = document.querySelector('#addBookBtn');

function Book(id, author, title, pages, read) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(author, title, pages, read){
    let id = `book${myLibrary.length + 1}`;
    let book = new Book(id, author, title, pages, read);
    myLibrary.push(book);
    console.log(myLibrary.length);
    addLibraryBookToTable();
}

addBookBtn.addEventListener('click', () => {
    submitBook();
});

function submitBook() {
    event.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let bookRead = document.querySelector('input[name="read"]:checked').value;
    
    addBookToLibrary(title, author, pages, bookRead);

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.querySelector('input[name="read"]:checked').checked = false;
}

function addLibraryBookToTable() {
    let bookRows = document.querySelectorAll('.bookRows');
    
    for (let i = 0; i < myLibrary.length; i++) {
        if (bookRows[i] === undefined) {
            createBookRowsAndCells(i);
        }
        else if(myLibrary[i].id != bookRows[i].getAttribute('id')) {
            createBookRowsAndCells(i);
        }
    }
}

function createBookRowsAndCells(i) {
    const tableRow = document.createElement('tr');
    let cellTitle = document.createElement('td');
    let cellAuthor = document.createElement('td');
    let cellPages = document.createElement('td');
    let cellRead = document.createElement('td');

    tableRow.setAttribute('id', `${myLibrary[i].id}`);
    tableRow.classList.add('bookRows');

    cellTitle.setAttribute('id', `titleCell${i + 1}`);
    cellTitle.textContent = myLibrary[i].title;

    cellAuthor.setAttribute('id', `authorCell${i + 1}`);
    cellAuthor.textContent = myLibrary[i].author;

    cellPages.setAttribute('id', `pagesCell${i + 1}`);
    cellPages.textContent = myLibrary[i].pages;

    cellRead.setAttribute('id', `readCell${i + 1}`);
    cellRead.textContent = myLibrary[i].read;

    tableRow.appendChild(cellTitle);
    tableRow.appendChild(cellAuthor);
    tableRow.appendChild(cellPages);
    tableRow.appendChild(cellRead);
    console.log(tableRow);
    bookTable.appendChild(tableRow);
}