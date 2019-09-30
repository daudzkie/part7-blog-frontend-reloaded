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

    /**
     * Uses `setValue` hook to reset the state
     */
    const reset = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}