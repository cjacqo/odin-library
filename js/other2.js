// IIFE For the Entire Library
const library = (() => {

    // The Library
    // --- contains the array of library objects (book)
    const libraryStorage = (() => {
        let _library = []
        let _uuid    = 0                 // *** fake implementation
        // @@ GETTERS
        const getLibrary           = () => _library
        const getLibraryObjByIndex = (num) => _library[num]
        // @@ SETTERS
        // const setLibrary
        // !! MODIFIER FUNCTIONS
        const addObject = (libObj) => {
            _setUUID()
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
            addObject
        }
    })()

    console.log(libraryStorage.getLibrary())
    libraryStorage.addObject('Hi')
    console.log(libraryStorage.getLibrary())
    console.log(libraryStorage.getLibraryObjByIndex(0))
})()