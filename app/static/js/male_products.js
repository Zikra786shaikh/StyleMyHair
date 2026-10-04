/* =========================================================
   STYLEMYHAIR
   MEN'S PRODUCTS PAGE
   FULL REPLACEABLE JAVASCRIPT
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const body = document.body;
const html = document.documentElement;

const productSearch = document.getElementById("productSearch");
const clearProductSearch = document.getElementById("clearProductSearch");

const categoryFilters = document.getElementById("categoryFilters");
const categoryGrid = document.getElementById("categoryGrid");
const categoryEmpty = document.getElementById("categoryEmpty");

const hairTypeFilters = document.getElementById("hairTypeFilters");
const hairTypeGrid = document.getElementById("hairTypeGrid");
const hairTypeEmpty = document.getElementById("hairTypeEmpty");

const featuredGrid = document.getElementById("featuredGrid");
const recommendationGrid = document.getElementById("recommendationGrid");
const likedGrid = document.getElementById("likedGrid");

const resetCategory = document.getElementById("resetCategory");
const resetHairType = document.getElementById("resetHairType");
const showFeatured = document.getElementById("showFeatured");

const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");
const mobileOverlay = document.getElementById("mobileOverlay");
const maleSidebar = document.getElementById("maleSidebar");

const searchButton = document.getElementById("searchButton");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const styleSearch = document.getElementById("styleSearch");

const modeToggle = document.getElementById("modeToggle");
const modeIcon = document.getElementById("modeIcon");
const modeText = document.getElementById("modeText");

const themeName = document.getElementById("themeName");
const themeButtons = document.querySelectorAll(".theme-dot");

const profileButton = document.getElementById("profileButton");
const topProfile = document.getElementById("topProfile");
const settingsButton = document.getElementById("settingsButton");


/* =========================================================
   STORAGE
========================================================= */

const FAVORITES_KEY =
    "stylemyhair-male-product-favorites";

const MALE_THEME_KEY =
    "stylemyhair-male-theme";

const MALE_MODE_KEY =
    "stylemyhair-male-mode";

