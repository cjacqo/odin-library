let dataDisplay = (function() {
    let dataView = 'table'
    
    function _createDataDisplay(value) {
        if (value === 'table') {
            console.log('Table')
        } else {
            console.log('Cards')
        }
    }

    return {
        changeView: function(viewValue) {
            if (viewValue !== dataView) {
                this.dataView = viewValue
                _createDataDisplay(viewValue)
            }
        }
    }
})()

let modalDisplay = (function() {
    let isOpen = false
    let modal  = null

    return {
        toggleModal: function(modalValue) {
            console.log(modalValue)
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
            data        : book,
            index       : index
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