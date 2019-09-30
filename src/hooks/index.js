import { useState } from 'react'

/**
 * Custom hook to handle the input props
 * @param {string} type The type value
 */
export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange,
        setValue
    }
}