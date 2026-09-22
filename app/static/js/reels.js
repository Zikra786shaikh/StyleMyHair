document.addEventListener("DOMContentLoaded", function () {
    console.log("REELS JS IS WORKING");

    const reels = document.querySelectorAll(".reel");


    /* =====================================================
       REEL INFORMATION
    ===================================================== */

    const reelData = [

        {
            id: "reel1",
            title: "Textured Crop",
            comments: [
                "This haircut looks amazing!",
                "Definitely trying this style.",
                "The fade is so clean."
            ]
        },

        {
            id: "reel2",
            title: "Low Fade",
            comments: [
                "Clean fade 🔥",
                "This is perfect for everyday.",
                "Love this look!"
            ]
        },

        {
            id: "reel3",
            title: "Modern Quiff",
            comments: [
                "The volume is perfect.",
                "Great hairstyle!",
                "Would look amazing for a party."
            ]
        }

    ];


    /* =====================================================
       LOCAL STORAGE
    ===================================================== */

    function getSavedReels() {

        return JSON.parse(
            localStorage.getItem("savedReels") || "[]"
        );

    }


    function saveReels(saved) {

        localStorage.setItem(
            "savedReels",
            JSON.stringify(saved)
        );

    }


    function getComments(reelId) {

        const savedComments = JSON.parse(
            localStorage.getItem(
                "comments_" + reelId
            ) || "null"
        );

        if (savedComments) {

            return savedComments;

        }

        const reel = reelData.find(
            item => item.id === reelId
        );

        return reel ? reel.comments : [];

    }


    function saveComments(reelId, comments) {

        localStorage.setItem(
            "comments_" + reelId,
            JSON.stringify(comments)
        );

    }


    /* =====================================================
       AUTO PLAY / PAUSE
    ===================================================== */

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                const video =
                    entry.target.querySelector(".reel-video");

                if (!video) return;


                if (entry.isIntersecting) {

                    video.play().catch(function () {});

                } else {

                    video.pause();

                    video.currentTime = 0;

                }

            });

        },
        {
            threshold: 0.7
        }
    );


    reels.forEach(function (reel) {

        observer.observe(reel);

    });


    /* =====================================================
       LIKE
    ===================================================== */

    document
        .querySelectorAll(".like-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    button.classList.toggle("liked");

                    const icon =
                        button.querySelector(".like-icon");

                    if (
                        button.classList.contains("liked")
                    ) {

                        icon.textContent = "♥";

                    } else {

                        icon.textContent = "♡";

                    }

                }
            );

        });


    /* =====================================================
   SAVE REEL
===================================================== */

document
    .querySelectorAll(".save-button")
    .forEach(function (button, index) {

        const reelId = "reel" + (index + 1);

        /* CHECK IF ALREADY SAVED */

        const savedReels = getSavedReels();

       if (savedReels.includes(reelId)) {
    button.classList.add("saved");
    button.querySelector("small").textContent = "Saved";
}

        /* CLICK SAVE */

        button.addEventListener("click", function () {

            let saved = getSavedReels();
if (saved.includes(reelId)) {

    /* REMOVE FROM SAVED */

    saved = saved.filter(function (id) {
        return id !== reelId;
    });

    button.classList.remove("saved");

    button.querySelector("small").textContent = "Save";

} else {

    /* ADD TO SAVED */

    saved.push(reelId);

    button.classList.add("saved");

    button.querySelector("small").textContent = "Saved";
}

            /* SAVE TO BROWSER */

            saveReels(saved);

            console.log("Saved reels:", saved);

        });

    });


    /* =====================================================
       COMMENTS PANEL
    ===================================================== */

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


    /* =====================================================
       UPDATE COMMENT NUMBER
    ===================================================== */

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


    /* =====================================================
       DISPLAY COMMENTS
    ===================================================== */

    function displayComments(
        reelId
    ) {

        const comments =
            getComments(reelId);


        commentsList.innerHTML = "";


        if (comments.length === 0) {

            commentsList.innerHTML = `
                <div class="no-comments">
                    No comments yet.
                    Be the first to comment!
                </div>
            `;

        } else {

            comments.forEach(
                function (comment) {

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


        commentsTotal.textContent =
            comments.length;

    }


    /* =====================================================
       OPEN COMMENTS
    ===================================================== */

    function openComments(
        reel,
        reelId
    ) {

        currentReelId =
            reelId;


        displayComments(
            reelId
        );


        commentsPanel.classList.add(
            "show"
        );


        commentInput.focus();

    }


    document
        .querySelectorAll(".comment-button")
        .forEach(function (
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
                        "reel" + (index + 1);


                    openComments(
                        reel,
                        reelId
                    );

                }
            );

        });


    /* =====================================================
       POST COMMENT
    ===================================================== */

    postComment.addEventListener(
        "click",
        function () {

            const text =
                commentInput.value.trim();


            if (!text) return;


            const comments =
                getComments(
                    currentReelId
                );


            comments.push(text);


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


            commentInput.value = "";

        }
    );


    /* =====================================================
       ENTER KEY TO POST
    ===================================================== */

    commentInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                postComment.click();

            }

        }
    );


    /* =====================================================
       CLOSE COMMENTS
    ===================================================== */

    closeComments.addEventListener(
        "click",
        function () {

            commentsPanel.classList.remove(
                "show"
            );

        }
    );


    /* =====================================================
       SHARE
    ===================================================== */

    document
        .querySelectorAll(".share-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const url =
                        window.location.href;


                    if (navigator.share) {

                        try {

                            await navigator.share({

                                title:
                                    "StyleMyHair Reels",

                                text:
                                    "Check out this men's hairstyle!",

                                url: url

                            });

                        } catch (error) {

                        }

                    } else {

                        try {

                            await navigator.clipboard
                                .writeText(url);

                            alert(
                                "Reel link copied!"
                            );

                        } catch (error) {

                            alert(
                                "Unable to copy link."
                            );

                        }

                    }

                }
            );

        });


    /* =====================================================
       MUTE / UNMUTE
    ===================================================== */

    document
        .querySelectorAll(".mute-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const reel =
                        button.closest(
                            ".reel"
                        );

                    const video =
                        reel.querySelector(
                            ".reel-video"
                        );


                    video.muted =
                        !video.muted;


                    if (video.muted) {

                        button.textContent =
                            "🔇";

                    } else {

                        button.textContent =
                            "🔊";

                    }

                }
            );

        });


    /* =====================================================
       FOLLOW
    ===================================================== */

    document
        .querySelectorAll(".follow-button")
        .forEach(function (button) {

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

        });


    /* =====================================================
       DOUBLE CLICK TO LIKE
    ===================================================== */

    document
        .querySelectorAll(".reel")
        .forEach(function (reel) {

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
                        !likeButton.classList
                            .contains("liked")
                    ) {

                        likeButton.classList.add(
                            "liked"
                        );

                        icon.textContent =
                            "♥";

                    }

                }
            );

        });


    /* =====================================================
       INITIAL COMMENT COUNTS
    ===================================================== */

    reels.forEach(
        function (reel, index) {

            const reelId =
                "reel" + (index + 1);

            const comments =
                getComments(reelId);


            updateCommentCount(
                reel,
                comments.length
            );

        }
    );

});