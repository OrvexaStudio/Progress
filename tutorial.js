let tutorialStep = 0;


function startTutorial(){

    tutorialStep = 0;

    renderTutorialStep();

}



function renderTutorialStep(){

    document.body.innerHTML = `

    <div class="tutorial-page">

        <div class="tutorial-card card">


            <img
                src="logo.png"
                class="tutorial-logo tutorial-fade"
            >


            <div id="tutorial-content"></div>


        </div>

    </div>

    `;


    const content =
        document.querySelector(
            "#tutorial-content"
        );



    if(tutorialStep === 0){

        content.innerHTML = `


            <span class="eyebrow tutorial-fade tutorial-delay-1">
                BENVENUTO
            </span>


            <h1 class="tutorial-fade tutorial-delay-2">
                Ciao ${getUserName()}
            </h1>


            <p class="tutorial-fade tutorial-delay-3">
                Prepariamo il tuo spazio personale
                e iniziamo a costruire il tuo percorso.
            </p>


            <button
                class="
                    primary-button
                    full-width
                    tutorial-fade
                    tutorial-delay-4
                "
                onclick="nextTutorialStep()"
            >
                Iniziamo
            </button>


        `;

    }




    if(tutorialStep === 1){

        content.innerHTML = `


            <span class="eyebrow tutorial-fade">
                PRIMO PASSO
            </span>


            <h1 class="tutorial-fade tutorial-delay-1">
                Crea il tuo primo obiettivo
            </h1>


            <p class="tutorial-fade tutorial-delay-2">
                Un obiettivo ti aiuta a trasformare
                un'idea in un percorso concreto.
            </p>


            <input
                id="tutorial-goal-title"
                class="
                    input
                    tutorial-fade
                    tutorial-delay-3
                "
                type="text"
                placeholder="Inserisci il tuo obiettivo"
                maxlength="60"
            >


            <button
                class="
                    primary-button
                    full-width
                    tutorial-fade
                    tutorial-delay-4
                "
                onclick="createTutorialGoal()"
            >
                Crea obiettivo
            </button>


        `;

    }





    if(tutorialStep === 2){

        content.innerHTML = `


            <div class="tutorial-success tutorial-fade">


                <div class="success-icon">
                    ✓
                </div>


                <h1>
                    Obiettivo creato
                </h1>


                <p>
                    Il tuo primo obiettivo è stato
                    aggiunto al tuo percorso.
                </p>


            </div>



            <button
                class="
                    primary-button
                    full-width
                    tutorial-fade
                    tutorial-delay-2
                "
                onclick="nextTutorialStep()"
            >
                Continua
            </button>


        `;

    }





    if(tutorialStep === 3){

        content.innerHTML = `


            <span class="eyebrow tutorial-fade">
                COMPLETA IL PROFILO
            </span>


            <h1 class="tutorial-fade tutorial-delay-1">
                Tutto pronto
            </h1>


            <p class="tutorial-fade tutorial-delay-2">
                Ora puoi gestire obiettivi,
                risparmi e attività direttamente
                dalla tua dashboard.
            </p>


            <button
                class="
                    primary-button
                    full-width
                    tutorial-fade
                    tutorial-delay-3
                "
                onclick="finishTutorial()"
            >
                Entra nell'app
            </button>


        `;

    }

}





function nextTutorialStep(){

    tutorialStep++;

    renderTutorialStep();

}





function createTutorialGoal(){

    const title =
        document
        .querySelector(
            "#tutorial-goal-title"
        )
        .value
        .trim();



    if(!title){
        return;
    }



    const data =
        loadData();



    if(!data.goals){

        data.goals = [];

    }



    data.goals.push({

        id:
            crypto.randomUUID(),

        title,

        description:
            "Creato durante la configurazione iniziale",

        icon:
            "",

        progress:
            0,

        hours:
            0,

        milestones:
            0,

        createdAt:
            new Date().toISOString()

    });


localStorage.setItem(
    "progress_data",
    JSON.stringify(data)
);


tutorialStep = 2;

renderTutorialStep();

}





function finishTutorial(){


    localStorage.setItem(
        "progress_tutorial_completed",
        "true"
    );


    const page =
        document.querySelector(
            ".tutorial-page"
        );


    if(page){

        page.classList.add(
            "tutorial-exit"
        );

    }



    setTimeout(() => {


        initializeNavigation();

        initializeMobileSidebar();

        updateGlobalProfile();

        navigateTo("dashboard");


    }, 500);


}
