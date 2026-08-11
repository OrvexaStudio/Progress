function renderActivityPage() {

    const data =
        loadData();


    if (!data.activities) {
        data.activities = [];
    }


    const activities =
        data.activities
            .slice()
            .sort(
                (a, b) =>
                    new Date(b.date)
                    -
                    new Date(a.date)
            );


    const stats =
        calculateActivityStats(
            activities
        );


    const content =
        document.querySelector(
            "#app-content"
        );


    content.innerHTML = `

        <div class="page">

            <div class="page-toolbar">

                <div>

                    <h2>
                        Le tue attività
                    </h2>

                    <p>
                        Tutto quello che fai
                        costruisce il tuo progresso.
                    </p>

                </div>


                <button
                    class="primary-button"
                    onclick="openActivityModal()"
                >
                    + Nuova attività
                </button>

            </div>


            ${renderActivityStats(stats)}


            <div class="activity-toolbar">

                <div>

                    <span class="eyebrow">
                        CRONOLOGIA
                    </span>

                    <h3>
                        Attività recenti
                    </h3>

                </div>


                <select
                    id="activity-filter"
                    onchange="
                        filterActivities()
                    "
                >

                    <option value="all">
                        Tutte
                    </option>

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

            </div>


            <div
                id="activity-list"
                class="activity-list-page"
            >

                ${
                    activities.length
                        ? activities
                            .map(
                                renderActivityItem
                            )
                            .join("")
                        : renderEmptyActivities()
                }

            </div>


            <div
                id="activity-modal-container"
            ></div>

        </div>

    `;

}


function renderActivityStats(stats) {

    return `

        <div class="activity-stats-grid">

            <div class="card activity-stat">

                <span>
                    TEMPO TOTALE
                </span>

                <strong>
                    ${formatActivityTime(
                        stats.totalMinutes
                    )}
                </strong>

                <small>
                    dedicato alle attività
                </small>

            </div>


            <div class="card activity-stat">

                <span>
                    ATTIVITÀ
                </span>

                <strong>
                    ${stats.totalActivities}
                </strong>

                <small>
                    registrate
                </small>

            </div>


            <div class="card activity-stat">

                <span>
                    COMPLETATE
                </span>

                <strong>
                    ${stats.completed}
                </strong>

                <small>
                    attività concluse
                </small>

            </div>

        </div>

    `;

}


function renderActivityItem(activity) {

    return `

        <article
            class="card activity-item-page"
            data-category="${escapeHTML(
                activity.category
            )}"
        >

            <div class="activity-item-main">

                <div class="activity-category-icon">
                    ${getActivityIcon(
                        activity.category
                    )}
                </div>


                <div class="activity-content">

                    <div class="activity-title-row">

                        <h3>
                            ${escapeHTML(
                                activity.title
                            )}
                        </h3>

                        ${
                            activity.completed
                                ? `
                                    <span
                                        class="
                                            activity-completed
                                        "
                                    >
                                        Completata
                                    </span>
                                `
                                : ""
                        }

                    </div>


                    <div class="activity-meta">

                        <span>
                            ${escapeHTML(
                                activity.category
                            )}
                        </span>

                        <span>·</span>

                        <span>
                            ${formatActivityTime(
                                activity.duration
                            )}
                        </span>

                        <span>·</span>

                        <span>
                            ${formatDate(
                                activity.date
                            )}
                        </span>

                    </div>


                    ${
                        activity.note
                            ? `
                                <p class="activity-note">
                                    ${escapeHTML(
                                        activity.note
                                    )}
                                </p>
                            `
                            : ""
                    }

                </div>

            </div>


            <div class="activity-actions">

                <button
                    class="text-button danger-text"
                    onclick="
                        deleteActivity(
                            '${activity.id}'
                        )
                    "
                >
                    Elimina
                </button>

            </div>

        </article>

    `;

}


function renderEmptyActivities() {

    return `

        <div class="empty-state activity-empty">

            <div class="empty-state-icon">
                ↗
            </div>

            <h3>
                Nessuna attività
            </h3>

            <p>
                Registra ciò che fai e
                inizia a costruire il tuo storico.
            </p>

            <button
                class="primary-button"
                onclick="openActivityModal()"
            >
                + Registra attività
            </button>

        </div>

    `;

}


function filterActivities() {

    const filter =
        document.querySelector(
            "#activity-filter"
        ).value;


    document
        .querySelectorAll(
            ".activity-item-page"
        )
        .forEach(item => {

            const category =
                item.dataset.category;


            item.style.display =
                filter === "all" ||
                category === filter
                    ? ""
                    : "none";

        });

}


function deleteActivity(id) {

    const data = loadData();

    if (!Array.isArray(data.activities)) {
        data.activities = [];
        saveData(data);
        renderActivityPage();
        return;
    }


    const index =
        data.activities.findIndex(
            activity =>
                String(activity.id) === String(id)
        );


    if (index === -1) {
        console.error(
            "Attività non trovata:",
            id
        );

        return;
    }


    const activity =
        data.activities[index];


    const confirmed =
        window.confirm(
            `Vuoi eliminare "${activity.title}"?`
        );


    if (!confirmed) {
        return;
    }


    data.activities.splice(
        index,
        1
    );


    saveData(data);

    renderActivityPage();

}


function getActivityIcon(category) {

    const icons = {

        Studio: "📚",

        Lavoro: "◼",

        Allenamento: "↗",

        Progetto: "◆",

        Personale: "○",

        Altro: "•"

    };


    return icons[category] || "•";

}


function formatActivityTime(minutes) {

    minutes =
        Number(minutes) || 0;


    const hours =
        Math.floor(
            minutes / 60
        );


    const mins =
        minutes % 60;


    if (hours === 0) {
        return `${mins} min`;
    }


    if (mins === 0) {
        return `${hours}h`;
    }


    return `${hours}h ${mins}m`;

}
