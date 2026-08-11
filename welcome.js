function checkFirstAccess() {

    const userName =
        localStorage.getItem("app_user_name");

    if (!userName) {
        showWelcomeScreen();
    }

}


function showWelcomeScreen() {

    document.body.innerHTML = `

        <div class="welcome-screen">

            <div class="welcome-card">

                <img
                    src="logo.png"
                    class="welcome-logo"
                    alt="Logo"
                >

                <span class="eyebrow">
                    BENVENUTO
                </span>

                <h1>
                    Iniziamo.
                </h1>

                <p>
                    Prima di iniziare, dicci come vuoi essere chiamato.
                </p>

                <form onsubmit="saveUserName(event)">

                    <input
                        id="username-input"
                        type="text"
                        maxlength="30"
                        placeholder="Il tuo nome"
                        autocomplete="given-name"
                        required
                    >

                    <button
                        type="submit"
                    >
                        Continua
                    </button>

                </form>

            </div>

        </div>

    `;

    setTimeout(() => {

        document
            .querySelector("#username-input")
            ?.focus();

    }, 100);

}


function saveUserName(event) {

    event.preventDefault();

    const input =
        document.querySelector(
            "#username-input"
        );

    const name =
        input.value.trim();

    if (!name) {
        return;
    }

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
