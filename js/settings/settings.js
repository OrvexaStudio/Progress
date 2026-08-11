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
    openAppearanceSettings()
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


function openAppearanceSettings() {

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


    const current =
        localStorage.getItem(
            "progress_theme"
        ) || "system";


    container.innerHTML = `

        <div
            class="modal-backdrop"
            onclick="closeSettingsModal(event)"
        >

            <div
                class="modal appearance-modal"
                onclick="event.stopPropagation()"
            >

                <div class="modal-header">

                    <div>

                        <span class="eyebrow">
                            ASPETTO
                        </span>

                        <h2>
                            Come vuoi vedere Progress?
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


                <div class="theme-options">

                    <button
                        class="
                            theme-option
                            ${
                                current === "light"
                                    ? "active"
                                    : ""
                            }
                        "
                        onclick="
                            setProgressTheme('light')
                        "
                    >

                        <div class="theme-preview light-preview">

                            <div class="preview-sidebar"></div>

                            <div class="preview-content">

                                <div></div>
                                <div></div>
                                <div></div>

                            </div>

                        </div>


                        <div class="theme-option-text">

                            <strong>
                                Chiaro
                            </strong>

                            <span>
                                Sempre chiaro
                            </span>

                        </div>


                        <span class="theme-check">
                            ✓
                        </span>

                    </button>


                    <button
                        class="
                            theme-option
                            ${
                                current === "dark"
                                    ? "active"
                                    : ""
                            }
                        "
                        onclick="
                            setProgressTheme('dark')
                        "
                    >

                        <div class="theme-preview dark-preview">

                            <div class="preview-sidebar"></div>

                            <div class="preview-content">

                                <div></div>
                                <div></div>
                                <div></div>

                            </div>

                        </div>


                        <div class="theme-option-text">

                            <strong>
                                Scuro
                            </strong>

                            <span>
                                Più riposante di notte
                            </span>

                        </div>


                        <span class="theme-check">
                            ✓
                        </span>

                    </button>


                    <button
                        class="
                            theme-option
                            ${
                                current === "system"
                                    ? "active"
                                    : ""
                            }
                        "
                        onclick="
                            setProgressTheme('system')
                        "
                    >

                        <div class="theme-preview system-preview">

                            <div class="preview-half"></div>

                            <div class="preview-half"></div>

                        </div>


                        <div class="theme-option-text">

                            <strong>
                                Sistema
                            </strong>

                            <span>
                                Segue le impostazioni
                                del dispositivo
                            </span>

                        </div>


                        <span class="theme-check">
                            ✓
                        </span>

                    </button>

                </div>

            </div>

        </div>

    `;

}


function setProgressTheme(theme) {

    localStorage.setItem(
        "progress_theme",
        theme
    );


    applyProgressTheme();


    openAppearanceSettings();

}


function applyProgressTheme() {

    const theme =
        localStorage.getItem(
            "progress_theme"
        ) || "system";


    document.documentElement
        .setAttribute(
            "data-theme",
            theme
        );

}
