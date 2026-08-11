/* =====================================================
   STYLEMYHAIR
   MEN'S STYLE STUDIO JS
====================================================== */


/* =====================================================
   ELEMENTS
====================================================== */

const body =
    document.body;

const sidebar =
    document.getElementById(
        "maleSidebar"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );

const mobileClose =
    document.getElementById(
        "mobileClose"
    );

const mobileOverlay =
    document.getElementById(
        "mobileOverlay"
    );

const modeToggle =
    document.getElementById(
        "modeToggle"
    );

const modeIcon =
    document.getElementById(
        "modeIcon"
    );

const modeText =
    document.getElementById(
        "modeText"
    );

const themeName =
    document.getElementById(
        "themeName"
    );

const themeButtons =
    document.querySelectorAll(
        ".theme-dot"
    );

const sideLinks =
    document.querySelectorAll(
        ".side-link[data-scroll]"
    );

const quickCards =
    document.querySelectorAll(
        ".quick-card[data-scroll]"
    );

const exploreButton =
    document.getElementById(
        "exploreButton"
    );

const randomStyleButton =
    document.getElementById(
        "randomStyleButton"
    );

const styleCards =
    document.querySelectorAll(
        ".style-card"
    );

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );

const favoriteButtons =
    document.querySelectorAll(
        ".favorite-button"
    );

const tryButtons =
    document.querySelectorAll(
        ".try-style"
    );

const styleModal =
    document.getElementById(
        "styleModal"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalDone =
    document.getElementById(
        "modalDone"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const previewTitle =
    document.getElementById(
        "previewTitle"
    );

const previewDescription =
    document.getElementById(
        "previewDescription"
    );

const favoriteCount =
    document.getElementById(
        "favoriteCount"
    );

const favoritesEmpty =
    document.getElementById(
        "favoritesEmpty"
    );

const favoritesList =
    document.getElementById(
        "favoritesList"
    );

const searchButton =
    document.getElementById(
        "searchButton"
    );

const searchPanel =
    document.getElementById(
        "searchPanel"
    );

const closeSearch =
    document.getElementById(
        "closeSearch"
    );

const styleSearch =
    document.getElementById(
        "styleSearch"
    );


/* =====================================================
   THEMES
====================================================== */

const themes = {

    graphite: {
        name: "Graphite",
        primary: "#6f7cff",
        secondary: "#aeb6ff",
        accent: "#4c5ee8"
    },

    navy: {
        name: "Navy",
        primary: "#3974b8",
        secondary: "#8bb8e8",
        accent: "#24528c"
    },

    steel: {
        name: "Steel",
        primary: "#7891a8",
        secondary: "#b8c8d6",
        accent: "#526c82"
    },

    ocean: {
        name: "Ocean",
        primary: "#278da6",
        secondary: "#7bc7d7",
        accent: "#16687d"
    },

    emerald: {
        name: "Emerald",
        primary: "#319b79",
        secondary: "#8ad3bb",
        accent: "#217159"
    },

    forest: {
        name: "Forest",
        primary: "#477c61",
        secondary: "#9dbdaa",
        accent: "#315b46"
    },

    burgundy: {
        name: "Burgundy",
        primary: "#9b5263",
        secondary: "#d69ba8",
        accent: "#703746"
    },

    copper: {
        name: "Copper",
        primary: "#bd7950",
        secondary: "#e0aa8a",
        accent: "#8e5334"
    },

    charcoal: {
        name: "Charcoal",
        primary: "#727985",
        secondary: "#b4bac3",
        accent: "#4c515b"
    },

    midnight: {
        name: "Midnight",
        primary: "#63558e",
        secondary: "#a99dd0",
        accent: "#473b70"
    }

};


/* =====================================================
   APPLY THEME
====================================================== */

function applyTheme(themeKey) {

    const theme =
        themes[themeKey];

    if (!theme) {

        return;

    }


    body.style.setProperty(
        "--primary",
        theme.primary
    );

    body.style.setProperty(
        "--secondary",
        theme.secondary
    );

    body.style.setProperty(
        "--accent",
        theme.accent
    );


    body.dataset.theme =
        themeKey;


    themeName.textContent =
        theme.name;


    themeButtons.forEach(
        function(button) {

            button.classList.toggle(
                "active",
                button.dataset.theme === themeKey
            );

        }
    );


    localStorage.setItem(
        "stylemyhair-male-theme",
        themeKey
    );

}


/* =====================================================
   LOAD THEME
====================================================== */

const savedTheme =
    localStorage.getItem(
        "stylemyhair-male-theme"
    );


applyTheme(
    savedTheme && themes[savedTheme]
        ? savedTheme
        : "graphite"
);


/* =====================================================
   THEME CLICK
====================================================== */

themeButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                applyTheme(
                    this.dataset.theme
                );

            }
        );

    }
);


