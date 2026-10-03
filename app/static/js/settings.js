/* =====================================================
   STYLEMYHAIR
   UNIVERSAL SETTINGS JS
   FEMALE + MALE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;

    const backButton =
        document.getElementById("backButton");

    const modeToggle =
        document.getElementById("modeToggle");

    const modeIcon =
        document.getElementById("modeIcon");

    const modeText =
        document.getElementById("modeText");

    const themeName =
        document.getElementById("themeName");

    const themeButtons =
        document.querySelectorAll(".theme-dot");

    const saveMessage =
        document.getElementById("saveMessage");

    const resetSettings =
        document.getElementById("resetSettings");

    const logoutButton =
        document.getElementById("logoutButton");

    const editProfile =
        document.getElementById("editProfile");


    /* =================================================
       DETECT MALE / FEMALE
    ================================================= */

    const currentPath =
        window.location.pathname.toLowerCase();

    const isMale =
        currentPath.includes("/male");

    const isFemale =
        currentPath.includes("/female");


    /*
       Different pages already use different
       localStorage keys.
    */

    const themeKey =
        isMale
            ? "stylemyhair-male-theme"
            : "stylemyhair-female-theme";

    const darkKey =
        isMale
            ? "stylemyhair-male-dark-mode"
            : "stylemyhair-dark-mode";


    /* =================================================
       THEMES
    ================================================= */

    const themes = {

        rose: {
            name: "Rose",
            primary: "#e52f72",
            secondary: "#e96b9a",
            background: "#fff7fa",
            surface: "#ffffff",
            surface2: "#f9e8ef",
            text: "#29232a"
        },

        lavender: {
            name: "Lavender",
            primary: "#8064d6",
            secondary: "#a594ea",
            background: "#faf8ff",
            surface: "#ffffff",
            surface2: "#eeeafd",
            text: "#292534"
        },

        peach: {
            name: "Peach",
            primary: "#ed805f",
            secondary: "#f2a083",
            background: "#fff8f5",
            surface: "#ffffff",
            surface2: "#fbe9e1",
            text: "#302522"
        },

        sky: {
            name: "Sky",
            primary: "#3c9cdb",
            secondary: "#73bce8",
            background: "#f5fbff",
            surface: "#ffffff",
            surface2: "#e5f3fb",
            text: "#202a30"
        },

        mint: {
            name: "Mint",
            primary: "#35ae91",
            secondary: "#68c9b0",
            background: "#f4fcf9",
            surface: "#ffffff",
            surface2: "#e2f4ef",
            text: "#202b28"
        },

        sage: {
            name: "Sage",
            primary: "#758f70",
            secondary: "#9bb097",
            background: "#f7faf5",
            surface: "#ffffff",
            surface2: "#e8eee5",
            text: "#252a23"
        },

        butter: {
            name: "Butter",
            primary: "#c7a82d",
            secondary: "#e1c95c",
            background: "#fffdf4",
            surface: "#ffffff",
            surface2: "#f7f0cf",
            text: "#302d20"
        },

        coral: {
            name: "Coral",
            primary: "#df5948",
            secondary: "#ec8172",
            background: "#fff7f5",
            surface: "#ffffff",
            surface2: "#fae5e1",
            text: "#302321"
        },

        plum: {
            name: "Plum",
            primary: "#86417f",
            secondary: "#a968a1",
            background: "#fcf7fb",
            surface: "#ffffff",
            surface2: "#f0e3ee",
            text: "#2d242c"
        },

        ocean: {
            name: "Ocean",
            primary: "#237a9f",
            secondary: "#4b9dbd",
            background: "#f3fafc",
            surface: "#ffffff",
            surface2: "#e0eff3",
            text: "#202a2e"
        },

        cocoa: {
            name: "Cocoa",
            primary: "#86593e",
            secondary: "#aa7959",
            background: "#fcf8f5",
            surface: "#ffffff",
            surface2: "#eee3dc",
            text: "#2d2723"
        },

        midnight: {
            name: "Midnight",
            primary: "#5368a9",
            secondary: "#788bc5",
            background: "#f4f6fc",
            surface: "#ffffff",
            surface2: "#e5e9f5",
            text: "#202431"
        }

    };


    /* =================================================
       SHOW MESSAGE
    ================================================= */

    function showSaved() {

        saveMessage.classList.add("show");

        clearTimeout(
            window.settingsMessageTimer
        );

        window.settingsMessageTimer =
            setTimeout(function () {

                saveMessage.classList.remove("show");

            }, 1800);
    }


    /* =================================================
       APPLY THEME
    ================================================= */

    function applyTheme(theme) {

        if (!themes[theme]) {

            theme =
                isMale
                    ? "midnight"
                    : "rose";
        }

        const selected =
            themes[theme];


        body.style.setProperty(
            "--primary",
            selected.primary
        );

        body.style.setProperty(
            "--secondary",
            selected.secondary
        );

        body.style.setProperty(
            "--accent",
            selected.primary
        );

        body.style.setProperty(
            "--background",
            selected.background
        );

        body.style.setProperty(
            "--surface",
            selected.surface
        );

        body.style.setProperty(
            "--surface-2",
            selected.surface2
        );

        body.style.setProperty(
            "--text",
            selected.text
        );


        themeName.textContent =
            selected.name;


        themeButtons.forEach(function (button) {

            button.classList.toggle(
                "active",
                button.dataset.theme === theme
            );

        });


        localStorage.setItem(
            themeKey,
            theme
        );

    }


    /* =================================================
       DARK MODE
    ================================================= */

    function applyDarkMode(isDark) {

        body.classList.toggle(
            "dark-mode",
            isDark
        );


        if (isDark) {

            modeIcon.textContent = "☾";

            modeText.textContent =
                "Dark Mode";

        } else {

            modeIcon.textContent = "☀";

            modeText.textContent =
                "Light Mode";
        }


        localStorage.setItem(
            darkKey,
            isDark ? "true" : "false"
        );

    }


    /* =================================================
       LOAD SAVED SETTINGS
    ================================================= */

    const savedTheme =
        localStorage.getItem(themeKey)
        ||
        (isMale ? "midnight" : "rose");


    const savedDark =
        localStorage.getItem(darkKey)
        === "true";


    applyTheme(savedTheme);

    applyDarkMode(savedDark);


    /* =================================================
       THEME BUTTONS
    ================================================= */

    themeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                applyTheme(
                    button.dataset.theme
                );

                showSaved();

            }
        );

    });


    /* =================================================
       DARK MODE BUTTON
    ================================================= */

    modeToggle.addEventListener(
        "click",
        function () {

            const isDark =
                !body.classList.contains(
                    "dark-mode"
                );

            applyDarkMode(isDark);

            showSaved();

        }
    );