/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [

    /* =========================
       SHAMPOO
    ========================= */

    {
        id: "shampoo-1",
        name: "Anti-Dandruff Shampoo",
        category: "shampoo",
        hairTypes: ["oily", "dry", "damaged"],
        price: 299,
        rating: "4.6",
        reviews: "1.2k",
        image: "male-product-shampoo-1.jpg",
        description: "Scalp care and freshness",
        badge: "Shampoo",
        meesho: "https://www.meesho.com/search?q=anti%20dandruff%20shampoo%20men"
    },

    {
        id: "shampoo-2",
        name: "Deep Clean Men Shampoo",
        category: "shampoo",
        hairTypes: ["oily", "straight", "thick"],
        price: 349,
        rating: "4.5",
        reviews: "890",
        image: "male-product-shampoo-2.jpg",
        description: "Deep cleansing formula",
        badge: "Shampoo",
        meesho: "https://www.meesho.com/search?q=men%20deep%20clean%20shampoo"
    },

    {
        id: "shampoo-3",
        name: "Hair Fall Control Shampoo",
        category: "shampoo",
        hairTypes: ["thin", "damaged", "dry"],
        price: 399,
        rating: "4.4",
        reviews: "932",
        image: "male-product-shampoo-3.jpg",
        description: "Strengthens and nourishes",
        badge: "Shampoo",
        meesho: "https://www.meesho.com/search?q=men%20hair%20fall%20control%20shampoo"
    },

    {
        id: "shampoo-4",
        name: "Daily Fresh Shampoo",
        category: "shampoo",
        hairTypes: ["straight", "wavy", "oily"],
        price: 249,
        rating: "4.3",
        reviews: "740",
        image: "male-product-shampoo-4.jpg",
        description: "Fresh everyday cleansing",
        badge: "Shampoo",
        meesho: "https://www.meesho.com/search?q=men%20daily%20shampoo"
    },


    /* =========================
       CONDITIONER
    ========================= */

    {
        id: "conditioner-1",
        name: "Smooth Hair Conditioner",
        category: "conditioner",
        hairTypes: ["dry", "damaged", "wavy"],
        price: 299,
        rating: "4.5",
        reviews: "620",
        image: "male-product-conditioner-1.jpg",
        description: "Soft and manageable hair",
        badge: "Conditioner",
        meesho: "https://www.meesho.com/search?q=men%20hair%20conditioner"
    },

    {
        id: "conditioner-2",
        name: "Deep Repair Conditioner",
        category: "conditioner",
        hairTypes: ["damaged", "dry", "thick"],
        price: 399,
        rating: "4.6",
        reviews: "810",
        image: "male-product-conditioner-2.jpg",
        description: "Repairs dry damaged hair",
        badge: "Conditioner",
        meesho: "https://www.meesho.com/search?q=deep%20repair%20conditioner%20men"
    },

    {
        id: "conditioner-3",
        name: "Curl Define Conditioner",
        category: "conditioner",
        hairTypes: ["curly", "wavy", "dry"],
        price: 449,
        rating: "4.7",
        reviews: "560",
        image: "male-product-conditioner-3.jpg",
        description: "Defines curls and reduces frizz",
        badge: "Conditioner",
        meesho: "https://www.meesho.com/search?q=curly%20hair%20conditioner%20men"
    },

    {
        id: "conditioner-4",
        name: "Lightweight Daily Conditioner",
        category: "conditioner",
        hairTypes: ["straight", "thin", "oily"],
        price: 279,
        rating: "4.4",
        reviews: "490",
        image: "male-product-conditioner-4.jpg",
        description: "Lightweight daily softness",
        badge: "Conditioner",
        meesho: "https://www.meesho.com/search?q=lightweight%20conditioner%20men"
    },


    /* =========================
       SERUM
    ========================= */

    {
        id: "serum-1",
        name: "Hair Growth Serum",
        category: "serum",
        hairTypes: ["thin", "damaged"],
        price: 499,
        rating: "4.5",
        reviews: "1.1k",
        image: "male-product-serum-1.jpg",
        description: "Supports healthy hair growth",
        badge: "Hair Serum",
        meesho: "https://www.meesho.com/search?q=men%20hair%20growth%20serum"
    },

    {
        id: "serum-2",
        name: "Anti-Frizz Hair Serum",
        category: "serum",
        hairTypes: ["wavy", "curly", "dry"],
        price: 349,
        rating: "4.6",
        reviews: "730",
        image: "male-product-serum-2.jpg",
        description: "Smooth finish and frizz control",
        badge: "Hair Serum",
        meesho: "https://www.meesho.com/search?q=anti%20frizz%20hair%20serum%20men"
    },

    {
        id: "serum-3",
        name: "Shiny Hair Serum",
        category: "serum",
        hairTypes: ["straight", "dry"],
        price: 329,
        rating: "4.4",
        reviews: "640",
        image: "male-product-serum-3.jpg",
        description: "Smooth and shiny finish",
        badge: "Hair Serum",
        meesho: "https://www.meesho.com/search?q=shiny%20hair%20serum%20men"
    },

    {
        id: "serum-4",
        name: "Scalp Nourishing Serum",
        category: "serum",
        hairTypes: ["oily", "thin", "damaged"],
        price: 449,
        rating: "4.5",
        reviews: "520",
        image: "male-product-serum-4.jpg",
        description: "Nourishes scalp and roots",
        badge: "Hair Serum",
        meesho: "https://www.meesho.com/search?q=scalp%20serum%20men"
    },


    /* =========================
       OIL
    ========================= */

    {
        id: "oil-1",
        name: "Beard Growth Oil",
        category: "oil",
        hairTypes: ["thick", "dry"],
        price: 499,
        rating: "4.7",
        reviews: "1.4k",
        image: "male-product-oil-1.jpg",
        description: "Thicker and healthier beard",
        badge: "Hair Oil",
        meesho: "https://www.meesho.com/search?q=beard%20growth%20oil%20men"
    },

    {
        id: "oil-2",
        name: "Onion Hair Oil",
        category: "oil",
        hairTypes: ["thin", "damaged", "dry"],
        price: 299,
        rating: "4.4",
        reviews: "980",
        image: "male-product-oil-2.jpg",
        description: "Nourishes roots and scalp",
        badge: "Hair Oil",
        meesho: "https://www.meesho.com/search?q=onion%20hair%20oil%20men"
    },

    {
        id: "oil-3",
        name: "Argan Hair Oil",
        category: "oil",
        hairTypes: ["dry", "wavy", "curly"],
        price: 399,
        rating: "4.6",
        reviews: "710",
        image: "male-product-oil-3.jpg",
        description: "Smoothness and shine",
        badge: "Hair Oil",
        meesho: "https://www.meesho.com/search?q=argan%20hair%20oil%20men"
    },

    {
        id: "oil-4",
        name: "Lightweight Hair Oil",
        category: "oil",
        hairTypes: ["straight", "oily", "thin"],
        price: 279,
        rating: "4.3",
        reviews: "450",
        image: "male-product-oil-4.jpg",
        description: "Lightweight everyday nourishment",
        badge: "Hair Oil",
        meesho: "https://www.meesho.com/search?q=lightweight%20hair%20oil%20men"
    },


    /* =========================
       MASK
    ========================= */

    {
        id: "mask-1",
        name: "Deep Conditioning Hair Mask",
        category: "mask",
        hairTypes: ["dry", "damaged", "thick"],
        price: 399,
        rating: "4.6",
        reviews: "610",
        image: "male-product-mask-1.jpg",
        description: "Deep conditioning treatment",
        badge: "Hair Mask",
        meesho: "https://www.meesho.com/search?q=deep%20conditioning%20hair%20mask%20men"
    },

    {
        id: "mask-2",
        name: "Anti-Damage Hair Mask",
        category: "mask",
        hairTypes: ["damaged", "dry"],
        price: 449,
        rating: "4.5",
        reviews: "520",
        image: "male-product-mask-2.jpg",
        description: "Helps repair damaged hair",
        badge: "Hair Mask",
        meesho: "https://www.meesho.com/search?q=anti%20damage%20hair%20mask"
    },

    {
        id: "mask-3",
        name: "Curl Care Hair Mask",
        category: "mask",
        hairTypes: ["curly", "wavy"],
        price: 499,
        rating: "4.7",
        reviews: "430",
        image: "male-product-mask-3.jpg",
        description: "Curl definition and moisture",
        badge: "Hair Mask",
        meesho: "https://www.meesho.com/search?q=curly%20hair%20mask"
    },

    {
        id: "mask-4",
        name: "Volume Hair Mask",
        category: "mask",
        hairTypes: ["thin", "straight"],
        price: 379,
        rating: "4.4",
        reviews: "390",
        image: "male-product-mask-4.jpg",
        description: "Adds body and volume",
        badge: "Hair Mask",
        meesho: "https://www.meesho.com/search?q=volume%20hair%20mask%20men"
    },


    /* =========================
       STYLING
    ========================= */

    {
        id: "styling-1",
        name: "Matte Hair Styling Wax",
        category: "styling",
        hairTypes: ["straight", "thick", "wavy"],
        price: 349,
        rating: "4.6",
        reviews: "856",
        image: "male-product-styling-1.jpg",
        description: "Strong hold with matte finish",
        badge: "Styling",
        meesho: "https://www.meesho.com/search?q=men%20matte%20hair%20wax"
    },

    {
        id: "styling-2",
        name: "Strong Hold Hair Clay",
        category: "styling",
        hairTypes: ["thick", "straight"],
        price: 399,
        rating: "4.5",
        reviews: "620",
        image: "male-product-styling-2.jpg",
        description: "Natural strong hold",
        badge: "Styling",
        meesho: "https://www.meesho.com/search?q=men%20hair%20clay"
    },

    {
        id: "styling-3",
        name: "Texturizing Hair Cream",
        category: "styling",
        hairTypes: ["wavy", "curly", "dry"],
        price: 329,
        rating: "4.4",
        reviews: "470",
        image: "male-product-styling-3.jpg",
        description: "Flexible texture and definition",
        badge: "Styling",
        meesho: "https://www.meesho.com/search?q=men%20hair%20styling%20cream"
    },

    {
        id: "styling-4",
        name: "Long Lasting Hair Gel",
        category: "styling",
        hairTypes: ["straight", "thick", "oily"],
        price: 249,
        rating: "4.3",
        reviews: "800",
        image: "male-product-styling-4.jpg",
        description: "Long lasting styling control",
        badge: "Styling",
        meesho: "https://www.meesho.com/search?q=men%20hair%20gel"
    },


    /* =========================
       BEARD
    ========================= */

    {
        id: "beard-1",
        name: "Beard Growth Oil",
        category: "beard",
        hairTypes: ["thick", "dry"],
        price: 499,
        rating: "4.7",
        reviews: "1.2k",
        image: "male-product-beard-1.jpg",
        description: "Thicker and healthier beard",
        badge: "Beard Care",
        meesho: "https://www.meesho.com/search?q=beard%20growth%20oil"
    },

    {
        id: "beard-2",
        name: "Beard Balm",
        category: "beard",
        hairTypes: ["dry", "thick"],
        price: 449,
        rating: "4.5",
        reviews: "690",
        image: "male-product-beard-2.jpg",
        description: "Shape and condition",
        badge: "Beard Care",
        meesho: "https://www.meesho.com/search?q=men%20beard%20balm"
    },

    {
        id: "beard-3",
        name: "Beard Wash",
        category: "beard",
        hairTypes: ["oily", "dry"],
        price: 299,
        rating: "4.4",
        reviews: "530",
        image: "male-product-beard-3.jpg",
        description: "Gentle beard cleansing",
        badge: "Beard Care",
        meesho: "https://www.meesho.com/search?q=beard%20wash"
    },

    {
        id: "beard-4",
        name: "Beard Softening Cream",
        category: "beard",
        hairTypes: ["dry", "curly"],
        price: 379,
        rating: "4.6",
        reviews: "410",
        image: "male-product-beard-4.jpg",
        description: "Softens coarse beard hair",
        badge: "Beard Care",
        meesho: "https://www.meesho.com/search?q=beard%20softening%20cream"
    },


    /* =========================
       GROWTH
    ========================= */

    {
        id: "growth-1",
        name: "Hair Growth Tonic",
        category: "growth",
        hairTypes: ["thin", "damaged"],
        price: 449,
        rating: "4.5",
        reviews: "870",
        image: "male-product-growth-1.jpg",
        description: "Supports healthy hair growth",
        badge: "Hair Growth",
        meesho: "https://www.meesho.com/search?q=men%20hair%20growth%20tonic"
    },

    {
        id: "growth-2",
        name: "Scalp Growth Serum",
        category: "growth",
        hairTypes: ["thin", "dry"],
        price: 499,
        rating: "4.6",
        reviews: "730",
        image: "male-product-growth-2.jpg",
        description: "Scalp nourishment and care",
        badge: "Hair Growth",
        meesho: "https://www.meesho.com/search?q=men%20scalp%20growth%20serum"
    },

    {
        id: "growth-3",
        name: "Root Strength Oil",
        category: "growth",
        hairTypes: ["damaged", "thin", "dry"],
        price: 349,
        rating: "4.4",
        reviews: "620",
        image: "male-product-growth-3.jpg",
        description: "Strengthens roots",
        badge: "Hair Growth",
        meesho: "https://www.meesho.com/search?q=root%20strength%20hair%20oil"
    },

    {
        id: "growth-4",
        name: "Hair Strengthening Serum",
        category: "growth",
        hairTypes: ["thin", "straight", "damaged"],
        price: 549,
        rating: "4.6",
        reviews: "510",
        image: "male-product-growth-4.jpg",
        description: "Strength and nourishment",
        badge: "Hair Growth",
        meesho: "https://www.meesho.com/search?q=hair%20strengthening%20serum%20men"
    }

];


