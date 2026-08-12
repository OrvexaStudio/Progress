const CACHE_NAME = "progressi-v2";


const FILES_TO_CACHE = [

    "./",
    "./index.html",

    "./style.css",
    "./manifest.json",

    // PAGINE PRINCIPALI
    "./welcome.js",
    "./tutorial.js",
    "./privacy.js",
    "./terms.js",


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



self.addEventListener(
"install",
event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

 return cache.addAll(
    FILES_TO_CACHE
);

        })

    );


    self.skipWaiting();

});



self.addEventListener(
"activate",
event => {

    event.waitUntil(

        caches.keys()
        .then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

    );


    self.clients.claim();

});



self.addEventListener(
"fetch",
event => {

    event.respondWith(

        fetch(event.request)

        .then(response => {


            const clone =
                response.clone();


            caches.open(CACHE_NAME)
            .then(cache => {

                cache.put(
                    event.request,
                    clone
                );

            });


            return response;


        })

        .catch(() => {


            return caches.match(
                event.request
            );


        })

    );

});
