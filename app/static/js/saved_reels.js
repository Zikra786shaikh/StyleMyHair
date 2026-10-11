document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    const container =
        document.getElementById(
            "savedReelsContainer"
        );


    const emptyMessage =
        document.getElementById(
            "emptyMessage"
        );


    const savedCount =
        document.getElementById(
            "savedCount"
        );


    /* =====================================================
       SAME STORAGE KEY AS MALE REELS
    ===================================================== */

    const SAVED_REELS_KEY =
        "styleMyHairSavedReels";


    let savedReels =
        JSON.parse(
            localStorage.getItem(
                SAVED_REELS_KEY
            ) || "[]"
        );


    /* =====================================================
       LOAD SAVED REELS
    ===================================================== */

    function loadSavedReels() {

        container.innerHTML = "";


        savedCount.textContent =
            savedReels.length;


        if (savedReels.length === 0) {

            emptyMessage.style.display =
                "flex";

            container.style.display =
                "none";

            return;

        }


        emptyMessage.style.display =
            "none";

        container.style.display =
            "grid";


        savedReels.forEach(function (reelId) {

            const reelNumber =
                reelId.replace(
                    "reel",
                    ""
                );


            const reel =
                document.createElement(
                    "article"
                );


            reel.className =
                "saved-reel";


            reel.dataset.reelId =
                reelId;


            reel.innerHTML = `

                <video
                    src="/static/reels/reel${reelNumber}.mp4"
                    loop
                    playsinline
                    controls
                ></video>

                <div class="reel-overlay"></div>

                <div class="reel-info">

                    <h2>
                        StyleMyHair Reel ${reelNumber}
                    </h2>

                    <p>
                        Discover fresh hairstyle
                        inspiration and trending
                        men's looks.
                    </p>

                    <strong>
                        #StyleMyHair #MensHairstyle
                    </strong>

                </div>


                <button
                    type="button"
                    class="unsave-button"
                >
                    🔖 Saved
                </button>

            `;


            container.appendChild(reel);

        });

    }


    /* =====================================================
       UNSAVE
    ===================================================== */

    container.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".unsave-button"
                );


            if (!button) {
                return;
            }


            const reel =
                button.closest(
                    ".saved-reel"
                );


            if (!reel) {
                return;
            }


            const reelId =
                reel.dataset.reelId;


            savedReels =
                savedReels.filter(
                    function (id) {
                        return id !== reelId;
                    }
                );


            localStorage.setItem(
                SAVED_REELS_KEY,
                JSON.stringify(savedReels)
            );


            loadSavedReels();

        }
    );


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    loadSavedReels();

});