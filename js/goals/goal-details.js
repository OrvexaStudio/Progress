function openGoalDetails(goalId) {

    const data = loadData();

    const goal =
        data.goals.find(
            item => item.id === goalId
        );


    if (!goal) return;


    updateGoalProgress(goal);

    saveData(data);


    const content =
        document.querySelector("#app-content");


    content.innerHTML = `

        <div class="page">

            <button
                class="back-button"
                onclick="renderGoalsPage()"
            >
                ← Tutti gli obiettivi
            </button>


            <div class="goal-detail-header">

                <div>

                    <div class="goal-detail-icon">
                        ${goal.icon || "🎯"}
                    </div>

                    <h2>
                        ${escapeHTML(goal.title)}
                    </h2>

                    <p>
                        ${escapeHTML(
                            goal.description || ""
                        )}
                    </p>

                </div>


                <div class="goal-detail-actions">

                    <button
                        class="secondary-button"
                        onclick="openGoalModal('${goal.id}')"
                    >
                        Modifica
                    </button>

                    <button
                        class="danger-button"
                        onclick="deleteGoal('${goal.id}')"
                    >
                        Elimina
                    </button>

                </div>

            </div>


            <div class="goal-detail-progress card">

                <div class="detail-progress-main">

                    <div>

                        <span class="eyebrow">
                            PROGRESSO TOTALE
                        </span>

                        <div class="detail-percentage">
                            ${goal.progress}%
                        </div>

                    </div>


                    <div class="detail-progress-circle">

                        <svg viewBox="0 0 100 100">

                            <circle
                                class="circle-bg"
                                cx="50"
                                cy="50"
                                r="42"
                            />

                            <circle
                                class="circle-value"
                                cx="50"
                                cy="50"
                                r="42"
                                style="
                                    stroke-dashoffset:
                                    ${264 - (264 * goal.progress / 100)}
                                "
                            />

                        </svg>

                    </div>

                </div>


                <div class="progress-bar large">

                    <div
                        class="progress-value"
                        style="width:${goal.progress}%"
                    ></div>

                </div>

            </div>


            <div class="detail-stats">

                <div class="card detail-stat">

                    <span>ORE</span>

                    <strong>
                        ${goal.hours || 0}h
                    </strong>

                    <small>
                        tempo dedicato
                    </small>

                </div>


                <div class="card detail-stat">

                    <span>MILESTONE</span>

                    <strong>
                        ${goal.completedMilestones || 0}
                    </strong>

                    <small>
                        completate
                    </small>

                </div>


                <div class="card detail-stat">

                    <span>ATTIVITÀ</span>

                    <strong>
                        ${goal.activities?.length || 0}
                    </strong>

                    <small>
                        registrate
                    </small>

                </div>

            </div>


            <div class="detail-columns">

                ${renderMilestones(goal)}

                ${renderGoalActivities(goal)}

            </div>

        </div>

    `;
}

function renderMilestones(goal) {

    const milestones =
        goal.milestones || [];


    return `

        <section class="card">

            <div class="card-header">

                <div>

                    <div class="card-title">
                        Milestone
                    </div>

                    <div class="card-subtitle">
                        I passi che ti portano al risultato
                    </div>

                </div>

                <button
                    class="small-button"
                    onclick="addMilestone('${goal.id}')"
                >
                    + Aggiungi
                </button>

            </div>


            <div class="milestone-list">

                ${
                    milestones.length
                        ? milestones
                            .map(
                                milestone =>
                                    renderMilestone(
                                        milestone,
                                        goal.id
                                    )
                            )
                            .join("")
                        : `
                            <div class="empty-state">
                                <strong>
                                    Nessuna milestone
                                </strong>

                                Dividi il tuo obiettivo
                                in piccoli traguardi.
                            </div>
                        `
                }

            </div>

        </section>

    `;
}


function renderMilestone(milestone, goalId) {

    return `

        <div class="milestone-item">

            <button
                class="
                    milestone-check
                    ${milestone.completed ? "completed" : ""}
                "
                onclick="
                    toggleMilestone(
                        '${goalId}',
                        '${milestone.id}'
                    )
                "
            >
                ${milestone.completed ? "✓" : ""}
            </button>


            <div class="milestone-content">

                <strong
                    class="${milestone.completed ? "done" : ""}"
                >
                    ${escapeHTML(milestone.title)}
                </strong>

            </div>


            <div class="milestone-actions">

                <button
                    class="text-button"
                    onclick="
                        editMilestone(
                            '${goalId}',
                            '${milestone.id}'
                        )
                    "
                >
                    Modifica
                </button>


                <button
                    class="text-button danger-text"
                    onclick="
                        deleteMilestone(
                            '${goalId}',
                            '${milestone.id}'
                        )
                    "
                >
                    Elimina
                </button>

            </div>

        </div>

    `;
}


function addMilestone(goalId) {

    const title =
        prompt("Nome della milestone:");

    if (!title || !title.trim()) {
        return;
    }


    const data = loadData();

    const goal =
        data.goals.find(
            item => item.id === goalId
        );


    if (!goal) return;


    if (!goal.milestones) {
        goal.milestones = [];
    }


    goal.milestones.push({

        id:
            crypto.randomUUID(),

        title:
            title.trim(),

        completed:
            false

    });


    updateGoalProgress(goal);

    saveData(data);

    openGoalDetails(goalId);
}


