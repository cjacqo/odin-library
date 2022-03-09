// IIFE For the Entire Library
const library = (() => {

    // The Library
    // --- contains the array of library objects (book)
    const libraryStorage = (() => {
        let _library = []
        let _uuid    = 0
        // @@ GETTERS
        const getLibrary           = () => _library
        const getLibraryObjByIndex = (num) => _library[num]
        const getSize              = () => _library.length
        // @@ SETTERS
        // const setLibrary
        // !! MODIFIER FUNCTIONS
        const addObject = (libObj) => {
            // --- create a fake uuid
            _setUUID()
            // --- create HTML elements

            _library.push({_uuid,libObj})
        }
        // ?? HELPER FUNCTIONS
        function _setUUID() {
            _uuid++
            return _uuid
        }

        return {
            getLibrary,
            getLibraryObjByIndex,
            getSize,
            addObject
        }
    })()

    // Library Obj
    // --- defaulted to book: will set values, uuid, and HTML elements
    const LibraryObj = (name, author, pages, read, category) => {
        const _name     = name
        const _author   = author
        const _pages    = pages
        const _read     = read
        const _category = category
        // @@ GETTERS
        const getInfo   = () => [_infoToString(), {_name, _author, _pages, _read, _category}]

        // ?? HELPER FUNCTIONS
        function _infoToString() {
            return `${_name}, by ${_author}, ${_pages} pages. Is read: ${_read}`
        }
        // function _createElements() {

        // }

        return {
            getInfo
        }
    }

    // HTML Elements
    const viewCntrl = (() => {
        // --- get HTML 
        //     >> modal containers
        const _addFormModal         = document.querySelector('.add-form')
        const _filterFormModal      = document.querySelector('.filter-form-container')
        //     >> data containers
        const _tableContainer       = document.getElementById('tableDisplayParent')
        const _cardsContainer       = document.getElementById('cardsDisplayParent')
        let _currentDataView        = 'table'
        // @@ GETTERS
        const getCurrentDataView    = () => _currentDataView
        // @@ SETTERS
        const setCurrentDataView    = (selection) => {
            _currentDataView = selection
            _displayDataView()
        }

        // !! FUNCTIONS
        const _displayDataView = () => {
            switch(_currentDataView) {
                case 'table':
                    _tableContainer.classList.remove('hidden')
                    _cardsContainer.classList.add('hidden')
                    return
                case 'cards':
                    _cardsContainer.classList.remove('hidden')
                    _tableContainer.classList.add('hidden')
                    return
                default:
                    return
            }
        }

        const _init = (() => {
            _displayDataView()
        })()

        return {
            getCurrentDataView,
            setCurrentDataView
        }
    })()

    // The Display
    const displayCntrl = (() => {
        
        //     >> buttons
        const buttons           = Array.from(document.querySelectorAll('button'))
        const _init = (() => {
            // loop over the buttons array to assign related event listeners
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    viewCntrl.setCurrentDataView(e.currentTarget.value)
                })
            })
        })()
    })()


    
    // const libraryObj = (() => {
    //     let _uuid    = 0                 // *** fake implementation
    // })()
    // >> TESTS
    // ----- TEST 1 ----- //
    // function test1() {
    //     console.log(libraryStorage.getLibrary())
    //     libraryStorage.addObject('Hi')
    //     console.log(libraryStorage.getLibrary())
    //     console.log(libraryStorage.getLibraryObjByIndex(0))
    // }

    // ----- TEST 2 ----- //
    function test2() {
        // Create Object
        //   + log info
        //   + add to storage
        //   + log storage library
        const obj = LibraryObj('Harry Potter', 'J.K. Rowling', 345, false, 'Fantasy')
        console.log(obj.getInfo())
        libraryStorage.addObject(obj)
        console.log(libraryStorage.getLibrary())
        // Create Second Object
        //   + log info
        //   + add to storage
        //   + log storage library
        const obj2 = LibraryObj('Lord of the Rings', 'J.R.R. Tolien', 500, true, 'Fantasy')
        console.log(obj2.getInfo())
        libraryStorage.addObject(obj2)
        console.log(libraryStorage.getLibrary())
    }
    test2()
    
})()