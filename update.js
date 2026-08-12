const APP_VERSION = "1.1.0";


const UPDATE_NOTES = [

    "Nuova schermata impostazioni migliorata",

    "Aggiunta importazione ed esportazione dati",

    "Nuove statistiche personali",

    "Migliorata la stabilità dell'app"

];



function checkAppUpdate(){

    const savedVersion =
        localStorage.getItem(
            "progress_app_version"
        );


    if(savedVersion !== APP_VERSION){

        showUpdateScreen();

        localStorage.setItem(
            "progress_app_version",
            APP_VERSION
        );

    }

}



function showUpdateScreen(){

    const overlay =
        document.createElement("div");


    overlay.className =
        "update-screen";


    overlay.innerHTML = `


        <div class="update-card">


            <div class="update-logo">
    <img src="logo.png" alt="Progress">
</div>


            <span class="eyebrow">
                AGGIORNAMENTO
            </span>


            <h1>
                Nuova versione disponibile
            </h1>


            <p>
                Progress è stato aggiornato
                alla versione ${APP_VERSION}.
            </p>


            <div class="update-list">

                ${
                    UPDATE_NOTES
                    .map(note => `
                    
                    <div>
                        ✓ ${note}
                    </div>

                    `)
                    .join("")
                }

            </div>


            <button
                class="primary-button"
                onclick="closeUpdateScreen()"
            >
                Inizia
            </button>


        </div>


    `;


    document.body.appendChild(
        overlay
    );

}



function closeUpdateScreen(){

    const screen =
        document.querySelector(
            ".update-screen"
        );


    if(screen){

        screen.remove();

    }

}
