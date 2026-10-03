document.addEventListener(
    "DOMContentLoaded",
    function () {

        const savedContainer =
            document.getElementById(
                "savedContainer"
            );

        const emptyState =
            document.getElementById(
                "emptyState"
            );


        // =====================================================
        // SAVED REELS
        // =====================================================

        let savedReels =
            JSON.parse(
                localStorage.getItem(
                    "stylemyhair-saved-reels"
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
        // GET STYLE
        // =====================================================

        function getStyleData(number) {

            const index =
                (number - 1) %
                hairstyles.length;

            return hairstyles[index];

        }


        // =====================================================
        // SHOW EMPTY STATE
        // =====================================================

        function showEmptyState() {

            savedContainer.innerHTML = "";

            savedContainer.style.display =
                "none";

            emptyState.style.display =
                "flex";

        }


        // =====================================================
        // CREATE SAVED REEL
        // =====================================================

        function createSavedReel(number) {

            const style =
                getStyleData(number);


            const card =
                document.createElement("article");


            card.className =
                "saved-reel";


            card.dataset.reelNumber =
                number;


            card.innerHTML = `

                <video
                    src="/static/videos/reel${number}.mp4"
                    loop
                    muted
                    playsinline
                    controls
                ></video>


                <div class="reel-overlay"></div>


                <button
                    type="button"
                    class="unsave-button"
                >
                    🔖 Saved
                </button>


                <div class="reel-info">

                    <h3>
                        ${style.title}
                    </h3>

                    <p>
                        ${style.description}
                    </p>

                    <strong>
                        ${style.hashtags}
                    </strong>

                </div>

            `;


            return card;

        }


        // =====================================================
        // LOAD SAVED REELS
        // =====================================================

        function loadSavedReels() {

            savedContainer.innerHTML = "";


            if (
                savedReels.length === 0
            ) {

                showEmptyState();

                return;

            }


            emptyState.style.display =
                "none";

            savedContainer.style.display =
                "grid";


            savedReels.forEach(
                function (number) {

                    const reel =
                        createSavedReel(
                            number
                        );

                    savedContainer.appendChild(
                        reel
                    );

                }
            );

        }


        // =====================================================
        // UNSAVE
        // =====================================================

        savedContainer.addEventListener(
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
                    "stylemyhair-saved-reels",
                    JSON.stringify(
                        savedReels
                    )
                );


                loadSavedReels();

            }
        );


        // =====================================================
        // LOAD PAGE
        // =====================================================

        loadSavedReels();

    }
);