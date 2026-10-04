/* =====================================================
   STYLEMYHAIR
   FAVOURITES PAGE
   ALL MALE FAVORITES + HAIRSTYLES + PRODUCTS + REELS
====================================================== */


/* =====================================================
   STORAGE KEYS
====================================================== */

const MALE_FAVORITES_KEY =
    "stylemyhair-male-favorites";

const HAIRSTYLE_FAVORITES_KEY =
    "stylemyhair_favorites";

const PRODUCT_FAVORITES_KEY =
    "stylemyhair-male-product-favorites";

const LIKED_REELS_KEY =
    "stylemyhair-male-liked-reels";


/* =====================================================
   ELEMENTS
====================================================== */

const favouritesGrid =
    document.getElementById("favouritesGrid");

const favouritesEmpty =
    document.getElementById("favouritesEmpty");

const pageFavoriteCount =
    document.getElementById("pageFavoriteCount");

const pageFavoriteCountHeader =
    document.getElementById("favoriteCount");

const filterButtons =
    document.querySelectorAll(".favourite-filter");

const sortSelect =
    document.getElementById("favouriteSort");


/* =====================================================
   ESCAPE HTML
====================================================== */

function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   PRODUCT CATALOG
====================================================== */

const productCatalog = {

    "shampoo-1": {
        title: "Anti-Dandruff Shampoo",
        category: "product",
        type: "Shampoo",
        image: "male-product-shampoo-1.jpg",
        description: "Scalp care and freshness",
        price: "₹299"
    },

    "shampoo-2": {
        title: "Deep Clean Men Shampoo",
        category: "product",
        type: "Shampoo",
        image: "male-product-shampoo-2.jpg",
        description: "Deep cleansing formula",
        price: "₹349"
    },

    "shampoo-3": {
        title: "Hair Fall Control Shampoo",
        category: "product",
        type: "Shampoo",
        image: "male-product-shampoo-3.jpg",
        description: "Strengthens and nourishes",
        price: "₹399"
    },

    "shampoo-4": {
        title: "Daily Fresh Shampoo",
        category: "product",
        type: "Shampoo",
        image: "male-product-shampoo-4.jpg",
        description: "Fresh everyday cleansing",
        price: "₹249"
    },


    "conditioner-1": {
        title: "Smooth Hair Conditioner",
        category: "product",
        type: "Conditioner",
        image: "male-product-conditioner-1.jpg",
        description: "Soft and manageable hair",
        price: "₹299"
    },

    "conditioner-2": {
        title: "Deep Repair Conditioner",
        category: "product",
        type: "Conditioner",
        image: "male-product-conditioner-2.jpg",
        description: "Repairs dry damaged hair",
        price: "₹399"
    },

    "conditioner-3": {
        title: "Curl Define Conditioner",
        category: "product",
        type: "Conditioner",
        image: "male-product-conditioner-3.jpg",
        description: "Defines curls and reduces frizz",
        price: "₹449"
    },

    "conditioner-4": {
        title: "Lightweight Daily Conditioner",
        category: "product",
        type: "Conditioner",
        image: "male-product-conditioner-4.jpg",
        description: "Lightweight daily softness",
        price: "₹279"
    },


    "serum-1": {
        title: "Hair Growth Serum",
        category: "product",
        type: "Hair Serum",
        image: "male-product-serum-1.jpg",
        description: "Supports healthy hair growth",
        price: "₹499"
    },

    "serum-2": {
        title: "Anti-Frizz Hair Serum",
        category: "product",
        type: "Hair Serum",
        image: "male-product-serum-2.jpg",
        description: "Smooth finish and frizz control",
        price: "₹349"
    },

    "serum-3": {
        title: "Shiny Hair Serum",
        category: "product",
        type: "Hair Serum",
        image: "male-product-serum-3.jpg",
        description: "Smooth and shiny finish",
        price: "₹329"
    },

    "serum-4": {
        title: "Scalp Nourishing Serum",
        category: "product",
        type: "Hair Serum",
        image: "male-product-serum-4.jpg",
        description: "Nourishes scalp and roots",
        price: "₹449"
    },


    "oil-1": {
        title: "Beard Growth Oil",
        category: "product",
        type: "Hair Oil",
        image: "male-product-oil-1.jpg",
        description: "Thicker and healthier beard",
        price: "₹499"
    },

    "oil-2": {
        title: "Onion Hair Oil",
        category: "product",
        type: "Hair Oil",
        image: "male-product-oil-2.jpg",
        description: "Nourishes roots and scalp",
        price: "₹299"
    },

    "oil-3": {
        title: "Argan Hair Oil",
        category: "product",
        type: "Hair Oil",
        image: "male-product-oil-3.jpg",
        description: "Smoothness and shine",
        price: "₹399"
    },

    "oil-4": {
        title: "Lightweight Hair Oil",
        category: "product",
        type: "Hair Oil",
        image: "male-product-oil-4.jpg",
        description: "Lightweight everyday nourishment",
        price: "₹279"
    },


    "mask-1": {
        title: "Deep Conditioning Hair Mask",
        category: "product",
        type: "Hair Mask",
        image: "male-product-mask-1.jpg",
        description: "Deep conditioning treatment",
        price: "₹399"
    },

    "mask-2": {
        title: "Anti-Damage Hair Mask",
        category: "product",
        type: "Hair Mask",
        image: "male-product-mask-2.jpg",
        description: "Helps repair damaged hair",
        price: "₹449"
    },

    "mask-3": {
        title: "Curl Care Hair Mask",
        category: "product",
        type: "Hair Mask",
        image: "male-product-mask-3.jpg",
        description: "Curl definition and moisture",
        price: "₹499"
    },

    "mask-4": {
        title: "Volume Hair Mask",
        category: "product",
        type: "Hair Mask",
        image: "male-product-mask-4.jpg",
        description: "Adds body and volume",
        price: "₹379"
    },


    "styling-1": {
        title: "Matte Hair Styling Wax",
        category: "product",
        type: "Styling",
        image: "male-product-styling-1.jpg",
        description: "Strong hold with matte finish",
        price: "₹349"
    },

    "styling-2": {
        title: "Strong Hold Hair Clay",
        category: "product",
        type: "Styling",
        image: "male-product-styling-2.jpg",
        description: "Natural strong hold",
        price: "₹399"
    },

    "styling-3": {
        title: "Texturizing Hair Cream",
        category: "product",
        type: "Styling",
        image: "male-product-styling-3.jpg",
        description: "Flexible texture and definition",
        price: "₹329"
    },

    "styling-4": {
        title: "Long Lasting Hair Gel",
        category: "product",
        type: "Styling",
        image: "male-product-styling-4.jpg",
        description: "Long lasting styling control",
        price: "₹249"
    },


    "beard-1": {
        title: "Beard Growth Oil",
        category: "product",
        type: "Beard Care",
        image: "male-product-beard-1.jpg",
        description: "Thicker and healthier beard",
        price: "₹499"
    },

    "beard-2": {
        title: "Beard Balm",
        category: "product",
        type: "Beard Care",
        image: "male-product-beard-2.jpg",
        description: "Shape and condition",
        price: "₹449"
    },

    "beard-3": {
        title: "Beard Wash",
        category: "product",
        type: "Beard Care",
        image: "male-product-beard-3.jpg",
        description: "Gentle beard cleansing",
        price: "₹299"
    },

    "beard-4": {
        title: "Beard Softening Cream",
        category: "product",
        type: "Beard Care",
        image: "male-product-beard-4.jpg",
        description: "Softens coarse beard hair",
        price: "₹379"
    },


    "growth-1": {
        title: "Hair Growth Tonic",
        category: "product",
        type: "Hair Growth",
        image: "male-product-growth-1.jpg",
        description: "Supports healthy hair growth",
        price: "₹449"
    },

    "growth-2": {
        title: "Scalp Growth Serum",
        category: "product",
        type: "Hair Growth",
        image: "male-product-growth-2.jpg",
        description: "Scalp nourishment and care",
        price: "₹499"
    },

    "growth-3": {
        title: "Root Strength Oil",
        category: "product",
        type: "Hair Growth",
        image: "male-product-growth-3.jpg",
        description: "Strengthens roots",
        price: "₹349"
    },

    "growth-4": {
        title: "Hair Strengthening Serum",
        category: "product",
        type: "Hair Growth",
        image: "male-product-growth-4.jpg",
        description: "Strength and nourishment",
        price: "₹549"
    }

};