/* =========================================================
   THEME SYSTEM
   SAME THEME SYSTEM AS MAIN MALE PAGE
========================================================= */

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


/* =========================================================
   APPLY MALE THEME
========================================================= */

function applyMaleTheme(themeKey) {

    if (!maleThemes[themeKey]) {
        themeKey = "graphite";
    }

    const theme = maleThemes[themeKey];

    html.setAttribute("data-theme", themeKey);
    body.setAttribute("data-theme", themeKey);

    /* =====================================================
       SAME VARIABLES USED BY MALE.CSS
    ===================================================== */

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

    /* =====================================================
       KEEP PRODUCTS PAGE CONNECTED TO SAME COLORS
    ===================================================== */

    body.style.setProperty(
        "--mp-primary",
        theme.primary
    );

    body.style.setProperty(
        "--mp-accent",
        theme.accent
    );

    /* =====================================================
       ACTIVE THEME BUTTON
    ===================================================== */

    themeButtons.forEach(function(button) {

        button.classList.toggle(
            "active",
            button.dataset.theme === themeKey
        );

    });

    if (themeName) {
        themeName.textContent =
            theme.name;
    }

    /* =====================================================
       SAVE SAME KEY AS MAIN MALE PAGE
    ===================================================== */

    localStorage.setItem(
        MALE_THEME_KEY,
        themeKey
    );
}


