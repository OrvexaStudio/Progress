function openActivityModal() {

    let container =
        document.querySelector(
            "#activity-modal-container"
        );


    if (!container) {

        container =
            document.createElement("div");

        container.id =
            "activity-modal-container";

        document.body.appendChild(container);

    }


    container.innerHTML = `

        <div
            class="modal-backdrop"
            onclick="closeActivityModal(event)"
        >

            <div
                class="modal"
                onclick="event.stopPropagation()"
            >

                <div class="modal-header">

                    <div>

                        <span class="eyebrow">
                            NUOVA ATTIVITÀ
                        </span>

                        <h2>
                            Registra attività
                        </h2>

                    </div>


                    <button
                        class="modal-close"
                        onclick="closeActivityModal()"
                    >
                        ×
                    </button>

                </div>


                <form
                    onsubmit="
                        saveActivity(event)
                    "
                >

                    <label>

                        Cosa hai fatto?

                        <input
                            id="activity-title"
                            type="text"
                            maxlength="80"
                            placeholder="Es. Studio matematica"
                            required
                        >

                    </label>


                    <label>

                        Categoria

                        <select
                            id="activity-category"
                        >

                            <option value="Studio">
                                Studio
                            </option>

                            <option value="Lavoro">
                                Lavoro
                            </option>

                            <option value="Allenamento">
                                Allenamento
                            </option>

                            <option value="Progetto">
                                Progetto
                            </option>

                            <option value="Personale">
                                Personale
                            </option>

                            <option value="Altro">
                                Altro
                            </option>

                        </select>

                    </label>


                    <label>

                        Durata

                        <input
                            id="activity-duration"
                            type="number"
                            min="1"
                            step="1"
                            placeholder="60"
                            required
                        >

                        <small>
                            minuti
                        </small>

                    </label>


                    <label>

                        Data

                        <input
                            id="activity-date"
                            type="datetime-local"
                            required
                        >

                    </label>


                    <label>

                        Cosa hai imparato o ottenuto?

                        <textarea
                            id="activity-note"
                            maxlength="300"
                            placeholder="Scrivi cosa hai fatto, imparato o migliorato..."
                        ></textarea>

                    </label>


                    <label class="checkbox-label">

                        <input
                            id="activity-completed"
                            type="checkbox"
                            checked
                        >

                        Attività completata

                    </label>


                    <button
                        type="submit"
                        class="primary-button full-width"
                    >
                        Registra attività
                    </button>

                </form>

            </div>

        </div>

    `;


    const dateInput =
        document.querySelector(
            "#activity-date"
        );


    if (dateInput) {

        const now =
            new Date();

        now.setMinutes(
            now.getMinutes()
            - now.getTimezoneOffset()
        );

        dateInput.value =
            now.toISOString()
                .slice(0, 16);

    }

}


function saveActivity(event) {

    event.preventDefault();


    const data =
        loadData();


    if (!data.activities) {
        data.activities = [];
    }


    const activity = {

        id:
            crypto.randomUUID(),

        title:
            document.querySelector(
                "#activity-title"
            ).value.trim(),

        category:
            document.querySelector(
                "#activity-category"
            ).value,

        duration:
            Number(
                document.querySelector(
                    "#activity-duration"
                ).value
            ),

        date:
            document.querySelector(
                "#activity-date"
            ).value,

        note:
            document.querySelector(
                "#activity-note"
            ).value.trim(),

        completed:
            document.querySelector(
                "#activity-completed"
            ).checked,

        createdAt:
            new Date().toISOString()

    };


    if (
        !activity.title ||
        activity.duration <= 0
    ) {
        return;
    }


    data.activities.push(
        activity
    );


    saveData(data);

    closeActivityModal();

    renderActivityPage();

}


function closeActivityModal(event) {

    if (
        event &&
        event.target !== event.currentTarget
    ) {
        return;
    }


    const container =
        document.querySelector(
            "#activity-modal-container"
        );


    if (container) {

        container.innerHTML = "";

    }

}
