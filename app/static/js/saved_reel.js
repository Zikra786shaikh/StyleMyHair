document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // =========================================================
    // STYLEMYHAIR - FEMALE SAVED REELS
    // =========================================================

   const SAVED_KEY = "styleMyHairFemaleSavedReels";

    const savedContainer =
        document.getElementById("savedContainer") ||
        document.getElementById("savedReelsContainer");

    const emptyState =
        document.getElementById("emptyState");

    const savedCount =
        document.getElementById("savedCount");

    if (!savedContainer) {
        return;
    }

    // =========================================================
    // STORAGE
    // =========================================================

    let savedReels = JSON.parse(
        localStorage.getItem(SAVED_KEY) || "[]"
    );

    // =========================================================
    // FEMALE REEL INFORMATION
    // =========================================================

    const femaleReels = [
        {
            id: "reel1",
            title: "Elegant Layered Hair",
            description:
                "A beautiful layered hairstyle for an effortless everyday look."
        },
        {
            id: "reel2",
            title: "Soft Waves",
            description:
                "Soft waves for a simple and elegant appearance."
        },
        {
            id: "reel3",
            title: "Classic Women's Style",
            description:
                "A timeless hairstyle for a polished finish."
        },
        {
            id: "reel4",
            title: "Modern Layers",
            description:
                "Fresh modern layers for a stylish appearance."
        },
        {
            id: "reel5",
            title: "Voluminous Waves",
            description:
                "Beautiful volume and movement for your hair."
        },
        {
            id: "reel6",
            title: "Long Hair Style",
            description:
                "A graceful hairstyle for longer hair."
        },
        {
            id: "reel7",
            title: "Soft Curls",
            description:
                "Soft curls for a feminine and elegant look."
        },
        {
            id: "reel8",
            title: "Everyday Hairstyle",
            description:
                "An easy hairstyle you can wear every day."
        },
        {
            id: "reel9",
            title: "Stylish Bob",
            description:
                "A clean and modern bob hairstyle."
        },
        {
            id: "reel10",
            title: "Beach Waves",
            description:
                "Relaxed waves for a fresh casual style."
        },
        {
            id: "reel11",
            title: "Chic Hairstyle",
            description:
                "A chic hairstyle for a confident look."
        },
        {
            id: "reel12",
            title: "Glossy Layers",
            description:
                "Smooth layered hair with a polished finish."
        },
        {
            id: "reel13",
            title: "Natural Waves",
            description:
                "Natural-looking waves with beautiful movement."
        },
        {
            id: "reel14",
            title: "Elegant Hair",
            description:
                "A graceful hairstyle for special occasions."
        },
        {
            id: "reel15",
            title: "Trendy Layers",
            description:
                "A modern layered look inspired by current styles."
        },
        {
            id: "reel16",
            title: "Soft Volume",
            description:
                "A soft voluminous hairstyle for everyday wear."
        },
        {
            id: "reel17",
            title: "Classic Waves",
            description:
                "Classic waves with an elegant finish."
        },
        {
            id: "reel18",
            title: "Modern Women's Cut",
            description:
                "A contemporary haircut for a fresh new look."
        },
        {
            id: "reel19",
            title: "Flowing Hair",
            description:
                "A beautiful flowing hairstyle with natural movement."
        },
        {
            id: "reel20",
            title: "Signature Style",
            description:
                "Discover a hairstyle that feels uniquely you."
        }
    ];

    // =========================================================
    // GET REEL NUMBER
    // =========================================================

    function getReelNumber(reelId) {

        const match =
            String(reelId).match(/\d+/);

        return match
            ? parseInt(match[0], 10)
            : null;
    }

    // =========================================================
    // UPDATE COUNT
    // =========================================================

    function updateCount() {

        if (savedCount) {
            savedCount.textContent =
                savedReels.length;
        }
    }

    // =========================================================
    // EMPTY STATE
    // =========================================================

    function updateEmptyState() {

        if (!emptyState) {
            return;
        }

        if (savedReels.length === 0) {

            emptyState.style.display = "flex";

        } else {

            emptyState.style.display = "none";
        }
    }

    // =========================================================
    // CREATE SAVED REEL CARD
    // =========================================================

    function createSavedReelCard(reelId) {

        const reelNumber =
            getReelNumber(reelId);

        if (!reelNumber) {
            return null;
        }

        const info =
            femaleReels.find(
                (reel) => reel.id === reelId
            ) || {
                id: reelId,
                title: "Women's Hairstyle",
                description:
                    "Discover a beautiful hairstyle on StyleMyHair."
            };

        const card =
            document.createElement("article");

        card.className =
            "saved-reel-card";

        card.dataset.reelId =
            reelId;

        card.innerHTML = `

            <div class="saved-video-wrapper">

                <video
                    class="saved-reel-video"
                    src="/static/videos/reel${reelNumber}.mp4"
                    playsinline
                    muted
                    preload="metadata">
                </video>

                <div class="saved-video-overlay">

                    <button
                        type="button"
                        class="saved-play-button"
                        aria-label="Play video">
                        ▶
                    </button>

                </div>

            </div>

            <div class="saved-reel-info">

                <div class="saved-reel-heading">

                    <div>

                        <h3>
                            ${escapeHTML(info.title)}
                        </h3>

                        <span class="saved-creator">
                            @StyleMyHair
                        </span>

                    </div>

                    <button
                        type="button"
                        class="unsave-button"
                        aria-label="Remove from saved reels">
                        🔖
                    </button>

                </div>

                <p>
                    ${escapeHTML(info.description)}
                </p>

                <div class="saved-reel-actions">

                    <button
                        type="button"
                        class="saved-view-button">
                        Watch Reel
                    </button>

                </div>

            </div>
        `;

        // =====================================================
        // VIDEO PLAY / PAUSE
        // =====================================================

        const video =
            card.querySelector(
                ".saved-reel-video"
            );

        const playButton =
            card.querySelector(
                ".saved-play-button"
            );

        if (video && playButton) {

            playButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    if (video.paused) {

                        video.play()
                            .then(() => {

                                playButton.textContent =
                                    "❚❚";

                            })
                            .catch(() => {});

                    } else {

                        video.pause();

                        playButton.textContent =
                            "▶";
                    }
                }
            );

            video.addEventListener(
                "play",
                () => {

                    playButton.textContent =
                        "❚❚";
                }
            );

            video.addEventListener(
                "pause",
                () => {

                    playButton.textContent =
                        "▶";
                }
            );

            video.addEventListener(
                "ended",
                () => {

                    playButton.textContent =
                        "▶";
                }
            );
        }

        // =====================================================
        // UNSAVE
        // =====================================================

        const unsaveButton =
            card.querySelector(
                ".unsave-button"
            );

        if (unsaveButton) {

            unsaveButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    savedReels =
                        savedReels.filter(
                            (id) =>
                                id !== reelId
                        );

                    localStorage.setItem(
                        SAVED_KEY,
                        JSON.stringify(
                            savedReels
                        )
                    );

                    card.remove();

                    updateCount();
                    updateEmptyState();

                    showToast(
                        "Removed from saved reels"
                    );
                }
            );
        }

        // =====================================================
        // WATCH REEL
        // =====================================================

        const watchButton =
            card.querySelector(
                ".saved-view-button"
            );

        if (watchButton) {

            watchButton.addEventListener(
                "click",
                () => {

                    window.location.href =
                        `/reels#${reelId}`;
                }
            );
        }

        return card;
    }

    // =========================================================
    // RENDER SAVED REELS
    // =========================================================

    function renderSavedReels() {

        savedContainer.innerHTML = "";

        if (savedReels.length === 0) {

            updateCount();
            updateEmptyState();

            return;
        }

        savedReels.forEach(
            (reelId) => {

                const card =
                    createSavedReelCard(
                        reelId
                    );

                if (card) {
                    savedContainer.appendChild(
                        card
                    );
                }
            }
        );

        updateCount();
        updateEmptyState();
    }

    // =========================================================
    // TOAST
    // =========================================================

    function showToast(message) {

        let toast =
            document.getElementById(
                "savedReelToast"
            );

        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );

            toast.id =
                "savedReelToast";

            toast.style.position =
                "fixed";

            toast.style.left =
                "50%";

            toast.style.bottom =
                "30px";

            toast.style.transform =
                "translateX(-50%)";

            toast.style.padding =
                "12px 20px";

            toast.style.background =
                "rgba(0,0,0,0.82)";

            toast.style.color =
                "#fff";

            toast.style.borderRadius =
                "25px";

            toast.style.fontSize =
                "14px";

            toast.style.zIndex =
                "99999";

            document.body.appendChild(
                toast
            );
        }

        toast.textContent =
            message;

        toast.style.opacity =
            "1";

        clearTimeout(
            toast._timer
        );

        toast._timer =
            setTimeout(
                () => {

                    toast.style.opacity =
                        "0";

                },
                1800
            );
    }

    // =========================================================
    // ESCAPE HTML
    // =========================================================

    function escapeHTML(value) {

        const div =
            document.createElement(
                "div"
            );

        div.textContent =
            value;

        return div.innerHTML;
    }

    // =========================================================
    // INITIALIZE
    // =========================================================

    renderSavedReels();

});