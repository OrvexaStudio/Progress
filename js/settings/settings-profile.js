function getProfile() {

    const data =
        loadData();


    if (!data.profile) {

        data.profile = {

            name: "Francesco",

            subtitle:
                "Il tuo progresso"

        };

        saveData(data);

    }


    return data.profile;

}


function openProfileModal() {

    const profile =
        getProfile();


    let container =
        document.querySelector(
            "#settings-modal-container"
        );


    if (!container) {

        container =
            document.createElement("div");

        container.id =
            "settings-modal-container";

        document.body.appendChild(
            container
        );

    }


    container.innerHTML = `

        <div
            class="modal-backdrop"
            onclick="closeSettingsModal(event)"
        >

            <div
                class="modal"
                onclick="event.stopPropagation()"
            >

                <div class="modal-header">

                    <div>

                        <span class="eyebrow">
                            PROFILO
                        </span>

                        <h2>
                            Personalizza il profilo
                        </h2>

                    </div>


                    <button
                        class="modal-close"
                        onclick="
                            closeSettingsModal()
                        "
                    >
                        ×
                    </button>

                </div>


                <form
                    onsubmit="
                        saveProfile(event)
                    "
                >

                    <label>

                        Nome

                        <input
                            id="profile-name"
                            type="text"
                            maxlength="40"
                            value="${escapeHTML(
                                profile.name
                            )}"
                            required
                        >

                    </label>


                    <label>

                        Sottotitolo

                        <input
                            id="profile-subtitle"
                            type="text"
                            maxlength="60"
                            value="${escapeHTML(
                                profile.subtitle
                            )}"
                            placeholder="Il tuo progresso"
                        >

                    </label>


                    <button
                        type="submit"
                        class="primary-button full-width"
                    >
                        Salva modifiche
                    </button>

                </form>

            </div>

        </div>

    `;

}


function saveProfile(event) {

    event.preventDefault();


    const data =
        loadData();


    data.profile = {

        name:
            document.querySelector(
                "#profile-name"
            ).value.trim(),

        subtitle:
            document.querySelector(
                "#profile-subtitle"
            ).value.trim()

    };


    saveData(data);


    closeSettingsModal();

    renderSettingsPage();

}


function closeSettingsModal(event) {

    if (
        event &&
        event.target !== event.currentTarget
    ) {
        return;
    }


    const container =
        document.querySelector(
            "#settings-modal-container"
        );


    if (container) {
        container.innerHTML = "";
    }

}
