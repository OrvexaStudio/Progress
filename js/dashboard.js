function renderDashboard() {

    const data = loadData();

    const content =
        document.querySelector("#app-content");


    if (!content) return;


    const mainGoal =
        data.goals && data.goals.length > 0
            ? data.goals[0]
            : null;


    const mainSavings =
        data.savings && data.savings.length > 0
            ? data.savings[0]
            : null;



    content.innerHTML = `

        <div class="page">
        
<div class="dashboard-grid">


    ${renderStreakCard()}


    ${
        mainGoal
        ?
        renderGoalCard(mainGoal)
        :
        renderEmptyGoalCard()
    }


    ${
        mainSavings
        ?
        renderSavingsCard(mainSavings)
        :
        renderEmptySavingsCard()
    }


    ${renderActivityCard(data.activities || [])}


</div>

        </div>

    `;
}

function renderEmptyGoalCard(){

    return `

    <div class="card empty-card">

        <span class="eyebrow">
            OBIETTIVI
        </span>


        <h3>
            Nessun obiettivo
        </h3>


        <p>
            Crea il tuo primo obiettivo
            per iniziare il percorso.
        </p>


    </div>

    `;

}



function renderEmptySavingsCard(){

    return `

    <div class="card empty-card">

        <span class="eyebrow">
            RISPARMI
        </span>


        <h3>
            Nessun piano
        </h3>


        <p>
            Imposta un obiettivo economico
            e monitora i tuoi progressi.
        </p>


    </div>

    `;

}


function renderGoalCard(goal, activities) {
const improvement =
    calculateImprovement(activities);
    if (!goal) {

        return `
            <div class="card">
                <div class="empty-state">
                    <strong>Nessun obiettivo</strong>
                    Crea il tuo primo obiettivo.
                </div>
            </div>
        `;
    }


    return `

        <article class="card goal-card">

            <div class="goal-top">

                <div class="goal-icon">
                    ${goal.icon}
                </div>

                <div class="goal-percentage">
                    ${goal.progress}%
                </div>

            </div>


            <h2 class="goal-name">
                ${escapeHTML(goal.title)}
            </h2>

            <p class="goal-description">
                ${escapeHTML(goal.description)}
            </p>


            <div class="progress-wrapper">

                <div class="progress-info">

                    <span>Progresso</span>

                    <span>
                        ${goal.progress}%
                    </span>

                </div>

                <div class="progress-bar">

                    <div
                        class="progress-value"
                        style="width:${goal.progress}%"
                    ></div>

                </div>

            </div>


<div class="stats-grid">

    <div class="stat">

        <div class="stat-value">
            ${goal.hours}h
        </div>

        <div class="stat-label">
            Ore dedicate
        </div>

    </div>


    <div class="stat">

        <div class="stat-value">
            ${Array.isArray(goal.milestones) ? goal.milestones.length : 0}
        </div>

        <div class="stat-label">
            Milestone
        </div>

    </div>


<div class="stat">

    <div class="stat-value">

        ${
            improvement === null
            ?
            "—"
            :
            (improvement > 0 ? "+" : "")
            + improvement + "%"
        }

    </div>

    <div class="stat-label">
        Miglioramento
    </div>

</div>


</div>




        </article>

    `;
}


