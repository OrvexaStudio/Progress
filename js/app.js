applyProgressTheme();


document.addEventListener(
    "DOMContentLoaded",
    () => {


        loadData();


        const name =
            getUserName();


        const tutorialDone =
            localStorage.getItem(
                "progress_tutorial_completed"
            );



        if(!name){

            showWelcomeScreen();

            return;

        }



        if(!tutorialDone){

            startTutorial();

            return;

        }



        initializeNavigation();

        initializeMobileSidebar();

        updateGlobalProfile();

        navigateTo("dashboard");
        checkAppUpdate();

    }
);

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register(
            "./service-worker.js"
        )
        .then(registration => {

            console.log(
                "Service Worker registrato:",
                registration.scope
            );

        })
        .catch(error => {

            console.error(
                "Errore Service Worker:",
                error
            );

        });

    });

}
