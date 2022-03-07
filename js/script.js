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

function displayLibrary(arr) {
    const tb = document.getElementById('tbody')
    arr.map(b => {
        const { name, author, pages } = b
        const tr        = document.createElement('tr')
        const tdName    = document.createElement('td')
        const tdAuthor  = document.createElement('td')
        const tdPages   = document.createElement('td')

        tdName.innerText    = name
        tdAuthor.innerText  = author
        tdPages.innerText   = pages

        tr.appendChild(tdName)
        tr.appendChild(tdAuthor)
        tr.appendChild(tdPages)
        tb.appendChild(tr)
    })
    return
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    displayLibrary(myLibrary)
}

function removeBookFromLibrary(book) {
    // do stuff
}

let hp = new Book('Harry Potter', 'J.K. Rowling', 245)
addBookToLibrary(hp)