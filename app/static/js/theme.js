document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const THEME_KEY = "styleMyHairTheme";

    /*
    =====================================================
    AVAILABLE THEMES
    =====================================================
    */
    const themes = [
        "graphite",
        "navy",
        "steel",
        "ocean",
        "emerald",
        "forest",
        "burgundy",
        "copper",
        "charcoal",
        "midnight"
    ];

    /*
    =====================================================
    GET SAVED THEME
    =====================================================
    */

    let savedTheme = localStorage.getItem(THEME_KEY);

    if (!themes.includes(savedTheme)) {
        savedTheme = "graphite";
    }

    /*
    =====================================================
    APPLY THEME TO WHOLE WEBSITE
    =====================================================
    */

    function applyTheme(theme) {

        if (!themes.includes(theme)) {
            theme = "graphite";
        }

        /*
        Apply to HTML
        */
        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        /*
        Apply to BODY
        */
        document.body.setAttribute(
            "data-theme",
            theme
        );

        /*
        Save globally
        */
        localStorage.setItem(
            THEME_KEY,
            theme
        );

        /*
        Update theme title if available
        */
        const themeName = document.querySelector(".theme-title small");

        if (themeName) {
            themeName.textContent =
                theme.charAt(0).toUpperCase() + theme.slice(1);
        }

        /*
        Update active theme button
        */
        const themeButtons = document.querySelectorAll(
            ".theme-dot, .theme-color, [data-theme]"
        );

        themeButtons.forEach(function (button) {

            const buttonTheme =
                button.getAttribute("data-theme");

            button.classList.toggle(
                "active",
                buttonTheme === theme
            );
        });
    }

    /*
    =====================================================
    ADD THEME BUTTON EVENTS
    =====================================================
    */

    const themeButtons = document.querySelectorAll(
        ".theme-dot, .theme-color"
    );

    themeButtons.forEach(function (button) {

        /*
        Get theme from data-theme
        */
        const theme = button.getAttribute("data-theme");

        if (!theme) {
            return;
        }

        button.addEventListener("click", function () {

            const selectedTheme =
                button.getAttribute("data-theme");

            if (!selectedTheme) {
                return;
            }

            applyTheme(selectedTheme);

            console.log(
                "StyleMyHair theme changed to:",
                selectedTheme
            );
        });
    });

    /*
    =====================================================
    APPLY SAVED THEME ON PAGE LOAD
    =====================================================
    */

    applyTheme(savedTheme);
});