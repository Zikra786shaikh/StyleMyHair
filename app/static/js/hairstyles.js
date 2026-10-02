/* =========================================================
   STYLEMYHAIR
   MEN'S HAIRSTYLES PAGE
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const searchInput =
        document.getElementById("styleSearch");

    const styleCards =
        document.querySelectorAll(".style-card");

    const resultCount =
        document.getElementById("resultCount");

    const noResults =
        document.getElementById("noResults");

    const filterToggle =
        document.getElementById("filterToggle");

    const filterPanel =
        document.getElementById("filterPanel");

    const categoryTabs =
        document.querySelectorAll(".category-tab");

    const favoriteButtons =
        document.querySelectorAll(".favorite");


    const textureCards =
        document.querySelectorAll(".texture-card");

    const faceButtons =
        document.querySelectorAll(".face-options button");

    const colorItems =
        document.querySelectorAll(".color-item");

    const themeToggle =
        document.getElementById("themeToggle");


    /* =====================================================
       STATE
    ====================================================== */

    let currentCategory = "all";

    let currentLength = "all";

    let currentTexture = "all";

    let currentMood = "all";



    /* =====================================================
       FILTER PANEL
    ====================================================== */

    if (filterToggle && filterPanel) {

        filterToggle.addEventListener(
            "click",
            function () {

                filterPanel.classList.toggle("open");

            }
        );

    }



    /* =====================================================
       CATEGORY FILTER
    ====================================================== */

    categoryTabs.forEach(function (tab) {

        tab.addEventListener(
            "click",
            function () {

                categoryTabs.forEach(
                    function (item) {

                        item.classList.remove("active");

                    }
                );


                tab.classList.add("active");


                currentCategory =
                    tab.dataset.category;


                applyFilters();

            }
        );

    });



    /* =====================================================
       FILTER OPTIONS
    ====================================================== */

    const filterOptions =
        document.querySelectorAll(".filter-option");


    filterOptions.forEach(function (option) {

        option.addEventListener(
            "click",
            function () {

                const type =
                    option.dataset.filterType;

                const value =
                    option.dataset.filterValue;


                document
                    .querySelectorAll(
                        `.filter-option[data-filter-type="${type}"]`
                    )
                    .forEach(function (item) {

                        item.classList.remove("active");

                    });


                option.classList.add("active");


                if (type === "length") {

                    currentLength = value;

                }


                if (type === "texture") {

                    currentTexture = value;

                }


                if (type === "mood") {

                    currentMood = value;

                }


                applyFilters();

            }
        );

    });



    /* =====================================================
       SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                applyFilters();

            }
        );

    }



    /* =====================================================
       APPLY FILTERS
    ====================================================== */

    function applyFilters() {

        const searchTerm =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        let visibleCount = 0;


        styleCards.forEach(function (card) {

            const name =
                (
                    card.dataset.name || ""
                ).toLowerCase();


            const category =
                (
                    card.dataset.category || ""
                ).toLowerCase();


            const length =
                (
                    card.dataset.length || ""
                ).toLowerCase();


            const texture =
                (
                    card.dataset.texture || ""
                ).toLowerCase();


            const mood =
                (
                    card.dataset.mood || ""
                ).toLowerCase();


            const matchesSearch =
                !searchTerm ||
                name.includes(searchTerm) ||
                category.includes(searchTerm);


            const matchesCategory =
                currentCategory === "all" ||
                category.includes(
                    currentCategory
                );


            const matchesLength =
                currentLength === "all" ||
                length === currentLength;


            const matchesTexture =
                currentTexture === "all" ||
                texture === currentTexture;


            const matchesMood =
                currentMood === "all" ||
                mood === currentMood;


            const visible =
                matchesSearch &&
                matchesCategory &&
                matchesLength &&
                matchesTexture &&
                matchesMood;


            if (visible) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (resultCount) {

            resultCount.textContent =
                `${visibleCount} style${visibleCount === 1 ? "" : "s"}`;

        }


        if (noResults) {

            noResults.classList.toggle(
                "show",
                visibleCount === 0
            );

        }

    }



    /* =====================================================
       FAVORITES
    ====================================================== */

    favoriteButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                button.classList.toggle("saved");


                if (
                    button.classList.contains("saved")
                ) {

                    button.textContent = "♥";

                } else {

                    button.textContent = "♡";

                }

            }
        );

    });



    /* =====================================================
       TRY STYLE BUTTONS
    ====================================================== */

    const tryButtons =
        document.querySelectorAll(
            ".card-action, .try-button"
        );


    tryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(".style-card");


                if (card) {

                    const styleName =
                        card.dataset.name;


                    showMessage(
                        `Selected: ${formatName(styleName)}`
                    );

                } else {

                    showMessage(
                        "Style selected — Try-On will be connected next."
                    );

                }

            }
        );

    });



    /* =====================================================
   HAIR LENGTH SELECTION
====================================================== */

const hairLengthOptions =
    document.querySelectorAll(".hair-length-option");


hairLengthOptions.forEach(function (option) {

    option.addEventListener(
        "click",
        function () {

            const selectedLength =
                option.dataset.length;


            /* -----------------------------
               ACTIVE BUTTON
            ----------------------------- */

            hairLengthOptions.forEach(
                function (item) {

                    item.classList.remove("active");

                }
            );


            option.classList.add("active");


            /* -----------------------------
               UPDATE LENGTH
            ----------------------------- */

            currentLength =
                selectedLength;


            /* -----------------------------
               SYNC FILTER PANEL
            ----------------------------- */

            document
                .querySelectorAll(
                    '.filter-option[data-filter-type="length"]'
                )
                .forEach(function (item) {

                    item.classList.toggle(
                        "active",
                        item.dataset.filterValue === selectedLength
                    );

                });


            /* -----------------------------
               APPLY FILTER
            ----------------------------- */

            applyFilters();


            /* -----------------------------
               SCROLL TO COLLECTION
            ----------------------------- */

            document
                .getElementById("collection")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});



    /* =====================================================
       TEXTURE CARDS
    ====================================================== */

    textureCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                const texture =
                    card.dataset.textureChoice;


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
        );

    });



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

    }


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

    /* =====================================================
       MESSAGE
    ====================================================== */

    function showMessage(message) {

        let toast =
            document.querySelector(
                ".style-toast"
            );


        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );

            toast.className =
                "style-toast";


            toast.style.position =
                "fixed";

            toast.style.bottom =
                "25px";

            toast.style.left =
                "50%";

            toast.style.transform =
                "translateX(-50%)";

            toast.style.zIndex =
                "9999";

            toast.style.padding =
                "13px 20px";

            toast.style.background =
                "#d6c4a2";

            toast.style.color =
                "#111";

            toast.style.fontSize =
                "11px";

            toast.style.letterSpacing =
                "0.08em";

            toast.style.boxShadow =
                "0 15px 40px rgba(0,0,0,.35)";


            document.body.appendChild(
                toast
            );

        }


        toast.textContent =
            message;


        toast.style.opacity =
            "1";


        clearTimeout(
            toast.timeout
        );


        toast.timeout =
            setTimeout(
                function () {

                    toast.style.opacity =
                        "0";

                },
                2200
            );

    }



    /* =====================================================
       FORMAT NAME
    ====================================================== */

    function formatName(name) {

        if (!name) {

            return "Hairstyle";

        }


        return name
            .split(" ")
            .map(function (word) {

                return word
                    .charAt(0)
                    .toUpperCase() +
                    word.slice(1);

            })
            .join(" ");

    }



    /* =====================================================
       INITIAL FILTER
    ====================================================== */

    applyFilters();

});