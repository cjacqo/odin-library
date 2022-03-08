// ELEMENTS
// --- Query            : query elements like the form, form elements,
//                        the submit button, etc...
// ~~ details table
const bookTotal         = document.querySelector('.details-total.count')
const readTotal         = document.querySelector('.details-read.count')
const bookTotalTxt      = document.createElement('p')
const readTotalTxt      = document.createElement('p')
// ~~ table view parents
const dataArea          = document.getElementById('sectionArea')
const tableView         = document.getElementById('tableDisplayParent')
const cardsView         = document.createElement('cardsDisplayParent')
cardsView.setAttribute('id', 'cardsDisplayParent')
// ~~ form controls
const nameCntrl         = document.getElementById('nameControl')
const authorCntrl       = document.getElementById('authorControl')
const pagesCntrl        = document.getElementById('pagesControl')
const formCntrls        = [nameCntrl, authorCntrl, pagesCntrl]
// ~~ form elements
const nameInput         = document.getElementById('name')
const authorInput       = document.getElementById('author')
const pagesInput        = document.getElementById('pages')
const readInput         = document.getElementById('is_read')
// ~~ error messages
const nameErrMsg        = document.getElementById('nameErr')
const authorErrMsg      = document.getElementById('authorErr')
const pagesErrMsg       = document.getElementById('pagesErr')
const formErrMsgs       = [nameErrMsg, authorErrMsg, pagesErrMsg]
// ~~ data view buttons
const dataViewBtns      = document.querySelectorAll('.data-swap-btn')
// ~~ submit button
const submitBtn         = document.getElementById('submitBtn')
// ~~ open form button
const openAddBookBtn    = document.createElement('button')
openAddBookBtn.setAttribute('type', 'button')
openAddBookBtn.classList.add('btn', 'add-book')
openAddBookBtn.innerText = 'Library is Empty: Add a Book'
// ~~ form attributes
const [...nameMinMax]   = [nameInput.getAttribute('minlength'), nameInput.getAttribute('maxlength')]
const [...authorMinMax] = [authorInput.getAttribute('minlength'), authorInput.getAttribute('maxlength')]
const [...pagesMinMax]  = [pagesInput.getAttribute('min'), pagesInput.getAttribute('max')]
// ~~ table
const tb = document.getElementById('tbody')

// EVENT LISTENERS
// --- Submit Btn       : listens to when the submitBtn is clicked to call
//                        the addBook function
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    // - get values from inputs
    const nameValue     = nameInput.value
    const authorValue   = authorInput.value
    const pagesValue    = pagesInput.value
    const readValue     = readInput.checked

    // - pass values to function to validate form and return 
    //   error messages where needed
    const isValid       = validateForm(nameValue, authorValue, pagesValue)

    submitForm(isValid, [nameValue, authorValue, pagesValue, readValue])
    myLibrary.displayLibrary(myLibrary)
})
// --- Open Add Book    : will open the form for the user to add a book
openAddBookBtn.addEventListener('click', (e) => {
    console.log("hi")
})
// --- Data View Buttons: will pass the value of the button to the library,
//                        then call the swap function to swap the data rendered
dataViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let value = e.currentTarget.value
        myLibrary.dataView = value
        myLibrary.swapView()
    })
})

// OBJECTS
// --- Library          : is a class to store an array of Book class objects
class Library {
    constructor() {
        this.db = []
        this.dataView = 'table'
        this.swapView = function() {
            if (this.dataView === 'table') {
                dataArea.removeChild(cardsView)
                dataArea.appendChild(tableView)
            } else {
                dataArea.removeChild(tableView)
                dataArea.appendChild(cardsView)
            }
        }
        this.count = function() {
            return this.db.length
        }
        this.readCount = function() {
            let totalRead       = this.db.filter(db => db.read)
            let totalReadCount  = totalRead.length
            return totalReadCount + ' / ' + this.db.length
        }
    }
}
// --- Book             : takes a 'name', 'author', and pages number
//                          + has method to return a string
class Book {
    constructor(name, author, pages, read) {
        this.name   = name
        this.author = author
        this.pages  = pages
        this.read   = read
    }

    info() {
        return this.name + ', by ' + this.author + ', ' + this.pages + ' pages. Is read: ' + this.read
    }
}

const myLibrary = new Library()
const bookObj = new Book()
const testObj = new Book()

// --- ID Tracker       : factory function test, used for deleting
const counterCreator = () => {
    let count = 0
    return () => {
        count++
        return count
    }
}
const counter = counterCreator()

Library.prototype.addBookToDb = function(book) {
    // --- get the count/id
    let id = counter().toString()

    // --- create HTML for both of the data views
    //     and add to the objec that is pushed
    const bookTableElement  = bookObj.createRowBookDisplay(book, id)
    const bookCardElement   = bookObj.createCardBookDisplay(book, id)
    
    this.db.push({data: book, tableElement: bookTableElement, cardElement: bookCardElement, id: id})
    updateHeaderDetails()
}

Library.prototype.removeBookFromDb = function(delBook) {
    // -- loop over the elements in the library (db),
    //    return only the books that do not equal the param
    this.db = this.db.filter(book => {
        return book.element !== delBook
    })
    // -- check the length of the db to see if a emptyRow
    //    with a button to open the form should be added to DOM
    if (this.db.length === 0) {
        createEmptyRow()
    }
    updateHeaderDetails()
}