/* =========================================================
   APPLY LIGHT / DARK MODE
   SAME STORAGE KEY AS MAIN MALE PAGE
========================================================= */

function applyMaleMode(isLight, save = true) {

    const light = Boolean(isLight);

    body.classList.toggle(
        "light-mode",
        light
    );

    html.classList.toggle(
        "light-mode",
        light
    );

    body.classList.toggle(
        "dark-mode",
        !light
    );

    html.classList.toggle(
        "dark-mode",
        !light
    );

    body.setAttribute(
        "data-mode",
        light ? "light" : "dark"
    );

    html.setAttribute(
        "data-mode",
        light ? "light" : "dark"
    );


    /* =====================================================
       LIGHT MODE
    ===================================================== */

    if (light) {

        body.style.setProperty(
            "--background",
            "#f3f5f7"
        );

        body.style.setProperty(
            "--surface",
            "#ffffff"
        );

        body.style.setProperty(
            "--surface-2",
            "#eef1f4"
        );

        body.style.setProperty(
            "--surface-3",
            "#e5e9ee"
        );

        body.style.setProperty(
            "--text",
            "#151922"
        );

        body.style.setProperty(
            "--muted",
            "#667080"
        );

        body.style.setProperty(
            "--border",
            "rgba(20,25,35,0.08)"
        );

        body.style.setProperty(
            "--mp-bg",
            "#f3f5f7"
        );

        body.style.setProperty(
            "--mp-surface",
            "#ffffff"
        );

        body.style.setProperty(
            "--mp-surface-2",
            "#eef1f4"
        );

        body.style.setProperty(
            "--mp-surface-3",
            "#e5e9ee"
        );

        body.style.setProperty(
            "--mp-text",
            "#151922"
        );

        body.style.setProperty(
            "--mp-muted",
            "#667080"
        );

        body.style.setProperty(
            "--mp-border",
            "rgba(20,25,35,0.08)"
        );


    } else {

        /* =================================================
           DARK MODE
        ================================================= */

        body.style.setProperty(
            "--background",
            "#0b0d12"
        );

        body.style.setProperty(
            "--surface",
            "#12151d"
        );

        body.style.setProperty(
            "--surface-2",
            "#181c26"
        );

        body.style.setProperty(
            "--surface-3",
            "#202531"
        );

        body.style.setProperty(
            "--text",
            "#f5f7fb"
        );

        body.style.setProperty(
            "--muted",
            "#9299a8"
        );

        body.style.setProperty(
            "--border",
            "rgba(255,255,255,0.08)"
        );

        body.style.setProperty(
            "--mp-bg",
            "#0b0d12"
        );

        body.style.setProperty(
            "--mp-surface",
            "#12151d"
        );

        body.style.setProperty(
            "--mp-surface-2",
            "#181c26"
        );

        body.style.setProperty(
            "--mp-surface-3",
            "#202531"
        );

        body.style.setProperty(
            "--mp-text",
            "#f5f7fb"
        );

        body.style.setProperty(
            "--mp-muted",
            "#9299a8"
        );

        body.style.setProperty(
            "--mp-border",
            "rgba(255,255,255,0.08)"
        );
    }


    /* =====================================================
       BUTTON TEXT / ICON
    ===================================================== */

    if (modeIcon) {

        modeIcon.textContent =
            light ? "☀" : "☾";

    }

    if (modeText) {

        modeText.textContent =
            light
                ? "Light Mode"
                : "Dark Mode";

    }


    /* =====================================================
       SAVE SAME MODE KEY AS MAIN MALE PAGE
    ===================================================== */

    if (save) {

        localStorage.setItem(
            MALE_MODE_KEY,
            light ? "light" : "dark"
        );

    }

}


