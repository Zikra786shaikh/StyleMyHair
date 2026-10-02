/* =====================================================
   STYLEMYHAIR
   FEMALE HAIRSTYLE PAGE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       MOBILE SIDEBAR
    ================================================== */

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const femaleSidebar =
        document.getElementById("femaleSidebar");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");


    function closeSidebar() {

        if (femaleSidebar) {
            femaleSidebar.classList.remove("open");
        }

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("active");
        }

        if (mobileMenuButton) {
            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }


    if (mobileMenuButton && femaleSidebar) {

        mobileMenuButton.addEventListener(
            "click",
            function () {

                femaleSidebar.classList.toggle("open");

                if (sidebarOverlay) {
                    sidebarOverlay.classList.toggle("active");
                }

                const opened =
                    femaleSidebar.classList.contains("open");

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    opened ? "true" : "false"
                );
            }
        );
    }


    if (sidebarOverlay) {
        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );
    }

/* =================================================
   THEME COLORS
   SAME THEME AS FEMALE HOME PAGE
================================================== */

    /* =================================================
       SEARCH
    ================================================== */

    const searchInput =
        document.getElementById(
            "hairstyleSearch"
        );

    const clearSearch =
        document.getElementById(
            "clearHairstyleSearch"
        );

    const cards =
        document.querySelectorAll(
            ".hairstyle-card"
        );

    const resultCount =
        document.getElementById(
            "styleResultCount"
        );

    const noResults =
        document.getElementById(
            "hairstyleNoResults"
        );


    const resultSections =
        document.querySelectorAll(
            ".hairstyle-results > section, " +
            ".hairstyle-results > .hairstyle-section, " +
            ".hairstyle-results .hairstyle-section"
        );


    let activeFilter = "all";


    /* =================================================
       CARD FILTER
    ================================================== */

    function cardMatchesFilter(card) {

        if (activeFilter === "all") {
            return true;
        }


        const name =
            (card.dataset.name || "").toLowerCase();

        const type =
            (card.dataset.type || "").toLowerCase();

        const length =
            (card.dataset.length || "").toLowerCase();

        const texture =
            (card.dataset.texture || "").toLowerCase();

        const color =
            (card.dataset.color || "").toLowerCase();

        const cut =
            (card.dataset.cut || "").toLowerCase();

        const category =
            (card.dataset.category || "").toLowerCase();

        const text =
            card.textContent.toLowerCase();


        return (
            type === activeFilter ||
            length === activeFilter ||
            texture === activeFilter ||
            color === activeFilter ||
            cut === activeFilter ||
            category === activeFilter ||
            name === activeFilter ||
            text.includes(activeFilter)
        );
    }


    /* =================================================
       FILTER STYLES
    ================================================== */

    function filterStyles() {

        const searchTerm =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        let visibleCount = 0;


        cards.forEach(function (card) {

            const name =
                (
                    card.dataset.name || ""
                ).toLowerCase();

            const type =
                (
                    card.dataset.type || ""
                ).toLowerCase();

            const length =
                (
                    card.dataset.length || ""
                ).toLowerCase();

            const texture =
                (
                    card.dataset.texture || ""
                ).toLowerCase();

            const color =
                (
                    card.dataset.color || ""
                ).toLowerCase();

            const cut =
                (
                    card.dataset.cut || ""
                ).toLowerCase();

            const category =
                (
                    card.dataset.category || ""
                ).toLowerCase();

            const searchableText =
                card.textContent.toLowerCase();


            const matchesSearch =
                !searchTerm ||
                name.includes(searchTerm) ||
                type.includes(searchTerm) ||
                length.includes(searchTerm) ||
                texture.includes(searchTerm) ||
                color.includes(searchTerm) ||
                cut.includes(searchTerm) ||
                category.includes(searchTerm) ||
                searchableText.includes(searchTerm);


            const matchesFilter =
                cardMatchesFilter(card);


            if (
                matchesSearch &&
                matchesFilter
            ) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        /* =================================================
           HIDE EMPTY SECTIONS
        ================================================== */

        resultSections.forEach(function (section) {

            const sectionCards =
                section.querySelectorAll(
                    ".hairstyle-card"
                );


            if (!sectionCards.length) {
                return;
            }


            let sectionHasVisibleCard = false;


            sectionCards.forEach(function (card) {

                if (
                    card.style.display !== "none"
                ) {

                    sectionHasVisibleCard = true;

                }

            });


            section.style.display =
                sectionHasVisibleCard
                    ? ""
                    : "none";

        });


        /* =================================================
           EXTRA SECTION FALLBACK
        ================================================== */

        cards.forEach(function (card) {

            const section =
                card.closest(
                    ".hairstyle-section, " +
                    ".hairstyle-results > section"
                );


            if (!section) {
                return;
            }


            const sectionCards =
                section.querySelectorAll(
                    ".hairstyle-card"
                );


            let visibleInSection = false;


            sectionCards.forEach(function (item) {

                if (
                    item.style.display !== "none"
                ) {

                    visibleInSection = true;

                }

            });


            section.style.display =
                visibleInSection
                    ? ""
                    : "none";

        });


        /* =================================================
           RESULT COUNT
        ================================================== */

        if (resultCount) {

            resultCount.textContent =
                visibleCount +
                (
                    visibleCount === 1
                        ? " style"
                        : " styles"
                );

        }


        if (noResults) {

            noResults.classList.toggle(
                "show",
                visibleCount === 0
            );

        }

    }


    /* =================================================
       SEARCH EVENTS
    ================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterStyles
        );

    }


    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            function () {

                if (searchInput) {

                    searchInput.value = "";

                    filterStyles();

                    searchInput.focus();

                }

            }
        );

    }


    /* =================================================
       TOP CATEGORY BUTTONS
    ================================================== */

    const categoryButtons =
        document.querySelectorAll(
            ".hairstyle-category"
        );


    categoryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                categoryButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add("active");


                activeFilter =
                    (
                        button.dataset.filter ||
                        "all"
                    ).toLowerCase();


                filterStyles();

            }
        );

    });


    /* =================================================
       LEFT FILTER BUTTONS
    ================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".filter-option"
        );


    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const group =
                    button.closest(
                        ".filter-group"
                    );


                if (group) {

                    group
                        .querySelectorAll(
                            ".filter-option"
                        )
                        .forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );

                }


                button.classList.add("active");


                activeFilter =
                    (
                        button.dataset.filter ||
                        "all"
                    ).toLowerCase();


                categoryButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                filterStyles();

            }
        );

    });


    /* =================================================
       RESET FILTERS
    ================================================== */

    const resetFilters =
        document.getElementById(
            "resetFilters"
        );


    if (resetFilters) {

        resetFilters.addEventListener(
            "click",
            function () {

                activeFilter = "all";


                filterButtons.forEach(
                    function (button) {

                        button.classList.toggle(
                            "active",
                            button.dataset.filter === "all"
                        );

                    }
                );


                categoryButtons.forEach(
                    function (button) {

                        button.classList.toggle(
                            "active",
                            button.dataset.filter === "all"
                        );

                    }
                );


                if (searchInput) {
                    searchInput.value = "";
                }


                filterStyles();

            }
        );

    }


    /* =================================================
       FAVORITES
    ================================================== */

    const favoriteButtons =
        document.querySelectorAll(
            ".hairstyle-favorite"
        );


    favoriteButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                button.classList.toggle(
                    "saved"
                );

                const saved =
                    button.classList.contains(
                        "saved"
                    );


                button.textContent =
                    saved ? "♥" : "♡";


                button.setAttribute(
                    "aria-pressed",
                    saved
                        ? "true"
                        : "false"
                );

            }
        );

    });


    /* =================================================
       TRY ON BUTTONS
       OPEN EXTERNAL TRY-ON PAGE
    ================================================== */

    const tryButtons =
        document.querySelectorAll(
            ".hairstyle-try"
        );


    tryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                button.classList.add(
                    "loading"
                );

                window.open(
                    "https://hair-morphing.preview.emergentagent.com/",
                    "_blank"
                );

            }
        );

    });


    /* =================================================
       HERO TRY BUTTON
    ================================================== */

    const heroTryStyle =
        document.getElementById(
            "heroTryStyle"
        );


    if (heroTryStyle) {

        heroTryStyle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.open(
                    "https://hair-morphing.preview.emergentagent.com/",
                    "_blank"
                );

            }
        );

    }


    /* =================================================
       FIND MY STYLE
    ================================================== */

    const heroFindStyle =
        document.getElementById(
            "heroFindStyle"
        );


    if (heroFindStyle) {

        heroFindStyle.addEventListener(
            "click",
            function () {

                const filterPanel =
                    document.querySelector(
                        ".hairstyle-filter-panel"
                    );


                if (filterPanel) {

                    filterPanel.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =================================================
       STYLEME CTA
       OPEN EXTERNAL TRY-ON PAGE
    ================================================== */

    const styleMeButton =
        document.getElementById(
            "styleMeButton"
        );


    if (styleMeButton) {

        styleMeButton.addEventListener(
            "click",
            function () {

                window.open(
                    "https://hair-morphing.preview.emergentagent.com/",
                    "_blank"
                );

            }
        );

    }


    /* =================================================
       VIEW ALL
    ================================================== */

    const viewAllButtons =
        document.querySelectorAll(
            ".view-all-button"
        );


    viewAllButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                activeFilter =
                    (
                        button.dataset.view ||
                        "all"
                    ).toLowerCase();


                categoryButtons.forEach(
                    function (item) {

                        item.classList.toggle(
                            "active",
                            (
                                item.dataset.filter ||
                                "all"
                            ).toLowerCase() ===
                            activeFilter
                        );

                    }
                );


                filterStyles();


                const results =
                    document.querySelector(
                        ".hairstyle-results"
                    );


                if (results) {

                    results.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


    /* =================================================
       BACK BUTTON
    ================================================== */

    const pageBackButton =
        document.getElementById(
            "pageBackButton"
        );


    if (pageBackButton) {

        pageBackButton.addEventListener(
            "click",
            function () {

                window.location.href =
                    "/female";

            }
        );

    }


    /* =================================================
       INITIAL FILTER
    ================================================== */

    filterStyles();

});