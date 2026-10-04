document.addEventListener(
    "DOMContentLoaded",
    function () {

        // =====================================================
        // ELEMENTS
        // =====================================================

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


        // =====================================================
        // STORAGE
        // =====================================================

        const FEMALE_SAVED_REELS_KEY =
            "stylemyhair-female-saved-reels";


        let savedReels =
            JSON.parse(
                localStorage.getItem(
                    FEMALE_SAVED_REELS_KEY
                ) || "[]"
            );


        // =====================================================
        // HAIRSTYLE DATA
        // =====================================================

        const hairstyles = [

            {
                title: "Elegant Long Layers",
                description:
                    "Soft layered hairstyle for a stylish everyday look.",
                hashtags:
                    "#LongHair #Layers #Hairstyle"
            },

            {
                title: "Modern Bob",
                description:
                    "A clean modern bob hairstyle with an elegant finish.",
                hashtags:
                    "#Bob #BobCut #WomensHair"
            },

            {
                title: "Elegant Braids",
                description:
                    "Beautiful braided hairstyle for a graceful look.",
                hashtags:
                    "#Braids #BraidedHair #Hairstyle"
            },

            {
                title: "Soft Curls",
                description:
                    "Soft curls for a beautiful and natural appearance.",
                hashtags:
                    "#Curls #CurlyHair #HairStyle"
            },

            {
                title: "Classic Ponytail",
                description:
                    "A simple and stylish ponytail for everyday looks.",
                hashtags:
                    "#Ponytail #LongHair #Style"
            },

            {
                title: "Beach Waves",
                description:
                    "Relaxed beach waves with a soft modern finish.",
                hashtags:
                    "#BeachWaves #Waves #Hair"
            },

            {
                title: "Layered Bob",
                description:
                    "A stylish layered bob with a modern appearance.",
                hashtags:
                    "#LayeredBob #Bob #HairStyle"
            },

            {
                title: "French Braid",
                description:
                    "A classic French braid for an elegant hairstyle.",
                hashtags:
                    "#FrenchBraid #Braids #Hair"
            }

        ];


        // =====================================================
        // GET STYLE DATA
        // =====================================================

        function getStyleData(number) {

            const index =
                (number - 1) %
                hairstyles.length;

            return hairstyles[index];

        }


        // =====================================================
        // LOAD SAVED REELS
        // =====================================================

        function loadSavedReels() {

            container.innerHTML = "";


            savedCount.textContent =
                savedReels.length;


            // =================================================
            // NOTHING SAVED
            // =================================================

            if (savedReels.length === 0) {

                emptyMessage.style.display =
                    "flex";

                container.style.display =
                    "none";

                return;

            }


            // =================================================
            // REELS EXIST
            // =================================================

            emptyMessage.style.display =
                "none";

            container.style.display =
                "grid";


            savedReels.forEach(
                function (number) {

                    const style =
                        getStyleData(number);


                    const reel =
                        document.createElement(
                            "article"
                        );


                    reel.className =
                        "saved-reel";


                    reel.dataset.reelNumber =
                        number;


                    reel.innerHTML = `

                        <video
                            src="/static/reels/reel${number}.mp4"
                            loop
                            muted
                            playsinline
                            controls
                        ></video>


                        <div class="reel-overlay"></div>


                        <div class="reel-info">

                            <h2>
                                ${style.title}
                            </h2>

                            <p>
                                ${style.description}
                            </p>

                            <strong>
                                ${style.hashtags}
                            </strong>

                        </div>


                        <button
                            type="button"
                            class="unsave-button"
                        >
                            🔖 Saved
                        </button>

                    `;


                    container.appendChild(
                        reel
                    );

                }
            );

        }


        // =====================================================
        // UNSAVE REEL
        // =====================================================

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


                const number =
                    Number(
                        reel.dataset.reelNumber
                    );


                savedReels =
                    savedReels.filter(
                        id => id !== number
                    );


                localStorage.setItem(
                    FEMALE_SAVED_REELS_KEY,
                    JSON.stringify(
                        savedReels
                    )
                );


                loadSavedReels();

            }
        );


        // =====================================================
        // INITIAL LOAD
        // =====================================================

        loadSavedReels();

    }
);