/* =========================================================
   LOAD SAVED THEME
========================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            MALE_THEME_KEY
        ) || "graphite";

    applyMaleTheme(savedTheme);
}


/* =========================================================
   LOAD SAVED LIGHT / DARK MODE
========================================================= */

function loadDarkMode() {

    const savedMode =
        localStorage.getItem(
            MALE_MODE_KEY
        );

    /*
       MAIN MALE PAGE:
       "light" = Light Mode
       anything else = Dark Mode
    */

    const isLight =
        savedMode === "light";

    applyMaleMode(
        isLight,
        false
    );
}


/* =========================================================
   THEME BUTTON EVENTS
========================================================= */

function setupThemeButtons() {

    themeButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();

                const selectedTheme =
                    this.dataset.theme;

                if (
                    selectedTheme &&
                    maleThemes[selectedTheme]
                ) {

                    applyMaleTheme(
                        selectedTheme
                    );

                }

            }
        );

    });

}


/* =========================================================
   LIGHT / DARK BUTTON
========================================================= */

function setupDarkMode() {

    if (!modeToggle) {
        return;
    }

    modeToggle.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            const currentMode =
                body.getAttribute(
                    "data-mode"
                ) || "dark";

            applyMaleMode(
                currentMode !== "light",
                true
            );

        }
    );

}
/* =========================================================
   FAVORITES
========================================================= */

let favorites = [];

