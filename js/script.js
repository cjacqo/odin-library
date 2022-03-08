// ELEMENTS
// --- Query            : query elements like the form, form elements,
//                        the submit button, etc...
// ~~ form controls
const nameCntrl     = document.getElementById('nameControl')
const authorCntrl   = document.getElementById('authorControl')
const pagesCntrl    = document.getElementById('pagesControl')
const formCntrls    = [nameCntrl, authorCntrl, pagesCntrl]
// ~~ form elements
const nameInput     = document.getElementById('name')
const authorInput   = document.getElementById('author')
const pagesInput    = document.getElementById('pages')
const readInput     = document.getElementById('is_read')
// ~~ error messages
const nameErrMsg    = document.getElementById('nameErr')
const authorErrMsg  = document.getElementById('authorErr')
const pagesErrMsg   = document.getElementById('pagesErr')
const formErrMsgs   = [nameErrMsg, authorErrMsg, pagesErrMsg]   
// ~~ submit button
const submitBtn     = document.getElementById('submitBtn')
// ~~ delete button
const deleteBtn     = document.createElement('button')
deleteBtn.innerText = 'Delete'
deleteBtn.setAttribute('type', 'button')
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
// --- Delete Btn
deleteBtn.addEventListener('click', (e) => {
    // -- get the parent node (which is the tr)
    //      + learned from https://stackoverflow.com/questions/13241005/add-delete-row-from-a-table
    let row = e.target.parentNode
    // -- pass row to remove function
    //      + removes this child from the DOM
    bookObj.removeBookDisplay(row)
    myLibrary.removeBookFromDb(row)
})

// OBJECTS
// --- Library          : is a class to store an array of Book class objects
class Library {
    constructor() {
        this.db = []
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

Book.prototype.createBookDisplay = function(book) {
    // -- set an attribute for an index value based on the length of the library
    const index = myLibrary.db.length
    // -- destructure the book
    const { name, author, pages, read } = book
    // -- create HTML elements
    //      + table row & data
    const tr            = document.createElement('tr')
    const tdName        = document.createElement('td')
    const tdAuthor      = document.createElement('td')
    const tdPages       = document.createElement('td')
    const tdRead        = document.createElement('td')
    //      + inputs
    const nameInput     = document.createElement('input')
    const authorInput   = document.createElement('input')
    const pagesInput    = document.createElement('input')
    const readInput     = document.createElement('input')
    // -- set HTML attributes
    tr.setAttribute('data-index', index)
    nameInput.setAttribute('type', 'text')
    authorInput.setAttribute('type', 'text')
    pagesInput.setAttribute('type', 'text')
    readInput.setAttribute('type', 'checkbox')

    if (book) {
        tdName.innerText    = name
        tdAuthor.innerText  = author
        tdPages.innerText   = pages
        tdRead.innerText    = read
    } else {
        tdName.appendChild(nameInput)
        tdAuthor.appendChild(authorInput)
        tdPages.appendChild(pagesInput)
        tdRead.appendChild(readInput)
    }

    tr.appendChild(tdName)
    tr.appendChild(tdAuthor)
    tr.appendChild(tdPages)
    tr.appendChild(tdRead)

    if (book) {
        deleteBtn.setAttribute('value', Object.entries(book))
        tr.appendChild(deleteBtn)
    }
    return tr
}

Book.prototype.removeBookDisplay = function(book) {
    tb.removeChild(book)
    return
}

Library.prototype.addBookToDb = function(book) {
    const bookElement = bookObj.createBookDisplay(book)
    this.db.push({data: book, element: bookElement})
    console.log(this.db)
}

Library.prototype.removeBookFromDb = function(delBook) {
    // -- loop over the elements in the library (db),
    //    return only the books that do not equal the param
    this.db = this.db.filter(book => {
        return book.element !== delBook
    })
}

Library.prototype.displayLibrary = function(index) {
    this.db.forEach(book => {
        tb.appendChild(book.element)
    })
}

Book.prototype.removeBookFromLibrary = function(book) {
    let copyLibrary = myLibrary.filter(b => {
        console.log(b === book)
        return b !== book
    })
    console.log(copyLibrary)
    displayLibrary(copyLibrary)
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