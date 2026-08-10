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


    milestone.completed =
        !milestone.completed;


    updateGoalProgress(goal);

    saveData(data);

    openGoalDetails(goalId);
}