function renderSavingsCard(goal) {

    if (!goal) {

        return `
            <div class="card">
                <div class="empty-state">
                    <strong>Nessun obiettivo di risparmio</strong>
                    Crea il tuo primo obiettivo.
                </div>
            </div>
        `;
    }


    const percentage =
        calculatePercentage(
            goal.saved,
            goal.target
        );


    const remaining =
        Math.max(
            0,
            goal.target - goal.saved
        );


    const days =
        getDaysRemaining(goal.deadline);


    const daily =
        days > 0
            ? remaining / days
            : remaining;


    return `

        <article class="card">

            <div class="card-header">

                <div>

                    <div class="card-title">
                        ${goal.icon}
                        ${escapeHTML(goal.title)}
                    </div>

                    <div class="card-subtitle">
                        Obiettivo di risparmio
                    </div>

                </div>

            </div>


            <div class="savings-amount">

                <span class="savings-current">
                    ${formatCurrency(goal.saved)}
                </span>

                <span class="savings-total">
                    / ${formatCurrency(goal.target)}
                </span>

            </div>


            <div class="progress-wrapper">

                <div class="progress-bar">

                    <div
                        class="progress-value"
                        style="width:${percentage}%"
                    ></div>

                </div>

            </div>


            <div class="savings-meta">

                <span>
                    Mancano ${formatCurrency(remaining)}
                </span>

                <span>
                    ${Math.round(percentage)}%
                </span>

            </div>


            <div class="stats-grid">

                <div class="stat">

                    <div class="stat-value">
                        ${formatCurrency(daily)}
                    </div>

                    <div class="stat-label">
                        Al giorno
                    </div>

                </div>


                <div class="stat">

                    <div class="stat-value">
                        ${days}
                    </div>

                    <div class="stat-label">
                        Giorni rimasti
                    </div>

                </div>


                <div class="stat">

                    <div class="stat-value">
                        ${formatDate(goal.deadline).split(" ")[0]}
                    </div>

                    <div class="stat-label">
                        Scadenza
                    </div>

                </div>

            </div>

        </article>

    `;
}

function calculateImprovement(activities) {

    if (!activities || activities.length < 2) {

        return null;

    }


    const now = new Date();


    const currentStart =
        new Date(
            now.getTime() - 7 * 24 * 60 * 60 * 1000
        );


    const previousStart =
        new Date(
            now.getTime() - 14 * 24 * 60 * 60 * 1000
        );



    const current =
        activities.filter(
            activity =>
                new Date(activity.date) >= currentStart
        ).length;



    const previous =
        activities.filter(
            activity =>
                new Date(activity.date) >= previousStart &&
                new Date(activity.date) < currentStart
        ).length;



    if (previous === 0) {

        return null;

    }


    return Math.round(
        ((current - previous) / previous) * 100
    );

}

function renderActivityCard(activities) {
const improvement =
    calculateImprovement(activities);
    return `

        <article class="card dashboard-grid-full">

            <div class="card-header">

                <div>

                    <div class="card-title">
                        Attività recenti
                    </div>

                    <div class="card-subtitle">
                        I tuoi ultimi progressi
                    </div>

                </div>

            </div>
<div class="activity-stat">

    <strong>
        ${
            improvement === null
            ?
            "—"
            :
            (improvement > 0 ? "+" : "")
            + improvement + "%"
        }
    </strong>


    <span>
        Miglioramento
    </span>


    <small>
        ${
            improvement === null
            ?
            "Inizia il tuo percorso"
            :
            "Rispetto alla settimana precedente"
        }
    </small>

</div>

            <div class="activity-list">

                ${
                    activities.length
                        ? activities
                            .slice(0, 5)
                            .map(renderActivity)
                            .join("")
                        : `
                            <div class="empty-state">
                                <strong>
                                    Nessuna attività
                                </strong>
                                Inizia a registrare i tuoi progressi.
                            </div>
                        `
                }

            </div>

        </article>

    `;
}


function renderActivity(activity) {

    const date =
        new Date(activity.date);


    const dateText =
        date.toLocaleDateString(
            "it-IT",
            {
                day: "numeric",
                month: "short"
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
                    ${activity.duration} min · ${dateText}
                </div>

            </div>

        </div>

    `;
}

window.addEventListener(
    "dataUpdated",
    () => {
        renderDashboard();
    }
);

function renderStreakCard(){

    const streak =
        calculateStreak();


    return `

    <article class="card">

        <div class="card-header">

            <div>

                <div class="card-title">
                    🔥 Streak
                </div>

                <div class="card-subtitle">
                    La tua costanza
                </div>

            </div>

        </div>


        <div class="streak-number">

            ${streak.current}

            <span>
                giorni consecutivi
            </span>

        </div>


        <div class="stat-label">

            Record personale:
            ${streak.record} giorni

        </div>


    </article>

    `;

}