/* =================================================
   BACK BUTTON
================================================= */

backButton.addEventListener("click", function () {

    // Go to the actual page the user came from
    if (window.history.length > 1) {
        window.history.back();
        return;
    }

    // Only if there is no browser history
    window.location.href = "/";
});


    /* =================================================
       EDIT PROFILE
    ================================================= */

    editProfile.addEventListener(
        "click",
        function () {

            const name =
                prompt(
                    "Enter your display name:",
                    document.getElementById(
                        "profileName"
                    ).textContent
                );


            if (name && name.trim()) {

                document.getElementById(
                    "profileName"
                ).textContent =
                    name.trim();

                localStorage.setItem(
                    "stylemyhair-profile-name",
                    name.trim()
                );

                showSaved();
            }

        }
    );


    /* =================================================
       LOAD PROFILE
    ================================================= */

    const savedName =
        localStorage.getItem(
            "stylemyhair-profile-name"
        );


    if (savedName) {

        document.getElementById(
            "profileName"
        ).textContent =
            savedName;

    }


    /* =================================================
       NOTIFICATIONS / PRIVACY
    ================================================= */

    const settingInputs =
        document.querySelectorAll(
            'input[type="checkbox"], select'
        );


    settingInputs.forEach(function (input) {

        const key =
            "stylemyhair-setting-" +
            input.id;


        const saved =
            localStorage.getItem(key);


        if (saved !== null) {

            if (input.type === "checkbox") {

                input.checked =
                    saved === "true";

            } else {

                input.value =
                    saved;

            }

        }


        input.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    key,
                    input.type === "checkbox"
                        ? input.checked
                        : input.value
                );

                showSaved();

            }
        );

    });


    /* =================================================
       RESET SETTINGS
    ================================================= */

    resetSettings.addEventListener(
        "click",
        function () {

            const confirmReset =
                confirm(
                    "Reset your StyleMyHair settings?"
                );


            if (!confirmReset) {
                return;
            }


            localStorage.removeItem(
                themeKey
            );

            localStorage.removeItem(
                darkKey
            );


            settingInputs.forEach(
                function (input) {

                    localStorage.removeItem(
                        "stylemyhair-setting-" +
                        input.id
                    );

                }
            );


            localStorage.removeItem(
                "stylemyhair-profile-name"
            );


            location.reload();

        }
    );


    /* =================================================
       LOGOUT
    ================================================= */

    logoutButton.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to log out?"
                );


            if (!confirmLogout) {
                return;
            }


            /*
               Change this URL later if your
               login route has a different name.
            */

            window.location.href =
                "/login";

        }
    );

});