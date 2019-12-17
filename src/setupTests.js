import '@testing-library/jest-dom/extend-expect'

// Create our own localStorage
let savedItems = {}

const localStorageMock = {
    setItem: (key, item) => {
        savedItems[key] = item
    },
    getItem: (key) => savedItems[key],
    clear: () => {
        savedItems = {}
    }
}

/* Add a property called 'localStorage'
to the window object with the value defined above */
Object.defineProperty(window, 'localStorage', { value: localStorageMock })