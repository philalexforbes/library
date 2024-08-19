const myLibrary = [];
const addToLibraryDialog = document.querySelector('#addToLibaryDialog');
const bookTable = document.querySelector('#tableBody');
const addBookBtn = document.querySelector('#addBookBtn');
const addToLibaryBtn = document.querySelector('#addToLibrary');

const deleteBookBtns = [];
const changeReadBtns = [];

function Book(id, author, title, pages, read) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;

    this.changeRead = function() {
        if(this.read === 'Yes'){
            this.read = 'No';
        } else {
            this.read = 'Yes';
        }
    }
}

addToLibaryBtn.addEventListener('click', () => {
    addToLibraryDialog.showModal();
});


function addBookToLibrary(author, title, pages, read){
    let id = `book${myLibrary.length + 1}`;
    let book = new Book(id, author, title, pages, read);
    myLibrary.push(book);
    addLibraryBookToTable();
}

addBookBtn.addEventListener('click', (e) => {
    addToLibraryDialog.close();
    submitBook(e);
});

function submitBook(e) {
    e.preventDefault();
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
    let cellRemove = document.createElement('td');
    let cellTitle = document.createElement('td');
    let cellAuthor = document.createElement('td');
    let cellPages = document.createElement('td');
    let cellRead = document.createElement('td');
    let cellMarkRead = document.createElement('td');

    tableRow.setAttribute('id', `${myLibrary[i].id}`);
    tableRow.classList.add('bookRows');

    cellRemove.setAttribute('id', `deleteCell${i+1}`);
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.setAttribute('id', `deleteBtn${i+1}`);
    deleteButton.textContent = 'Delete';
    deleteBookBtns.push(deleteButton);
    cellRemove.appendChild(deleteButton);

    cellTitle.setAttribute('id', `titleCell${i + 1}`);
    cellTitle.textContent = myLibrary[i].title;

    cellAuthor.setAttribute('id', `authorCell${i + 1}`);
    cellAuthor.textContent = myLibrary[i].author;

    cellPages.setAttribute('id', `pagesCell${i + 1}`);
    cellPages.textContent = myLibrary[i].pages;

    cellRead.setAttribute('id', `readCell${i + 1}`);
    cellRead.textContent = myLibrary[i].read;

    cellMarkRead.setAttribute('id', `readCell${i+1}`);
    cellMarkRead.classList.add('readCell');
    let markReadStatusBtn = document.createElement('button');
    markReadStatusBtn.setAttribute('type', 'button');
    markReadStatusBtn.setAttribute('id', `readBtn${i+1}`);
    markReadStatusBtn.classList.add('readButton');
    if(myLibrary[i].read === 'Yes'){
        markReadStatusBtn.textContent = 'Mark Unread';
    } else {
        markReadStatusBtn.textContent = 'Mark Read';
    }
    changeReadBtns.push(markReadStatusBtn);
    cellMarkRead.appendChild(markReadStatusBtn);

    tableRow.appendChild(cellRemove);
    tableRow.appendChild(cellTitle);
    tableRow.appendChild(cellAuthor);
    tableRow.appendChild(cellPages);
    tableRow.appendChild(cellRead);
    tableRow.appendChild(cellMarkRead);
    bookTable.appendChild(tableRow);
    changeReadStatus();
    deleteBook();
}

function deleteBook() {
    deleteBookBtns.forEach((deleteBookBtn) => {
        deleteBookBtn.addEventListener('click', (e) => {
            let bookToDeleteId = e.target.getAttribute('id');
            let bookToDeleteIds = []; 
            bookToDeleteIds = bookToDeleteId.split('deleteBtn');
            bookToDeleteId = `book${bookToDeleteIds[1]}`;
    
            let bookId = myLibrary.map(book => book.id).indexOf(bookToDeleteId);
            const tableRow = document.getElementById(myLibrary[bookId].id);
            bookTable.removeChild(tableRow);
            myLibrary.splice(bookId, 1);
        });
    });
}

function changeReadStatus() {
    changeReadBtns.forEach((changeReadBtn) => {
        changeReadBtn.addEventListener('click', (e) => {
            let bookToChangeReadStatusId = e.target.getAttribute('id');
            let bookToChangeStatusIds = [];
            bookToChangeStatusIds = bookToChangeReadStatusId.split('readBtn');
            let bookId = myLibrary.map(book => book.id).indexOf(`book${bookToChangeStatusIds[1]}`);
            
            const readStatusCell =  document.getElementById(`readCell${bookToChangeStatusIds[1]}`);
            myLibrary[bookId].changeRead();
            readStatusCell.textContent = myLibrary[bookId].read;
            if(myLibrary[bookId].read === 'Yes') {
                changeReadBtn.textContent = 'Mark Unread'
            } else {
                changeReadBtn.textContent = 'Mark Read';
            }
        });
    });
}
