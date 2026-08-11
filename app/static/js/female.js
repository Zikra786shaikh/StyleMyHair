/* =========================================================
   STYLEMYHAIR
   FEMALE STYLE STUDIO
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body =
        document.body;

    const html =
        document.documentElement;


    const sidebar =
        document.getElementById(
            "femaleSidebar"
        );


    const mobileMenuButton =
        document.getElementById(
            "mobileMenuButton"
        );


    const sidebarOverlay =
        document.getElementById(
            "sidebarOverlay"
        );


    const themeButtons =
        document.querySelectorAll(
            ".theme-color"
        );


    const selectedThemeName =
        document.getElementById(
            "selectedThemeName"
        );


    const darkModeButton =
        document.getElementById(
            "darkModeButton"
        );


    const searchInput =
        document.getElementById(
            "styleSearch"
        );


    const clearSearch =
        document.getElementById(
            "clearSearch"
        );


    const categoryButtons =
        document.querySelectorAll(
            ".category-button"
        );


    const styleCards =
        document.querySelectorAll(
            ".style-card"
        );


    const resultCount =
        document.getElementById(
            "resultCount"
        );


    const noResults =
        document.getElementById(
            "noResults"
        );


    /* =====================================================
       THEME NAMES
    ====================================================== */

    const themeNames = {

        rose:
            "Rose",

        lavender:
            "Lavender",

        peach:
            "Peach",

        sky:
            "Sky Blue",

        mint:
            "Mint",

        sage:
            "Sage",

        butter:
            "Butter",

        coral:
            "Coral",

        plum:
            "Plum",

        ocean:
            "Ocean",

        cocoa:
            "Cocoa",

        midnight:
            "Midnight"

    };


    /* =====================================================
       LOAD SAVED THEME
    ====================================================== */

    const savedTheme =
        localStorage.getItem(
            "stylemyhair-female-theme"
        );


    if (
        savedTheme &&
        themeNames[savedTheme]
    ) {

        html.setAttribute(
            "data-theme",
            savedTheme
        );

    }


    function updateThemeUI() {

        const currentTheme =
            html.getAttribute(
                "data-theme"
            ) || "rose";


        themeButtons.forEach(
            function (button) {

                button.classList.toggle(
                    "active",
                    button.dataset.theme === currentTheme
                );

            }
        );


        if (selectedThemeName) {

            selectedThemeName.textContent =
                themeNames[currentTheme] ||
                "Rose";

        }

    }


    updateThemeUI();


    /* =====================================================
       THEME BUTTONS
    ====================================================== */

    themeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const selectedTheme =
                        this.dataset.theme;


                    if (
                        !themeNames[selectedTheme]
                    ) {

                        return;

                    }


                    html.setAttribute(
                        "data-theme",
                        selectedTheme
                    );


                    localStorage.setItem(
                        "stylemyhair-female-theme",
                        selectedTheme
                    );


                    updateThemeUI();

                }
            );

        }
    );


    /* =====================================================
       DARK MODE
    ====================================================== */

    const savedDarkMode =
        localStorage.getItem(
            "stylemyhair-dark-mode"
        );


    if (
        savedDarkMode === "true"
    ) {

        body.classList.add(
            "dark-mode"
        );

    }


    function updateDarkModeIcon() {

        if (!darkModeButton) {

            return;

        }


        const isDark =
            body.classList.contains(
                "dark-mode"
            );


        darkModeButton.textContent =
            isDark
                ? "☾"
                : "☼";

    }


    updateDarkModeIcon();


    if (darkModeButton) {

        darkModeButton.addEventListener(
            "click",
            function () {

                body.classList.toggle(
                    "dark-mode"
                );


                const isDark =
                    body.classList.contains(
                        "dark-mode"
                    );


                localStorage.setItem(
                    "stylemyhair-dark-mode",
                    String(isDark)
                );


                updateDarkModeIcon();

            }
        );

    }


    /* =====================================================
       SIDEBAR
    ====================================================== */

    function openSidebar() {

        if (sidebar) {

            sidebar.classList.add(
                "mobile-open"
            );

        }


        if (sidebarOverlay) {

            sidebarOverlay.classList.add(
                "show"
            );

        }


        if (mobileMenuButton) {

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        body.classList.add(
            "sidebar-open"
        );

    }


    function closeSidebar() {

        if (sidebar) {

            sidebar.classList.remove(
                "mobile-open"
            );

        }


        if (sidebarOverlay) {

            sidebarOverlay.classList.remove(
                "show"
            );

        }


        if (mobileMenuButton) {

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        body.classList.remove(
            "sidebar-open"
        );

    }


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            function () {

                const isOpen =
                    sidebar &&
                    sidebar.classList.contains(
                        "mobile-open"
                    );


                if (isOpen) {

                    closeSidebar();

                } else {

                    openSidebar();

                }

            }
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =====================================================
       SIDEBAR LINKS
    ====================================================== */

    const sidebarLinks =
        document.querySelectorAll(
            ".sidebar-link"
        );


    sidebarLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    sidebarLinks.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );


                    if (
                        window.innerWidth <= 800
                    ) {

                        closeSidebar();

                    }

                }
            );

        }
    );


    /* =====================================================
       MOBILE BOTTOM NAV
    ====================================================== */

    const mobileBottomLinks =
        document.querySelectorAll(
            ".mobile-bottom-nav a"
        );


    mobileBottomLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    mobileBottomLinks.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    /* =====================================================
       SEARCH + FILTER
    ====================================================== */

    let selectedCategory =
        "all";


    function filterStyles() {

        const searchTerm =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        let visibleCount = 0;


        styleCards.forEach(
            function (card) {

                const category =
                    (
                        card.dataset.category ||
                        ""
                    ).toLowerCase();


                const name =
                    (
                        card.dataset.name ||
                        ""
                    ).toLowerCase();


                const description =
                    card.querySelector(
                        ".style-card-content p"
                    );


                const descriptionText =
                    description
                        ? description.textContent.toLowerCase()
                        : "";


                const matchesCategory =
                    selectedCategory === "all" ||
                    category === selectedCategory;


                const matchesSearch =
                    !searchTerm ||
                    name.includes(searchTerm) ||
                    descriptionText.includes(searchTerm);


                const shouldShow =
                    matchesCategory &&
                    matchesSearch;


                card.style.display =
                    shouldShow
                        ? ""
                        : "none";


                if (shouldShow) {

                    visibleCount++;

                }

            }
        );


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


    categoryButtons.forEach(
        function (button) {

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


                    this.classList.add(
                        "active"
                    );


                    selectedCategory =
                        (
                            this.dataset.category ||
                            "all"
                        ).toLowerCase();


                    filterStyles();

                }
            );

        }
    );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                if (clearSearch) {

                    clearSearch.style.display =
                        this.value
                            ? "block"
                            : "none";

                }


                filterStyles();

            }
        );

    }


    /* =====================================================
       CLEAR SEARCH
    ====================================================== */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            function () {

                if (!searchInput) {

                    return;

                }


                searchInput.value = "";


                clearSearch.style.display =
                    "none";


                filterStyles();


                searchInput.focus();

            }
        );

    }


    /* =====================================================
       FILTER BUTTON
    ====================================================== */

    const filterButton =
        document.getElementById(
            "filterButton"
        );


    if (filterButton) {

        filterButton.addEventListener(
            "click",
            function () {

                const styles =
                    document.getElementById(
                        "hairstyles"
                    );


                if (styles) {

                    styles.scrollIntoView(
                        {
                            behavior:
                                "smooth",
                            block:
                                "start"
                        }
                    );

                }


                setTimeout(
                    function () {

                        const filter =
                            document.getElementById(
                                "categoryFilter"
                            );


                        if (filter) {

                            filter.animate(
                                [
                                    {
                                        transform:
                                            "scale(1)"
                                    },
                                    {
                                        transform:
                                            "scale(1.02)"
                                    },
                                    {
                                        transform:
                                            "scale(1)"
                                    }
                                ],
                                {
                                    duration: 500
                                }
                            );

                        }

                    },
                    400
                );

            }
        );

    }


    /* =====================================================
       HEADER SEARCH
    ====================================================== */

    const headerSearch =
        document.getElementById(
            "headerSearchButton"
        );


    if (headerSearch) {

        headerSearch.addEventListener(
            "click",
            function () {

                const tools =
                    document.querySelector(
                        ".style-tools"
                    );


                if (tools) {

                    tools.scrollIntoView(
                        {
                            behavior:
                                "smooth",
                            block:
                                "center"
                        }
                    );

                }


                setTimeout(
                    function () {

                        if (searchInput) {

                            searchInput.focus();

                        }

                    },
                    500
                );

            }
        );

    }


    /* =====================================================
       IMAGE GALLERIES
    ====================================================== */

    const galleryNextButtons =
        document.querySelectorAll(
            ".gallery-next"
        );


    galleryNextButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const card =
                        this.closest(
                            ".style-card"
                        );


                    if (!card) {

                        return;

                    }


                    const images =
                        card.querySelectorAll(
                            ".gallery-image"
                        );


                    if (
                        images.length <= 1
                    ) {

                        return;

                    }


                    let current =
                        Array.from(images)
                            .findIndex(
                                function (image) {

                                    return image.classList.contains(
                                        "active"
                                    );

                                }
                            );


                    if (current < 0) {

                        current = 0;

                    }


                    images[current].classList.remove(
                        "active"
                    );


                    current =
                        (
                            current + 1
                        ) %
                        images.length;


                    images[current].classList.add(
                        "active"
                    );

                }
            );

        }
    );


    /* =====================================================
       FAVORITES
    ====================================================== */

    const favoriteButtons =
        document.querySelectorAll(
            ".favorite-button"
        );


    function updateFavorites() {

        const saved =
            document.querySelectorAll(
                ".favorite-button.saved"
            );


        const favoritesEmpty =
            document.getElementById(
                "favoritesEmpty"
            );


        if (!favoritesEmpty) {

            return;

        }


        if (saved.length === 0) {

            favoritesEmpty.innerHTML = `

                <div class="empty-heart">
                    ♡
                </div>

                <h3>
                    Your favorite styles will appear here.
                </h3>

                <p>
                    Tap the heart on any hairstyle to save it.
                </p>

            `;

            return;

        }


        favoritesEmpty.innerHTML = `

            <div class="empty-heart">
                ♥
            </div>

            <h3>
                ${saved.length}
                ${saved.length === 1 ? "style" : "styles"}
                saved
            </h3>

            <p>
                Your saved hairstyles are ready whenever you need inspiration.
            </p>

        `;

    }


    favoriteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const isSaved =
                        this.classList.toggle(
                            "saved"
                        );


                    this.textContent =
                        isSaved
                            ? "♥"
                            : "♡";


                    this.setAttribute(
                        "aria-pressed",
                        String(isSaved)
                    );


                    updateFavorites();

                }
            );

        }
    );


    /* =====================================================
       FIND MY STYLE
    ====================================================== */

    const findStyleButton =
        document.getElementById(
            "findStyleButton"
        );


    const heroFindStyle =
        document.getElementById(
            "heroFindStyle"
        );


    function openStyleDiscovery() {

        /*
         * Temporary behaviour:
         * Scroll to hairstyle collection.
         *
         * Later this can open a real
         * personalized questionnaire.
         */

        const hairstyles =
            document.getElementById(
                "hairstyles"
            );


        if (hairstyles) {

            hairstyles.scrollIntoView(
                {
                    behavior:
                        "smooth",
                    block:
                        "start"
                }
            );

        }

    }


    if (findStyleButton) {

        findStyleButton.addEventListener(
            "click",
            openStyleDiscovery
        );

    }


    if (heroFindStyle) {

        heroFindStyle.addEventListener(
            "click",
            openStyleDiscovery
        );

    }


    /* =====================================================
       MY LOOKS
    ====================================================== */

    const myLooksButton =
        document.getElementById(
            "myLooksButton"
        );


    if (myLooksButton) {

        myLooksButton.addEventListener(
            "click",
            function () {

                const favorites =
                    document.getElementById(
                        "favorites"
                    );


                if (favorites) {

                    favorites.scrollIntoView(
                        {
                            behavior:
                                "smooth",
                            block:
                                "start"
                        }
                    );

                }

            }
        );

    }


    /* =====================================================
       SALON
    ====================================================== */

    const salonButton =
        document.getElementById(
            "salonButton"
        );


    if (salonButton) {

        salonButton.addEventListener(
            "click",
            function () {

                window.open(
                    "https://www.google.com/maps/search/salon",
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       HOSPITAL
    ====================================================== */

    const hospitalButton =
        document.getElementById(
            "hospitalButton"
        );


    if (hospitalButton) {

        hospitalButton.addEventListener(
            "click",
            function () {

                window.open(
                    "https://www.google.com/maps/search/hospital",
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 800
            ) {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       SCROLL ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (!entry.isIntersecting) {

                            return;

                        }


                        const id =
                            entry.target.id;


                        sidebarLinks.forEach(
                            function (link) {

                                const href =
                                    link.getAttribute(
                                        "href"
                                    );


                                link.classList.toggle(
                                    "active",
                                    href === "#" + id
                                );

                            }
                        );


                        mobileBottomLinks.forEach(
                            function (link) {

                                const href =
                                    link.getAttribute(
                                        "href"
                                    );


                                link.classList.toggle(
                                    "active",
                                    href === "#" + id
                                );

                            }
                        );

                    }
                );

            },
            {
                threshold: 0.25
            }
        );


    sections.forEach(
        function (section) {

            observer.observe(
                section
            );

        }
    );
    /* =====================================================
   PAGE BACK BUTTON
====================================================== */

const pageBackButton =
    document.getElementById("pageBackButton");

if (pageBackButton) {

    pageBackButton.addEventListener(
        "click",
        function () {

            if (window.history.length > 1) {

                window.history.back();

            } else {

                window.location.href = "/";

            }

        }
    );

}


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterStyles();

    updateFavorites();

});