/* =====================================================
   MALE HOME FAVORITES
====================================================== */

function getMaleHomeFavorites() {

    try {

        const saved = JSON.parse(
            localStorage.getItem(
                MALE_FAVORITES_KEY
            ) || "[]"
        );

        if (!Array.isArray(saved)) {
            return [];
        }

        return saved.map(function(name, index) {

            return {
                id: "male-home-" + index + "-" + name,
                title: name,
                category: "hairstyle",
                image: "",
                description:
                    "Saved from Men's Style Studio.",
                url: "/hairstyles",
                createdAt: 0
            };

        });

    } catch (error) {

        return [];

    }

}


/* =====================================================
   MALE HAIRSTYLE FAVORITES
====================================================== */

function getHairstyleFavorites() {

    try {

        const saved = JSON.parse(
            localStorage.getItem(
                HAIRSTYLE_FAVORITES_KEY
            ) || "[]"
        );

        if (!Array.isArray(saved)) {
            return [];
        }

        return saved.map(function(item, index) {

            if (typeof item === "string") {

                return {
                    id:
                        "hairstyle-" +
                        index +
                        "-" +
                        item,

                    title: item,

                    category: "hairstyle",

                    image: "",

                    description:
                        "Saved hairstyle.",

                    url: "/hairstyles",

                    createdAt: 0
                };

            }

            return {

                id:
                    item.id ||
                    "hairstyle-" +
                    index,

                title:
                    item.name ||
                    item.title ||
                    "Hairstyle",

                category:
                    "hairstyle",

                image:
                    item.image ||
                    "",

                description:
                    item.description ||
                    "Saved hairstyle.",

                url:
                    item.url ||
                    "/hairstyles",

                createdAt:
                    item.createdAt ||
                    0

            };

        });

    } catch (error) {

        return [];

    }

}


