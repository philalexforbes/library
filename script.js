const myLibrary = [];
const bookTable = document.querySelector('#tableBody');
const addBookBtn = document.querySelector('#addBookBtn');
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

function addBookToLibrary(author, title, pages, read){
    let id = `book${myLibrary.length + 1}`;
    let book = new Book(id, author, title, pages, read);
    myLibrary.push(book);
    addLibraryBookToTable();
}

addBookBtn.addEventListener('click', (e) => {
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
    deleteButton.setAttribute('onClick','deleteBook()');
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
    markReadStatusBtn.setAttribute('onClick','changeReadStatus()');
    changeReadBtns.push(markReadStatusBtn);
    cellMarkRead.appendChild(markReadStatusBtn);

    tableRow.appendChild(cellRemove);
    tableRow.appendChild(cellTitle);
    tableRow.appendChild(cellAuthor);
    tableRow.appendChild(cellPages);
    tableRow.appendChild(cellRead);
    tableRow.appendChild(cellMarkRead);
    bookTable.appendChild(tableRow);
}

function deleteBook() {
    //need to retool so that it doesn't rely on id as a way of grabbing position in array.
    deleteBookBtns.forEach((deleteBookBtn) => {
        deleteBookBtn.addEventListener('click', (e) => {
            let bookToDeleteId = e.target.getAttribute('id');
            let bookToDeleteIds = [] 
            bookToDeleteIds = bookToDeleteId.split('deleteBtn');
            bookToDeleteId = bookToDeleteIds[1];
    
            bookToDeleteId = bookToDeleteId - 1;
            const tableRow = document.getElementById(myLibrary[bookToDeleteId].id);
            bookTable.removeChild(tableRow);
            myLibrary.splice(bookToDeleteId, 1);
        });
    });
}

function changeReadStatus() {
    changeReadBtns.forEach((changeReadBtn) => {
        changeReadBtn.addEventListener('click', (e) => {
            let bookToChangeReadStatusId = e.target.getAttribute('id');
            let bookToChangeStatusIds = [];
            bookToChangeStatusIds = bookToChangeReadStatusId.split('readBtn');
            console.log(bookToChangeStatusIds);
            
            const readStatusCell =  document.getElementById(`readCell${bookToChangeStatusIds[1]}`);
            myLibrary[bookToChangeStatusIds[1]-1].changeRead();
            readStatusCell.textContent = myLibrary[bookToChangeStatusIds[1]-1].read;
            if(myLibrary[bookToChangeStatusIds[1]-1].read === 'Yes') {
                changeReadBtn.textContent = 'Mark Unread'
            } else {
                changeReadBtn.textContent = 'Mark Read';
            }
        });
    });
}
