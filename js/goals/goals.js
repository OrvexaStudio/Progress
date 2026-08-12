function renderGoalsPage() {

    const data = loadData();

    const content =
        document.querySelector("#app-content");

    content.innerHTML = `

        <div class="page">

            <div class="page-toolbar">

                <div>
                    <h2>I tuoi obiettivi</h2>

                    <p>
                        Trasforma quello che vuoi
                        ottenere in un percorso concreto.
                    </p>
                </div>

                <button
                    class="primary-button"
                    onclick="openGoalModal()"
                >
                    + Nuovo obiettivo
                </button>

            </div>

            <div class="goals-grid">

                ${
                    data.goals.length
                        ? data.goals
                            .map(renderGoalPreview)
                            .join("")
                        : renderEmptyGoals()
                }

            </div>

        </div>

        <div id="goal-modal-container"></div>

    `;
}


function renderGoalPreview(goal) {

    updateGoalProgress(goal);

    return `

        <article
            class="card goal-preview"
            onclick="openGoalDetails('${goal.id}')"
        >

            <div class="goal-preview-top">

                <div class="goal-icon">
                    ${goal.icon || "🎯"}
                </div>

                <div class="goal-preview-percentage">
                    ${goal.progress}%
                </div>

            </div>


            <h3>
                ${escapeHTML(goal.title)}
            </h3>

            <p>
                ${escapeHTML(
                    goal.description || "Nessuna descrizione"
                )}
            </p>


            <div class="progress-wrapper">

                <div class="progress-bar">

                    <div
                        class="progress-value"
                        style="width:${goal.progress}%"
                    ></div>

                </div>

            </div>


            <div class="goal-preview-footer">

                <span>
                    ${goal.hours || 0}h dedicate
                </span>

                <span>
                   ${goal.completedMilestones || 0}/${
    Array.isArray(goal.milestones)
        ? goal.milestones.length
        : 0
} milestone
                </span>

            </div>

        </article>

    `;
}


function renderEmptyGoals() {

    return `

        <div class="card dashboard-grid-full">

            <div class="empty-state">

                <div style="font-size:35px;">
                    🎯
                </div>

                <strong>
                    Nessun obiettivo ancora
                </strong>

                Crea il tuo primo obiettivo
                e inizia a costruire il tuo percorso.

            </div>

        </div>

    `;
}


function openGoalModal(goalId = null) {

    const data = loadData();

    const goal = goalId
        ? data.goals.find(
            item => item.id === goalId
        )
        : null;


    let container =
        document.querySelector(
            "#goal-modal-container"
        );


    // Se il contenitore non esiste,
    // lo creiamo automaticamente.
    if (!container) {

        container =
            document.createElement("div");

        container.id =
            "goal-modal-container";

        document.body.appendChild(container);

    }


    container.innerHTML = `

        <div
            class="modal-backdrop"
            onclick="closeGoalModal(event)"
        >

            <div
                class="modal"
                onclick="event.stopPropagation()"
            >

                <div class="modal-header">

                    <div>

                        <span class="eyebrow">
                            ${goal ? "MODIFICA" : "NUOVO"}
                        </span>

                        <h2>
                            ${
                                goal
                                    ? "Modifica obiettivo"
                                    : "Crea obiettivo"
                            }
                        </h2>

                    </div>


                    <button
                        class="modal-close"
                        onclick="closeGoalModal()"
                    >
                        ×
                    </button>

                </div>


                <form
                    onsubmit="
                        saveGoal(
                            event,
                            '${goal?.id || ""}'
                        )
                    "
                >

                    <label>

    Nome obiettivo

    <input
        id="goal-title"
        class="input"
        type="text"
        required
        maxlength="60"
        placeholder="Es. Diventare pilota"
        value="${
            escapeHTML(
                localStorage.getItem("tutorial_goal_title") || goal?.title || ""
            )
        }"
    >

</label>


                    <label>

                        Descrizione

                        <textarea
                            id="goal-description"
                            maxlength="180"
                            placeholder="Cosa vuoi ottenere?"
                        >${escapeHTML(
                            goal?.description || ""
                        )}</textarea>

                    </label>


                    <label>

                        Icona

                        <input
                            id="goal-icon"
                            type="text"
                            maxlength="4"
                            placeholder="🎯"
                            value="${escapeHTML(
                                goal?.icon || "🎯"
                            )}"
                        >

                    </label>


                    <label>

                        Data obiettivo

                        <input
                            id="goal-deadline"
                            type="date"
                            value="${goal?.deadline || ""}"
                        >

                    </label>


                    <button
                        class="primary-button full-width"
                        type="submit"
                    >

                        ${
                            goal
                                ? "Salva modifiche"
                                : "Crea obiettivo"
                        }

                    </button>

                </form>

            </div>

        </div>

    `;
}


function closeGoalModal(event) {

    if (
        event &&
        event.target !== event.currentTarget
    ) {
        return;
    }

    const container =
        document.querySelector("#goal-modal-container");

    if (container) {
        container.innerHTML = "";
    }
}


function saveGoal(event, goalId) {

    event.preventDefault();

    const data = loadData();


    const title =
        document.querySelector("#goal-title").value.trim();

    const description =
        document.querySelector("#goal-description").value.trim();

    const icon =
        document.querySelector("#goal-icon").value.trim() || "🎯";

    const deadline =
        document.querySelector("#goal-deadline").value;


    if (!title) return;


    if (goalId) {

        const goal =
            data.goals.find(
                item => item.id === goalId
            );

        if (!goal) return;

        goal.title = title;
        goal.description = description;
        goal.icon = icon;
        goal.deadline = deadline;

} else {

    const newGoal = {

        id:
            crypto.randomUUID(),

        title,

        description,

        icon,

        deadline,

        progress: 0,

        hours: 0,

        milestones: [],

        activities: [],

        createdAt:
            new Date().toISOString()

    };


    data.goals.push(newGoal);


    addTimelineEvent({

        type: "goal",

        title: "Nuovo obiettivo creato",

        description: title

    });

}


    saveData(data);


    localStorage.removeItem(
        "tutorial_goal_title"
    );


    if(
        localStorage.getItem(
            "progress_tutorial_goal"
        )
    ){

        localStorage.removeItem(
            "progress_tutorial_goal"
        );


        closeGoalModal();


        tutorialStep = 2;

        renderTutorialStep();


        return;

    }


    closeGoalModal();

    renderGoalsPage();
}


function deleteGoal(goalId) {

    const confirmed =
        confirm(
            "Vuoi davvero eliminare questo obiettivo?"
        );

    if (!confirmed) return;


    const data = loadData();

    data.goals =
        data.goals.filter(
            goal => goal.id !== goalId
        );

    saveData(data);

    renderGoalsPage();
}
