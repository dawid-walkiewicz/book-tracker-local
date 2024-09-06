// The useTheme custom hook for managing the theme using an on/off toggle

import { useEffect, useState } from "react"

export const useTheme = (storageKey = "vite-ui-theme") => {
    //useState to hold the current theme state. It initializes the state based on the user's saved preference in localStorage, or defaults to the system preference
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem(storageKey) ? localStorage.getItem(storageKey) === "true" : window.matchMedia("(prefers-color-scheme: dark)").matches
    })

    //useEffect to update the localStorage value whenever the theme changes
    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(isDarkMode ? "dark" : "light")

        localStorage.setItem(storageKey, isDarkMode.toString())
    }, [isDarkMode, storageKey]) //effect runs whenever this value changes

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
    
    return { isDarkMode, toggleDarkMode }
}