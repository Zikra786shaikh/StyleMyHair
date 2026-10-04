/* =====================================================
   STYLEMYHAIR - HAIRSTYLE GALLERY
   Search, filters, sorting, favourites, modal and themes
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const STORAGE_KEY = "stylemyhair_favorites";

    // -------------------------------------------------
    // ELEMENTS
    // -------------------------------------------------

    const grid = document.getElementById("hairstyleGrid");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".hairstyle-card"));
    const categoryTabs = document.querySelectorAll(".category-tab");
    const searchInput = document.getElementById("styleSearch");
    const sortSelect = document.getElementById("sortStyles");
    const resultsText = document.getElementById("resultsText");
    const noResults = document.getElementById("noResults");

    const resetButtons = [
        document.getElementById("resetFilters"),
        document.getElementById("clearFilters"),
        document.getElementById("noResultsReset")
    ];

    // Modal
    const modal = document.getElementById("hairstyleModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalTags = document.getElementById("modalTags");
    const modalFavorite = document.getElementById("modalFavorite");
    const modalClose = document.getElementById("modalClose");

    // -------------------------------------------------
    // STATE
    // -------------------------------------------------

    let activeCategory = "all";
    let selectedCard = null;
    const favorites = new Map();

    // -------------------------------------------------
    // LOAD FAVOURITES
    // -------------------------------------------------

    function loadFavorites() {
        favorites.clear();

        try {
            const saved = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "[]"
            );

            saved.forEach(item => {
                if (typeof item === "string") {
                    favorites.set(item, {
                        name: item,
                        image: "",
                        length: "",
                        description: "",
                        tags: ""
                    });
                } else if (item && item.name) {
                    favorites.set(item.name, item);
                }
            });
        } catch (error) {
            console.warn("Could not load favourites.", error);
        }
    }

    // -------------------------------------------------
    // SAVE FAVOURITES
    // -------------------------------------------------

    function saveFavorites() {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify([...favorites.values()])
            );
        } catch (error) {
            console.warn("Could not save favourites.", error);
        }

        updateFavoriteCount();
    }

    function updateFavoriteCount() {
        const count = document.getElementById("favoriteCount");

        if (count) {
            count.textContent = favorites.size;
        }
    }

    // -------------------------------------------------
    // HAIRSTYLE DATA FOR FAVOURITES
    // -------------------------------------------------

    function getFavoriteData(card) {
        const imageElement = card.querySelector(
            ".hairstyle-card-image"
        );

        return {
            name: card.dataset.name || "Hairstyle",
            image: card.dataset.image ||
                imageElement?.src ||
                imageElement?.getAttribute("src") ||
                "",
            length: card.dataset.length || "",
            description: card.dataset.description || "",
            tags: card.dataset.tags || ""
        };
    }

    // -------------------------------------------------
    // HEART BUTTON
    // -------------------------------------------------

    function syncHeart(card) {
        const heart = card.querySelector(".style-heart");
        if (!heart) return;

        const name = card.dataset.name;
        const saved = favorites.has(name);

        heart.classList.toggle("saved", saved);
        heart.textContent = saved ? "♥" : "♡";
        heart.setAttribute("aria-pressed", String(saved));
        heart.setAttribute(
            "aria-label",
            saved ? "Remove from favourites" : "Add to favourites"
        );
    }

    function toggleFavorite(card) {
        const item = getFavoriteData(card);
        const name = item.name;

        if (favorites.has(name)) {
            favorites.delete(name);
        } else {
            favorites.set(name, item);
        }

        syncHeart(card);
        saveFavorites();

        if (
            selectedCard === card &&
            modal?.classList.contains("open")
        ) {
            updateModalFavorite();
        }
    }

    // -------------------------------------------------
    // FILTER VALUES
    // -------------------------------------------------

    function getCheckedValues(name) {
        return Array.from(
            document.querySelectorAll(
                `input[name="${name}"]:checked`
            )
        ).map(input => input.value);
    }

    // -------------------------------------------------
    // FILTER LOGIC
    // -------------------------------------------------

    function matchesFilters(card) {
        const name = (card.dataset.name || "").toLowerCase();
        const length = card.dataset.length || "";
        const description =
            (card.dataset.description || "").toLowerCase();

        const tags = (card.dataset.tags || "")
            .toLowerCase()
            .split(/\s+/);

        const search = (searchInput?.value || "")
            .trim()
            .toLowerCase();

        const selectedLengths = getCheckedValues("length");
        const selectedTypes = getCheckedValues("type");
        const selectedStyles = getCheckedValues("style");

        const matchesSearch =
            !search ||
            name.includes(search) ||
            description.includes(search) ||
            tags.some(tag => tag.includes(search));

        const matchesCategory =
            activeCategory === "all" ||
            length === activeCategory ||
            tags.includes(activeCategory);

        const matchesLength =
            selectedLengths.length === 0 ||
            selectedLengths.includes(length);

        const matchesType =
            selectedTypes.length === 0 ||
            selectedTypes.some(type => tags.includes(type));

        const matchesStyle =
            selectedStyles.length === 0 ||
            selectedStyles.some(style => tags.includes(style));

        return (
            matchesSearch &&
            matchesCategory &&
            matchesLength &&
            matchesType &&
            matchesStyle
        );
    }

    // -------------------------------------------------
    // APPLY FILTERS AND SORTING
    // -------------------------------------------------

    function applyFilters() {
        let visible = cards.filter(matchesFilters);

        const sort = sortSelect?.value || "featured";

        if (sort === "az") {
            visible.sort((a, b) =>
                (a.dataset.name || "").localeCompare(
                    b.dataset.name || ""
                )
            );
        } else if (sort === "za") {
            visible.sort((a, b) =>
                (b.dataset.name || "").localeCompare(
                    a.dataset.name || ""
                )
            );
        }

        visible.forEach(card => grid.appendChild(card));

        cards
            .filter(card => !visible.includes(card))
            .forEach(card => grid.appendChild(card));

        cards.forEach(card => {
            card.hidden = !visible.includes(card);
        });

        if (resultsText) {
            resultsText.textContent =
                `Showing ${visible.length} of ${cards.length} hairstyles`;
        }

        if (noResults) {
            noResults.hidden = visible.length !== 0;
        }
    }

    // -------------------------------------------------
    // MODAL
    // -------------------------------------------------

    function openModal(card) {
        if (
            !modal ||
            !modalImage ||
            !modalTitle ||
            !modalDescription ||
            !modalTags
        ) return;

        selectedCard = card;

        const item = getFavoriteData(card);

        modalImage.src = item.image;
        modalImage.alt = item.name;
        modalTitle.textContent = item.name;
        modalDescription.textContent = item.description;

        modalTags.replaceChildren();

        [item.length, ...item.tags.split(/\s+/)]
            .filter(Boolean)
            .slice(0, 5)
            .forEach(tag => {
                const chip = document.createElement("span");

                chip.textContent =
                    tag.charAt(0).toUpperCase() + tag.slice(1);

                modalTags.appendChild(chip);
            });

        updateModalFavorite();

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
    }

    function updateModalFavorite() {
        if (!selectedCard || !modalFavorite) return;

        const saved = favorites.has(selectedCard.dataset.name);

        modalFavorite.textContent = saved
            ? "♥ Saved to Favorites"
            : "♡ Save to Favorites";
    }

    function closeModal() {
        modal?.classList.remove("open");
        modal?.setAttribute("aria-hidden", "true");
    }

    // -------------------------------------------------
    // CATEGORY TABS
    // -------------------------------------------------

    categoryTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            categoryTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");
            activeCategory = tab.dataset.category || "all";

            applyFilters();
        });
    });

    // -------------------------------------------------
    // FILTER EVENTS
    // -------------------------------------------------

    document
        .querySelectorAll('.filter-group input[type="checkbox"]')
        .forEach(input => {
            input.addEventListener("change", applyFilters);
        });

    searchInput?.addEventListener("input", applyFilters);
    sortSelect?.addEventListener("change", applyFilters);

    // -------------------------------------------------
    // RESET FILTERS
    // -------------------------------------------------

    resetButtons.forEach(button => {
        button?.addEventListener("click", () => {
            document
                .querySelectorAll(
                    '.filter-group input[type="checkbox"]'
                )
                .forEach(input => {
                    input.checked = false;
                });

            if (searchInput) searchInput.value = "";
            if (sortSelect) sortSelect.value = "featured";

            activeCategory = "all";

            categoryTabs.forEach(tab => {
                tab.classList.toggle(
                    "active",
                    tab.dataset.category === "all"
                );
            });

            applyFilters();
        });
    });

    // -------------------------------------------------
    // CARD EVENTS
    // -------------------------------------------------

    cards.forEach(card => {
        const heart = card.querySelector(".style-heart");
        const details = card.querySelector(".details-button");
        const quickView = card.querySelector(".quick-view");
        const image = card.querySelector(".hairstyle-card-image");

        syncHeart(card);

        heart?.addEventListener("click", event => {
            event.stopPropagation();
            toggleFavorite(card);
        });

        details?.addEventListener("click", () => {
            openModal(card);
        });

        quickView?.addEventListener("click", () => {
            openModal(card);
        });

        image?.addEventListener("dblclick", () => {
            openModal(card);
        });
    });

    // -------------------------------------------------
    // MODAL EVENTS
    // -------------------------------------------------

    modalFavorite?.addEventListener("click", () => {
        if (selectedCard) {
            toggleFavorite(selectedCard);
        }
    });

    modalClose?.addEventListener("click", closeModal);

    modal?.addEventListener("click", event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    // -------------------------------------------------
    // SEARCH PANEL
    // -------------------------------------------------

    const searchButton = document.getElementById("searchButton");
    const searchPanel = document.getElementById("searchPanel");
    const closeSearch = document.getElementById("closeSearch");

    searchButton?.addEventListener("click", () => {
        searchPanel?.classList.toggle("open");

        if (searchPanel?.classList.contains("open")) {
            searchInput?.focus();
        }
    });

    closeSearch?.addEventListener("click", () => {
        searchPanel?.classList.remove("open");

        if (searchInput) {
            searchInput.value = "";
            applyFilters();
        }
    });

    // -------------------------------------------------
    // MOBILE SIDEBAR
    // -------------------------------------------------

    const sidebar = document.getElementById("maleSidebar");
    const overlay = document.getElementById("mobileOverlay");

    function closeSidebar() {
        sidebar?.classList.remove("open");
        overlay?.classList.remove("show");
    }

    document.getElementById("mobileMenu")?.addEventListener(
        "click",
        () => {
            sidebar?.classList.add("open");
            overlay?.classList.add("show");
        }
    );

    document
        .getElementById("mobileClose")
        ?.addEventListener("click", closeSidebar);

    overlay?.addEventListener("click", closeSidebar);

    // -------------------------------------------------
    // THEME SELECTOR
    // -------------------------------------------------

    const themeGrid = document.getElementById("themeGrid");
    const themeName = document.getElementById("themeName");

    

    const themeLabels = {
        graphite: "Graphite",
        navy: "Navy",
        steel: "Steel",
        ocean: "Ocean",
        emerald: "Emerald",
        forest: "Forest",
        burgundy: "Burgundy",
        copper: "Copper",
        charcoal: "Charcoal",
        midnight: "Midnight"
    };

    function setTheme(theme) {
        document.body.dataset.theme = theme;


        themeButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.theme === theme
            );
        });

        if (themeName) {
            themeName.textContent =
                themeLabels[theme] || "Graphite";
        }


                currentTexture = texture;


                document
                    .querySelectorAll(
                        '.filter-option[data-filter-type="texture"]'
                    )
                    .forEach(function (item) {

                        item.classList.toggle(
                            "active",
                            item.dataset.filterValue === texture
                        );

                    });


                applyFilters();


                document
                    .getElementById("collection")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        

    



    /* =====================================================
       FACE SHAPE
    ====================================================== */

    faceButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                faceButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                button.classList.add(
                    "selected"
                );


                showMessage(
                    `${button.textContent.trim()} face styles will be personalized next.`
                );

            }
        );

    });



    /* =====================================================
       COLOR SELECTION
    ====================================================== */

    colorItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                colorItems.forEach(
                    function (color) {

                        color.classList.remove(
                            "selected"
                        );

                    }
                );


                item.classList.add(
                    "selected"
                );


                const colorName =
                    item.querySelector(
                        "strong"
                    );


                if (colorName) {

                    showMessage(
                        `${colorName.textContent.trim()} selected.`
                    );

                }

            }
        );

    });

