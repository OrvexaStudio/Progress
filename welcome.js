function checkFirstAccess(){

    const user =
        localStorage.getItem(
            "app_user_name"
        );


    if(!user){

        showWelcomeScreen();

    }

}


function showWelcomeScreen(){

    document.body.innerHTML = `

        <div class="welcome-screen">

            <div class="welcome-card">


                <img
                    src="logo.png"
                    class="welcome-logo"
                >


                <h1>
                    Benvenuto 👋
                </h1>


                <p>
                    Iniziamo costruendo il tuo percorso.
                </p>


                <input
                    id="username-input"
                    type="text"
                    placeholder="Come ti chiami?"
                    maxlength="30"
                >


                <button
                    onclick="saveUserName()"
                >
                    Inizia
                </button>


            </div>

        </div>

    `;

}



function saveUserName(){

    const input =
        document.querySelector(
            "#username-input"
        );


    const name =
        input.value.trim();


    if(!name){

        alert(
            "Inserisci il tuo nome"
        );

        return;

    }


    localStorage.setItem(
        "app_user_name",
        name
    );


    location.reload();

}