/* =====================================================
   PRODUCT FAVORITES
====================================================== */

function getProductFavorites() {

    try {

        const saved = JSON.parse(
            localStorage.getItem(
                PRODUCT_FAVORITES_KEY
            ) || "[]"
        );

        if (!Array.isArray(saved)) {
            return [];
        }

        return saved.map(function(productId, index) {

            const product =
                productCatalog[productId];

            if (!product) {

                return {
                    id:
                        "product-" +
                        index +
                        "-" +
                        productId,

                    productId:
                        productId,

                    title:
                        productId,

                    category:
                        "product",

                    image:
                        "",

                    description:
                        "Saved hair product.",

                    price:
                        "",

                    createdAt:
                        0

                };

            }

            return {

                id:
                    "product-" +
                    productId,

                productId:
                    productId,

                title:
                    product.title,

                category:
                    "product",

                image:
                    "/static/images/" +
                    product.image,

                description:
                    product.description,

                type:
                    product.type,

                price:
                    product.price,

                url:
                    "/male/products",

                createdAt:
                    0

            };

        });

    } catch (error) {

        return [];

    }

}


/* =====================================================
   LIKED REELS
====================================================== */

function getLikedReels() {

    try {

        const saved = JSON.parse(
            localStorage.getItem(
                LIKED_REELS_KEY
            ) || "[]"
        );

        if (!Array.isArray(saved)) {
            return [];
        }

        return saved.map(function(reelId) {

            const number =
                String(reelId)
                    .replace("reel", "");

            /*
             * Reels currently use dynamically
             * generated images.
             *
             * This follows the same reel
             * numbering system.
             */

            return {

                id:
                    "reel-" +
                    reelId,

                reelId:
                    reelId,

                title:
                    "Men's Hairstyle " +
                    number,

                category:
                    "reel",

                image:
                    "/static/images/reel-" +
                    number +
                    ".jpg",

                description:
                    "Liked from StyleMyHair Reels.",

                url:
                    "/reel",

                createdAt:
                    0

            };

        });

    } catch (error) {

        return [];

    }

}


/* =====================================================
   ALL FAVORITES
====================================================== */

function getAllFavorites() {

    return [

        ...getMaleHomeFavorites(),

        ...getHairstyleFavorites(),

        ...getProductFavorites(),

        ...getLikedReels()

    ];

}


let favorites =
    getAllFavorites();


/* =====================================================
   FILTER
====================================================== */

let activeFilter = "all";


/* =====================================================
   FILTERED ITEMS
====================================================== */

