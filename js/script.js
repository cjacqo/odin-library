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
// ~~ form attributes
const [...nameMinMax]   = [nameInput.getAttribute('minlength'), nameInput.getAttribute('maxlength')]
const [...authorMinMax] = [authorInput.getAttribute('minlength'), authorInput.getAttribute('maxlength')]
const [...pagesMinMax]  = [pagesInput.getAttribute('min'), pagesInput.getAttribute('max')]

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
        // - clear error messages
        formErrMsgs.forEach(el => {
            el.innerText = ''
        })
        // - if no errors, create book object
        const book = new Book(nameValue, authorValue, pagesValue, readValue)
        console.log(book)
        console.log(book.info())
    }
})

// ARRAYS
// --- Library          : array to store the book objects
let myLibrary = []

// OBJECTS
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

// FUNCTIONS
// --- Add Book         : runs when the submitBtn variable is clicked
//                          + accepts the values of the for inputs
//                              to create a book object and then push to
//                              the library
function addBook() {

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


let hp = new Book('Harry Potter', 'J.K. Rowling', 245)
let lotr = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 450)
addBookToLibrary(hp)
addBookToLibrary(lotr)