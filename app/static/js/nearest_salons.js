document.addEventListener("DOMContentLoaded", function () {

    console.log("NEAREST SALONS JS LOADED");

    // =====================================================
    // ELEMENTS
    // =====================================================

    const locationButton = document.getElementById("useLocationButton");
    const locationInput = document.getElementById("locationInput");
    const findButton = document.getElementById("findSalonsButton");
    const searchInput = document.getElementById("salonSearch");
    const minBudgetInput = document.getElementById("minBudget");
    const maxBudgetInput = document.getElementById("maxBudget");
    const resultsContainer = document.getElementById("salonResults");
    const resultsCount = document.getElementById("resultsCount");

    const locationStatus =
        document.querySelector(".location-card p");


    // =====================================================
    // SALON DATA
    // =====================================================

    const salons = [

        {
            name: "Nomad Barber - Mumbai",
            area: "Bandra West, Mumbai",
            latitude: 19.0628315,
            longitude: 72.8353611,
            price: 1400,
            rating: 4.9,
            services: [
                "Haircut",
                "Beard Trim",
                "Shave",
                "Hair Styling"
            ],
            image:
                "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80"
        },

        {
            name: "The Lair Man",
            area: "Khar West, Mumbai",
            latitude: 19.0726263,
            longitude: 72.8344004,
            price: 1150,
            rating: 4.3,
            services: [
                "Haircut",
                "Beard Styling",
                "Shave",
                "Head Massage"
            ],
            image:
                "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80"
        },

        {
            name: "Hair Castle Salon",
            area: "Ghatkopar East, Mumbai",
            latitude: 19.079774,
            longitude: 72.9058912,
            price: 500,
            rating: 4.7,
            services: [
                "Haircut",
                "Hair Styling",
                "Hair Spa",
                "Hair Care"
            ],
            image:
                "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80"
        },

        {
            name: "JBN Unisex Salon & Academy",
            area: "Goregaon West, Mumbai",
            latitude: 19.1550,
            longitude: 72.8490,
            price: 150,
            rating: 4.9,
            services: [
                "Men's Haircut",
                "Beard Trim",
                "Shaving",
                "Men's Package"
            ],
            image:
                "https://images.unsplash.com/photo-1599351431202-1e0f0a7f0f1d?auto=format&fit=crop&w=900&q=80"
        },

        {
            name: "Truefitt & Hill",
            area: "Khar West, Mumbai",
            latitude: 19.0695,
            longitude: 72.8358,
            price: 1700,
            rating: 4.8,
            services: [
                "Classic Haircut",
                "Royal Shave",
                "Beard Styling",
                "Hair Wash"
            ],
            image:
                "https://images.unsplash.com/photo-1599351431613-18ef1fdd27e7?auto=format&fit=crop&w=900&q=80"
        }

    ];


    // =====================================================
    // DISTANCE CALCULATION
    // =====================================================

    function calculateDistance(lat1, lon1, lat2, lon2) {

        const earthRadius = 6371;

        const latDifference =
            (lat2 - lat1) * Math.PI / 180;

        const lonDifference =
            (lon2 - lon1) * Math.PI / 180;

        const a =
            Math.sin(latDifference / 2) *
            Math.sin(latDifference / 2) +

            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *

            Math.sin(lonDifference / 2) *
            Math.sin(lonDifference / 2);

        const c =
            2 *
            Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
            );

        return earthRadius * c;
    }


    // =====================================================
    // USE MY LOCATION
    // =====================================================

    if (locationButton) {

        locationButton.addEventListener("click", function () {

            if (!navigator.geolocation) {

                locationStatus.textContent =
                    "Geolocation is not supported by your browser.";

                return;
            }

            locationButton.disabled = true;
            locationButton.textContent = "Getting Location...";

            locationStatus.textContent =
                "Getting your current location...";


            navigator.geolocation.getCurrentPosition(

                function (position) {

                    const latitude =
                        position.coords.latitude;

                    const longitude =
                        position.coords.longitude;


                    if (locationInput) {

                        locationInput.value =
                            latitude.toFixed(6) +
                            ", " +
                            longitude.toFixed(6);
                    }


                    window.userLatitude = latitude;
                    window.userLongitude = longitude;


                    locationStatus.textContent =
                        "Your current location has been selected.";

                    locationButton.disabled = false;

                    locationButton.textContent =
                        "✓ Location Selected";
                },


                function (error) {

                    console.error(
                        "LOCATION ERROR:",
                        error.code,
                        error.message
                    );


                    if (error.code === 1) {

                        locationStatus.textContent =
                            "Location permission was denied.";

                    } else if (error.code === 2) {

                        locationStatus.textContent =
                            "Your location could not be determined.";

                    } else if (error.code === 3) {

                        locationStatus.textContent =
                            "Location request timed out. Please try again.";

                    } else {

                        locationStatus.textContent =
                            "Unable to get your location.";
                    }


                    locationButton.disabled = false;

                    locationButton.textContent =
                        "📍 Use My Location";
                },


                {
                    enableHighAccuracy: false,
                    timeout: 10000,
                    maximumAge: 300000
                }

            );

        });

    }


    // =====================================================
    // FIND SALONS
    // =====================================================

    if (findButton) {

        findButton.addEventListener("click", function () {

            console.log("FIND SALONS CLICKED");


            const searchText =
                searchInput
                    ? searchInput.value.trim().toLowerCase()
                    : "";


            const minBudget =
                minBudgetInput &&
                minBudgetInput.value
                    ? Number(minBudgetInput.value)
                    : 0;


            const maxBudget =
                maxBudgetInput &&
                maxBudgetInput.value
                    ? Number(maxBudgetInput.value)
                    : Infinity;


            let userLatitude = window.userLatitude;
            let userLongitude = window.userLongitude;


            // -------------------------------------------------
            // GET COORDINATES FROM LOCATION INPUT
            // -------------------------------------------------

            if (
                (!userLatitude || !userLongitude) &&
                locationInput
            ) {

                const value =
                    locationInput.value.trim();

                const parts =
                    value.split(",");

                if (parts.length === 2) {

                    const lat =
                        Number(parts[0].trim());

                    const lon =
                        Number(parts[1].trim());


                    if (!isNaN(lat) && !isNaN(lon)) {

                        userLatitude = lat;
                        userLongitude = lon;
                    }
                }
            }


            // -------------------------------------------------
            // LOCATION REQUIRED
            // -------------------------------------------------

            if (
                userLatitude === undefined ||
                userLongitude === undefined
            ) {

                locationStatus.textContent =
                    "Please select your location first.";

                return;
            }


            // -------------------------------------------------
            // FILTER SALONS
            // -------------------------------------------------

            let filteredSalons = salons
                .map(function (salon) {

                    const distance =
                        calculateDistance(
                            userLatitude,
                            userLongitude,
                            salon.latitude,
                            salon.longitude
                        );

                    return {
                        ...salon,
                        distance: distance
                    };

                })

                .filter(function (salon) {

                    const budgetMatch =
                        salon.price >= minBudget &&
                        salon.price <= maxBudget;


                    const searchableText =
                        (
                            salon.name +
                            " " +
                            salon.area +
                            " " +
                            salon.services.join(" ")
                        ).toLowerCase();


                    const searchMatch =
                        !searchText ||
                        searchableText.includes(searchText);


                    return budgetMatch && searchMatch;

                })

                .sort(function (a, b) {

                    return a.distance - b.distance;

                });


            // -------------------------------------------------
            // DISPLAY RESULTS
            // -------------------------------------------------

            renderSalons(
                filteredSalons,
                userLatitude,
                userLongitude
            );

        });

    }


    // =====================================================
    // RENDER SALON CARDS
    // =====================================================

    function renderSalons(
        salonList,
        userLatitude,
        userLongitude
    ) {

        if (!resultsContainer) {
            return;
        }


        resultsContainer.innerHTML = "";


        if (resultsCount) {

            resultsCount.textContent =
                salonList.length +
                (
                    salonList.length === 1
                        ? " salon"
                        : " salons"
                );
        }


        // -------------------------------------------------
        // NO RESULTS
        // -------------------------------------------------

        if (salonList.length === 0) {

            resultsContainer.innerHTML = `

                <div class="empty-salons">

                    <div class="empty-icon">
                        ✂
                    </div>

                    <h3>
                        No salons found
                    </h3>

                    <p>
                        Try changing your search
                        or increasing your budget.
                    </p>

                </div>

            `;

            return;
        }


        // -------------------------------------------------
        // CREATE CARDS
        // -------------------------------------------------

        salonList.forEach(function (salon) {


            const directionsUrl =
                "https://www.google.com/maps/dir/?api=1" +
                "&origin=" +
                encodeURIComponent(
                    userLatitude +
                    "," +
                    userLongitude
                ) +
                "&destination=" +
                encodeURIComponent(
                    salon.latitude +
                    "," +
                    salon.longitude
                );


            const services =
                salon.services
                    .map(function (service) {

                        return `
                            <span class="service-tag">
                                ${service}
                            </span>
                        `;

                    })
                    .join("");


            const card =
                document.createElement("article");


            card.className =
                "salon-card";


            card.innerHTML = `

                <div class="salon-image">

                    <img
                        src="${salon.image}"
                        alt="${salon.name}"
                        loading="lazy"
                    >

                </div>


                <div class="salon-info">

                    <span class="salon-category">
                        MEN'S GROOMING
                    </span>


                    <h3>
                        ${salon.name}
                    </h3>


                    <div class="salon-meta">

                        <span>
                            ★ ${salon.rating}
                        </span>

                        <span>
                            📍 ${salon.distance.toFixed(1)} km
                        </span>

                    </div>


                    <div class="salon-location">

                        📍 ${salon.area}

                    </div>


                    <div class="salon-services">

                        ${services}

                    </div>


                    <div class="salon-bottom">

                        <div class="salon-price">

                            <span>
                                STARTING FROM
                            </span>

                            <strong>
                                ₹${salon.price}
                            </strong>

                        </div>


                        <a
                            class="salon-view-button"
                            href="${directionsUrl}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Directions →
                        </a>

                    </div>

                </div>

            `;


            resultsContainer.appendChild(card);

        });

    }

});