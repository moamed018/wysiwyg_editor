import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <nav className="navbar">
            <div className="logo">WYSIWYG Editor</div>
            <button
                onClick={toggleDarkMode}
                className="dark-mode-toggle"
                aria-label={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {isDarkMode ? (
                        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    ) : (
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    )}
                </svg>
                <span>{isDarkMode ? "Light" : "Dark"}</span>
            </button>
        </nav>
    );
};

export default Navbar;
