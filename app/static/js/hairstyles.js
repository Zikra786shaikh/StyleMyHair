/* =====================================================
   STYLEMYHAIR HAIRSTYLES PAGE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const cards =
            Array.from(
                document.querySelectorAll(
                    ".style-card"
                )
            );


        const filterButtons =
            document.querySelectorAll(
                ".filter-choice"
            );


        const categories =
            document.querySelectorAll(
                ".category"
            );


        const searchInput =
            document.getElementById(
                "searchInput"
            );


        const resetButton =
            document.getElementById(
                "resetFilters"
            );


        const noResults =
            document.getElementById(
                "noResults"
            );


        const modal =
            document.getElementById(
                "tryModal"
            );


        const modalTitle =
            document.getElementById(
                "modalTitle"
            );


        const modalImage =
            document.getElementById(
                "modalImage"
            );


        const modalClose =
            document.getElementById(
                "modalClose"
            );


        const modalDone =
            document.getElementById(
                "modalDone"
            );


        let filters = {

            length: "all",

            type: "all",

            color: "all",

            cut: "all",

            category: "all"

        };



        /* =================================================
           APPLY FILTERS
        ================================================== */

        function applyFilters() {

            const search =
                searchInput
                    ? searchInput.value
                        .trim()
                        .toLowerCase()
                    : "";


            let visibleCount = 0;


            cards.forEach(
                function (card) {

                    const length =
                        card.dataset.length;

                    const type =
                        card.dataset.type;

                    const color =
                        card.dataset.color;

                    const cut =
                        card.dataset.cut;

                    const category =
                        card.dataset.category;

                    const style =
                        card.dataset.style
                            .toLowerCase();


                    const lengthMatch =
                        filters.length === "all" ||
                        length === filters.length;


                    const typeMatch =
                        filters.type === "all" ||
                        type === filters.type;


                    const colorMatch =
                        filters.color === "all" ||
                        color === filters.color;


                    const cutMatch =
                        filters.cut === "all" ||
                        cut === filters.cut;


                    const categoryMatch =
                        filters.category === "all" ||
                        category === filters.category ||
                        category === "short" ||
                        category === "medium" ||
                        category === "long";


                    const searchMatch =
                        search === "" ||
                        style.includes(search);


                    if (
                        lengthMatch &&
                        typeMatch &&
                        colorMatch &&
                        cutMatch &&
                        categoryMatch &&
                        searchMatch
                    ) {

                        card.classList.remove(
                            "hidden"
                        );

                        visibleCount++;

                    } else {

                        card.classList.add(
                            "hidden"
                        );

                    }

                }
            );


            if (visibleCount === 0) {

                noResults.classList.add(
                    "show"
                );

            } else {

                noResults.classList.remove(
                    "show"
                );

            }

        }



        /* =================================================
           LEFT FILTER BUTTONS
        ================================================== */

        filterButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const group =
                            this.dataset.filterGroup;

                        const value =
                            this.dataset.value;


                        document
                            .querySelectorAll(
                                `[data-filter-group="${group}"]`
                            )
                            .forEach(
                                function (item) {

                                    item.classList.remove(
                                        "active"
                                    );

                                }
                            );


                        this.classList.add(
                            "active"
                        );


                        filters[group] =
                            value;


                        applyFilters();

                    }
                );

            }
        );



        /* =================================================
           TOP CATEGORY BUTTONS
        ================================================== */

        categories.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        if (
                            this.id ===
                            "moreCategory"
                        ) {

                            return;

                        }


                        categories.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        this.classList.add(
                            "active"
                        );


                        filters.category =
                            this.dataset.category ||
                            "all";


                        applyFilters();

                    }
                );

            }
        );



        /* =================================================
           SEARCH
        ================================================== */

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                function () {

                    applyFilters();

                }
            );

        }



        /* =================================================
           RESET
        ================================================== */

        if (resetButton) {

            resetButton.addEventListener(
                "click",
                function () {

                    filters = {

                        length: "all",

                        type: "all",

                        color: "all",

                        cut: "all",

                        category: "all"

                    };


                    filterButtons.forEach(
                        function (button) {

                            button.classList.remove(
                                "active"
                            );

                        }
                    );


                    document
                        .querySelector(
                            '[data-filter-group="length"][data-value="all"]'
                        )
                        .classList.add(
                            "active"
                        );


                    document
                        .querySelector(
                            '[data-filter-group="type"][data-value="all"]'
                        )
                        .classList.add(
                            "active"
                        );


                    document
                        .querySelector(
                            '[data-filter-group="color"][data-value="all"]'
                        )
                        .classList.add(
                            "active"
                        );


                    document
                        .querySelector(
                            '[data-filter-group="cut"][data-value="all"]'
                        )
                        .classList.add(
                            "active"
                        );


                    categories.forEach(
                        function (button) {

                            button.classList.remove(
                                "active"
                            );

                        }
                    );


                    document
                        .querySelector(
                            '[data-category="all"]'
                        )
                        .classList.add(
                            "active"
                        );


                    if (searchInput) {

                        searchInput.value =
                            "";

                    }


                    applyFilters();

                }
            );

        }



        /* =================================================
           FAVORITES
        ================================================== */

        let favorites =
            JSON.parse(
                localStorage.getItem(
                    "stylemyhair-hairstyle-favorites"
                )
            ) || [];


        const favoriteButtons =
            document.querySelectorAll(
                ".favorite"
            );


        function updateFavorites() {

            favoriteButtons.forEach(
                function (button) {

                    const style =
                        button.dataset.style;


                    if (
                        favorites.includes(
                            style
                        )
                    ) {

                        button.classList.add(
                            "liked"
                        );

                        button.textContent =
                            "♥";

                    } else {

                        button.classList.remove(
                            "liked"
                        );

                        button.textContent =
                            "♡";

                    }

                }
            );

        }


        favoriteButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        const style =
                            this.dataset.style;


                        if (
                            favorites.includes(
                                style
                            )
                        ) {

                            favorites =
                                favorites.filter(
                                    function (item) {

                                        return item !==
                                            style;

                                    }
                                );

                        } else {

                            favorites.push(
                                style
                            );

                        }


                        localStorage.setItem(
                            "stylemyhair-hairstyle-favorites",
                            JSON.stringify(
                                favorites
                            )
                        );


                        updateFavorites();

                    }
                );

            }
        );


        updateFavorites();



        /* =================================================
           TRY ON
        ================================================== */

        const tryButtons =
            document.querySelectorAll(
                ".try-button"
            );


        tryButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const style =
                            this.dataset.style;


                        const card =
                            this.closest(
                                ".style-card"
                            );


                        const image =
                            card.querySelector(
                                "img"
                            );


                        modalTitle.textContent =
                            style;


                        modalImage.src =
                            image.src;


                        modalImage.alt =
                            style;


                        modal.classList.add(
                            "open"
                        );

                    }
                );

            }
        );



        /* =================================================
           CLOSE MODAL
        ================================================== */

        function closeModal() {

            modal.classList.remove(
                "open"
            );

        }


        modalClose.addEventListener(
            "click",
            closeModal
        );


        modalDone.addEventListener(
            "click",
            closeModal
        );


        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    modal
                ) {

                    closeModal();

                }

            }
        );


        /* =================================================
           ESC KEY
        ================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeModal();

                }

            }
        );


        /* =================================================
           INITIAL
        ================================================== */

        applyFilters();

    }
);