function getFilteredFavorites() {

    let items =
        [...favorites];


    if (activeFilter !== "all") {

        items =
            items.filter(function(item) {

                return (
                    String(
                        item.category ||
                        "hairstyle"
                    ).toLowerCase()
                    ===
                    activeFilter
                );

            });

    }


    const sort =
        sortSelect
            ? sortSelect.value
            : "newest";


    if (sort === "az") {

        items.sort(function(a, b) {

            return String(
                a.title || ""
            ).localeCompare(
                String(
                    b.title || ""
                )
            );

        });

    }


    if (sort === "za") {

        items.sort(function(a, b) {

            return String(
                b.title || ""
            ).localeCompare(
                String(
                    a.title || ""
                )
            );

        });

    }


    if (sort === "newest") {

        items.sort(function(a, b) {

            return (
                Number(b.createdAt || 0) -
                Number(a.createdAt || 0)
            );

        });

    }


    if (sort === "oldest") {

        items.sort(function(a, b) {

            return (
                Number(a.createdAt || 0) -
                Number(b.createdAt || 0)
            );

        });

    }


    return items;

}


/* =====================================================
   COUNTS
====================================================== */

function updateCounts() {

    const total =
        favorites.length;


    if (pageFavoriteCount) {

        pageFavoriteCount.textContent =
            total;

    }


    if (pageFavoriteCountHeader) {

        pageFavoriteCountHeader.textContent =
            total;

    }

}


/* =====================================================
   CREATE CARD
====================================================== */

function createFavoriteCard(item) {

    const isProduct =
        item.category === "product";

    const isReel =
        item.category === "reel";

    const image =
        item.image || "";


    let type =
        "HAIRSTYLE";

    if (isProduct) {
        type = item.type || "HAIR PRODUCT";
    }

    if (isReel) {
        type = "REEL";
    }


    const card =
        document.createElement("article");

    card.className =
        "favourite-card";


    card.dataset.category =
        item.category;


    card.dataset.title =
        item.title;


    card.innerHTML = `

        <div class="favourite-image-wrap">

            ${
                image
                    ? `
                        <img
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(item.title)}"
                            class="favourite-image"
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        >

                        <div
                            class="favourite-no-image"
                            style="display:none;"
                        >
                            ${
                                isProduct
                                    ? "🧴"
                                    : isReel
                                        ? "▶"
                                        : "✂"
                            }
                        </div>
                      `
                    : `
                        <div class="favourite-no-image">
                            ${
                                isProduct
                                    ? "🧴"
                                    : isReel
                                        ? "▶"
                                        : "✂"
                            }
                        </div>
                      `
            }

            <button
                class="remove-favourite"
                type="button"
                title="Remove from favourites"
                data-id="${escapeHTML(item.id)}"
                data-type="${escapeHTML(item.category)}"
            >
                ♥
            </button>

        </div>


        <div class="favourite-card-content">

            <span class="favourite-type">
                ${escapeHTML(type)}
            </span>

            <h3>
                ${escapeHTML(item.title)}
            </h3>

            <p>
                ${escapeHTML(
                    item.description ||
                    "Saved to your StyleMyHair favourites."
                )}
            </p>

            ${
                item.price
                    ? `
                        <strong class="favourite-price">
                            ${escapeHTML(item.price)}
                        </strong>
                      `
                    : ""
            }

            <div class="favourite-card-actions">

                <button
                    type="button"
                    class="favourite-view"
                    data-id="${escapeHTML(item.id)}"
                    data-type="${escapeHTML(item.category)}"
                >
                    ${
                        isProduct
                            ? "View Product"
                            : isReel
                                ? "View Reel"
                                : "View Style"
                    }
                </button>

            </div>

        </div>

    `;


    return card;

}


/* =====================================================
   RENDER
====================================================== */

