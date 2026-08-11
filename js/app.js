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


    }
);
