let myLibrary = []

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
    nameInput.setAttribute('type', 'text')
    authorInput.setAttribute('type', 'text')
    pagesInput.setAttribute('type', 'text')

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
    return tr
}

function displayLibrary(arr) {
    const tb = document.getElementById('tbody')
    console.log(arr)
    arr.map(b => {
        const bookElement = createBookDisplay(b)
        tb.appendChild(bookElement)
    })
    return
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    displayLibrary(myLibrary)
}

function removeBookFromLibrary(book) {
    let copyLibrary = myLibrary.filter(b => b !== book)
    displayLibrary(copyLibrary)
}

let hp = new Book('Harry Potter', 'J.K. Rowling', 245)
addBookToLibrary(hp)

setTimeout(() => {
    console.log("Hi")
    removeBookFromLibrary(hp)
}, 5000)