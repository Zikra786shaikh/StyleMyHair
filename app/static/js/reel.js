/* =========================================================
   STYLEMYHAIR
   FEMALE REELS JAVASCRIPT
   File: static/js/reel.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const feed = document.getElementById("reelsFeed");
    const reelItems = Array.from(
        document.querySelectorAll(".reel-item")
    );

    const videos = reelItems.map(
        reel => reel.querySelector(".reel-video")
    );

    if (!feed || !reelItems.length) {
        return;
    }


    /* =====================================================
       LOCAL STORAGE KEYS
       FEMALE REELS ONLY
    ===================================================== */

    const SAVED_KEY = "styleMyHairFemaleSavedReels";
    const LIKED_KEY = "styleMyHairLikedReels";
    const COMMENTS_KEY = "styleMyHairReelComments";


    /* =====================================================
       STATE
    ===================================================== */

    let currentIndex = 0;
    let currentCommentReel = null;

    let savedReels = loadArray(SAVED_KEY);
    let likedReels = loadArray(LIKED_KEY);
    let reelComments = loadObject(COMMENTS_KEY);

    let wheelLocked = false;
    let touchStartX = 0;
    let touchStartY = 0;

    let pendingVideoClick = null;


    /* =====================================================
       STORAGE HELPERS
    ===================================================== */

    function loadArray(key) {
        try {
            const data = JSON.parse(
                localStorage.getItem(key)
            );

            return Array.isArray(data) ? data : [];
        } catch (error) {
            return [];
        }
    }


    function loadObject(key) {
        try {
            const data = JSON.parse(
                localStorage.getItem(key)
            );

            return data && typeof data === "object"
                ? data
                : {};
        } catch (error) {
            return {};
        }
    }


    function saveArray(key, data) {
        localStorage.setItem(
            key,
            JSON.stringify(data)
        );
    }


    function saveObject(key, data) {
        localStorage.setItem(
            key,
            JSON.stringify(data)
        );
    }


    /* =====================================================
       REEL ID
    ===================================================== */

    function getReelId(index) {
        const reel = reelItems[index];

        if (!reel) {
            return `reel${index + 1}`;
        }

        return (
            reel.dataset.reelId ||
            `reel${index + 1}`
        );
    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        let toast = document.querySelector(
            ".reel-toast"
        );

        if (!toast) {
            toast = document.createElement("div");

            toast.className = "reel-toast";

            document.body.appendChild(toast);
        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(toast.hideTimer);

        toast.hideTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 1800);
    }


    /* =====================================================
       STOP ALL VIDEOS
       IMPORTANT:
       PREVIOUS REEL MUST STOP COMPLETELY
    ===================================================== */

    function stopAllVideos(resetTime = true) {

        videos.forEach(video => {

            if (!video) {
                return;
            }

            video.pause();

            if (resetTime) {
                try {
                    video.currentTime = 0;
                } catch (error) {
                    // Ignore
                }
            }

            video.muted = true;
        });
    }


    /* =====================================================
       UPDATE PLAY BUTTON
    ===================================================== */

    function updatePlayButton(video) {

        if (!video) {
            return;
        }

        const reel = video.closest(".reel-item");

        if (!reel) {
            return;
        }

        const button = reel.querySelector(
            ".video-play, .play-button"
        );

        if (!button) {
            return;
        }

        if (video.paused) {
            button.textContent = "▶";
            button.setAttribute(
                "aria-label",
                "Play video"
            );
        } else {
            button.textContent = "❚❚";
            button.setAttribute(
                "aria-label",
                "Pause video"
            );
        }
    }


    /* =====================================================
       UPDATE MUTE BUTTON
    ===================================================== */

    function updateMuteButton(video) {

        if (!video) {
            return;
        }

        const reel = video.closest(".reel-item");

        if (!reel) {
            return;
        }

        const button = reel.querySelector(
            ".reel-mute, .mute-button"
        );

        if (!button) {
            return;
        }

        if (video.muted) {
            button.textContent = "🔇";
            button.setAttribute(
                "aria-label",
                "Unmute video"
            );
        } else {
            button.textContent = "🔊";
            button.setAttribute(
                "aria-label",
                "Mute video"
            );
        }
    }


    /* =====================================================
       UPDATE LIKE / SAVE BUTTONS
    ===================================================== */

    function updateButtonStates() {

        reelItems.forEach((reel, index) => {

            const reelId = getReelId(index);

            const likeButton = reel.querySelector(
                ".action-like, .like-button"
            );

            const saveButton = reel.querySelector(
                ".action-save, .save-button"
            );


            /* =================================================
               LIKE BUTTON
            ================================================= */

            if (likeButton) {

                const liked =
                    likedReels.includes(reelId);

                likeButton.classList.toggle(
                    "liked",
                    liked
                );

                likeButton.setAttribute(
                    "aria-pressed",
                    liked ? "true" : "false"
                );

                if (liked) {
                    likeButton.textContent = "❤️";
                } else {
                    likeButton.textContent = "♡";
                }
            }


            /* =================================================
               SAVE BUTTON
            ================================================= */

            if (saveButton) {

                const saved =
                    savedReels.includes(reelId);

                saveButton.classList.toggle(
                    "saved",
                    saved
                );

                saveButton.setAttribute(
                    "aria-pressed",
                    saved ? "true" : "false"
                );

                saveButton.textContent =
                    saved ? "Saved" : "Save";
            }
        });
    }


    /* =====================================================
       PLAY ACTIVE REEL
    ===================================================== */

    async function playActiveReel() {

        stopAllVideos(true);

        const video = videos[currentIndex];

        if (!video) {
            return;
        }

        video.muted = false;

        updateMuteButton(video);

        try {

            await video.play();

        } catch (error) {

            video.muted = true;

            updateMuteButton(video);

            try {
                await video.play();
            } catch (secondError) {
                // User can press play manually.
            }
        }

        updatePlayButton(video);
    }


    /* =====================================================
       SHOW REEL
    ===================================================== */

    function showReel(index, userAction = false) {

        if (!reelItems.length) {
            return;
        }

        if (index < 0) {
            index = 0;
        }

        if (index >= reelItems.length) {
            index = reelItems.length - 1;
        }

        currentIndex = index;

        feed.style.transform =
            `translateY(-${currentIndex * 100}%)`;

        stopAllVideos(true);

        updateButtonStates();

        const reelId = getReelId(currentIndex);

        try {
            history.replaceState(
                null,
                "",
                `#${reelId}`
            );
        } catch (error) {
            // Ignore
        }

        playActiveReel();
    }


    /* =====================================================
       NEXT REEL
    ===================================================== */

    function nextReel() {

        if (
            currentIndex <
            reelItems.length - 1
        ) {
            showReel(
                currentIndex + 1,
                true
            );
        }
    }


    /* =====================================================
       PREVIOUS REEL
    ===================================================== */

    function previousReel() {

        if (currentIndex > 0) {
            showReel(
                currentIndex - 1,
                true
            );
        }
    }


    /* =====================================================
       PLAY / PAUSE
    ===================================================== */

    function togglePlay(video) {

        if (!video) {
            return;
        }

        videos.forEach(otherVideo => {

            if (
                otherVideo &&
                otherVideo !== video
            ) {
                otherVideo.pause();
                otherVideo.muted = true;
            }
        });

        if (video.paused) {

            video.play()
                .then(() => {
                    updatePlayButton(video);
                })
                .catch(() => {

                    video.muted = true;

                    video.play()
                        .then(() => {
                            updatePlayButton(video);
                        })
                        .catch(() => {});
                });

        } else {

            video.pause();

            updatePlayButton(video);
        }
    }


    /* =====================================================
       MUTE / UNMUTE
    ===================================================== */

    function toggleMute(video) {

        if (!video) {
            return;
        }

        video.muted = !video.muted;

        updateMuteButton(video);
    }


    /* =====================================================
       LIKE
    ===================================================== */

    function likeReel(index) {

        const reelId = getReelId(index);

        const existingIndex =
            likedReels.indexOf(reelId);

        if (existingIndex === -1) {

            likedReels.push(reelId);

            showToast("Liked ❤️");

        } else {

            likedReels.splice(
                existingIndex,
                1
            );

            showToast("Like removed");
        }

        saveArray(
            LIKED_KEY,
            likedReels
        );

        updateButtonStates();
    }


    /* =====================================================
       SAVE
    ===================================================== */

    function saveReel(index) {

        const reelId = getReelId(index);

        const existingIndex =
            savedReels.indexOf(reelId);

        if (existingIndex === -1) {

            savedReels.push(reelId);

            showToast("Reel saved 🔖");

        } else {

            savedReels.splice(
                existingIndex,
                1
            );

            showToast("Removed from saved");
        }

        saveArray(
            SAVED_KEY,
            savedReels
        );

        updateButtonStates();
    }


    /* =====================================================
       SHARE
    ===================================================== */

    async function shareReel(index) {

        const reelId =
            getReelId(index);

        const shareUrl =
            `${window.location.origin}${window.location.pathname}#${reelId}`;

        const shareData = {
            title: "StyleMyHair",
            text: "Check out this hairstyle Reel on StyleMyHair.",
            url: shareUrl
        };

        if (
            navigator.share &&
            typeof navigator.share === "function"
        ) {

            try {

                await navigator.share(
                    shareData
                );

                return;

            } catch (error) {

                if (
                    error &&
                    error.name ===
                    "AbortError"
                ) {
                    return;
                }
            }
        }


        /* =================================================
           FALLBACK COPY
        ================================================= */

        try {

            await navigator.clipboard.writeText(
                shareUrl
            );

            showToast(
                "Reel link copied 🔗"
            );

        } catch (error) {

            showToast(
                "Share link ready"
            );
        }
    }


    /* =====================================================
       COMMENTS
    ===================================================== */

    function getComments(reelId) {

        if (
            !Array.isArray(
                reelComments[reelId]
            )
        ) {
            reelComments[reelId] = [];
        }

        return reelComments[reelId];
    }


    function renderComments(reelId) {

        const commentsList =
            document.getElementById(
                "commentsList"
            );

        const commentsTotal =
            document.getElementById(
                "commentsTotal"
            );

        if (!commentsList) {
            return;
        }

        const comments =
            getComments(reelId);

        commentsList.innerHTML = "";

        if (commentsTotal) {
            commentsTotal.textContent =
                comments.length;
        }

        comments.forEach(comment => {

            const item =
                document.createElement("div");

            item.className =
                "comment-item";

            const avatar =
                document.createElement("div");

            avatar.className =
                "comment-avatar";

            avatar.textContent =
                (comment.username || "You")
                    .charAt(0)
                    .toUpperCase();

            const content =
                document.createElement("div");

            content.className =
                "comment-content";

            const username =
                document.createElement("strong");

            username.textContent =
                comment.username ||
                "You";

            const text =
                document.createElement("p");

            text.textContent =
                comment.text || "";

            content.appendChild(
                username
            );

            content.appendChild(
                text
            );

            item.appendChild(
                avatar
            );

            item.appendChild(
                content
            );

            commentsList.appendChild(
                item
            );
        });
    }


    function openComments(index) {

        const modal =
            document.getElementById(
                "commentsModal"
            );

        if (!modal) {
            return;
        }

        currentCommentReel =
            getReelId(index);

        renderComments(
            currentCommentReel
        );

        modal.classList.add("open");

        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";
    }


    function closeComments() {

        const modal =
            document.getElementById(
                "commentsModal"
            );

        if (!modal) {
            return;
        }

        modal.classList.remove("open");

        modal.classList.remove("active");

        document.body.style.overflow =
            "";
    }


    function postComment() {

        const input =
            document.getElementById(
                "commentInput"
            );

        if (
            !input ||
            !currentCommentReel
        ) {
            return;
        }

        const text =
            input.value.trim();

        if (!text) {
            return;
        }

        if (text.length > 300) {

            showToast(
                "Comment is too long"
            );

            return;
        }

        const comments =
            getComments(
                currentCommentReel
            );

        comments.push({
            username: "You",
            text: text,
            time: Date.now()
        });

        saveObject(
            COMMENTS_KEY,
            reelComments
        );

        input.value = "";

        renderComments(
            currentCommentReel
        );

        showToast(
            "Comment posted"
        );
    }


    /* =====================================================
       REEL BUTTON EVENTS
    ===================================================== */

    reelItems.forEach((reel, index) => {

        const video =
            reel.querySelector(
                ".reel-video"
            );

        if (!video) {
            return;
        }


        /* PLAY BUTTON */

        const playButton =
            reel.querySelector(
                ".video-play, .play-button"
            );

        if (playButton) {

            playButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    togglePlay(video);
                }
            );
        }


        /* MUTE BUTTON */

        const muteButton =
            reel.querySelector(
                ".reel-mute, .mute-button"
            );

        if (muteButton) {

            muteButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    toggleMute(video);
                }
            );
        }


        /* LIKE */

        const likeButton =
            reel.querySelector(
                ".action-like, .like-button"
            );

        if (likeButton) {

            likeButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    likeReel(index);
                }
            );
        }


        /* COMMENT */

        const commentButton =
            reel.querySelector(
                ".action-comment, .comment-button"
            );

        if (commentButton) {

            commentButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    openComments(index);
                }
            );
        }


        /* SHARE */

        const shareButton =
            reel.querySelector(
                ".action-share, .share-button"
            );

        if (shareButton) {

            shareButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    shareReel(index);
                }
            );
        }


        /* SAVE */

        const saveButton =
            reel.querySelector(
                ".action-save, .save-button"
            );

        if (saveButton) {

            saveButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    saveReel(index);
                }
            );
        }


        /* VIDEO CLICK */

        video.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                if (pendingVideoClick) {
                    clearTimeout(
                        pendingVideoClick
                    );
                }

                pendingVideoClick =
                    setTimeout(() => {

                        togglePlay(video);

                        pendingVideoClick =
                            null;

                    }, 220);
            }
        );


        /* DOUBLE CLICK / DOUBLE TAP LIKE */

        video.addEventListener(
            "dblclick",
            event => {

                event.preventDefault();

                if (pendingVideoClick) {
                    clearTimeout(
                        pendingVideoClick
                    );

                    pendingVideoClick =
                        null;
                }

                likeReel(index);
            }
        );


        /* VIDEO EVENTS */

        video.addEventListener(
            "play",
            () => {

                videos.forEach(
                    otherVideo => {

                        if (
                            otherVideo &&
                            otherVideo !== video
                        ) {
                            otherVideo.pause();

                            otherVideo.muted =
                                true;
                        }
                    }
                );

                updatePlayButton(video);
            }
        );


        video.addEventListener(
            "pause",
            () => {
                updatePlayButton(video);
            }
        );


        video.addEventListener(
            "volumechange",
            () => {
                updateMuteButton(video);
            }
        );


        /* AUTO NEXT WHEN VIDEO ENDS */

        video.addEventListener(
            "ended",
            () => {

                if (
                    index <
                    reelItems.length - 1
                ) {
                    nextReel();
                }
            }
        );
    });


    /* =====================================================
       KEYBOARD NAVIGATION
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const tag =
                document.activeElement?.tagName;

            if (
                tag === "INPUT" ||
                tag === "TEXTAREA"
            ) {
                return;
            }


            if (event.key === "ArrowDown") {

                event.preventDefault();

                nextReel();
            }


            if (event.key === "ArrowUp") {

                event.preventDefault();

                previousReel();
            }


            if (
                event.key === " " ||
                event.key === "Spacebar"
            ) {

                event.preventDefault();

                togglePlay(
                    videos[currentIndex]
                );
            }


            if (
                event.key === "m" ||
                event.key === "M"
            ) {

                toggleMute(
                    videos[currentIndex]
                );
            }


            if (event.key === "Escape") {
                closeComments();
            }
        }
    );


    /* =====================================================
       MOUSE WHEEL
    ===================================================== */

    document.addEventListener(
        "wheel",
        event => {

            if (wheelLocked) {
                return;
            }

            const modal =
                document.getElementById(
                    "commentsModal"
                );

            if (
                modal &&
                (
                    modal.classList.contains(
                        "open"
                    ) ||
                    modal.classList.contains(
                        "active"
                    )
                )
            ) {
                return;
            }

            if (
                Math.abs(event.deltaY) < 25
            ) {
                return;
            }

            wheelLocked = true;

            if (event.deltaY > 0) {
                nextReel();
            } else {
                previousReel();
            }

            setTimeout(() => {
                wheelLocked = false;
            }, 500);
        },
        {
            passive: true
        }
    );


    /* =====================================================
       TOUCH SWIPE
    ===================================================== */

    feed.addEventListener(
        "touchstart",
        event => {

            const touch =
                event.changedTouches[0];

            touchStartX =
                touch.clientX;

            touchStartY =
                touch.clientY;
        },
        {
            passive: true
        }
    );


    feed.addEventListener(
        "touchend",
        event => {

            const touch =
                event.changedTouches[0];

            const diffX =
                touch.clientX -
                touchStartX;

            const diffY =
                touch.clientY -
                touchStartY;

            if (
                Math.abs(diffY) <
                Math.abs(diffX)
            ) {
                return;
            }

            if (Math.abs(diffY) < 50) {
                return;
            }

            if (diffY < 0) {
                nextReel();
            } else {
                previousReel();
            }
        },
        {
            passive: true
        }
    );


    /* =====================================================
       COMMENTS BUTTONS
    ===================================================== */

    const closeCommentsButton =
        document.getElementById(
            "closeComments"
        );

    if (closeCommentsButton) {

        closeCommentsButton.addEventListener(
            "click",
            closeComments
        );
    }


    const postCommentButton =
        document.getElementById(
            "postComment"
        );

    if (postCommentButton) {

        postCommentButton.addEventListener(
            "click",
            postComment
        );
    }


    const commentInput =
        document.getElementById(
            "commentInput"
        );

    if (commentInput) {

        commentInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    postComment();
                }
            }
        );
    }


    const commentsModal =
        document.getElementById(
            "commentsModal"
        );

    if (commentsModal) {

        commentsModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    commentsModal
                ) {
                    closeComments();
                }
            }
        );
    }


    /* =====================================================
       VISIBILITY CHANGE
       STOP SOUND WHEN USER LEAVES TAB
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                videos.forEach(video => {

                    if (video) {
                        video.pause();
                    }
                });

            } else {

                const activeVideo =
                    videos[currentIndex];

                if (
                    activeVideo &&
                    activeVideo.paused
                ) {

                    activeVideo.play()
                        .catch(() => {
                            activeVideo.muted = true;

                            activeVideo.play()
                                .catch(() => {});
                        });
                }
            }
        }
    );


    /* =====================================================
       HASH / SAVED REEL SUPPORT
    ===================================================== */

    function getIndexFromHash() {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim();

        if (!hash) {
            return 0;
        }

        const index =
            reelItems.findIndex(
                reel =>
                    getReelId(
                        reelItems.indexOf(reel)
                    ) === hash
            );

        return index >= 0
            ? index
            : 0;
    }


    /* =====================================================
       INITIALISE
    ===================================================== */

    updateButtonStates();

    currentIndex =
        getIndexFromHash();

    showReel(
        currentIndex,
        false
    );

});