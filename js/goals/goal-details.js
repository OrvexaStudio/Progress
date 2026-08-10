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
