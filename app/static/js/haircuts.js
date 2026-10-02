document.addEventListener("DOMContentLoaded", function () {

   /* =================================================
   THEME — CONTINUE HOME PAGE THEME
================================================= */

const themeButtons =
    document.querySelectorAll(".theme-color");

const selectedThemeName =
    document.getElementById("selectedThemeName");

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


/* =================================================
   USE THE SAME THEME STORAGE AS FEMALE.JS
================================================= */

const savedTheme =
    localStorage.getItem(
        "stylemyhair-female-theme"
    );


function applyTheme(theme, save = false) {

    if (!themeNames[theme]) {
        theme = "rose";
    }

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );


    themeButtons.forEach(function (button) {

        button.classList.toggle(
            "active",
            button.dataset.theme === theme
        );

    });


    if (selectedThemeName) {

        selectedThemeName.textContent =
            themeNames[theme];

    }


    if (save) {

        localStorage.setItem(
            "stylemyhair-female-theme",
            theme
        );

    }

}


/* =================================================
   LOAD SAME THEME AS FEMALE PAGE
================================================= */

if (
    savedTheme &&
    themeNames[savedTheme]
) {

    applyTheme(savedTheme);

} else {

    applyTheme("rose");

}


/* =================================================
   THEME BUTTONS
================================================= */

themeButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            applyTheme(
                button.dataset.theme,
                true
            );

        }
    );

});

    /* =================================================
       FILTER ELEMENTS
    ================================================= */

    const lengthButtons =
        document.querySelectorAll(".length-filter");

    const textureButtons =
        document.querySelectorAll(".texture-filter");

    const faceButtons =
        document.querySelectorAll(".face-filter");

    const sections =
        document.querySelectorAll(".length-section");

    const cards =
        document.querySelectorAll(".haircut-card");

    const searchInput =
        document.getElementById("haircutSearch");

    const noResults =
        document.getElementById("noResults");


    let selectedLength = "all";
    let selectedTexture = "";
    let selectedFace = "";
    let searchText = "";


    function normalize(value) {

        return String(value || "")
            .toLowerCase()
            .trim();

    }


    /* =================================================
       FILTER RESULTS
    ================================================= */

    function updateResults() {

        let visibleCount = 0;

        cards.forEach(function (card) {

            const cardLength =
                normalize(card.dataset.length);

            const cardTexture =
                normalize(card.dataset.texture);

            const cardFace =
                normalize(card.dataset.face);

            const cardName =
                normalize(card.dataset.name);


            const lengthMatch =
                selectedLength === "all" ||
                cardLength === selectedLength;


            const textureMatch =
                !selectedTexture ||
                cardTexture.includes(selectedTexture);


            const faceMatch =
                !selectedFace ||
                cardFace.includes(selectedFace);


            const searchMatch =
                !searchText ||
                cardName.includes(searchText);


            const show =
                lengthMatch &&
                textureMatch &&
                faceMatch &&
                searchMatch;


            card.style.display =
                show ? "" : "none";


            if (show) {
                visibleCount++;
            }

        });


        sections.forEach(function (section) {

            const sectionLength =
                normalize(
                    section.dataset.lengthSection
                );


            if (
                selectedLength !== "all" &&
                sectionLength !== selectedLength
            ) {

                section.style.display = "none";
                return;

            }


            const visibleCards =
                section.querySelectorAll(
                    ".haircut-card"
                );


            let hasVisibleCard = false;


            visibleCards.forEach(function (card) {

                if (card.style.display !== "none") {
                    hasVisibleCard = true;
                }

            });


            section.style.display =
                hasVisibleCard ? "" : "none";

        });


        if (noResults) {

            noResults.hidden =
                visibleCount !== 0;

        }

    }


    /* =================================================
       LENGTH
    ================================================= */

    lengthButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                lengthButtons.forEach(function (item) {

                    item.classList.remove("active");

                });


                button.classList.add("active");


                selectedLength =
                    normalize(
                        button.dataset.length
                    );


                updateResults();

            }
        );

    });


    /* =================================================
       TEXTURE
    ================================================= */

    textureButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const texture =
                    normalize(
                        button.dataset.texture
                    );


                if (selectedTexture === texture) {

                    selectedTexture = "";

                    button.classList.remove("active");

                } else {

                    textureButtons.forEach(function (item) {

                        item.classList.remove("active");

                    });

                    button.classList.add("active");

                    selectedTexture = texture;

                }


                updateResults();

            }
        );

    });


    /* =================================================
       FACE SHAPE
    ================================================= */

    faceButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const face =
                    normalize(
                        button.dataset.face
                    );


                if (selectedFace === face) {

                    selectedFace = "";

                    button.classList.remove("active");

                } else {

                    faceButtons.forEach(function (item) {

                        item.classList.remove("active");

                    });

                    button.classList.add("active");

                    selectedFace = face;

                }


                updateResults();

            }
        );

    });


    /* =================================================
       SEARCH
    ================================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                searchText =
                    normalize(
                        searchInput.value
                    );

                updateResults();

            }
        );

    }


    /* =================================================
       RESET
    ================================================= */

    function resetFilters() {

        selectedLength = "all";
        selectedTexture = "";
        selectedFace = "";
        searchText = "";


        lengthButtons.forEach(function (button) {

            button.classList.remove("active");

        });


        const allButton =
            document.querySelector(
                '.length-filter[data-length="all"]'
            );


        if (allButton) {
            allButton.classList.add("active");
        }


        textureButtons.forEach(function (button) {

            button.classList.remove("active");

        });


        faceButtons.forEach(function (button) {

            button.classList.remove("active");

        });


        if (searchInput) {
            searchInput.value = "";
        }


        updateResults();

    }


    const resetButton =
        document.getElementById("resetFilters");

    const heroClear =
        document.getElementById("heroClear");


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetFilters
        );

    }


    if (heroClear) {

        heroClear.addEventListener(
            "click",
            resetFilters
        );

    }


    /* =================================================
       EXPLORE
    ================================================= */

    function scrollToHaircuts() {

        const target =
            document.getElementById("haircuts");


        if (target) {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    const heroExplore =
        document.getElementById("heroExplore");

    const finalExplore =
        document.getElementById("finalExplore");


    if (heroExplore) {

        heroExplore.addEventListener(
            "click",
            scrollToHaircuts
        );

    }


    if (finalExplore) {

        finalExplore.addEventListener(
            "click",
            scrollToHaircuts
        );

    }


    /* =================================================
       TRY ON
       OPEN EXTERNAL AI PAGE
    ================================================= */

    document.addEventListener(
        "click",
        function (event) {

            const tryButton =
                event.target.closest(
                    ".try-on-button, .try-on-btn"
                );


            if (!tryButton) {
                return;
            }


            event.preventDefault();


            window.open(
                "https://hair-morphing.preview.emergentagent.com/",
                "_blank"
            );

        }
    );


    /* =================================================
       BACK BUTTON
    ================================================= */

    const pageBackButton =
        document.getElementById("pageBackButton");


    if (pageBackButton) {

        pageBackButton.addEventListener(
            "click",
            function () {

                window.location.href =
                    "{{ url_for('main.female') }}";

            }
        );

    }


    /* =================================================
       INITIAL
    ================================================= */

    updateResults();

});