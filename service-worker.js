const CACHE_NAME = "progressi-v6";

const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./manifest.json",

    // PAGINE
    "./welcome.js",
    "./tutorial.js",
    "./privacy.js",
    "./terms.js",

    // CSS
    "./style.css",

    // CORE
    "./js/app.js",
    "./js/storage.js",
    "./js/utils.js",
    "./js/navigation.js",
    "./js/realtime.js",

    // DASHBOARD
    "./js/dashboard.js",

    // GOALS
    "./js/goals/goal-progress.js",
    "./js/goals/goal-details.js",
    "./js/goals/goals.js",

    // SAVINGS
    "./js/savings/savings-calculator.js",
    "./js/savings/savings-plan.js",
    "./js/savings/savings.js",

    // ACTIVITY
    "./js/activity/activity-stats.js",
    "./js/activity/activity-form.js",
    "./js/activity/activity.js",

    // SETTINGS
    "./js/settings/settings-data.js",
    "./js/settings/settings-profile.js",
    "./js/settings/settings.js",

    // IMMAGINI
    "./logo.png"

];


// INSTALL

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return Promise.all(

                    FILES_TO_CACHE.map(file => {

                        return fetch(file)
                            .then(response => {

                                if (!response.ok) {
                                    throw new Error(
                                        `${file} → ${response.status}`
                                    );
                                }

                                return cache.put(
                                    file,
                                    response
                                );

                            })
                            .catch(error => {

                                console.error(
                                    "CACHE ERROR:",
                                    error.message
                                );

                            });

                    })

                );

            })

    );

    self.skipWaiting();

});


// ACTIVATE

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(keys => {

                return Promise.all(

                    keys.map(key => {

                        if (key !== CACHE_NAME) {

                            return caches.delete(key);

                        }

                    })

                );

            })

    );

    self.clients.claim();

});


// FETCH

self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)

            .then(response => {

                if (
                    response &&
                    response.status === 200 &&
                    event.request.method === "GET"
                ) {

                    const clone =
                        response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {

                            cache.put(
                                event.request,
                                clone
                            );

                        });

                }

                return response;

            })

            .catch(() => {

                return caches.match(
                    event.request
                );

            })

    );

});
