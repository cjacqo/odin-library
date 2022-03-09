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
            displayCntrl.renderData(_library)
        }
        // ?? HELPER FUNCTIONS
        function _setUUID() {
            _uuid++
            return _uuid
        }

        const _init = (() => {
            
        })()

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
        const _modalsArr            = document.querySelectorAll('.modal')
        //     >> data containers
        const _dataContainers       = document.querySelectorAll('.data-section')
        const _tableContainer       = document.getElementById('tableDisplayParent')
        const _cardsContainer       = document.getElementById('cardsDisplayParent')
        let _modalOpen              = false
        let _currentModalView       = null
        let _prevModalView          = null
        let _currentDataView        = 'table'
        // @@ GETTERS
        const getCurrentModalView   = () => _currentModalView
        const getCurrentDataView    = () => _currentDataView
        // @@ SETTERS
        const setCurrentModalView   = (selection) => {
            _prevModalView   = _currentDataView
            _currentModalView = selection
            _openModal()
        }
        const setCurrentDataView    = (selection) => {
            _currentDataView = selection
            _displayDataView()
        }

        // !! FUNCTIONS
        // --- will assign class names based on the _currentDataView
        //     to toggle hidden/visible styles of either the table
        //     or the cards view
        const _displayDataView = () => {
            // --- default modal to closed
            _modalOpen = false
            _dataContainers.forEach(container => {
                const id = container.getAttribute('id')
                const check = id.includes(_currentDataView)
                if (check) {
                    container.classList.remove('hidden')
                } else {
                    container.classList.add('hidden')
                }
            })
        }
        // --- toggles the modal style of the selected modal from 'none' to 'block'
        //     will initially set each modal to a display of none
        const _openModal = () => {
            // --- set all modals display to none
            _modalsArr.forEach(modal => {
                modal.style.display = 'none'
            })
            let theId      = _currentModalView == 'filtersFormModal' ? 'filterControls' : 'formModal'
            let modalT     = document.querySelector(`#${theId}`)
            modalT.style.display = 'block'
        }
        // --- close the modal if the user clicks anywhere outside of modal
        const _closeModalOnWindowClick = (() => {
            window.onclick = function(e) {
                // !!!--DO NO CHANGE--!!! ///
                if (e.target.classList.contains('modal') && !e.target.classList.contains('add-form') || e.target.classList.contains('page-section')) {
                    for (let index in _modalsArr) {
                        if (typeof _modalsArr[index].style !== 'undefined') {
                            _modalsArr[index].style.display = 'none'; 
                        }
                    }
                }
            }
        })()
        
        const _init = (() => {
            _displayDataView()
        })()

        return {
            getCurrentModalView,
            getCurrentDataView,
            setCurrentModalView,
            setCurrentDataView
        }
    })()

    // The Display
    const displayCntrl = (() => {
        //     >> buttons
        const buttons           = Array.from(document.querySelectorAll('button'))

        // !! FUNCTIONS
        const _renderData = (library) => {
            console.log(library)
        }
        
        const _init = (() => {
            // loop over the buttons array to assign related event listeners
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    let value = e.currentTarget.value
                    if (value == 'table' || value == 'cards') {
                        viewCntrl.setCurrentDataView(value)
                    } else {
                        viewCntrl.setCurrentModalView(value)
                    }
                })
            })
        })()

        return {
            renderData: function(library) {
                _renderData(library)
            }
        }
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