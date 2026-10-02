```javascript
/* =========================================================
   STYLEMYHAIR — MY LOOKS
   File: static/js/mylooks.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       THEME
    ===================================================== */

    const html = document.documentElement;

    const themeToggle =
        document.getElementById("themeToggle");

    const themeDots =
        document.querySelectorAll(
            ".theme-dot[data-theme]"
        );

    const savedTheme =
        localStorage.getItem("stylemyhair-theme") || "rose";

    const savedDarkMode =
        localStorage.getItem("stylemyhair-dark-mode") === "true";


    html.setAttribute(
        "data-theme",
        savedTheme
    );


    if (savedDarkMode) {
        document.body.classList.add("dark-mode");
    }


    themeDots.forEach((dot) => {

        dot.addEventListener("click", () => {

            const theme =
                dot.dataset.theme;

            html.setAttribute(
                "data-theme",
                theme
            );

            localStorage.setItem(
                "stylemyhair-theme",
                theme
            );

        });

    });


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle(
                "dark-mode"
            );

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );

            localStorage.setItem(
                "stylemyhair-dark-mode",
                isDark
            );

        });

    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    const mobileMenuButton =
        document.getElementById(
            "mobileMenuButton"
        );

    const sidebar =
        document.getElementById(
            "femaleSidebar"
        );


    if (mobileMenuButton && sidebar) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle(
                    "open"
                );

            }
        );

    }


    /* =====================================================
       FAVORITE HEARTS
    ===================================================== */

    const favoriteButtons =
        document.querySelectorAll(
            "[data-favorite]"
        );


    favoriteButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                button.classList.toggle(
                    "is-active"
                );

            }
        );

    });


    /* =====================================================
       DELETE MY LOOK
    ===================================================== */

    const deleteButtons =
        document.querySelectorAll(
            "[data-delete]"
        );

    const savedLooksGrid =
        document.getElementById(
            "savedLooksGrid"
        );

    const emptyState =
        document.getElementById(
            "savedEmptyState"
        );

    const savedCount =
        document.getElementById(
            "savedCount"
        );


    function updateSavedCount() {

        if (!savedLooksGrid) {
            return;
        }


        const cards =
            savedLooksGrid.querySelectorAll(
                ".mylooks-card"
            );

        const count =
            cards.length;


        if (savedCount) {

            savedCount.textContent =
                count;

        }


        if (count === 0) {

            savedLooksGrid.style.display =
                "none";

            if (emptyState) {

                emptyState.style.display =
                    "block";

            }

        } else {

            savedLooksGrid.style.display =
                "grid";

            if (emptyState) {

                emptyState.style.display =
                    "none";

            }

        }

    }


    deleteButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".mylooks-card"
                    );


                if (!card) {
                    return;
                }


                card.style.opacity = "0";

                card.style.transform =
                    "scale(0.95)";


                setTimeout(() => {

                    card.remove();

                    updateSavedCount();

                }, 250);

            }
        );

    });


    updateSavedCount();

});
```