try {

    const savedFavorites =
        localStorage.getItem(
            FAVORITES_KEY
        );

    if (savedFavorites) {

        const parsed =
            JSON.parse(savedFavorites);

        if (Array.isArray(parsed)) {

            favorites = parsed;

        }

    }

} catch (error) {

    favorites = [];

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const saved =
        favorites.includes(product.id);

    return `

        <article
            class="product-card"
            data-product-id="${escapeHTML(product.id)}"
        >

            <div class="product-image">

                <button
                    class="favorite-product ${saved ? "saved" : ""}"
                    data-favorite="${escapeHTML(product.id)}"
                    type="button"
                    aria-label="Favorite"
                >
                    ${saved ? "♥" : "♡"}
                </button>

                <img
                    src="/static/images/${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                    onerror="
                        this.style.display='none';
                        this.parentElement.classList.add('image-missing');
                    "
                >

            </div>

            <div class="product-info">

                <span class="product-type">
                    ${escapeHTML(product.badge)}
                </span>

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <p>
                    ${escapeHTML(product.description)}
                </p>

                <div class="product-rating">
                    ★ ${escapeHTML(product.rating)}
                    (${escapeHTML(product.reviews)} reviews)
                </div>

                <div class="product-bottom">

                    <strong class="product-price">
                        ₹${escapeHTML(product.price)}
                    </strong>

                    <button
                        class="buy-now"
                        data-buy="${escapeHTML(product.id)}"
                        type="button"
                    >
                        Buy Now
                    </button>

                </div>

            </div>

        </article>

    `;
}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(
    list,
    container,
    emptyElement
) {

    if (!container) {
        return;
    }

    if (!list.length) {

        container.innerHTML = "";

        if (emptyElement) {
            emptyElement.classList.add("show");
        }

        return;
    }

    if (emptyElement) {
        emptyElement.classList.remove("show");
    }

    container.innerHTML =
        list.map(createProductCard).join("");

    attachProductEvents(container);
}


/* =========================================================
   PRODUCT EVENTS
========================================================= */

function attachProductEvents(container) {

    if (!container) {
        return;
    }


    container
        .querySelectorAll("[data-favorite]")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();
                    event.stopPropagation();

                    toggleFavorite(
                        this.dataset.favorite
                    );

                }
            );

        });


    container
        .querySelectorAll("[data-buy]")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();
                    event.stopPropagation();

                    buyProduct(
                        this.dataset.buy
                    );

                }
            );

        });

}


/* =========================================================
   FAVORITE
========================================================= */

function toggleFavorite(productId) {

    const index =
        favorites.indexOf(productId);

    if (index === -1) {

        favorites.push(productId);

    } else {

        favorites.splice(index, 1);

    }

    try {

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(favorites)
        );

    } catch (error) {

        console.warn(
            "Could not save favorites.",
            error
        );

    }

    renderCurrentSections();
}


/* =========================================================
   BUY NOW
========================================================= */

function buyProduct(productId) {

    const product =
        products.find(function(item) {

            return item.id === productId;

        });

    if (!product || !product.meesho) {
        return;
    }

    window.open(
        product.meesho,
        "_blank",
        "noopener,noreferrer"
    );
}


/* =========================================================
   FILTER STATE
========================================================= */

let currentCategory = "all";
let currentHairType = "all";
let currentSearch = "";


/* =========================================================
   SEARCH FILTER
========================================================= */

function applySearch(list) {

    const query =
        currentSearch
            .toLowerCase()
            .trim();

    if (!query) {
        return list;
    }

    return list.filter(function(product) {

        const text = [

            product.name,
            product.category,
            product.description,
            product.badge,
            product.hairTypes.join(" ")

        ]
            .join(" ")
            .toLowerCase();

        return text.includes(query);

    });
}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterByCategory(category) {

    currentCategory =
        category || "all";

    let result =
        products.slice();

    if (currentCategory !== "all") {

        result =
            result.filter(function(product) {

                return product.category ===
                    currentCategory;

            });

    }

    result =
        applySearch(result);

    renderProducts(
        result,
        categoryGrid,
        categoryEmpty
    );
}


/* =========================================================
   HAIR TYPE FILTER
========================================================= */

function filterByHairType(hairType) {

    currentHairType =
        hairType || "all";

    let result =
        products.slice();

    if (currentHairType !== "all") {

        result =
            result.filter(function(product) {

                return product.hairTypes.includes(
                    currentHairType
                );

            });

    }

    result =
        applySearch(result);

    renderProducts(
        result.slice(0, 4),
        hairTypeGrid,
        hairTypeEmpty
    );
}


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

function setupCategoryFilters() {

    if (!categoryFilters) {
        return;
    }

    categoryFilters
        .querySelectorAll(".filter-chip")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    categoryFilters
                        .querySelectorAll(".filter-chip")
                        .forEach(function(item) {

                            item.classList.remove(
                                "active"
                            );

                        });

                    this.classList.add("active");

                    filterByCategory(
                        this.dataset.category
                    );

                }
            );

        });
}


