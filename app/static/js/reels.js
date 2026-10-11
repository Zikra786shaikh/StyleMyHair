document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // =========================================================
    // STYLEMYHAIR - MALE REELS
    // =========================================================

    const reels = Array.from(document.querySelectorAll(".reel-item"));
    const reelsFeed = document.getElementById("reelsFeed");
    const reelsPage = document.querySelector(".reels-page");

    if (!reels.length || !reelsFeed || !reelsPage) {
        return;
    }

    // =========================================================
    // STORAGE
    // =========================================================

    const SAVED_KEY = "styleMyHairSavedReels";
    const LIKED_KEY = "styleMyHairLikedReels";
    const COMMENTS_KEY = "styleMyHairReelComments";

    let savedReels = JSON.parse(
        localStorage.getItem(SAVED_KEY) || "[]"
    );

    let likedReels = JSON.parse(
        localStorage.getItem(LIKED_KEY) || "[]"
    );

    let commentsData = JSON.parse(
        localStorage.getItem(COMMENTS_KEY) || "{}"
    );

    // =========================================================
    // CURRENT REEL
    // =========================================================

    let currentIndex = 0;
    let currentCommentReel = null;

    let wheelLocked = false;
    let touchStartY = 0;
    let touchStartX = 0;

    // =========================================================
    // STORAGE
    // =========================================================

    function saveStorage() {
        localStorage.setItem(
            SAVED_KEY,
            JSON.stringify(savedReels)
        );

        localStorage.setItem(
            LIKED_KEY,
            JSON.stringify(likedReels)
        );

        localStorage.setItem(
            COMMENTS_KEY,
            JSON.stringify(commentsData)
        );
    }

    // =========================================================
    // TOAST
    // =========================================================

    function showToast(message) {

        let toast = document.getElementById("reelToast");

        if (!toast) {

            toast = document.createElement("div");

            toast.id = "reelToast";

            toast.style.position = "fixed";
            toast.style.left = "50%";
            toast.style.bottom = "35px";
            toast.style.transform = "translateX(-50%)";
            toast.style.background = "rgba(0,0,0,0.85)";
            toast.style.color = "#fff";
            toast.style.padding = "10px 18px";
            toast.style.borderRadius = "20px";
            toast.style.fontSize = "14px";
            toast.style.zIndex = "99999";
            toast.style.pointerEvents = "none";

            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.display = "block";

        clearTimeout(toast.timer);

        toast.timer = setTimeout(() => {
            toast.style.display = "none";
        }, 1500);
    }

    // =========================================================
    // REEL ID
    // =========================================================

    function getReelId(reel) {
        return reel.dataset.reelId || reel.id;
    }

    // =========================================================
    // BUTTON STATES
    // =========================================================

    function updateButtonStates(reel) {

        const reelId = getReelId(reel);

        const likeButton =
            reel.querySelector(".like-button");

        const saveButton =
            reel.querySelector(".save-button");

        // LIKE
        if (likeButton) {

            const icon =
                likeButton.querySelector(".action-icon");

            const text =
                likeButton.querySelector("small");

            if (likedReels.includes(reelId)) {

                if (icon) {
                    icon.textContent = "♥";
                }

                if (text) {
                    text.textContent = "Liked";
                }

                likeButton.classList.add("active");

            } else {

                if (icon) {
                    icon.textContent = "♡";
                }

                if (text) {
                    text.textContent = "Like";
                }

                likeButton.classList.remove("active");
            }
        }

        // SAVE
        if (saveButton) {

            const icon =
                saveButton.querySelector(".action-icon");

            const text =
                saveButton.querySelector("small");

            if (savedReels.includes(reelId)) {

                if (icon) {
                    icon.textContent = "🔖";
                }

                if (text) {
                    text.textContent = "Saved";
                }

                saveButton.classList.add("active");

            } else {

                if (icon) {
                    icon.textContent = "🔖";
                }

                if (text) {
                    text.textContent = "Save";
                }

                saveButton.classList.remove("active");
            }
        }
    }

    reels.forEach(reel => {
        updateButtonStates(reel);
    });

    // =========================================================
    // UPDATE MUTE BUTTON
    // =========================================================

    function updateMuteButton(reel) {

        const video =
            reel.querySelector(".reel-video");

        const muteButton =
            reel.querySelector(".reel-mute");

        if (!video || !muteButton) {
            return;
        }

        if (video.muted) {

            muteButton.textContent = "🔇";

            muteButton.setAttribute(
                "aria-label",
                "Unmute"
            );

        } else {

            muteButton.textContent = "🔊";

            muteButton.setAttribute(
                "aria-label",
                "Mute"
            );
        }
    }

    // =========================================================
    // STOP EVERY REEL EXCEPT ACTIVE ONE
    // =========================================================

    function stopOtherReels(activeIndex) {

        reels.forEach((reel, index) => {

            if (index === activeIndex) {
                return;
            }

            const video =
                reel.querySelector(".reel-video");

            if (!video) {
                return;
            }

            video.pause();

            video.muted = true;

            video.currentTime = 0;

            updateMuteButton(reel);
        });
    }

    // =========================================================
    // PLAY ACTIVE REEL
    // =========================================================

    function playActiveReel(userAction = false) {

        const reel = reels[currentIndex];

        if (!reel) {
            return;
        }

        const video =
            reel.querySelector(".reel-video");

        if (!video) {
            return;
        }

        // VERY IMPORTANT:
        // Stop all other reels first.
        stopOtherReels(currentIndex);

        /*
         * Try to play the active reel WITH SOUND.
         *
         * Browser autoplay rules may block sound on
         * the first page load.
         */

        video.muted = false;

        const playPromise = video.play();

        if (playPromise !== undefined) {

            playPromise.catch(() => {

                /*
                 * If browser blocks autoplay with sound,
                 * play muted instead.
                 */

                video.muted = true;

                video.play().catch(() => {});
            });
        }

        updateMuteButton(reel);
    }

    // =========================================================
    // SHOW REEL
    // =========================================================

    function showReel(index, userAction = false) {

        if (index < 0) {
            index = 0;
        }

        if (index >= reels.length) {
            index = reels.length - 1;
        }

        currentIndex = index;

        // Move feed
        reelsFeed.style.transform =
            `translateY(-${currentIndex * 100}%)`;

        // Stop every other video immediately
        stopOtherReels(currentIndex);

        // Play selected reel
        playActiveReel(userAction);
    }

    // =========================================================
    // NEXT REEL
    // =========================================================

    function nextReel() {

        if (currentIndex >= reels.length - 1) {
            return;
        }

        showReel(
            currentIndex + 1,
            true
        );
    }

    // =========================================================
    // PREVIOUS REEL
    // =========================================================

    function previousReel() {

        if (currentIndex <= 0) {
            return;
        }

        showReel(
            currentIndex - 1,
            true
        );
    }

    // =========================================================
    // WHEEL SCROLL
    // =========================================================

    reelsPage.addEventListener(
        "wheel",
        event => {

            event.preventDefault();

            if (wheelLocked) {
                return;
            }

            wheelLocked = true;

            if (event.deltaY > 0) {
                nextReel();
            } else if (event.deltaY < 0) {
                previousReel();
            }

            setTimeout(() => {
                wheelLocked = false;
            }, 650);
        },
        { passive: false }
    );

    // =========================================================
    // TOUCH SWIPE
    // =========================================================

    reelsPage.addEventListener(
        "touchstart",
        event => {

            if (!event.touches.length) {
                return;
            }

            touchStartY =
                event.touches[0].clientY;

            touchStartX =
                event.touches[0].clientX;
        },
        { passive: true }
    );

    reelsPage.addEventListener(
        "touchend",
        event => {

            if (!event.changedTouches.length) {
                return;
            }

            const endY =
                event.changedTouches[0].clientY;

            const endX =
                event.changedTouches[0].clientX;

            const differenceY =
                touchStartY - endY;

            const differenceX =
                touchStartX - endX;

            // Ignore mostly-horizontal movement
            if (
                Math.abs(differenceX) >
                Math.abs(differenceY)
            ) {
                return;
            }

            // Minimum swipe distance
            if (Math.abs(differenceY) < 50) {
                return;
            }

            if (differenceY > 0) {
                nextReel();
            } else {
                previousReel();
            }
        },
        { passive: true }
    );

    // =========================================================
    // KEYBOARD
    // =========================================================

    document.addEventListener(
        "keydown",
        event => {

            const tag =
                event.target.tagName.toLowerCase();

            if (
                tag === "input" ||
                tag === "textarea" ||
                tag === "select"
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
        }
    );

    // =========================================================
    // CLICK VIDEO = PLAY / PAUSE
    // =========================================================

    reels.forEach(reel => {

        const video =
            reel.querySelector(".reel-video");

        if (!video) {
            return;
        }

        video.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                // Only active reel can be controlled
                if (
                    reels[currentIndex] !== reel
                ) {
                    return;
                }

                if (video.paused) {

                    video.muted = false;

                    video.play().catch(() => {

                        video.muted = true;

                        video.play().catch(() => {});
                    });

                } else {

                    video.pause();
                }

                updateMuteButton(reel);
            }
        );

        // If video somehow starts playing while
        // it is not the active reel, immediately stop it.
        video.addEventListener(
            "play",
            () => {

                if (
                    reels[currentIndex] !== reel
                ) {

                    video.pause();

                    video.muted = true;

                    video.currentTime = 0;
                }
            }
        );

        video.addEventListener(
            "volumechange",
            () => {
                updateMuteButton(reel);
            }
        );
    });

    // =========================================================
    // MUTE BUTTON
    // =========================================================

    reels.forEach(reel => {

        const muteButton =
            reel.querySelector(".reel-mute");

        const video =
            reel.querySelector(".reel-video");

        if (!muteButton || !video) {
            return;
        }

        muteButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                if (
                    reels[currentIndex] !== reel
                ) {
                    return;
                }

                video.muted = !video.muted;

                if (!video.paused) {
                    video.play().catch(() => {});
                }

                updateMuteButton(reel);
            }
        );

        updateMuteButton(reel);
    });

    // =========================================================
    // LIKE
    // =========================================================

    function handleLike(reel) {

        const reelId =
            getReelId(reel);

        if (likedReels.includes(reelId)) {

            likedReels =
                likedReels.filter(
                    id => id !== reelId
                );

            showToast("Removed Like");

        } else {

            likedReels.push(reelId);

            showToast("Liked ❤️");
        }

        saveStorage();

        updateButtonStates(reel);
    }

    reels.forEach(reel => {

        const likeButton =
            reel.querySelector(".like-button");

        if (!likeButton) {
            return;
        }

        likeButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                handleLike(reel);
            }
        );
    });

    // =========================================================
    // DOUBLE CLICK LIKE
    // =========================================================

    reels.forEach(reel => {

        const video =
            reel.querySelector(".reel-video");

        if (!video) {
            return;
        }

        let lastTap = 0;

        video.addEventListener(
            "dblclick",
            event => {

                event.preventDefault();

                handleLike(reel);

                showHeartAnimation(reel);
            }
        );

        video.addEventListener(
            "touchend",
            () => {

                const now =
                    Date.now();

                if (
                    now - lastTap < 350
                ) {

                    handleLike(reel);

                    showHeartAnimation(reel);
                }

                lastTap = now;
            }
        );
    });

    // =========================================================
    // HEART ANIMATION
    // =========================================================

    function showHeartAnimation(reel) {

        const heart =
            document.createElement("div");

        heart.textContent = "♥";

        heart.style.position = "absolute";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.transform =
            "translate(-50%, -50%) scale(0.5)";
        heart.style.fontSize = "100px";
        heart.style.color = "white";
        heart.style.zIndex = "50";
        heart.style.pointerEvents = "none";

        heart.style.textShadow =
            "0 4px 20px rgba(0,0,0,0.5)";

        heart.style.transition =
            "transform 0.35s ease, opacity 0.35s ease";

        const container =
            reel.querySelector(
                ".reel-video-container"
            );

        if (!container) {
            return;
        }

        container.appendChild(heart);

        requestAnimationFrame(() => {

            heart.style.transform =
                "translate(-50%, -50%) scale(1.2)";
        });

        setTimeout(() => {

            heart.style.opacity = "0";

            heart.style.transform =
                "translate(-50%, -50%) scale(1.5)";

        }, 300);

        setTimeout(() => {

            heart.remove();

        }, 650);
    }

    // =========================================================
    // SAVE
    // =========================================================

    function handleSave(reel) {

        const reelId =
            getReelId(reel);

        if (savedReels.includes(reelId)) {

            savedReels =
                savedReels.filter(
                    id => id !== reelId
                );

            showToast(
                "Removed from Saved"
            );

        } else {

            savedReels.push(reelId);

            showToast(
                "Reel Saved 🔖"
            );
        }

        saveStorage();

        updateButtonStates(reel);
    }

    reels.forEach(reel => {

        const saveButton =
            reel.querySelector(".save-button");

        if (!saveButton) {
            return;
        }

        saveButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                handleSave(reel);
            }
        );
    });

    // =========================================================
    // SHARE
    // =========================================================

    function shareReel(reel) {

        const reelId =
            getReelId(reel);

        const shareData = {

            title: "StyleMyHair",

            text:
                "Check out this hairstyle Reel on StyleMyHair!",

            url:
                window.location.href +
                "#" +
                reelId
        };

        if (navigator.share) {

            navigator
                .share(shareData)
                .catch(() => {});

        } else {

            const shareUrl =
                shareData.url;

            if (navigator.clipboard) {

                navigator.clipboard
                    .writeText(shareUrl)
                    .then(() => {
                        showToast("Link copied!");
                    })
                    .catch(() => {
                        showToast(
                            "Unable to copy link"
                        );
                    });

            } else {

                showToast(
                    "Sharing is not available"
                );
            }
        }
    }

    reels.forEach(reel => {

        const shareButton =
            reel.querySelector(".share-button");

        if (!shareButton) {
            return;
        }

        shareButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                shareReel(reel);
            }
        );
    });

    // =========================================================
    // COMMENTS
    // =========================================================

    const commentModal =
        document.getElementById(
            "commentModal"
        );

    const commentClose =
        document.getElementById(
            "commentClose"
        );

    const commentsList =
        document.getElementById(
            "commentsList"
        );

    const commentInput =
        document.getElementById(
            "commentInput"
        );

    const commentSubmit =
        document.getElementById(
            "commentSubmit"
        );

    // =========================================================
    // RENDER COMMENTS
    // =========================================================

    function renderComments(reelId) {

        if (!commentsList) {
            return;
        }

        commentsList.innerHTML = "";

        const comments =
            commentsData[reelId] || [];

        if (!comments.length) {

            const empty =
                document.createElement("p");

            empty.className =
                "no-comments";

            empty.textContent =
                "No comments yet. Be the first!";

            commentsList.appendChild(
                empty
            );

            return;
        }

        comments.forEach(comment => {

            const commentItem =
                document.createElement("div");

            commentItem.className =
                "comment-item";

            const username =
                document.createElement("strong");

            username.textContent =
                comment.username ||
                "StyleMyHair User";

            const text =
                document.createElement("p");

            text.textContent =
                comment.text || "";

            commentItem.appendChild(
                username
            );

            commentItem.appendChild(
                text
            );

            commentsList.appendChild(
                commentItem
            );
        });
    }

    // =========================================================
    // OPEN COMMENTS
    // =========================================================

    function openComments(reel) {

        if (!commentModal) {
            return;
        }

        currentCommentReel =
            getReelId(reel);

        renderComments(
            currentCommentReel
        );

        commentModal.classList.add(
            "active"
        );

        if (commentInput) {

            commentInput.value = "";

            setTimeout(() => {
                commentInput.focus();
            }, 100);
        }
    }

    // =========================================================
    // CLOSE COMMENTS
    // =========================================================

    function closeComments() {

        if (!commentModal) {
            return;
        }

        commentModal.classList.remove(
            "active"
        );

        currentCommentReel = null;
    }

    // =========================================================
    // COMMENT BUTTON
    // =========================================================

    reels.forEach(reel => {

        const commentButton =
            reel.querySelector(
                ".comment-button"
            );

        if (!commentButton) {
            return;
        }

        commentButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                openComments(reel);
            }
        );
    });

    // =========================================================
    // CLOSE COMMENT
    // =========================================================

    if (commentClose) {

        commentClose.addEventListener(
            "click",
            closeComments
        );
    }

    // =========================================================
    // CLICK OUTSIDE
    // =========================================================

    if (commentModal) {

        commentModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    commentModal
                ) {

                    closeComments();
                }
            }
        );
    }

    // =========================================================
    // ADD COMMENT
    // =========================================================

    function addComment() {

        if (
            !currentCommentReel ||
            !commentInput
        ) {
            return;
        }

        const text =
            commentInput.value.trim();

        if (!text) {
            return;
        }

        if (text.length > 300) {

            showToast(
                "Comment is too long"
            );

            return;
        }

        if (
            !commentsData[
                currentCommentReel
            ]
        ) {

            commentsData[
                currentCommentReel
            ] = [];
        }

        commentsData[
            currentCommentReel
        ].push({

            username:
                "StyleMyHair User",

            text:
                text,

            time:
                Date.now()
        });

        saveStorage();

        renderComments(
            currentCommentReel
        );

        commentInput.value = "";

        showToast(
            "Comment added"
        );
    }

    if (commentSubmit) {

        commentSubmit.addEventListener(
            "click",
            addComment
        );
    }

    if (commentInput) {

        commentInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    addComment();
                }
            }
        );
    }

    // =========================================================
    // ESCAPE
    // =========================================================

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeComments();
            }
        }
    );

    // =========================================================
    // INITIAL REEL
    // =========================================================

    reelsFeed.style.transform =
        "translateY(0%)";

    currentIndex = 0;

    // Start Reel 1
    playActiveReel(false);

});
/* =====================================================
   DARK / LIGHT MODE TOGGLE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const modeToggle = document.getElementById("modeToggle");
    const modeText = document.getElementById("modeText");
    const modeIcon = document.querySelector(".mode-icon");

    if (!modeToggle) {
        console.log("Dark Mode button not found");
        return;
    }

    /* Load saved theme */

    const savedTheme =
        localStorage.getItem("stylemyhair-reel-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        modeText.textContent = "Light Mode";
        modeIcon.textContent = "☀️";

    } else {

        document.body.classList.remove("dark-mode");

        modeText.textContent = "Dark Mode";
        modeIcon.textContent = "🌙";
    }


    /* Button click */

    modeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const darkMode =
            document.body.classList.contains("dark-mode");


        if (darkMode) {

            localStorage.setItem(
                "stylemyhair-reel-theme",
                "dark"
            );

            modeText.textContent = "Light Mode";
            modeIcon.textContent = "☀️";

        } else {

            localStorage.setItem(
                "stylemyhair-reel-theme",
                "light"
            );

            modeText.textContent = "Dark Mode";
            modeIcon.textContent = "🌙";
        }

    });

});