/* =====================================================
   LIGHT / DARK MODE
====================================================== */

const savedMode =
    localStorage.getItem(
        "stylemyhair-male-mode"
    );


if (savedMode === "light") {

    body.classList.add(
        "light-mode"
    );

}


function updateModeUI() {

    const isLight =
        body.classList.contains(
            "light-mode"
        );


    if (isLight) {

        modeIcon.textContent =
            "🌙";

        modeText.textContent =
            "Dark Mode";

    } else {

        modeIcon.textContent =
            "☀";

        modeText.textContent =
            "Light Mode";

    }

}


updateModeUI();


modeToggle.addEventListener(
    "click",
    function() {

        body.classList.toggle(
            "light-mode"
        );


        const mode =
            body.classList.contains(
                "light-mode"
            )
                ? "light"
                : "dark";


        localStorage.setItem(
            "stylemyhair-male-mode",
            mode
        );


        updateModeUI();

    }
);


/* =====================================================
   MOBILE SIDEBAR
====================================================== */

function openSidebar() {

    sidebar.classList.add(
        "mobile-open"
    );

    mobileOverlay.classList.add(
        "active"
    );

}


function closeSidebar() {

    sidebar.classList.remove(
        "mobile-open"
    );

    mobileOverlay.classList.remove(
        "active"
    );

}


mobileMenu.addEventListener(
    "click",
    openSidebar
);


mobileClose.addEventListener(
    "click",
    closeSidebar
);


mobileOverlay.addEventListener(
    "click",
    closeSidebar
);


/* =====================================================
   SCROLL HELPER
====================================================== */

function scrollToSection(
    sectionId
) {

    const section =
        document.getElementById(
            sectionId
        );


    if (!section) {

        return;

    }


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    closeSidebar();

}


/* =====================================================
   SIDEBAR LINKS
====================================================== */

sideLinks.forEach(
    function(link) {

        link.addEventListener(
            "click",
            function() {

                const target =
                    this.dataset.scroll;

                sideLinks.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                scrollToSection(
                    target
                );

            }
        );

    }
);


/* =====================================================
   QUICK CARDS
====================================================== */

quickCards.forEach(
    function(card) {

        card.addEventListener(
            "click",
            function() {

                scrollToSection(
                    this.dataset.scroll
                );

            }
        );

    }
);


/* =====================================================
   EXPLORE BUTTON
====================================================== */

exploreButton.addEventListener(
    "click",
    function() {

        scrollToSection(
            "stylesSection"
        );

    }
);


/* =====================================================
   FILTERS
====================================================== */

filterButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const filter =
                    this.dataset.filter;


                filterButtons.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                styleCards.forEach(
                    function(card) {

                        const category =
                            card.dataset.category;


                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            card.classList.remove(
                                "hidden"
                            );

                        } else {

                            card.classList.add(
                                "hidden"
                            );

                        }

                    }
                );

            }
        );

    }
);


/* =====================================================
   FAVORITES
====================================================== */

let favorites =
    JSON.parse(
        localStorage.getItem(
            "stylemyhair-male-favorites"
        )
    ) || [];


function updateFavoritesUI() {

    favoriteCount.textContent =
        favorites.length;


    favoriteButtons.forEach(
        function(button) {

            const style =
                button.dataset.style;


            const liked =
                favorites.includes(
                    style
                );


            button.classList.toggle(
                "liked",
                liked
            );


            button.textContent =
                liked
                    ? "♥"
                    : "♡";

        }
    );


    if (
        favorites.length === 0
    ) {

        favoritesEmpty.style.display =
            "block";

        favoritesList.style.display =
            "none";

        return;

    }


    favoritesEmpty.style.display =
        "none";

    favoritesList.style.display =
        "grid";


    favoritesList.innerHTML =
        "";


    favorites.forEach(
        function(style) {

            const item =
                document.createElement(
                    "div"
                );


            item.style.cssText = `

                padding:16px;

                background:var(--surface);

                border:1px solid var(--border);

                border-radius:14px;

                color:var(--text);

                font-size:12px;

            `;


            item.innerHTML = `
                <strong>${style}</strong>
            `;


            favoritesList.appendChild(
                item
            );

        }
    );

}


favoriteButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();


                const style =
                    this.dataset.style;


                if (
                    favorites.includes(style)
                ) {

                    favorites =
                        favorites.filter(
                            function(item) {

                                return item !== style;

                            }
                        );

                } else {

                    favorites.push(
                        style
                    );

                }


                localStorage.setItem(
                    "stylemyhair-male-favorites",
                    JSON.stringify(
                        favorites
                    )
                );


                updateFavoritesUI();

            }
        );

    }
);


updateFavoritesUI();


