function checkFirstAccess() {

    const userName =
        localStorage.getItem("app_user_name");

    if (!userName) {
        showWelcomeScreen();
    }

}


function showWelcomeScreen() {

    document.body.innerHTML = `

<div class="page">

    <div class="welcome-container">

        <div class="card welcome-card">


            <img
                src="logo.png"
                class="welcome-logo"
            >


            <span class="eyebrow">
                BENVENUTO
            </span>


            <h1>
                Crea il tuo profilo
            </h1>


            <p>
                Inserisci il tuo nome per iniziare
                a costruire il tuo percorso.
            </p>



            <form
                onsubmit="saveUserName(event)"
            >

                <input
                    id="username-input"
                    class="input"
                    type="text"
                    placeholder="Il tuo nome"
                    maxlength="30"
                    required
                >


                <button
                    class="primary-button full-width"
                    type="submit"
                >
                    Continua
                </button>


            </form>


        </div>

    </div>

</div>

`;

    setTimeout(() => {

        document
            .querySelector("#username-input")
            ?.focus();

    }, 100);

}


function saveUserName(event){

    event.preventDefault();

    const name =
        document
        .querySelector("#username-input")
        .value
        .trim();


    if(!name) return;


    const data = loadData();

    data.profile.name = name;

    saveData(data);


    // salva anche il completamento del primo accesso
    localStorage.setItem(
        "app_user_name",
        name
    );


    location.reload();

}


function getUserName() {

    return (
        localStorage.getItem(
            "app_user_name"
        ) || ""
    );

}
