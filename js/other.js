const htmlElements = (type) => {
    const elements      = document.querySelectorAll(`${type}`)
    const getElements   = () => elements
    return { getElements, elements }
}

const forms     = htmlElements('form')
const btnEl     = htmlElements('button')
forms.getElements()
btnEl.getElements()
const dataSections = document.querySelectorAll('.data-section')

let dataDisplay = (function() {
    let dataView = 'table'
    let tb       = document.getElementById('tbody')
    let cb       = document.getElementById('cardsDisplayParent')
    
    function _createDataDisplay(value) {
        if (dataView === value) {
            myLibrary.db.forEach(obj => {
                cb.classList.toggle('hidden')
                tb.appendChild(obj.tableElement)
            })
        } else {
            myLibrary.db.forEach(obj => {
                tb.classList.toggle('hidden')
                cb.appendChild(obj.cardElement)
            })
        }
    }

    return {
        defaultView: function() {

        },
        changeView: function(viewValue) {
            _createDataDisplay(viewValue)
        }
    }
})()

let modalDisplay = (function() {
    let isOpen = false
    let modal  = null
    let theModals = {
        addFormModal    : document.getElementById('formModal'),
        filtersFormModal: document.getElementById('filterControls')
    }

    function _handleToggle(value) {
        modal = value
    }

    function _handleClasses() {
        let theArr = Object.entries(theModals)
        if (theArr[0][0] === modal) {
            if (!isOpen) {
                theArr[0][1].classList.remove('hidden')
                isOpen = true
            } else {
                if (isOpen) {
                    theArr[0][1].classList.add('hidden')
                    if (!theArr[1][1].classList.contains('hidden')) {
                        theArr[1][1].classList.add('hidden')
                    }
                    isOpen = false
                } else {
                    theArr[1][1].classList.toggle('hidden')
                    isOpen = true
                }
            }
        } else if (theArr[1][0] === modal) {
            if (!isOpen) {
                theArr[1][1].classList.remove('hidden')
                isOpen = true
            } else {
                if (isOpen) {
                    theArr[1][1].classList.add('hidden')
                    if (!theArr[0][1].classList.contains('hidden')) {
                        theArr[0][1].classList.add('hidden')
                    }
                    isOpen = false
                } else {
                    theArr[0][1].classList.toggle('hidden')
                    isOpen = true
                }
            }
        }
    }

    return {
        toggleModal: function(modalValue) {
            _handleToggle(modalValue)
            _handleClasses()
        }
    }
})()

let myLibrary = (function() {
    let db    = []
    let count = 0
    
    function _add(libObj) {
        db.push(libObj)
        let copiedArr = db
        return copiedArr
    }

    // --- create HTML elements
    function _tableElement(book, id) {
        // -- destructure the book
        const { name, author, pages, read } = book
        // -- create HTML elements
        //      + table row & data
        const tr            = document.createElement('tr')
        const tdName        = document.createElement('td')
        const tdAuthor      = document.createElement('td')
        const tdPages       = document.createElement('td')
        const tdRead        = document.createElement('td')
        const tdDelete      = document.createElement('td')
        // -- set HTML attributes
        tdPages.style.textAlign = 'center'
        tdRead.style.textAlign = 'center'
        tdDelete.style.textAlign = 'center'
        // ~~ delete button
        const deleteBtn     = document.createElement('button')
        deleteBtn.innerText = 'Delete'
        deleteBtn.setAttribute('type', 'button')
        deleteBtn.setAttribute('value', id)

        // --- Delete Btn
        deleteBtn.addEventListener('click', (e) => {
            // -- get the parent node (which is the tr)
            //      + learned from https://stackoverflow.com/questions/13241005/add-delete-row-from-a-table
            let row = e.target.parentNode.parentNode
            let btn = e.currentTarget.value
            // -- pass row to remove function
            //      + removes this child from the DOM
            bookObj.removeBookDisplay(btn)
            // myLibrary.removeBookFromDb(row)
        })

        tdName.innerText    = name
        tdAuthor.innerText  = author
        tdPages.innerText   = pages
        tdRead.innerText    = read
        tdDelete.appendChild(deleteBtn)

        tr.appendChild(tdName)
        tr.appendChild(tdAuthor)
        tr.appendChild(tdPages)
        tr.appendChild(tdRead)
        tr.appendChild(tdDelete)

        return tr
    }
    function _cardElement(book, id) {
        // -- destructure the book
        const { name, author, pages, read } = book
        // -- create HTML elements
        //      + card container and data containers
        const cardContainer = document.createElement('div')
        const divName       = document.createElement('div')
        const divAuthor     = document.createElement('div')
        const divPages      = document.createElement('div')
        const divRead       = document.createElement('div')
        const divDelete     = document.createElement('div')
        // -- set HTML attributes
        cardContainer.classList.add('card-container', 'flex')
        // ~~ delete button
        const deleteBtn     = document.createElement('button')
        deleteBtn.innerText = 'Delete'
        deleteBtn.setAttribute('type', 'button')
        deleteBtn.setAttribute('value', id)

        // --- Delete Btn
        deleteBtn.addEventListener('click', (e) => {
            // -- get the parent node (which is the tr)
            //      + learned from https://stackoverflow.com/questions/13241005/add-delete-row-from-a-table
            let btn = e.currentTarget.value
            // -- pass row to remove function
            //      + removes this child from the DOM
            bookObj.removeBookDisplay(btn)
            // myLibrary.removeBookFromDb(card)
        })

        divName.innerText    = name
        divAuthor.innerText  = author
        divPages.innerText   = pages
        divRead.innerText    = read
        divDelete.appendChild(deleteBtn)

        cardContainer.appendChild(divName)
        cardContainer.appendChild(divAuthor)
        cardContainer.appendChild(divPages)
        cardContainer.appendChild(divRead)
        cardContainer.appendChild(divDelete)

        return cardContainer
    }

    // --- private counter function used to make a
    //     mock ID to easily delete library objects
    function _counter() {
        count++
        return count
    }
    // --- take form data, and add an index from the count
    //     to the object
    function _createLibraryObject(book, index) {
        let libObj = {
            data         : book,
            index        : index,
            tableElement : _tableElement(book, index),
            cardElement  : _cardElement(book, index)
        }
        return libObj
    }

    return {
        add: function(book) {
            index       = _counter()
            let libObj  = _createLibraryObject(book, index)
            this.db     = _add(libObj)
        }
    }
})()

let buttons = (function() {
    let btnsArr = []

    function _addEvents(arr) {
        arr.forEach(btn => {
            let value = btn.value
            btn.addEventListener('click', () => {
                if (value === 'table' || value === 'cards') {
                    dataDisplay.changeView(value)
                } else {
                    modalDisplay.toggleModal(value)
                }
            })
        })
    }

    return {
        createBtnsArr: function() {
            // query all buttons
            const btnElements = document.querySelectorAll('button')
            const newArr      = _addEvents(btnElements)
        }
    }
})()

const Book = (name, author, pages, read, category) => {
    let info            = `${name}, by ${author}, ${pages} pages. Is read: ${read}`
    const getName       = () => {return name}
    const getAuthor     = () => {return author}
    const getPages      = () => {return pages}
    const getRead       = () => {return read}
    const getCategory   = () => {return category}
    return {info, getName, getAuthor, getPages, getRead, getCategory}
}

const book1 = Book('Harry Potter', 'J.K. Rowling', 345, true, 'Fantasy')

myLibrary.add(book1)
buttons.createBtnsArr()