/* =====================================================
   STYLE PREVIEW
====================================================== */

function selectStyle(
    style
) {

    previewTitle.textContent =
        style;


    previewDescription.textContent =
        `Your selected hairstyle is "${style}". This preview area is ready for the future AI hairstyle try-on system. You can add your model image later.`;

    scrollToSection(
        "heroSection"
    );


    setTimeout(
        function() {

            document
                .querySelector(
                    ".preview-section"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        },
        300
    );

}


tryButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const style =
                    this.dataset.style;

                selectStyle(
                    style
                );

                openStyleModal(
                    style
                );

            }
        );

    }
);


/* =====================================================
   MODAL
====================================================== */

function openStyleModal(
    style
) {

    modalTitle.textContent =
        style;

    styleModal.classList.add(
        "open"
    );

}


function closeStyleModal() {

    styleModal.classList.remove(
        "open"
    );

}


modalClose.addEventListener(
    "click",
    closeStyleModal
);


modalDone.addEventListener(
    "click",
    closeStyleModal
);


styleModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            styleModal
        ) {

            closeStyleModal();

        }

    }
);


/* =====================================================
   RANDOM STYLE
====================================================== */

randomStyleButton.addEventListener(
    "click",
    function() {

        const availableStyles =
            Array.from(
                styleCards
            );


        const randomCard =
            availableStyles[
                Math.floor(
                    Math.random() *
                    availableStyles.length
                )
            ];


        if (!randomCard) {

            return;

        }


        const style =
            randomCard.dataset.style;


        selectStyle(
            style
        );


        openStyleModal(
            style
        );

    }
);


/* =====================================================
   SEARCH
====================================================== */

searchButton.addEventListener(
    "click",
    function() {

        searchPanel.classList.toggle(
            "open"
        );


        if (
            searchPanel.classList.contains(
                "open"
            )
        ) {

            styleSearch.focus();

        }

    }
);


closeSearch.addEventListener(
    "click",
    function() {

        searchPanel.classList.remove(
            "open"
        );

    }
);


/* =====================================================
   SEARCH FILTER
====================================================== */

styleSearch.addEventListener(
    "input",
    function() {

        const query =
            this.value
                .trim()
                .toLowerCase();


        styleCards.forEach(
            function(card) {

                const style =
                    card.dataset.style
                        .toLowerCase();

                const category =
                    card.dataset.category
                        .toLowerCase();


                if (
                    style.includes(query) ||
                    category.includes(query)
                ) {

                    card.classList.remove(
                        "hidden"
                    );

                } else {

                    card.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }
);


/* =====================================================
   NEAREST SALON
====================================================== */

function salonMessage() {

    alert(
        "Nearest Salon / Barber feature is ready. We can connect it to location-based salon search next."
    );

}


document
    .getElementById(
        "salonButton"
    )
    .addEventListener(
        "click",
        salonMessage
    );


document
    .getElementById(
        "quickSalon"
    )
    .addEventListener(
        "click",
        salonMessage
    );


document
    .getElementById(
        "nearbySalon"
    )
    .addEventListener(
        "click",
        salonMessage
    );


/* =====================================================
   NEAREST HOSPITAL
====================================================== */

function hospitalMessage() {

    alert(
        "Nearest Hospital feature is ready. We can connect it to location-based hospital search next."
    );

}


document
    .getElementById(
        "hospitalButton"
    )
    .addEventListener(
        "click",
        hospitalMessage
    );


document
    .getElementById(
        "nearbyHospital"
    )
    .addEventListener(
        "click",
        hospitalMessage
    );


/* =====================================================
   PROFILE
====================================================== */

function profileMessage() {

    alert(
        "Profile section is ready. Your user profile page can be connected here."
    );

}


document
    .getElementById(
        "profileButton"
    )
    .addEventListener(
        "click",
        profileMessage
    );


document
    .getElementById(
        "topProfile"
    )
    .addEventListener(
        "click",
        profileMessage
    );


/* =====================================================
   CAMERA
====================================================== */

document
    .getElementById(
        "cameraButton"
    )
    .addEventListener(
        "click",
        function() {

            alert(
                "Camera try-on will be connected here."
            );

        }
    );


/* =====================================================
   UPLOAD
====================================================== */

document
    .getElementById(
        "uploadButton"
    )
    .addEventListener(
        "click",
        function() {

            alert(
                "Photo upload will be connected here."
            );

        }
    );


/* =====================================================
   SETTINGS
====================================================== */

document
    .getElementById(
        "settingsButton"
    )
    .addEventListener(
        "click",
        function() {

            alert(
                "Settings panel will be connected here."
            );

        }
    );


/* =====================================================
   INITIALIZE
====================================================== */

console.log(
    "StyleMyHair Men's Style Studio loaded successfully."
);