/* =========================================================
   HAIR TYPE BUTTONS
========================================================= */

function setupHairTypeFilters() {

    if (!hairTypeFilters) {
        return;
    }

    hairTypeFilters
        .querySelectorAll(".hair-type")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    hairTypeFilters
                        .querySelectorAll(".hair-type")
                        .forEach(function(item) {

                            item.classList.remove(
                                "active"
                            );

                        });

                    this.classList.add("active");

                    filterByHairType(
                        this.dataset.hair
                    );

                }
            );

        });
}


/* =========================================================
   SEARCH
========================================================= */

function runSearch() {

    currentSearch =
        productSearch
            ? productSearch.value
            : "";

    filterByCategory(
        currentCategory
    );

    filterByHairType(
        currentHairType
    );

    renderFeatured();

    renderLikedProducts();
}


if (productSearch) {

    productSearch.addEventListener(
        "input",
        runSearch
    );

}


if (clearProductSearch) {

    clearProductSearch.addEventListener(
        "click",
        function() {

            if (!productSearch) {
                return;
            }

            productSearch.value = "";

            currentSearch = "";

            runSearch();

            productSearch.focus();

        }
    );

}


/* =========================================================
   HEADER SEARCH
========================================================= */

function openSearchPanel() {

    if (!searchPanel) {
        return;
    }

    searchPanel.classList.add("show");

    if (styleSearch) {

        setTimeout(function() {

            styleSearch.focus();

        }, 100);

    }
}


function closeSearchPanel() {

    if (!searchPanel) {
        return;
    }

    searchPanel.classList.remove("show");
}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        openSearchPanel
    );

}


if (closeSearch) {

    closeSearch.addEventListener(
        "click",
        closeSearchPanel
    );

}


if (styleSearch) {

    styleSearch.addEventListener(
        "input",
        function() {

            const value =
                this.value.trim();

            if (productSearch) {
                productSearch.value = value;
            }

            currentSearch = value;

            runSearch();

        }
    );

}


/* =========================================================
   RESET CATEGORY
========================================================= */

if (resetCategory) {

    resetCategory.addEventListener(
        "click",
        function() {

            currentCategory = "all";

            if (categoryFilters) {

                categoryFilters
                    .querySelectorAll(".filter-chip")
                    .forEach(function(button) {

                        button.classList.toggle(
                            "active",
                            button.dataset.category === "all"
                        );

                    });

            }

            filterByCategory("all");

        }
    );

}


/* =========================================================
   RESET HAIR TYPE
========================================================= */

if (resetHairType) {

    resetHairType.addEventListener(
        "click",
        function() {

            currentHairType = "all";

            if (hairTypeFilters) {

                hairTypeFilters
                    .querySelectorAll(".hair-type")
                    .forEach(function(button) {

                        button.classList.toggle(
                            "active",
                            button.dataset.hair === "all"
                        );

                    });

            }

            filterByHairType("all");

        }
    );

}


/* =========================================================
   FEATURED
========================================================= */

function renderFeatured() {

    if (!featuredGrid) {
        return;
    }

    const ids = [

        "shampoo-1",
        "styling-1",
        "beard-1",
        "growth-1"

    ];

    let result =
        ids
            .map(function(id) {

                return products.find(
                    function(product) {

                        return product.id === id;

                    }
                );

            })
            .filter(Boolean);

    result =
        applySearch(result);

    renderProducts(
        result,
        featuredGrid,
        null
    );
}


