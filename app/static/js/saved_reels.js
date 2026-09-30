document.addEventListener("DOMContentLoaded", function () {

    console.log("SAVED REELS JS IS WORKING");


    /* =====================================================
       HTML ELEMENTS
    ===================================================== */

    const savedContainer =
        document.getElementById("savedReelsContainer");

    const savedCount =
        document.getElementById("savedCount");

    const emptyMessage =
        document.getElementById("emptyMessage");


    /* =====================================================
       GET SAVED REELS
    ===================================================== */

    function getSavedReels() {

        return JSON.parse(
            localStorage.getItem("savedReels") || "[]"
        );

    }


    /* =====================================================
       SAVE REELS
    ===================================================== */

    function saveReels(reels) {

        localStorage.setItem(
            "savedReels",
            JSON.stringify(reels)
        );

    }


    /* =====================================================
       GET CURRENT SAVED REELS
    ===================================================== */

    let savedReels =
        getSavedReels();

    savedCount.textContent =
        savedReels.length;


    /* =====================================================
       NO SAVED REELS
    ===================================================== */

    if (savedReels.length === 0) {

        emptyMessage.classList.add("show");

        return;
    }


    /* =====================================================
       CREATE SAVED REELS
    ===================================================== */

    savedReels.forEach(function (reelId) {

        const number =
            reelId.replace("reel", "");


        /* =================================================
           CREATE REEL
        ================================================= */

        const reel =
            document.createElement("article");

        reel.className =
            "saved-reel";


        /* =================================================
           REEL HTML
        ================================================= */

        reel.innerHTML = `

            <video
                class="saved-reel-video"
                src="/static/reels/reel${number}.mp4"
                loop
                playsinline
            ></video>


            <div class="video-overlay"></div>


            <!-- MUTE BUTTON -->

            <button
                class="mute-button"
                type="button">
                🔊
            </button>


            <!-- REEL ACTIONS -->

            <div class="reel-actions">


                <!-- LIKE -->

                <button
                    class="reel-action like-button"
                    type="button">

                    <span class="like-icon">
                        ♡
                    </span>

                    <small>
                        Like
                    </small>

                </button>


                <!-- COMMENTS -->

                <button
                    class="reel-action comment-button"
                    type="button">

                    <span>
                        💬
                    </span>

                    <small>
                        Comments
                    </small>

                </button>


                <!-- SHARE -->

                <button
                    class="reel-action share-button"
                    type="button">

                    <span>
                        ↗
                    </span>

                    <small>
                        Share
                    </small>

                </button>


                <!-- SAVE / UNSAVE -->

                <button
                    class="reel-action save-button saved"
                    type="button">

                    <span>
                        🔖
                    </span>

                    <small>
                        Saved
                    </small>

                </button>

            </div>


            <!-- REEL INFORMATION -->

            <div class="reel-info">


                <div class="creator-row">

                    <div class="creator-avatar">
                        SM
                    </div>

                    <strong>
                        @StyleMyHair
                    </strong>

                    <button
                        class="follow-button"
                        type="button">
                        Follow
                    </button>

                </div>


                <h2>
                    Men's Hairstyle ${number}
                </h2>


                <p>
                    Discover this stylish men's hairstyle.
                    Find your perfect look with StyleMyHair.
                </p>


                <span class="hashtags">
                    #menshair #hairstyle #haircut #StyleMyHair
                </span>


            </div>

        `;


        savedContainer.appendChild(
            reel
        );


        /* =================================================
           VIDEO
        ================================================= */

        const video =
            reel.querySelector(
                ".saved-reel-video"
            );


        /* =================================================
           MUTE BUTTON
        ================================================= */

        const muteButton =
            reel.querySelector(
                ".mute-button"
            );


        muteButton.addEventListener(
            "click",
            function () {

                video.muted =
                    !video.muted;


                if (video.muted) {

                    muteButton.textContent =
                        "🔇";

                } else {

                    muteButton.textContent =
                        "🔊";

                }

            }
        );


        /* =================================================
           LIKE BUTTON
        ================================================= */

        const likeButton =
            reel.querySelector(
                ".like-button"
            );


        const likeIcon =
            reel.querySelector(
                ".like-icon"
            );


        likeButton.addEventListener(
            "click",
            function () {

                likeButton.classList.toggle(
                    "liked"
                );


                if (
                    likeButton.classList.contains(
                        "liked"
                    )
                ) {

                    likeIcon.textContent =
                        "♥";

                } else {

                    likeIcon.textContent =
                        "♡";

                }

            }
        );


        /* =================================================
           SHARE BUTTON
        ================================================= */

        const shareButton =
            reel.querySelector(
                ".share-button"
            );


        shareButton.addEventListener(
            "click",
            function () {

                if (
                    navigator.share
                ) {

                    navigator.share({

                        title:
                            "StyleMyHair Reel",

                        text:
                            "Check out this hairstyle on StyleMyHair!",

                        url:
                            window.location.href

                    });

                } else {

                    navigator.clipboard.writeText(
                        window.location.href
                    );

                    alert(
                        "Reel link copied!"
                    );

                }

            }
        );


        /* =================================================
           SAVE / UNSAVE BUTTON
        ================================================= */

        const saveButton =
            reel.querySelector(
                ".save-button"
            );


        saveButton.addEventListener(
            "click",
            function () {


                /* GET LATEST SAVED LIST */

                let currentSaved =
                    getSavedReels();


                /* CHECK IF CURRENT REEL IS SAVED */

                const isSaved =
                    currentSaved.includes(
                        reelId
                    );


                /* =================================================
                   UNSAVE
                ================================================= */

                if (isSaved) {


                    currentSaved =
                        currentSaved.filter(
                            function (id) {

                                return id !== reelId;

                            }
                        );


                    /* UPDATE LOCAL STORAGE */

                    saveReels(
                        currentSaved
                    );


                    /* UPDATE BUTTON */

                    saveButton.classList.remove(
                        "saved"
                    );


                    saveButton.querySelector(
                        "small"
                    ).textContent =
                        "Save";


                    /* UPDATE COUNT */

                    savedCount.textContent =
                        currentSaved.length;


                    /*
                       REMOVE REEL FROM SAVED PAGE
                    */

                    reel.remove();


                    /* =================================================
                       IF NO SAVED REELS LEFT
                    ================================================= */

                    if (
                        currentSaved.length === 0
                    ) {

                        emptyMessage.classList.add(
                            "show"
                        );

                    }


                    console.log(
                        "Reel unsaved:",
                        reelId
                    );


                    return;
                }


                /* =================================================
                   SAVE AGAIN
                ================================================= */

                currentSaved.push(
                    reelId
                );


                saveReels(
                    currentSaved
                );


                saveButton.classList.add(
                    "saved"
                );


                saveButton.querySelector(
                    "small"
                ).textContent =
                    "Saved";


                savedCount.textContent =
                    currentSaved.length;


                console.log(
                    "Reel saved:",
                    reelId
                );

            }
        );


        /* =================================================
           FOLLOW BUTTON
        ================================================= */

        const followButton =
            reel.querySelector(
                ".follow-button"
            );


        followButton.addEventListener(
            "click",
            function () {

                if (
                    followButton.textContent.trim() ===
                    "Follow"
                ) {

                    followButton.textContent =
                        "Following";

                } else {

                    followButton.textContent =
                        "Follow";

                }

            }
        );


        /* =================================================
           DOUBLE CLICK LIKE
        ================================================= */

        video.addEventListener(
            "dblclick",
            function () {

                likeButton.classList.add(
                    "liked"
                );


                likeIcon.textContent =
                    "♥";

            }
        );

    });


    /* =====================================================
       AUTO PLAY / PAUSE
    ===================================================== */

    const videos =
        document.querySelectorAll(
            ".saved-reel-video"
        );


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        const video =
                            entry.target;


                        if (
                            entry.isIntersecting
                        ) {

                            video.play().catch(
                                function () {}
                            );

                        } else {

                            video.pause();

                        }

                    }
                );

            },
            {
                threshold: 0.7
            }
        );


    videos.forEach(
        function (video) {

            observer.observe(
                video
            );

        }
    );

});