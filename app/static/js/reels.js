document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log("FEMALE REELS JS IS WORKING");


        // =====================================================
        // SETTINGS
        // =====================================================

        const reelsContainer =
            document.getElementById(
                "reelsContainer"
            );

        const TOTAL_REELS = 100;


        if (!reelsContainer) {
            console.error(
                "reelsContainer not found"
            );
            return;
        }


        // =====================================================
        // STORAGE KEYS
        // =====================================================

        const FEMALE_SAVED_REELS_KEY =
            "stylemyhair-female-saved-reels";

        const FEMALE_LIKED_REELS_KEY =
            "stylemyhair-female-liked-reels";


        // =====================================================
        // CREATE REELS
        // =====================================================

        for (
            let i = 1;
            i <= TOTAL_REELS;
            i++
        ) {

            const reel =
                document.createElement(
                    "article"
                );


            reel.className =
                "reel";


            reel.dataset.reelNumber =
                i;


            reel.dataset.reelId =
                "reel" + i;


            reel.dataset.title =
                "Women's Hairstyle " + i;


            reel.innerHTML = `

                <video
                    class="reel-video"
                    src="/static/reels/reel${i}.mp4"
                    loop
                    playsinline
                    muted
                ></video>


                <div class="video-overlay"></div>


                <!-- MUTE -->

                <button
                    type="button"
                    class="mute-button"
                >
                    🔇
                </button>


                <!-- RIGHT SIDE -->

                <div class="reel-actions">

                    <button
                        type="button"
                        class="reel-action like-button"
                    >

                        <span class="like-icon">
                            ♡
                        </span>

                        <small>
                            Like
                        </small>

                    </button>


                    <button
                        type="button"
                        class="reel-action comment-button"
                    >

                        <span>
                            💬
                        </span>

                        <small>

                            <span class="comment-count">
                                0
                            </span>

                            Comments

                        </small>

                    </button>


                    <button
                        type="button"
                        class="reel-action share-button"
                    >

                        <span>
                            ↗
                        </span>

                        <small>
                            Share
                        </small>

                    </button>


                    <button
                        type="button"
                        class="reel-action save-button"
                    >

                        <span>
                            🔖
                        </span>

                        <small>
                            Save
                        </small>

                    </button>

                </div>


                <!-- INFORMATION -->

                <div class="reel-info">

                    <div class="creator-row">

                        <div class="creator-avatar">
                            SM
                        </div>

                        <strong>
                            @StyleMyHair
                        </strong>

                        <button
                            type="button"
                            class="follow-button"
                        >
                            Follow
                        </button>

                    </div>


                    <h2>
                        Women's Hairstyle ${i}
                    </h2>


                    <p>
                        Discover this beautiful women's
                        hairstyle and find your perfect
                        look with StyleMyHair.
                    </p>


                    <span class="hashtags">
                        #womenshair
                        #hairstyle
                        #haircut
                        #StyleMyHair
                    </span>

                </div>

            `;


            reelsContainer.appendChild(
                reel
            );

        }


        // =====================================================
        // GET ALL REELS
        // =====================================================

        const reels =
            document.querySelectorAll(
                ".reel"
            );


        // =====================================================
        // COMMENTS DATA
        // =====================================================

        const reelData = [];


        for (
            let i = 1;
            i <= TOTAL_REELS;
            i++
        ) {

            reelData.push({

                id:
                    "reel" + i,

                title:
                    "Women's Hairstyle " + i,

                comments:
                    []

            });

        }


        // =====================================================
        // SAVED REELS
        // =====================================================

        function getSavedReels() {

            return JSON.parse(
                localStorage.getItem(
                    FEMALE_SAVED_REELS_KEY
                ) || "[]"
            );

        }


        function saveReels(saved) {

            localStorage.setItem(
                FEMALE_SAVED_REELS_KEY,
                JSON.stringify(saved)
            );

        }


        // =====================================================
        // COMMENTS
        // =====================================================

        function getComments(reelId) {

            const savedComments =
                JSON.parse(
                    localStorage.getItem(
                        "female-comments-" + reelId
                    ) || "null"
                );


            if (savedComments) {

                return savedComments;

            }


            const reel =
                reelData.find(
                    item =>
                        item.id === reelId
                );


            return reel
                ? reel.comments
                : [];

        }


        function saveComments(
            reelId,
            comments
        ) {

            localStorage.setItem(
                "female-comments-" + reelId,
                JSON.stringify(comments)
            );

        }


        // =====================================================
        // AUTO PLAY / PAUSE
        // =====================================================

        const observer =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            const video =
                                entry.target.querySelector(
                                    ".reel-video"
                                );


                            if (!video) {
                                return;
                            }


                            if (
                                entry.isIntersecting
                            ) {

                                video.play()
                                    .catch(
                                        function () {}
                                    );

                            } else {

                                video.pause();

                                video.currentTime =
                                    0;

                            }

                        }
                    );

                },

                {
                    threshold: 0.7
                }

            );


        reels.forEach(
            function (reel) {

                observer.observe(
                    reel
                );

            }
        );


        // =====================================================
        // LIKE
        // =====================================================

        function getLikedReels() {

            return JSON.parse(
                localStorage.getItem(
                    FEMALE_LIKED_REELS_KEY
                ) || "[]"
            );

        }


        function saveLikedReels(
            likedReels
        ) {

            localStorage.setItem(
                FEMALE_LIKED_REELS_KEY,
                JSON.stringify(
                    likedReels
                )
            );

        }


        document
            .querySelectorAll(
                ".like-button"
            )
            .forEach(
                function (
                    button,
                    index
                ) {

                    const reelId =
                        "reel" +
                        (index + 1);


                    const likedReels =
                        getLikedReels();


                    if (
                        likedReels.includes(
                            reelId
                        )
                    ) {

                        button.classList.add(
                            "liked"
                        );


                        button.querySelector(
                            ".like-icon"
                        ).textContent =
                            "♥";

                    }


                    button.addEventListener(
                        "click",
                        function () {

                            let liked =
                                getLikedReels();


                            if (
                                liked.includes(
                                    reelId
                                )
                            ) {

                                liked =
                                    liked.filter(
                                        function (
                                            id
                                        ) {

                                            return (
                                                id !==
                                                reelId
                                            );

                                        }
                                    );


                                button.classList.remove(
                                    "liked"
                                );


                                button.querySelector(
                                    ".like-icon"
                                ).textContent =
                                    "♡";

                            } else {

                                liked.push(
                                    reelId
                                );


                                button.classList.add(
                                    "liked"
                                );


                                button.querySelector(
                                    ".like-icon"
                                ).textContent =
                                    "♥";

                            }


                            saveLikedReels(
                                liked
                            );

                        }
                    );

                }
            );


        // =====================================================
        // SAVE REEL
        // =====================================================

        document
            .querySelectorAll(
                ".save-button"
            )
            .forEach(
                function (
                    button,
                    index
                ) {

                    const reelId =
                        index + 1;


                    const savedReels =
                        getSavedReels();


                    if (
                        savedReels.includes(
                            reelId
                        )
                    ) {

                        button.classList.add(
                            "saved"
                        );


                        button.querySelector(
                            "small"
                        ).textContent =
                            "Saved";

                    }


                    button.addEventListener(
                        "click",
                        function () {

                            let saved =
                                getSavedReels();


                            if (
                                saved.includes(
                                    reelId
                                )
                            ) {

                                saved =
                                    saved.filter(
                                        function (
                                            id
                                        ) {

                                            return (
                                                id !==
                                                reelId
                                            );

                                        }
                                    );


                                button.classList.remove(
                                    "saved"
                                );


                                button.querySelector(
                                    "small"
                                ).textContent =
                                    "Save";

                            } else {

                                saved.push(
                                    reelId
                                );


                                button.classList.add(
                                    "saved"
                                );


                                button.querySelector(
                                    "small"
                                ).textContent =
                                    "Saved";

                            }


                            saveReels(
                                saved
                            );

                        }
                    );

                }
            );


        // =====================================================
        // COMMENTS PANEL
        // =====================================================

        const commentsPanel =
            document.getElementById(
                "commentsPanel"
            );

        const commentsList =
            document.getElementById(
                "commentsList"
            );

        const commentsTotal =
            document.getElementById(
                "commentsTotal"
            );

        const commentInput =
            document.getElementById(
                "commentInput"
            );

        const postComment =
            document.getElementById(
                "postComment"
            );

        const closeComments =
            document.getElementById(
                "closeComments"
            );


        let currentReelId = null;


        // =====================================================
        // UPDATE COMMENT COUNT
        // =====================================================

        function updateCommentCount(
            reel,
            count
        ) {

            const countElement =
                reel.querySelector(
                    ".comment-count"
                );


            if (countElement) {

                countElement.textContent =
                    count;

            }

        }


        // =====================================================
        // DISPLAY COMMENTS
        // =====================================================

        function displayComments(
            reelId
        ) {

            if (!commentsList) {
                return;
            }


            const comments =
                getComments(
                    reelId
                );


            commentsList.innerHTML =
                "";


            if (
                comments.length === 0
            ) {

                commentsList.innerHTML = `
                    <div class="no-comments">
                        No comments yet.
                        Be the first to comment!
                    </div>
                `;

            } else {

                comments.forEach(
                    function (
                        comment
                    ) {

                        const commentItem =
                            document.createElement(
                                "div"
                            );


                        commentItem.className =
                            "comment-item";


                        const avatar =
                            document.createElement(
                                "div"
                            );


                        avatar.className =
                            "comment-avatar";


                        avatar.textContent =
                            "SM";


                        const content =
                            document.createElement(
                                "div"
                            );


                        content.className =
                            "comment-content";


                        const username =
                            document.createElement(
                                "strong"
                            );


                        username.textContent =
                            "@StyleMyHair";


                        const text =
                            document.createElement(
                                "p"
                            );


                        text.textContent =
                            comment;


                        content.appendChild(
                            username
                        );


                        content.appendChild(
                            text
                        );


                        commentItem.appendChild(
                            avatar
                        );


                        commentItem.appendChild(
                            content
                        );


                        commentsList.appendChild(
                            commentItem
                        );

                    }
                );

            }


            if (commentsTotal) {

                commentsTotal.textContent =
                    comments.length;

            }

        }


        // =====================================================
        // OPEN COMMENTS
        // =====================================================

        function openComments(
            reel,
            reelId
        ) {

            currentReelId =
                reelId;


            displayComments(
                reelId
            );


            if (commentsPanel) {

                commentsPanel.classList.add(
                    "show"
                );

            }


            if (commentInput) {

                commentInput.focus();

            }

        }


        document
            .querySelectorAll(
                ".comment-button"
            )
            .forEach(
                function (
                    button,
                    index
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            const reel =
                                button.closest(
                                    ".reel"
                                );


                            const reelId =
                                "reel" +
                                (index + 1);


                            openComments(
                                reel,
                                reelId
                            );

                        }
                    );

                }
            );


        // =====================================================
        // POST COMMENT
        // =====================================================

        if (postComment) {

            postComment.addEventListener(
                "click",
                function () {

                    if (!commentInput) {
                        return;
                    }


                    const text =
                        commentInput.value.trim();


                    if (
                        !text ||
                        !currentReelId
                    ) {
                        return;
                    }


                    const comments =
                        getComments(
                            currentReelId
                        );


                    comments.push(
                        text
                    );


                    saveComments(
                        currentReelId,
                        comments
                    );


                    displayComments(
                        currentReelId
                    );


                    const reelIndex =
                        parseInt(
                            currentReelId.replace(
                                "reel",
                                ""
                            )
                        ) - 1;


                    const reel =
                        reels[reelIndex];


                    if (reel) {

                        updateCommentCount(
                            reel,
                            comments.length
                        );

                    }


                    commentInput.value =
                        "";

                }
            );

        }


        // =====================================================
        // ENTER KEY TO POST
        // =====================================================

        if (commentInput) {

            commentInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        if (postComment) {

                            postComment.click();

                        }

                    }

                }
            );

        }


        // =====================================================
        // CLOSE COMMENTS
        // =====================================================

        if (closeComments) {

            closeComments.addEventListener(
                "click",
                function () {

                    if (commentsPanel) {

                        commentsPanel.classList.remove(
                            "show"
                        );

                    }

                }
            );

        }


        // =====================================================
        // SHARE
        // =====================================================

        document
            .querySelectorAll(
                ".share-button"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        async function () {

                            const url =
                                window.location.href;


                            if (
                                navigator.share
                            ) {

                                try {

                                    await navigator.share({

                                        title:
                                            "StyleMyHair Reels",

                                        text:
                                            "Check out this women's hairstyle!",

                                        url:
                                            url

                                    });

                                } catch (
                                    error
                                ) {

                                    // User cancelled

                                }

                            } else {

                                try {

                                    await navigator.clipboard
                                        .writeText(
                                            url
                                        );


                                    alert(
                                        "Reel link copied!"
                                    );

                                } catch (
                                    error
                                ) {

                                    alert(
                                        "Unable to copy link."
                                    );

                                }

                            }

                        }
                    );

                }
            );


        // =====================================================
        // MUTE / UNMUTE
        // =====================================================

        document
            .querySelectorAll(
                ".mute-button"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const reel =
                                button.closest(
                                    ".reel"
                                );


                            if (!reel) {
                                return;
                            }


                            const video =
                                reel.querySelector(
                                    ".reel-video"
                                );


                            if (!video) {
                                return;
                            }


                            video.muted =
                                !video.muted;


                            button.textContent =
                                video.muted
                                    ? "🔇"
                                    : "🔊";

                        }
                    );

                }
            );


        // =====================================================
        // FOLLOW
        // =====================================================

        document
            .querySelectorAll(
                ".follow-button"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            if (
                                button.textContent.trim()
                                === "Follow"
                            ) {

                                button.textContent =
                                    "Following";

                            } else {

                                button.textContent =
                                    "Follow";

                            }

                        }
                    );

                }
            );


        // =====================================================
        // DOUBLE CLICK TO LIKE
        // =====================================================

        reels.forEach(
            function (reel) {

                reel.addEventListener(
                    "dblclick",
                    function () {

                        const likeButton =
                            reel.querySelector(
                                ".like-button"
                            );


                        const icon =
                            reel.querySelector(
                                ".like-icon"
                            );


                        if (
                            !likeButton ||
                            !icon
                        ) {
                            return;
                        }


                        let liked =
                            getLikedReels();


                        const reelId =
                            "reel" +
                            reel.dataset.reelNumber;


                        if (
                            liked.includes(
                                reelId
                            )
                        ) {
                            return;
                        }


                        liked.push(
                            reelId
                        );


                        saveLikedReels(
                            liked
                        );


                        likeButton.classList.add(
                            "liked"
                        );


                        icon.textContent =
                            "♥";

                    }
                );

            }
        );


        // =====================================================
        // INITIAL COMMENT COUNTS
        // =====================================================

        reels.forEach(
            function (
                reel,
                index
            ) {

                const reelId =
                    "reel" +
                    (index + 1);


                const comments =
                    getComments(
                        reelId
                    );


                updateCommentCount(
                    reel,
                    comments.length
                );

            }
        );


        // =====================================================
        // TAP REEL → PLAY / PAUSE
        // =====================================================

        reelsContainer.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.closest(
                        ".reel-action"
                    ) ||
                    event.target.closest(
                        ".mute-button"
                    )
                ) {
                    return;
                }


                const reel =
                    event.target.closest(
                        ".reel"
                    );


                if (!reel) {
                    return;
                }


                const video =
                    reel.querySelector(
                        ".reel-video"
                    );


                if (!video) {
                    return;
                }


                if (video.paused) {

                    video.play()
                        .catch(
                            function () {}
                        );

                } else {

                    video.pause();

                }

            }
        );

    }
);