function renderFavorites() {

    updateCounts();


    if (!favouritesGrid) {
        return;
    }


    const items =
        getFilteredFavorites();


    favouritesGrid.innerHTML = "";


    if (favorites.length === 0) {

        favouritesGrid.style.display =
            "none";

        if (favouritesEmpty) {

            favouritesEmpty.hidden =
                false;

        }

        return;

    }


    if (items.length === 0) {

        favouritesGrid.style.display =
            "none";

        if (favouritesEmpty) {

            favouritesEmpty.hidden =
                false;

            const heading =
                favouritesEmpty.querySelector("h2");

            const paragraph =
                favouritesEmpty.querySelector("p");


            if (heading) {

                heading.textContent =
                    "No Favorites In This Category";

            }

            if (paragraph) {

                paragraph.textContent =
                    "Try another category to see your saved items.";

            }

        }

        return;

    }


    favouritesGrid.style.display =
        "grid";


    if (favouritesEmpty) {

        favouritesEmpty.hidden =
            true;

    }


    items.forEach(function(item) {

        favouritesGrid.appendChild(
            createFavoriteCard(item)
        );

    });


    /* =================================================
       REMOVE
    ================================================= */

    favouritesGrid
        .querySelectorAll(".remove-favourite")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    removeFavouriteItem(
                        this.dataset.id,
                        this.dataset.type
                    );

                }
            );

        });


    /* =================================================
       VIEW
    ================================================= */

    favouritesGrid
        .querySelectorAll(".favourite-view")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const id =
                        this.dataset.id;

                    const type =
                        this.dataset.type;


                    const item =
                        favorites.find(
                            function(saved) {

                                return (
                                    saved.id === id
                                );

                            }
                        );


                    if (!item) {
                        return;
                    }


                    if (type === "reel") {

                        window.location.href =
                            "/reel";

                        return;

                    }


                    if (type === "product") {

                        window.location.href =
                            "/male/products";

                        return;

                    }


                    window.location.href =
                        item.url ||
                        "/hairstyles";

                }
            );

        });

}


/* =====================================================
   REMOVE ITEM
====================================================== */

function removeFavouriteItem(
    id,
    type
) {


    /* =========================
       PRODUCT
    ========================= */

    if (type === "product") {

        const item =
            favorites.find(
                function(saved) {

                    return saved.id === id;

                }
            );


        if (item) {

            let savedProducts = [];

            try {

                savedProducts =
                    JSON.parse(
                        localStorage.getItem(
                            PRODUCT_FAVORITES_KEY
                        ) || "[]"
                    );

            } catch (error) {

                savedProducts = [];

            }


            savedProducts =
                savedProducts.filter(
                    function(productId) {

                        return (
                            productId !==
                            item.productId
                        );

                    }
                );


            localStorage.setItem(
                PRODUCT_FAVORITES_KEY,
                JSON.stringify(savedProducts)
            );

        }

    }


    /* =========================
       REEL
    ========================= */

    else if (type === "reel") {

        const item =
            favorites.find(
                function(saved) {

                    return saved.id === id;

                }
            );


        if (item) {

            let reels = [];

            try {

                reels =
                    JSON.parse(
                        localStorage.getItem(
                            LIKED_REELS_KEY
                        ) || "[]"
                    );

            } catch (error) {

                reels = [];

            }


            reels =
                reels.filter(
                    function(reelId) {

                        return (
                            reelId !==
                            item.reelId
                        );

                    }
                );


            localStorage.setItem(
                LIKED_REELS_KEY,
                JSON.stringify(reels)
            );

        }

    }


    /* =========================
       HAIRSTYLE / MALE HOME
    ========================= */

    else {

        const item =
            favorites.find(
                function(saved) {

                    return saved.id === id;

                }
            );


        if (item) {

            /*
             * If it came from Male Home.
             */

            if (
                item.id.startsWith(
                    "male-home-"
                )
            ) {

                let saved = [];

                try {

                    saved =
                        JSON.parse(
                            localStorage.getItem(
                                MALE_FAVORITES_KEY
                            ) || "[]"
                        );

                } catch (error) {

                    saved = [];

                }


                saved =
                    saved.filter(
                        function(name) {

                            return (
                                name !==
                                item.title
                            );

                        }
                    );


                localStorage.setItem(
                    MALE_FAVORITES_KEY,
                    JSON.stringify(saved)
                );

            }


            /*
             * Otherwise remove from
             * hairstyle favourites.
             */

            else {

                let saved = [];

                try {

                    saved =
                        JSON.parse(
                            localStorage.getItem(
                                HAIRSTYLE_FAVORITES_KEY
                            ) || "[]"
                        );

                } catch (error) {

                    saved = [];

                }


                saved =
                    saved.filter(
                        function(value) {

                            if (
                                typeof value ===
                                "string"
                            ) {

                                return (
                                    value !==
                                    item.title
                                );

                            }


                            return (
                                value.name !==
                                item.title
                            );

                        }
                    );


                localStorage.setItem(
                    HAIRSTYLE_FAVORITES_KEY,
                    JSON.stringify(saved)
                );

            }

        }

    }


    favorites =
        getAllFavorites();


    renderFavorites();


    window.dispatchEvent(
        new CustomEvent(
            "stylemyhair:favorites-changed"
        )
    );

}


