// ELEMENTS
// --- Query    : query elements like the form, form elements,
//                the submit button, etc...
const nameInput     = document.getElementById('name')
const authorInput   = document.getElementById('author')
const pagesInput    = document.getElementById('pages')
const readInput     = document.getElementById('is_read')
const submitBtn     = document.getElementById('submitBtn')

// ARRAYS
// --- Library  : array to store the book objects
let myLibrary = []

// OBJECTS
// --- Book     : takes a 'name', 'author', and pages number
//                  + has method to return a string
class Book {
    constructor(name, author, pages) {
        this.name   = name
        this.author = author
        this.pages  = pages
    }

    info() {
        return this.name + ', by ' + this.author + ', ' + this.pages + ' pages'
    }
}

function createBookDisplay(book) {
    const { name, author, pages } = book
    const tr        = document.createElement('tr')
    const tdName    = document.createElement('td')
    const tdAuthor  = document.createElement('td')
    const tdPages   = document.createElement('td')

    const nameInput     = document.createElement('input')
    const authorInput   = document.createElement('input')
    const pagesInput    = document.createElement('input')
    const deleteBtn     = document.createElement('button')
    deleteBtn.innerText = 'Delete'
    nameInput.setAttribute('type', 'text')
    authorInput.setAttribute('type', 'text')
    pagesInput.setAttribute('type', 'text')
    deleteBtn.setAttribute('type', 'button')
    deleteBtn.addEventListener('click', () => {
        book.removeBookFromLibrary(book)
    })

    if (book) {
        tdName.innerText    = name
        tdAuthor.innerText  = author
        tdPages.innerText   = pages
    } else {
        tdName.appendChild(nameInput)
        tdAuthor.appendChild(authorInput)
        tdPages.appendChild(pagesInput)
    }

    tr.appendChild(tdName)
    tr.appendChild(tdAuthor)
    tr.appendChild(tdPages)

    if (book) {
        tr.appendChild(deleteBtn)
    }
    return tr
}

Book.prototype.removeBookFromLibrary = function(book) {
    let copyLibrary = myLibrary.filter(b => {
        console.log(b === book)
        return b !== book
    })
    console.log(copyLibrary)
    displayLibrary(copyLibrary)
}

function displayLibrary(arr) {
    const tb = document.getElementById('tbody')
    console.log(arr)
    if (arr) {
        arr.map(b => {
            console.log(b)
            const bookElement = createBookDisplay(b)
            tb.appendChild(bookElement)
        })
    } else {
        console.log("Hi")
        const addBookElement = createBookDisplay()
        tb.appendChild(addBookElement)
    }
    
    return
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    displayLibrary(myLibrary)
}

let hp = new Book('Harry Potter', 'J.K. Rowling', 245)
let lotr = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 450)
addBookToLibrary(hp)
addBookToLibrary(lotr)