function toggleMilestone(
    goalId,
    milestoneId
) {

    const data = loadData();

    const goal =
        data.goals.find(
            item => item.id === goalId
        );

    if (!goal) return;


    const milestone =
        goal.milestones.find(
            item => item.id === milestoneId
        );

    if (!milestone) return;


    const wasCompleted =
        milestone.completed === true;


    milestone.completed =
        !wasCompleted;


    updateGoalProgress(goal);


    // XP quando la milestone viene completata
    if (
        !wasCompleted &&
        milestone.completed
    ) {

        addXP(50);

        addTimelineEvent({

            type: "milestone",

            title: "Milestone completata",

            description:
                `${goal.title} · ${milestone.title}`

        });

    }


    saveData(data);

    openGoalDetails(goalId);

}
function renderGoalActivities(goal) {

    const activities =
        goal.activities || [];


    return `

        <section class="card">

            <div class="card-header">

                <div>

                    <div class="card-title">
                        Attività
                    </div>

                    <div class="card-subtitle">
                        Registra ciò che fai ogni giorno
                    </div>

                </div>

                <button
                    class="small-button"
                    onclick="addGoalActivity('${goal.id}')"
                >
                    + Registra
                </button>

            </div>


            <div class="activity-list">

                ${
                    activities.length
                        ? activities
                            .slice()
                            .reverse()
                            .slice(0, 8)
                            .map(
    activity => renderGoalActivity(activity, goal.id)
)
                            .join("")
                        : `
                            <div class="empty-state">
                                <strong>
                                    Nessuna attività
                                </strong>

                                Registra il primo passo
                                verso il tuo obiettivo.
                            </div>
                        `
                }

            </div>

        </section>

    `;
}


function renderGoalActivity(activity, goalId) {

    const date =
        new Date(activity.date);


    const dateText =
        date.toLocaleDateString(
            "it-IT",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );


    return `

        <div class="activity-item">

            <div class="activity-dot"></div>

            <div class="activity-content">

    <div class="activity-name">
        ${escapeHTML(activity.title)}
    </div>

    <div class="activity-time">
        ${activity.duration} min
        ·
        ${dateText}
    </div>

</div>


<div class="activity-actions">

    <button
        class="text-button"
        onclick="
            editGoalActivity(
                '${activity.id}'
            )
        "
    >
        Modifica
    </button>


    <button
        class="text-button danger-text"
        onclick="
            deleteGoalActivity(
                '${activity.id}'
            )
        "
    >
        Elimina
    </button>

</div>

        </div>

    `;
}


function addGoalActivity(goalId) {

    const title =
        prompt(
            "Cosa hai fatto oggi?"
        );


    if (!title || !title.trim()) {
        return;
    }


    const durationInput =
        prompt(
            "Quanti minuti hai dedicato?"
        );


    const duration =
        Number(durationInput);


    if (
        !duration ||
        duration <= 0
    ) {
        alert(
            "Inserisci una durata valida."
        );

        return;
    }


    const data = loadData();

    const goal =
        data.goals.find(
            item => item.id === goalId
        );


    if (!goal) return;


    if (!goal.activities) {
        goal.activities = [];
    }


    goal.activities.push({

        id:
            crypto.randomUUID(),

        title:
            title.trim(),

        duration,

        date:
            new Date().toISOString()

    });


    updateGoalProgress(goal);

    saveData(data);

    openGoalDetails(goalId);
}

function editMilestone(goalId, milestoneId) {

    const data = loadData();

    const goal =
        data.goals.find(
            item => item.id === goalId
        );

    if(!goal) return;


    const milestone =
        goal.milestones.find(
            item => item.id === milestoneId
        );


    if(!milestone) return;


    const title =
        prompt(
            "Modifica milestone:",
            milestone.title
        );


    if(!title || !title.trim()) return;


    milestone.title =
        title.trim();


    saveData(data);

    openGoalDetails(goalId);
}



function deleteMilestone(goalId, milestoneId) {


    if(
        !confirm(
            "Eliminare questa milestone?"
        )
    ) return;


    const data = loadData();


    const goal =
        data.goals.find(
            item => item.id === goalId
        );


    if(!goal) return;


    goal.milestones =
        goal.milestones.filter(
            item => item.id !== milestoneId
        );


    updateGoalProgress(goal);

    saveData(data);

    openGoalDetails(goalId);

}

function deleteGoalActivity(activityId) {

    if(
        !confirm(
            "Eliminare questa attività?"
        )
    ) return;


    const data = loadData();


    let goalFound = null;


    data.goals.forEach(goal => {

        if(!goal.activities) return;


        const exists =
            goal.activities.find(
                activity => activity.id === activityId
            );


        if(exists){

            goalFound = goal;

            goal.activities =
                goal.activities.filter(
                    activity =>
                    activity.id !== activityId
                );

        }

    });


    if(!goalFound) return;


    updateGoalProgress(goalFound);

    saveData(data);

    openGoalDetails(goalFound.id);

}

function editGoalActivity(activityId) {

    const data = loadData();


    let goalFound = null;
    let activityFound = null;


    data.goals.forEach(goal => {

        if(!goal.activities) return;


        const activity =
            goal.activities.find(
                item => item.id === activityId
            );


        if(activity){

            goalFound = goal;
            activityFound = activity;

        }

    });


    if(!activityFound) return;


    const title =
        prompt(
            "Modifica attività:",
            activityFound.title
        );


    if(!title || !title.trim()) return;


    const duration =
        prompt(
            "Modifica durata (minuti):",
            activityFound.duration
        );


    if(!duration || Number(duration) <= 0) return;


    activityFound.title =
        title.trim();


    activityFound.duration =
        Number(duration);


    updateGoalProgress(goalFound);

    saveData(data);

    openGoalDetails(goalFound.id);

}