/* =====================================================
   FILTER BUTTONS
====================================================== */

filterButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

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


            activeFilter =
                this.dataset.filter ||
                "all";


            renderFavorites();

        }
    );

});


/* =====================================================
   SORT
====================================================== */

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        renderFavorites
    );

}


/* =====================================================
   STORAGE SYNC
====================================================== */

window.addEventListener(
    "storage",
    function(event) {

        const relevantKeys = [

            MALE_FAVORITES_KEY,

            HAIRSTYLE_FAVORITES_KEY,

            PRODUCT_FAVORITES_KEY,

            LIKED_REELS_KEY

        ];


        if (
            relevantKeys.includes(
                event.key
            )
        ) {

            favorites =
                getAllFavorites();

            renderFavorites();

        }

    }
);


/* =====================================================
   CUSTOM FAVORITE EVENT
====================================================== */

window.addEventListener(
    "stylemyhair:favorites-changed",
    function() {

        favorites =
            getAllFavorites();

        renderFavorites();

    }
);


/* =====================================================
   INITIALIZE
====================================================== */

renderFavorites();


console.log(
    "StyleMyHair Favorites: all favorite systems loaded."
);
/* =====================================================
   MALE THEME + LIGHT / DARK MODE
   ===================================================== */

const MALE_THEME_KEY = "stylemyhair-male-theme";
const MALE_MODE_KEY = "stylemyhair-male-mode";

const maleThemes = {
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


/* ---------- APPLY THEME ---------- */

function applyMaleTheme(themeKey) {

    const theme = maleThemes[themeKey] || maleThemes.graphite;

    document.body.dataset.theme = themeKey;

    document.body.style.setProperty("--primary", theme.primary);
    document.body.style.setProperty("--secondary", theme.secondary);
    document.body.style.setProperty("--accent", theme.accent);

    const themeName = document.getElementById("themeName");

    if (themeName) {
        themeName.textContent = theme.name;
    }

    document.querySelectorAll(".theme-dot").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.theme === themeKey
        );
    });

    localStorage.setItem(MALE_THEME_KEY, themeKey);
}


/* ---------- LIGHT / DARK MODE ---------- */

function applyMaleMode(mode) {

    const isLight = mode === "light";

    document.body.classList.toggle("light-mode", isLight);
    document.documentElement.classList.toggle("light-mode", isLight);

    document.body.dataset.mode = mode;

    const modeIcon = document.getElementById("modeIcon");
    const modeText = document.getElementById("modeText");

    if (modeIcon) {
        modeIcon.textContent = isLight ? "☀" : "☾";
    }

    if (modeText) {
        modeText.textContent = isLight
            ? "Light Mode"
            : "Dark Mode";
    }

    localStorage.setItem(MALE_MODE_KEY, mode);
}


/* ---------- THEME BUTTONS ---------- */

document.querySelectorAll(".theme-dot").forEach(button => {

    button.addEventListener("click", function () {

        const theme = this.dataset.theme;

        if (theme && maleThemes[theme]) {
            applyMaleTheme(theme);
        }

    });

});


/* ---------- MODE BUTTON ---------- */

const favouritesModeToggle =
    document.getElementById("modeToggle");

if (favouritesModeToggle) {

    favouritesModeToggle.addEventListener("click", function () {

        const currentMode =
            localStorage.getItem(MALE_MODE_KEY) || "dark";

        const newMode =
            currentMode === "light"
                ? "dark"
                : "light";

        applyMaleMode(newMode);

    });

}


/* ---------- LOAD SAVED SETTINGS ---------- */

const savedMaleTheme =
    localStorage.getItem(MALE_THEME_KEY) || "graphite";

const savedMaleMode =
    localStorage.getItem(MALE_MODE_KEY) || "dark";

applyMaleTheme(savedMaleTheme);
applyMaleMode(savedMaleMode);