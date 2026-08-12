const CACHE_NAME = "progressi-cache-1.1.6";


const FILES_TO_CACHE = [

    "./",
    "./index.html",

    // CSS
    "./css/base.css",
    "./css/components.css",
    "./css/layout.css",
    "./css/pages.css",


    // FILE PRINCIPALI
"./js/app.js",
"./js/dashboard.js",
"./js/navigation.js",
"./js/realtime.js",
"./js/storage.js",
"./js/utils.js",


    // PAGINE
    "./welcome.js",
    "./tutorial.js",
    "./privacy.js",
    "./terms.js",
    "./update.js",


    // MANIFEST + LOGO
    "./manifest.json",
    "./logo.png",


    // ACTIVITY
    "./js/activity/activity-form.js",
    "./js/activity/activity-stats.js",
    "./js/activity/activity.js",
    "./js/activity/streak.js",

    // GOALS
    "./js/goals/goal-details.js",
    "./js/goals/goal-progress.js",
    "./js/goals/goals.js",


    // SAVINGS
    "./js/savings/savings-calculator.js",
    "./js/savings/savings-plan.js",
    "./js/savings/savings.js",


    // SETTINGS
    "./js/settings/settings-data.js",
    "./js/settings/settings-profile.js",
    "./js/settings/settings.js"

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
