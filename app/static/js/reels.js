
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    console.log("MALE REELS JS IS WORKING");

    // =====================================================
    // SETTINGS
    // =====================================================

    const reelsContainer = document.getElementById("reelsContainer");
    const TOTAL_VIDEOS = 20;
    const BATCH_SIZE = 20;

    if (!reelsContainer) {
        console.error("reelsContainer not found");
        return;
    }

    // =====================================================
    // MALE HAIRSTYLE REEL DATA
    // =====================================================

    const hairstyles = [
        {
            title: "Classic Taper Fade",
            description: "A clean and timeless taper fade that gives you a sharp, polished and effortlessly stylish look.",
            tags: "#TaperFade #MensHair #StyleMyHair"
        },
        {
            title: "Textured Crop",
            description: "Add texture and volume with this modern crop. Perfect for a trendy and low-maintenance hairstyle.",
            tags: "#TexturedCrop #MensStyle #HairInspiration"
        },
        {
            title: "Modern Pompadour",
            description: "A voluminous pompadour that brings a bold, confident and sophisticated touch to your appearance.",
            tags: "#Pompadour #MensHairstyle #StyleMyHair"
        },
        {
            title: "Low Fade",
            description: "Keep it fresh with a subtle low fade that blends smoothly and looks great on different hair types.",
            tags: "#LowFade #FreshCut #MensHair"
        },
        {
            title: "Messy Quiff",
            description: "Create a relaxed, textured look with a messy quiff that adds movement and natural volume.",
            tags: "#MessyQuiff #QuiffStyle #HairGoals"
        },
        {
            title: "Slick Back",
            description: "Go for a sleek and confident appearance with this classic slick-back hairstyle.",
            tags: "#SlickBack #ClassicMensHair #StyleMyHair"
        },
        {
            title: "Buzz Cut",
            description: "Simple, bold and easy to maintain. The buzz cut is a great choice for a sharp, minimal look.",
            tags: "#BuzzCut #ShortHair #MensGrooming"
        },
        {
            title: "Mid Fade with Texture",
            description: "Combine a modern mid fade with textured hair on top for a balanced and fashionable finish.",
            tags: "#MidFade #TexturedHair #MensStyle"
        },
        {
            title: "Curly Top Fade",
            description: "Show off your natural curls with a clean fade on the sides and defined curls on top.",
            tags: "#CurlyHair #CurlyFade #MensHairstyle"
        },
        {
            title: "French Crop",
            description: "A stylish French crop with a neat fringe and short sides for an effortless everyday look.",
            tags: "#FrenchCrop #MensHaircut #StyleMyHair"
        },
        {
            title: "Undercut",
            description: "Make a statement with a bold undercut that contrasts short sides with longer hair on top.",
            tags: "#Undercut #MensFashion #HairInspiration"
        },
        {
            title: "Side Part",
            description: "A refined side part that delivers a clean and professional look for work or special occasions.",
            tags: "#SidePart #FormalHair #MensStyle"
        },
        {
            title: "High Fade",
            description: "Get a bold and modern finish with a high fade and a stylish top that stands out.",
            tags: "#HighFade #FadeHaircut #MensHair"
        },
        {
            title: "Bro Flow",
            description: "Let your medium-length hair flow naturally for a relaxed, effortless and casual appearance.",
            tags: "#BroFlow #MediumHair #MensHairstyle"
        },
        {
            title: "Spiky Hair",
            description: "Add personality to your look with textured spikes and a modern finish.",
            tags: "#SpikyHair #MensHaircut #HairTrends"
        },
        {
            title: "Crew Cut",
            description: "A versatile crew cut that combines simplicity, comfort and a sharp masculine style.",
            tags: "#CrewCut #ShortMensHair #StyleMyHair"
        },
        {
            title: "Wolf Cut for Men",
            description: "Try a layered men's wolf cut for extra movement, texture and a bold modern look.",
            tags: "#MensWolfCut #LayeredHair #HairTrends"
        },
        {
            title: "Burst Fade",
            description: "A distinctive burst fade that curves around the ears and adds a unique touch to your haircut.",
            tags: "#BurstFade #ModernFade #MensStyle"
        },
        {
            title: "Long Wavy Hair",
            description: "Embrace natural waves and longer locks for a relaxed hairstyle full of texture and character.",
            tags: "#LongHairMen #WavyHair #HairInspiration"
        },
        {
            title: "Modern Mullet",
            description: "Bring a daring edge to your look with a modern mullet featuring texture and stylish layers.",
            tags: "#ModernMullet #MensHair #StyleMyHair"
        }
    ];

    // =====================================================
    // STORAGE
    // =====================================================

    const LIKED_KEY = "stylemyhair-male-liked-reels";
    const SAVED_KEY = "stylemyhair-male-saved-reels";
    const COMMENTS_KEY = "stylemyhair-male-comments-";

    function readStorage(key, fallback = []) {
        try {
            return JSON.parse(localStorage.getItem(key)) ?? fallback;
        } catch (error) {
            return fallback;
        }
    }

    function getLikedReels() {
        return readStorage(LIKED_KEY);
    }

    function getSavedReels() {
        return readStorage(SAVED_KEY);
    }

    function getComments(reelNumber) {
        return readStorage(COMMENTS_KEY + reelNumber);
    }

    function getReelTitle(reelNumber) {
        return hairstyles[reelNumber - 1].title;
    }

    // =====================================================
    // CREATE A REEL
    // =====================================================

    let reelInstance = 0;

    function createReel(reelNumber) {
        const data = hairstyles[reelNumber - 1];
        const reel = document.createElement("article");

        reel.className = "reel";
        reel.dataset.reelNumber = reelNumber;
        reel.dataset.reelId = "reel" + reelNumber;
        reel.dataset.instance = reelInstance++;

        const liked = getLikedReels().includes(reelNumber);
        const saved = getSavedReels().includes(reelNumber);
        const comments = getComments(reelNumber);

        reel.innerHTML = `
            <video
                class="reel-video"
                src="/static/reels/reel${reelNumber}.mp4"
                loop
                playsinline
                muted
                preload="metadata"
            ></video>

            <div class="video-overlay"></div>

            <button type="button" class="mute-button">
                🔇
            </button>

            <div class="reel-actions">

                <button type="button"
                    class="reel-action like-button ${liked ? "liked" : ""}">
                    <span class="like-icon">${liked ? "♥" : "♡"}</span>
                    <small>Like</small>
                </button>

                <button type="button"
                    class="reel-action comment-button">
                    <span>💬</span>
                    <small>
                        <span class="comment-count">${comments.length}</span>
                        Comments
                    </small>
                </button>

                <button type="button"
                    class="reel-action share-button">
                    <span>↗</span>
                    <small>Share</small>
                </button>

                <button type="button"
                    class="reel-action save-button ${saved ? "saved" : ""}">
                    <span>🔖</span>
                    <small>${saved ? "Saved" : "Save"}</small>
                </button>

            </div>

            <div class="reel-info">

                <div class="creator-row">
                    <div class="creator-avatar">SM</div>
                    <strong>@StyleMyHair</strong>
                    <button type="button" class="follow-button">
                        Follow
                    </button>
                </div>

                <h2>${data.title}</h2>

                <p>${data.description}</p>

                <span class="hashtags">${data.tags}</span>

            </div>
        `;

        return reel;
    }

    // =====================================================
    // ADD REELS IN A LOOP
    // =====================================================

    function appendReelBatch() {
        const fragment = document.createDocumentFragment();

        for (let i = 1; i <= BATCH_SIZE; i++) {
            const reelNumber = ((reelInstance) % TOTAL_VIDEOS) + 1;
            fragment.appendChild(createReel(reelNumber));
        }

        reelsContainer.appendChild(fragment);

        observeReels();
    }

    // =====================================================
    // AUTOPLAY AND INFINITE SCROLL
    // =====================================================

    const observedReels = new WeakSet();
    let isAppending = false;

    const videoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            const reel = entry.target;
            const video = reel.querySelector(".reel-video");

            if (!video) return;

            if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
                video.play().catch(function () {});

                // Append another batch as the user reaches the end.
                if (
                    reel === reelsContainer.lastElementChild &&
                    !isAppending
                ) {
                    isAppending = true;
                    appendReelBatch();
                    isAppending = false;
                }
            } else {
                video.pause();
            }
        });
    }, {
        threshold: [0, 0.7]
    });

    function observeReels() {
        reelsContainer.querySelectorAll(".reel").forEach(function (reel) {
            if (!observedReels.has(reel)) {
                videoObserver.observe(reel);
                observedReels.add(reel);
            }
        });
    }

    // =====================================================
    // INITIAL REELS
    // =====================================================

    appendReelBatch();

    // =====================================================
    // LIKE / SAVE / COMMENTS / SHARE / MUTE / FOLLOW
    // EVENT DELEGATION
    // =====================================================

    let currentReelNumber = null;

    const commentsPanel = document.getElementById("commentsPanel");
    const commentsList = document.getElementById("commentsList");
    const commentsTotal = document.getElementById("commentsTotal");
    const commentInput = document.getElementById("commentInput");
    const postComment = document.getElementById("postComment");
    const closeComments = document.getElementById("closeComments");

    function updateAllCommentCounts(reelNumber) {
        const count = getComments(reelNumber).length;

        reelsContainer.querySelectorAll(".reel").forEach(function (reel) {
            if (Number(reel.dataset.reelNumber) === reelNumber) {
                const counter = reel.querySelector(".comment-count");
                if (counter) counter.textContent = count;
            }
        });
    }

    function updateLikeButtons(reelNumber, isLiked) {
        reelsContainer.querySelectorAll(".reel").forEach(function (reel) {
            if (Number(reel.dataset.reelNumber) === reelNumber) {
                const button = reel.querySelector(".like-button");
                const icon = reel.querySelector(".like-icon");

                if (button && icon) {
                    button.classList.toggle("liked", isLiked);
                    icon.textContent = isLiked ? "♥" : "♡";
                }
            }
        });
    }

    function updateSaveButtons(reelNumber, isSaved) {
        reelsContainer.querySelectorAll(".reel").forEach(function (reel) {
            if (Number(reel.dataset.reelNumber) === reelNumber) {
                const button = reel.querySelector(".save-button");
                const label = button?.querySelector("small");

                if (button && label) {
                    button.classList.toggle("saved", isSaved);
                    label.textContent = isSaved ? "Saved" : "Save";
                }
            }
        });
    }

    function displayComments(reelNumber) {
        if (!commentsList) return;

        const comments = getComments(reelNumber);
        commentsList.innerHTML = "";

        if (comments.length === 0) {
            commentsList.innerHTML = `
                <div class="no-comments">
                    No comments yet. Be the first to comment!
                </div>
            `;
        } else {
            comments.forEach(function (comment) {
                const item = document.createElement("div");
                item.className = "comment-item";

                const avatar = document.createElement("div");
                avatar.className = "comment-avatar";
                avatar.textContent = "SM";

                const content = document.createElement("div");
                content.className = "comment-content";

                const username = document.createElement("strong");
                username.textContent = "@StyleMyHair";

                const text = document.createElement("p");
                text.textContent = comment;

                content.append(username, text);
                item.append(avatar, content);
                commentsList.appendChild(item);
            });
        }

        if (commentsTotal) {
            commentsTotal.textContent = comments.length;
        }
    }

    function openComments(reelNumber) {
        currentReelNumber = reelNumber;
        displayComments(reelNumber);

        commentsPanel?.classList.add("show");
        commentInput?.focus();
    }

    reelsContainer.addEventListener("click", async function (event) {
        const reel = event.target.closest(".reel");
        if (!reel) return;

        const reelNumber = Number(reel.dataset.reelNumber);

        const likeButton = event.target.closest(".like-button");
        const saveButton = event.target.closest(".save-button");
        const commentButton = event.target.closest(".comment-button");
        const shareButton = event.target.closest(".share-button");
        const muteButton = event.target.closest(".mute-button");
        const followButton = event.target.closest(".follow-button");

        if (likeButton) {
            let liked = getLikedReels();

            if (liked.includes(reelNumber)) {
                liked = liked.filter(id => id !== reelNumber);
            } else {
                liked.push(reelNumber);
            }

            localStorage.setItem(LIKED_KEY, JSON.stringify(liked));
            updateLikeButtons(reelNumber, liked.includes(reelNumber));
            return;
        }

        if (saveButton) {
            let saved = getSavedReels();

            if (saved.includes(reelNumber)) {
                saved = saved.filter(id => id !== reelNumber);
            } else {
                saved.push(reelNumber);
            }

            localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
            updateSaveButtons(reelNumber, saved.includes(reelNumber));
            return;
        }

        if (commentButton) {
            openComments(reelNumber);
            return;
        }

        if (shareButton) {
            const url = window.location.href;
            const title = getReelTitle(reelNumber);

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: title + " | StyleMyHair",
                        text: "Check out this men's hairstyle!",
                        url: url
                    });
                } catch (error) {
                    // Sharing cancelled or unavailable.
                }
            } else {
                try {
                    await navigator.clipboard.writeText(url);
                    alert("Reel link copied!");
                } catch (error) {
                    alert("Unable to copy link.");
                }
            }
            return;
        }

        if (muteButton) {
            const video = reel.querySelector(".reel-video");
            if (!video) return;

            video.muted = !video.muted;
            muteButton.textContent = video.muted ? "🔇" : "🔊";
            return;
        }

        if (followButton) {
            followButton.textContent =
                followButton.textContent.trim() === "Follow"
                    ? "Following"
                    : "Follow";
            return;
        }

        // Tap the video area to play or pause.
        if (!event.target.closest(".reel-action")) {
            const video = reel.querySelector(".reel-video");
            if (!video) return;

            if (video.paused) {
                video.play().catch(function () {});
            } else {
                video.pause();
            }
        }
    });

    // =====================================================
    // DOUBLE CLICK TO LIKE
    // =====================================================

    reelsContainer.addEventListener("dblclick", function (event) {
        const reel = event.target.closest(".reel");
        if (!reel || event.target.closest(".reel-actions")) return;

        const reelNumber = Number(reel.dataset.reelNumber);
        const liked = getLikedReels();

        if (liked.includes(reelNumber)) return;

        liked.push(reelNumber);
        localStorage.setItem(LIKED_KEY, JSON.stringify(liked));
        updateLikeButtons(reelNumber, true);
    });

    // =====================================================
    // POST COMMENT
    // =====================================================

    function submitComment() {
        if (!commentInput || currentReelNumber === null) return;

        const text = commentInput.value.trim();
        if (!text) return;

        const comments = getComments(currentReelNumber);
        comments.push(text);

        localStorage.setItem(
            COMMENTS_KEY + currentReelNumber,
            JSON.stringify(comments)
        );

        displayComments(currentReelNumber);
        updateAllCommentCounts(currentReelNumber);

        commentInput.value = "";
    }

    postComment?.addEventListener("click", submitComment);

    commentInput?.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            submitComment();
        }
    });

    closeComments?.addEventListener("click", function () {
        commentsPanel?.classList.remove("show");
    });

});