/* =====================================================
   THEME — CONTINUE HOME PAGE THEME
===================================================== */

const themeNames = {
    rose: "Rose",
    lavender: "Lavender",
    peach: "Peach",
    sky: "Sky Blue",
    mint: "Mint",
    sage: "Sage",
    butter: "Butter",
    coral: "Coral",
    plum: "Plum",
    ocean: "Ocean",
    cocoa: "Cocoa",
    midnight: "Midnight"
};


/* =====================================================
   THEME BUTTONS
===================================================== */

const themeButtons =
    document.querySelectorAll(".theme-color");

const selectedThemeName =
    document.getElementById("selectedThemeName");


/* =====================================================
   LOAD HOME PAGE THEME
===================================================== */

function getSavedTheme() {

    return localStorage.getItem(
        "stylemyhair-female-theme"
    );

}


/* =====================================================
   APPLY THEME
===================================================== */

function applyTheme(theme, save = false) {

    if (!themeNames[theme]) {

        theme = "rose";

        localStorage.setItem("stylemyhair_theme", theme);
    }

    themeButtons.forEach(button => {
        button.addEventListener("click", () => {
            setTheme(button.dataset.theme);
        });
    });


    const storedTheme = localStorage.getItem("stylemyhair_theme");

    /* MAIN THEME */

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );


    /* REMOVE OLD LIGHT MODE */

    document.body.classList.remove(
        "light"
    );


    /* ACTIVE THEME BUTTON */

    themeButtons.forEach(function (button) {

        button.classList.toggle(
            "active",
            button.dataset.theme === theme
        );

    });


    /* THEME NAME */

    if (selectedThemeName) {

        selectedThemeName.textContent =
            themeNames[theme];

    }


    /* SAVE */

    if (save) {

        localStorage.setItem(
            "stylemyhair-female-theme",
            theme
        );

    }

}


