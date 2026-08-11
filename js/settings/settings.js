function renderSettingsPage() {

    const profile =
        getProfile();


    const content =
        document.querySelector(
            "#app-content"
        );


    content.innerHTML = `

        <div class="page settings-page">


            <div class="page-toolbar">

                <div>

                    <h2>
                        Impostazioni
                    </h2>

                    <p>
                        Personalizza Progress
                        e gestisci i tuoi dati.
                    </p>

                </div>

            </div>


            <!-- PROFILO -->

            <section class="settings-section">

                <span class="eyebrow">
                    PROFILO
                </span>


                <div class="card settings-profile-card">

                    <div class="settings-avatar">
                        ${getInitials(
                            profile.name
                        )}
                    </div>


                    <div class="settings-profile-info">

                        <strong>
                            ${escapeHTML(
                                profile.name
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                profile.subtitle
                            )}
                        </span>

                    </div>


                    <button
                        class="secondary-button"
                        onclick="
                            openProfileModal()
                        "
                    >
                        Modifica
                    </button>

                </div>

            </section>


            <!-- PREFERENZE -->

            <section class="settings-section">

                <span class="eyebrow">
                    PREFERENZE
                </span>


                <div class="card settings-list">


                    <button
                        class="settings-row"
                        onclick="
                            showComingSoon(
                                'Aspetto'
                            )
                        "
                    >

                        <div>

                            <strong>
                                Aspetto
                            </strong>

                            <span>
                                Personalizza
                                l'interfaccia
                            </span>

                        </div>

                        <span class="settings-arrow">
                            ›
                        </span>

                    </button>


                    <button
                        class="settings-row"
                        onclick="
                            showComingSoon(
                                'Valuta'
                            )
                        "
                    >

                        <div>

                            <strong>
                                Valuta
                            </strong>

                            <span>
                                Euro (€)
                            </span>

                        </div>

                        <span class="settings-arrow">
                            ›
                        </span>

                    </button>


                    <button
                        class="settings-row"
                        onclick="
                            showComingSoon(
                                'Settimana'
                            )
                        "
                    >

                        <div>

                            <strong>
                                Primo giorno
                                della settimana
                            </strong>

                            <span>
                                Lunedì
                            </span>

                        </div>

                        <span class="settings-arrow">
                            ›
                        </span>

                    </button>


                </div>

            </section>


            <!-- DATI -->

            <section class="settings-section">

                <span class="eyebrow">
                    DATI
                </span>


                <div class="card settings-list">


                    <button
                        class="settings-row"
                        onclick="
                            exportProgressData()
                        "
                    >

                        <div>

                            <strong>
                                Esporta dati
                            </strong>

                            <span>
                                Crea un backup
                                di Progress
                            </span>

                        </div>

                        <span class="settings-arrow">
                            ↓
                        </span>

                    </button>


                    <label
                        class="settings-row"
                    >

                        <div>

                            <strong>
                                Importa dati
                            </strong>

                            <span>
                                Ripristina un backup
                            </span>

                        </div>


                        <span class="settings-arrow">
                            ↑
                        </span>


                        <input
                            type="file"
                            accept=".json"
                            hidden
                            onchange="
                                importProgressData(
                                    event
                                )
                            "
                        >

                    </label>


                    <button
                        class="
                            settings-row
                            settings-danger
                        "
                        onclick="
                            deleteAllProgressData()
                        "
                    >

                        <div>

                            <strong>
                                Cancella tutti i dati
                            </strong>

                            <span>
                                Elimina definitivamente
                                i tuoi dati
                            </span>

                        </div>

                        <span class="settings-arrow">
                            ×
                        </span>

                    </button>


                </div>

            </section>


            <!-- INFO -->

            <section class="settings-about">

                <strong>
                    Progress
                </strong>

                <span>
                    Il tuo spazio per crescere.
                </span>

                <small>
                    Versione 1.0
                </small>

            </section>


            <div
                id="settings-modal-container"
            ></div>

        </div>

    `;

}


function getInitials(name) {

    if (!name) {
        return "P";
    }


    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(
            word =>
                word.charAt(0)
                    .toUpperCase()
        )
        .join("");

}


function showComingSoon(section) {

    alert(
        `${section}: questa funzione arriverà presto.`
    );

}
