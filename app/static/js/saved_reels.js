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
       GET SAVED REELS FROM BROWSER
    ===================================================== */

    function getSavedReels() {

        return JSON.parse(
            localStorage.getItem("savedReels") || "[]"
        );

    }


    /* =====================================================
       REEL INFORMATION
    ===================================================== */

    const reelData = {

        reel1: {
            title: "Textured Crop",
            video: "/static/reels/reel1.mp4"
        },

        reel2: {
            title: "Low Fade",
            video: "/static/reels/reel2.mp4"
        },

        reel3: {
            title: "Modern Quiff",
            video: "/static/reels/reel3.mp4"
        }

    };


    /* =====================================================
       GET SAVED REELS
    ===================================================== */

    const savedReels = getSavedReels();


    console.log(
        "Saved reels:",
        savedReels
    );


    /* =====================================================
       SHOW SAVED COUNT
    ===================================================== */

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

        const reel = reelData[reelId];


        /* If reel doesn't exist, skip it */

        if (!reel) {
            return;
        }


        /* CREATE REEL SECTION */

        const reelElement =
            document.createElement("section");

        reelElement.className =
            "saved-reel";


        /* CREATE VIDEO */

        const video =
            document.createElement("video");

        video.src = reel.video;

        video.controls = true;

        video.playsInline = true;

        video.loop = true;


        /* CREATE INFORMATION */

        const info =
            document.createElement("div");

        info.className =
            "saved-info";


        const title =
            document.createElement("h2");

        title.textContent =
            reel.title;


        const savedText =
            document.createElement("p");

        savedText.textContent =
            "🔖 Saved Reel";


        /* ADD CONTENT */

        info.appendChild(title);

        info.appendChild(savedText);


        reelElement.appendChild(video);

        reelElement.appendChild(info);


        savedContainer.appendChild(
            reelElement
        );

    });


});