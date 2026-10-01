document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       ELEMENTS
    ================================================= */

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const sections =
        document.querySelectorAll(
            ".haircut-length-section"
        );

    const cards =
        document.querySelectorAll(".haircut-card");

    const searchInput =
        document.getElementById("haircutSearch");

    const noResults =
        document.getElementById("noResults");

    const themeButton =
        document.getElementById("themeButton");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const sidebar =
        document.getElementById("maleSidebar");


    let currentFilter = "all";


    /* =================================================
       FILTER BUTTONS
    ================================================= */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            currentFilter =
                button.dataset.filter;

            filterCards();

        });

    });


    /* =================================================
       SEARCH
    ================================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                filterCards();

            }
        );

    }


    /* =================================================
       FILTER FUNCTION
    ================================================= */

    function filterCards() {

        const searchText =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";

        let visibleCards = 0;


        cards.forEach(function (card) {

            const cardLength =
                card.dataset.length || "";

            const cardName =
                card.dataset.name
                    ? card.dataset.name.toLowerCase()
                    : "";

            const cardTexture =
                card.dataset.texture
                    ? card.dataset.texture.toLowerCase()
                    : "";

            const cardFace =
                card.dataset.face
                    ? card.dataset.face.toLowerCase()
                    : "";


            /* LENGTH FILTER */

            const matchesLength =
                currentFilter === "all" ||
                cardLength === currentFilter;


            /* SEARCH FILTER */

            const matchesSearch =
                searchText === "" ||
                cardName.includes(searchText) ||
                cardTexture.includes(searchText) ||
                cardFace.includes(searchText);


            if (
                matchesLength &&
                matchesSearch
            ) {

                card.style.display = "";

                visibleCards++;

            } else {

                card.style.display = "none";

            }

        });


        /* =================================================
           SHOW / HIDE SECTIONS
        ================================================= */

        sections.forEach(function (section) {

            const visible =
                section.querySelectorAll(
                    ".haircut-card:not([style*='display: none'])"
                ).length > 0;

            section.style.display =
                visible ? "" : "none";

        });


        /* =================================================
           NO RESULTS
        ================================================= */

        if (noResults) {

            noResults.style.display =
                visibleCards === 0
                    ? "block"
                    : "none";

        }

    }


    /* =================================================
       FAVORITES
    ================================================= */

    const favoriteButtons =
        document.querySelectorAll(
            ".favorite-btn"
        );


    favoriteButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                button.classList.toggle("active");

                button.textContent =
                    button.classList.contains("active")
                        ? "♥"
                        : "♡";

            }
        );

    });


    /* =================================================
       THEME BUTTON
    ================================================= */

    if (themeButton) {

        themeButton.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "light-mode"
                );

            }
        );

    }


    /* =================================================
       MOBILE SIDEBAR
    ================================================= */

    if (
        mobileMenuButton &&
        sidebar
    ) {

        mobileMenuButton.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "mobile-open"
                );

            }
        );

    }


    /* =================================================
       CLOSE SIDEBAR AFTER LINK CLICK
    ================================================= */

    if (sidebar) {

        const sidebarLinks =
            sidebar.querySelectorAll(
                ".sidebar-link"
            );

        sidebarLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    sidebar.classList.remove(
                        "mobile-open"
                    );

                }
            );

        });

    }


    /* =================================================
       INITIAL FILTER
    ================================================= */

    filterCards();

});