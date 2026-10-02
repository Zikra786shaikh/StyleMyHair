```javascript
/* =========================================================
   STYLEMYHAIR — FAVORITES
   File: static/js/favorites.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       THEME
    ===================================================== */

    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

    const themeDots = document.querySelectorAll(
        ".theme-dot[data-theme]"
    );

    const savedTheme =
        localStorage.getItem("stylemyhair-theme") || "rose";

    const savedDarkMode =
        localStorage.getItem("stylemyhair-dark-mode") === "true";


    html.setAttribute("data-theme", savedTheme);


    if (savedDarkMode) {
        document.body.classList.add("dark-mode");
    }


    /* Theme colors */

    themeDots.forEach((dot) => {

        dot.addEventListener("click", () => {

            const theme = dot.dataset.theme;

            html.setAttribute("data-theme", theme);

            localStorage.setItem(
                "stylemyhair-theme",
                theme
            );

        });

    });


    /* Dark / Light mode */

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

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
        document.getElementById("mobileMenuButton");

    const sidebar =
        document.getElementById("femaleSidebar");


    if (mobileMenuButton && sidebar) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle("open");

            }
        );

    }


    /* =====================================================
       FAVORITE BUTTONS
    ===================================================== */

    const favoriteButtons =
        document.querySelectorAll("[data-favorite]");


    favoriteButtons.forEach((button) => {

        button.addEventListener("click", () => {

            button.classList.toggle("is-active");

        });

    });


    /* =====================================================
       REMOVE FAVORITE
    ===================================================== */

    const removeButtons =
        document.querySelectorAll("[data-remove-favorite]");

    const favoritesGrid =
        document.getElementById("favoritesGrid");

    const emptyState =
        document.getElementById("favoritesEmptyState");

    const favoritesCount =
        document.getElementById("favoritesCount");


    function updateFavoritesCount() {

        if (!favoritesGrid) {
            return;
        }

        const cards =
            favoritesGrid.querySelectorAll(".favorites-card");

        const count = cards.length;


        if (favoritesCount) {
            favoritesCount.textContent = count;
        }


        if (count === 0) {

            favoritesGrid.style.display = "none";

            if (emptyState) {
                emptyState.style.display = "block";
            }

        } else {

            favoritesGrid.style.display = "grid";

            if (emptyState) {
                emptyState.style.display = "none";
            }

        }

    }


    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".favorites-card");

            if (!card) {
                return;
            }


            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";


            setTimeout(() => {

                card.remove();

                updateFavoritesCount();

            }, 250);

        });

    });


    updateFavoritesCount();


    /* =====================================================
       ACTIVE SIDEBAR LINK
    ===================================================== */

    const sidebarLinks =
        document.querySelectorAll(
            ".female-sidebar .sidebar-link"
        );


    sidebarLinks.forEach((link) => {

        link.addEventListener("click", () => {

            sidebarLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });

});
```
