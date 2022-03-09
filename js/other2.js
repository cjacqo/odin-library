// IIFE For the Entire Library
const library = (() => {

    // The Library
    // --- contains the array of library objects (book)
    const libraryStorage = (() => {
        let _library = []
        const getLibrary    = () => _library
        const getLibraryObj = (num) => _library[num]
        
    })
})()