Library.prototype.displayLibrary = function() {
    // -- grab the emptyRow with the button to open form
    //    then check if it exists and the db length is not 0,
    //    then remove from the table
    const remove = document.getElementById('removeWhenLibraryIsNotEmpty')
    if (this.db.length > 0 && remove) {
        tb.removeChild(remove)
    }
    // -- append each book objects element to the table body
    this.db.forEach(book => {
        tb.appendChild(book.tableElement)
        cardsView.appendChild(book.cardElement)
    })
    updateHeaderDetails()
}

Book.prototype.createRowBookDisplay = function(book, id) {
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

Book.prototype.createCardBookDisplay = function(book, id) {
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

Book.prototype.removeBookDisplay = function(book) {
    myLibrary.db = myLibrary.db.filter(b => {
        let currentId = b.id
        let delBookId = book
        if (currentId !== delBookId) {
            return b
        } else {
            tb.removeChild(b.tableElement)
            cardsView.remove(b.cardElement)
        }
    })
    myLibrary.displayLibrary()
    return
}

Book.prototype.createFormRow = function() {
    // -- create HTML elements
    //      + table row & data
    const tr            = document.createElement('tr')
    const tdName        = document.createElement('td')
    const tdAuthor      = document.createElement('td')
    const tdPages       = document.createElement('td')
    const tdRead        = document.createElement('td')
    const nameInput     = document.createElement('input')
    const authorInput   = document.createElement('input')
    const pagesInput    = document.createElement('input')
    const readInput     = document.createElement('input')
    // -- set HTML attributes
    nameInput.setAttribute('type', 'text')
    authorInput.setAttribute('type', 'text')
    pagesInput.setAttribute('type', 'text')
    readInput.setAttribute('type', 'checkbox')

    tdName.appendChild(nameInput)
    tdAuthor.appendChild(authorInput)
    tdPages.appendChild(pagesInput)
    tdRead.appendChild(readInput)
    tr.appendChild(tdName)
    tr.appendChild(tdAuthor)
    tr.appendChild(tdPages)
    tr.appendChild(tdRead)

    return tr
}

// FUNCTIONS
// --- Clear Errors     : loop over the error message elements array to clear
function clearErrors() {
    formErrMsgs.forEach(el => {
        el.innerText = ''
    })
}
// --- Reset Form       : query all inputs, loop over the inputs and clear 
//                        the text
function resetForm() {
    const formInputs = document.querySelectorAll('.input')
    formInputs.forEach(input => {
        input.value = ''
    })
}
// --- Validate Form    : checks form values to see if inputs are valid,
//                        returns object of messages
function validateForm(name, author, pages) {
    // error messages object
    const errMsg = {
        nameErr     : false,
        authorErr   : false,
        pagesErr    : false
    }

    // values validation checks
    const nv = name.length >= nameMinMax[0] && name.length <= nameMinMax[1]
    const av = author.length >= authorMinMax[0] && author.length <= authorMinMax[1]
    const pv = parseInt(pages) >= pagesMinMax[0] && parseInt(pages) <= pagesMinMax[1]

    // check validation booleans (nv, av, pv), and return a text if FALSE, false if TRUE
    errMsg.nameErr      = !nv ? 'Name of book is required and must be larger than ' + nameMinMax[0] + ' and less than ' + nameMinMax[1] : false
    errMsg.authorErr    = !av ? 'Author is required and must be larger than ' + authorMinMax[0] + ' and less than ' + authorMinMax[1] : false
    errMsg.pagesErr     = !pv ? 'Pages is required and must be a number between ' + pagesMinMax[0] + ' and ' + pagesMinMax[1] : false

    // if err msgs exists
    const errMsgExists = !errMsg.nameErr || !errMsg.authorErr || !errMsg.pagesErr 

    // return errMsg object
    return errMsg
}
// --- Submit Form      : displays error messages, calls to reset errors,
//                        and creates a book object, adds it to the library,
//                        then resets the form input values
function submitForm(isValid, values) {
    // - check if an error message exists, then loop through object to display
    //   message
    if (isValid.nameErr || isValid.authorErr || isValid.pagesErr) {
        // - get values of object to an array,
        //      + loop over the messages
        //      + return messages whose index value of 1 is TRUE
        const errorMessages = Object.entries(isValid)
        errorMessages.forEach(msg => {
            let [el] = formErrMsgs.filter(el => el.getAttribute('id') === msg[0])
            if (msg[1]) {
                el.innerText = msg[1]
            } else {
                el.innerText = ''
            }
        })
    } else {
        // - if no errors
        //      + clear error messages
        clearErrors()
        //      + clear input values
        //      + create book object and add to library
        const book = new Book(values[0], values[1], values[2], values[3])
        // addBook(book)
        myLibrary.addBookToDb(book)
        resetForm()
    }
}
// --- Create Empty Row :
function createEmptyRow() {
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    tr.setAttribute('id', 'removeWhenLibraryIsNotEmpty')
    td.setAttribute('id', 'emptyRow')
    td.setAttribute('colspan', '5')
    td.appendChild(openAddBookBtn)
    tr.appendChild(td)
    tb.appendChild(tr)
}
// --- Update Header Details Table
function updateHeaderDetails() {
    bookTotalTxt.innerText = myLibrary.count()
    readTotalTxt.innerText = myLibrary.readCount()
    bookTotal.appendChild(bookTotalTxt)
    readTotal.appendChild(readTotalTxt)
}

// INITIAL
// --- create a empty form row with a button to open form
createEmptyRow()
updateHeaderDetails()