/* =====================================================
   INITIAL THEME
===================================================== */

const savedTheme =
    getSavedTheme();


if (
    savedTheme &&
    themeNames[savedTheme]
) {

    applyTheme(savedTheme);

} else {

    applyTheme("rose");

}


/* =====================================================
   THEME BUTTONS
===================================================== */

themeButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const selectedTheme =
                button.dataset.theme;


            if (
                !themeNames[selectedTheme]
            ) {

                return;

            }


            applyTheme(
                selectedTheme,
                true
            );

        }
    );

});


/* =====================================================
   OLD DARK/LIGHT BUTTON
===================================================== */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "light"
            );


            const isLight =
                document.body.classList.contains(
                    "light"
                );


            if (isLight) {

                document.documentElement.setAttribute(
                    "data-theme",
                    "rose"
                );

            } else {

                const currentTheme =
                    document.documentElement.getAttribute(
                        "data-theme"
                    ) || "midnight";


                document.documentElement.setAttribute(
                    "data-theme",
                    currentTheme
                );

            }

        }
    );

}

    if (storedTheme && themeLabels[storedTheme]) {
        setTheme(storedTheme);
    }

    // -------------------------------------------------
    // LIGHT MODE
    // -------------------------------------------------

    const modeToggle = document.getElementById("modeToggle");
    const modeIcon = document.getElementById("modeIcon");
    const modeText = document.getElementById("modeText");

    function setLightMode(enabled) {
        document.body.classList.toggle("light-mode", enabled);

        if (modeIcon) {
            modeIcon.textContent = enabled ? "☾" : "☀";
        }

        if (modeText) {
            modeText.textContent =
                enabled ? "Dark Mode" : "Light Mode";
        }

        localStorage.setItem(
            "stylemyhair_light_mode",
            String(enabled)
        );
    }

    modeToggle?.addEventListener("click", () => {
        setLightMode(
            !document.body.classList.contains("light-mode")
        );
    });

    setLightMode(
        localStorage.getItem("stylemyhair_light_mode") === "true"
    );

    // -------------------------------------------------
    // STORAGE SYNC
    // -------------------------------------------------

    window.addEventListener("storage", event => {
        if (event.key === STORAGE_KEY) {
            loadFavorites();

            cards.forEach(syncHeart);
            updateFavoriteCount();
        }
    });

    // -------------------------------------------------
    // INITIALIZE
    // -------------------------------------------------

    loadFavorites();

    cards.forEach(syncHeart);

    updateFavoriteCount();
    applyFilters();

    console.log("StyleMyHair hairstyle gallery initialized.");
});