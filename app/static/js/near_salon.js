/* =========================================================
   STYLEMYHAIR
   FEMALE NEARBY SALONS
   Search + Location + Budget + Distance + Directions
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const salonSearch = document.getElementById("salonSearch");
    const locationInput = document.getElementById("locationInput");
    const useLocationButton = document.getElementById("useLocationButton");

    const minBudget = document.getElementById("minBudget");
    const maxBudget = document.getElementById("maxBudget");

    const findSalonsButton = document.getElementById("findSalonsButton");

    const resultsCount = document.getElementById("resultsCount");
    const salonResults = document.getElementById("salonResults");

    const locationStatus = document.getElementById("locationStatus");


    /* =====================================================
       DEFAULT MUMBAI LOCATION
       Used when the user has not shared their location.
       ===================================================== */

    const defaultLocation = {
        lat: 19.0760,
        lng: 72.8777,
        label: "Mumbai"
    };


    let currentLocation = {
        ...defaultLocation
    };

    let usingRealLocation = false;


    /* =====================================================
       FEMALE SALON DATA
       Demo/local dataset for the page.
       ===================================================== */

    const salons = [

        {
            id: 1,
            name: "Blush & Bloom Studio",
            area: "Bandra West",
            city: "Mumbai",
            lat: 19.0607,
            lng: 72.8362,
            rating: 4.8,
            price: 800,
            image:
                "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85",
            services: [
                "Haircut",
                "Hair Color",
                "Blow Dry",
                "Styling"
            ]
        },

        {
            id: 2,
            name: "Glow & Grace Salon",
            area: "Andheri West",
            city: "Mumbai",
            lat: 19.1364,
            lng: 72.8296,
            rating: 4.7,
            price: 700,
            image:
                "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85",
            services: [
                "Haircut",
                "Hair Spa",
                "Keratin",
                "Styling"
            ]
        },

        {
            id: 3,
            name: "Velvet Scissors",
            area: "Powai",
            city: "Mumbai",
            lat: 19.1176,
            lng: 72.9060,
            rating: 4.6,
            price: 1000,
            image:
                "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=85",
            services: [
                "Hair Color",
                "Highlights",
                "Haircut",
                "Styling"
            ]
        },

        {
            id: 4,
            name: "Rose & Root Studio",
            area: "Vile Parle",
            city: "Mumbai",
            lat: 19.1009,
            lng: 72.8497,
            rating: 4.5,
            price: 650,
            image:
                "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=85",
            services: [
                "Haircut",
                "Hair Spa",
                "Blow Dry",
                "Styling"
            ]
        },

        {
            id: 5,
            name: "Luxe Locks Lounge",
            area: "Lower Parel",
            city: "Mumbai",
            lat: 18.9988,
            lng: 72.8258,
            rating: 4.7,
            price: 900,
            image:
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
            services: [
                "Hair Color",
                "Haircut",
                "Keratin",
                "Premium Styling"
            ]
        },

        {
            id: 6,
            name: "The Hair Room",
            area: "Thane West",
            city: "Mumbai",
            lat: 19.2183,
            lng: 72.9781,
            rating: 4.4,
            price: 600,
            image:
                "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85",
            services: [
                "Haircut",
                "Hair Spa",
                "Styling",
                "Blow Dry"
            ]
        },

        {
            id: 7,
            name: "Petal Hair Studio",
            area: "Borivali West",
            city: "Mumbai",
            lat: 19.2307,
            lng: 72.8567,
            rating: 4.5,
            price: 550,
            image:
                "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85",
            services: [
                "Haircut",
                "Hair Spa",
                "Hair Color",
                "Styling"
            ]
        },

        {
            id: 8,
            name: "The Style Lounge",
            area: "Juhu",
            city: "Mumbai",
            lat: 19.1075,
            lng: 72.8263,
            rating: 4.8,
            price: 1100,
            image:
                "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=85",
            services: [
                "Premium Haircut",
                "Hair Color",
                "Keratin",
                "Bridal Styling"
            ]
        }

    ];


    /* =====================================================
       HAVERSINE DISTANCE
       Calculates distance between two coordinates.
       ===================================================== */

    function calculateDistance(lat1, lon1, lat2, lon2) {

        const earthRadius = 6371;

        const dLat =
            (lat2 - lat1) * Math.PI / 180;

        const dLon =
            (lon2 - lon1) * Math.PI / 180;

        const a =
            Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +

            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *

            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c =
            2 * Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
            );

        return earthRadius * c;
    }


    /* =====================================================
       FORMAT DISTANCE
       ===================================================== */

    function formatDistance(distance) {

        if (distance < 1) {
            return `${Math.round(distance * 1000)} m away`;
        }

        return `${distance.toFixed(1)} km away`;
    }


    /* =====================================================
       ESCAPE HTML
       Prevents unwanted HTML inside dynamic content.
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       GOOGLE MAPS DIRECTIONS
       ===================================================== */

    function getDirectionsURL(salon) {

        return (
            "https://www.google.com/maps/dir/?api=1" +
            `&destination=${salon.lat},${salon.lng}`
        );
    }


    /* =====================================================
       UPDATE LOCATION STATUS
       ===================================================== */

    function updateLocationStatus(message, type = "") {

        if (!locationStatus) {
            return;
        }

        locationStatus.classList.remove(
            "success",
            "error"
        );

        if (type) {
            locationStatus.classList.add(type);
        }

        locationStatus.innerHTML = `
            <span class="status-dot"></span>
            <span>${escapeHTML(message)}</span>
        `;
    }


    /* =====================================================
       RENDER SALON CARD
       ===================================================== */

    function createSalonCard(salon) {

        const distance = calculateDistance(
            currentLocation.lat,
            currentLocation.lng,
            salon.lat,
            salon.lng
        );

        const serviceHTML = salon.services
            .map(function (service) {

                return `
                    <span class="female-service-tag">
                        ${escapeHTML(service)}
                    </span>
                `;

            })
            .join("");


        return `
            <article class="female-salon-card">

                <div class="female-salon-image">

                    <img
                        src="${salon.image}"
                        alt="${escapeHTML(salon.name)}"
                        loading="lazy"
                        onerror="this.style.display='none';"
                    >

                    <span class="female-salon-distance">
                        ${formatDistance(distance)}
                    </span>

                    <span class="female-salon-rating">
                        ★ ${salon.rating.toFixed(1)}
                    </span>

                </div>


                <div class="female-salon-content">

                    <h3>
                        ${escapeHTML(salon.name)}
                    </h3>


                    <div class="female-salon-location">

                        <span>⌖</span>

                        <span>
                            ${escapeHTML(salon.area)},
                            ${escapeHTML(salon.city)}
                        </span>

                    </div>


                    <div class="female-salon-services">

                        ${serviceHTML}

                    </div>


                    <div class="female-salon-bottom">

                        <div class="female-price">

                            <span>
                                Starting from
                            </span>

                            <strong>
                                ₹${salon.price}
                            </strong>

                        </div>


                        <a
                            class="female-directions-button"
                            href="${getDirectionsURL(salon)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>↗</span>
                            Directions
                        </a>

                    </div>

                </div>

            </article>
        `;
    }


    /* =====================================================
       RENDER RESULTS
       ===================================================== */

    function renderResults(results) {

        if (!salonResults) {
            return;
        }


        if (resultsCount) {

            resultsCount.textContent =
                `${results.length} salon${results.length === 1 ? "" : "s"} found`;
        }


        if (results.length === 0) {

            salonResults.innerHTML = `
                <div class="salon-empty">

                    <div class="empty-salon-icon">
                        ♡
                    </div>

                    <h3>
                        No salons found
                    </h3>

                    <p>
                        Try changing your search,
                        location or budget.
                    </p>

                </div>
            `;

            return;
        }


        salonResults.innerHTML =
            results
                .map(createSalonCard)
                .join("");
    }


    /* =====================================================
       GET SEARCH RESULTS
       ===================================================== */

    function findMatchingSalons() {

        const searchTerm =
            salonSearch
                ? salonSearch.value.trim().toLowerCase()
                : "";


        const locationTerm =
            locationInput
                ? locationInput.value.trim().toLowerCase()
                : "";


        const min =
            minBudget && minBudget.value
                ? Number(minBudget.value)
                : 0;


        const max =
            maxBudget && maxBudget.value
                ? Number(maxBudget.value)
                : Infinity;


        /* -------------------------------------------------
           VALIDATE BUDGET
           ------------------------------------------------- */

        if (min > max) {

            updateLocationStatus(
                "Minimum budget cannot be higher than maximum budget.",
                "error"
            );

            return;
        }


        /* -------------------------------------------------
           FILTER
           ------------------------------------------------- */

        let filteredSalons = salons.filter(function (salon) {

            const searchableText = (

                salon.name +
                " " +
                salon.area +
                " " +
                salon.city +
                " " +
                salon.services.join(" ")

            ).toLowerCase();


            const matchesSearch =
                !searchTerm ||
                searchableText.includes(searchTerm);


            const matchesBudget =
                salon.price >= min &&
                salon.price <= max;


            /*
             * If the user typed an area manually,
             * allow the location field to act as
             * an area search.
             *
             * When My Location is used, we do NOT
             * filter by the text "Current location".
             */

            let matchesLocation = true;

            if (
                locationTerm &&
                !usingRealLocation &&
                locationTerm !== "mumbai" &&
                locationTerm !== "current location detected"
            ) {

                matchesLocation =
                    salon.area
                        .toLowerCase()
                        .includes(locationTerm) ||

                    salon.city
                        .toLowerCase()
                        .includes(locationTerm);
            }


            return (
                matchesSearch &&
                matchesBudget &&
                matchesLocation
            );

        });


        /* -------------------------------------------------
           CALCULATE DISTANCE + SORT
           ------------------------------------------------- */

        filteredSalons = filteredSalons.map(function (salon) {

            return {
                ...salon,

                distance: calculateDistance(
                    currentLocation.lat,
                    currentLocation.lng,
                    salon.lat,
                    salon.lng
                )

            };

        });


        filteredSalons.sort(function (a, b) {

            return a.distance - b.distance;

        });


        renderResults(filteredSalons);


        /* -------------------------------------------------
           STATUS
           ------------------------------------------------- */

        if (usingRealLocation) {

            updateLocationStatus(
                "Showing salons closest to your current location.",
                "success"
            );

        } else {

            updateLocationStatus(
                "Showing salons around Mumbai. Use My Location for exact distance."
            );
        }
    }


    /* =====================================================
       FIND SALONS BUTTON
       ===================================================== */

    if (findSalonsButton) {

        findSalonsButton.addEventListener(
            "click",
            function () {

                findMatchingSalons();

            }
        );
    }


    /* =====================================================
       SEARCH WITH ENTER KEY
       ===================================================== */

    if (salonSearch) {

        salonSearch.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    findMatchingSalons();
                }

            }
        );
    }


    /* =====================================================
       USE MY LOCATION
       ===================================================== */

    if (useLocationButton) {

        useLocationButton.addEventListener(
            "click",
            function () {

                if (!navigator.geolocation) {

                    updateLocationStatus(
                        "Location services are not supported by this browser.",
                        "error"
                    );

                    return;
                }


                useLocationButton.disabled = true;

                useLocationButton.innerHTML = "⌛";


                updateLocationStatus(
                    "Detecting your location..."
                );


                navigator.geolocation.getCurrentPosition(

                    function (position) {

                        const latitude =
                            position.coords.latitude;

                        const longitude =
                            position.coords.longitude;


                        currentLocation = {

                            lat: latitude,
                            lng: longitude,
                            label: "Your location"

                        };


                        usingRealLocation = true;


                        if (locationInput) {

                            locationInput.value =
                                "Current location detected";
                        }


                        useLocationButton.disabled =
                            false;

                        useLocationButton.innerHTML =
                            "⌖";


                        updateLocationStatus(
                            "Your location was detected. Salons are now sorted by distance.",
                            "success"
                        );


                        findMatchingSalons();

                    },


                    function (error) {

                        currentLocation = {
                            ...defaultLocation
                        };

                        usingRealLocation = false;


                        if (locationInput) {

                            locationInput.value = "";
                        }


                        useLocationButton.disabled =
                            false;

                        useLocationButton.innerHTML =
                            "⌖";


                        let message =
                            "Unable to detect your location.";

                        if (error.code === 1) {

                            message =
                                "Location permission was denied. You can still search salons manually.";

                        } else if (error.code === 2) {

                            message =
                                "Your location could not be determined. Please try again.";

                        } else if (error.code === 3) {

                            message =
                                "Location request timed out. Please try again.";

                        }


                        updateLocationStatus(
                            message,
                            "error"
                        );

                    },


                    {
                        enableHighAccuracy: false,
                        timeout: 10000,
                        maximumAge: 300000
                    }

                );

            }
        );
    }


    /* =====================================================
       LOCATION INPUT
       ===================================================== */

    if (locationInput) {

        locationInput.addEventListener(
            "input",
            function () {

                /*
                 * If the user starts typing manually,
                 * stop treating the field as GPS location.
                 */

                usingRealLocation = false;

            }
        );

    }


    /* =====================================================
       BUDGET INPUT VALIDATION
       ===================================================== */

    [minBudget, maxBudget].forEach(
        function (input) {

            if (!input) {
                return;
            }


            input.addEventListener(
                "input",
                function () {

                    if (input.value < 0) {

                        input.value = 0;
                    }

                }
            );

        }
    );


    /* =====================================================
       INITIAL PAGE LOAD
       ===================================================== */

    function initializePage() {

        if (locationInput) {

            locationInput.placeholder =
                "Enter area or use your location";
        }


        if (minBudget) {

            minBudget.placeholder =
                "Min ₹";
        }


        if (maxBudget) {

            maxBudget.placeholder =
                "Max ₹";
        }


        updateLocationStatus(
            "Showing salons around Mumbai. Use My Location for exact distance."
        );


        findMatchingSalons();

    }


    initializePage();

});