if (showFeatured) {

    showFeatured.addEventListener(
        "click",
        function() {

            if (featuredGrid) {

                featuredGrid.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


/* =========================================================
   RECOMMENDATIONS
========================================================= */

const recommendations = [

    {
        title: "For Oily Hair",
        description: "Keep your scalp fresh and balanced.",
        points: [
            "Oil control",
            "Deep cleansing",
            "Lightweight formula"
        ],
        image: "male-product-oily.jpg"
    },

    {
        title: "For Dry Hair",
        description: "Restore moisture and softness.",
        points: [
            "Deep hydration",
            "Repair damage",
            "Smoother hair"
        ],
        image: "male-product-dry.jpg"
    },

    {
        title: "For Curly Hair",
        description: "Define curls and control frizz.",
        points: [
            "Curl definition",
            "Frizz control",
            "Natural look"
        ],
        image: "male-product-curly.jpg"
    },

    {
        title: "For Hair Growth",
        description: "Build a consistent scalp-care routine.",
        points: [
            "Root nourishment",
            "Scalp care",
            "Hair strengthening"
        ],
        image: "male-product-growth.jpg"
    }

];


function renderRecommendations() {

    if (!recommendationGrid) {
        return;
    }

    recommendationGrid.innerHTML =
        recommendations.map(function(item) {

            return `

                <article class="recommendation-card">

                    <h3>
                        ${escapeHTML(item.title)}
                    </h3>

                    <p>
                        ${escapeHTML(item.description)}
                    </p>

                    <ul>

                        ${item.points.map(function(point) {

                            return `
                                <li>
                                    ${escapeHTML(point)}
                                </li>
                            `;

                        }).join("")}

                    </ul>

                    <button
                        class="explore-routine"
                        data-routine="${escapeHTML(item.title)}"
                        type="button"
                    >
                        Explore →
                    </button>

                    <img
                        src="/static/images/${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.title)}"
                        loading="lazy"
                        onerror="this.style.display='none';"
                    >

                </article>

            `;

        }).join("");


    recommendationGrid
        .querySelectorAll("[data-routine]")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const routine =
                        this.dataset.routine
                            .toLowerCase();

                    let result = [];

                    if (routine.includes("oily")) {

                        result =
                            products.filter(function(product) {

                                return product.hairTypes.includes("oily");

                            });

                    } else if (routine.includes("dry")) {

                        result =
                            products.filter(function(product) {

                                return product.hairTypes.includes("dry");

                            });

                    } else if (routine.includes("curly")) {

                        result =
                            products.filter(function(product) {

                                return product.hairTypes.includes("curly");

                            });

                    } else if (routine.includes("growth")) {

                        result =
                            products.filter(function(product) {

                                return product.category === "growth";

                            });

                    }

                    renderProducts(
                        result.slice(0, 4),
                        likedGrid,
                        null
                    );

                    if (likedGrid) {

                        likedGrid.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });

}


/* =========================================================
   YOU MAY ALSO LIKE
========================================================= */

function renderLikedProducts() {

    if (!likedGrid) {
        return;
    }

    let result =
        products.filter(function(product) {

            return [

                "serum-1",
                "conditioner-2",
                "styling-2",
                "beard-2"

            ].includes(product.id);

        });

    result =
        applySearch(result);

    renderProducts(
        result,
        likedGrid,
        null
    );
}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function openMobileSidebar() {

    if (maleSidebar) {

        maleSidebar.classList.add(
            "mobile-open"
        );

    }

    if (mobileOverlay) {

        mobileOverlay.classList.add(
            "show"
        );

    }

    body.classList.add(
        "sidebar-open"
    );
}


function closeMobileSidebar() {

    if (maleSidebar) {

        maleSidebar.classList.remove(
            "mobile-open"
        );

    }

    if (mobileOverlay) {

        mobileOverlay.classList.remove(
            "show"
        );

    }

    body.classList.remove(
        "sidebar-open"
    );
}


if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            openMobileSidebar();

        }
    );

}


if (mobileClose) {

    mobileClose.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            closeMobileSidebar();

        }
    );

}


if (mobileOverlay) {

    mobileOverlay.addEventListener(
        "click",
        closeMobileSidebar
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeMobileSidebar();

            closeSearchPanel();

        }

    }
);


/* =========================================================
   PROFILE BUTTONS
========================================================= */

function profileAction() {

    /*
       Keep this harmless for now.
       It prevents buttons from causing errors
       if no profile route is configured yet.
    */

    console.log(
        "StyleMyHair profile button clicked."
    );

}


if (profileButton) {

    profileButton.addEventListener(
        "click",
        profileAction
    );

}


if (topProfile) {

    topProfile.addEventListener(
        "click",
        profileAction
    );

}


if (settingsButton) {

    settingsButton.addEventListener(
        "click",
        function() {

            console.log(
                "StyleMyHair settings button clicked."
            );

        }
    );

}


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderCurrentSections() {

    filterByCategory(
        currentCategory
    );

    filterByHairType(
        currentHairType
    );

    renderFeatured();

    renderRecommendations();

    renderLikedProducts();

}


/* =========================================================
   INITIALIZATION
========================================================= */

function initializeMaleProducts() {

    /*
       Install runtime theme CSS FIRST.
    */



    /*
       Load saved theme.
    */

    loadTheme();


    /*
       Load saved light/dark mode.
       No saved value = LIGHT.
    */

    loadDarkMode();


    /*
       Setup controls.
    */

    setupThemeButtons();

    setupDarkMode();

    setupCategoryFilters();

    setupHairTypeFilters();


    /*
       Render page.
    */

    renderCurrentSections();

}


/* =========================================================
   START
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeMaleProducts
    );

} else {

    initializeMaleProducts();

}