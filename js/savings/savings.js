function renderSavingsPage() {

    const data = loadData();

    const content =
        document.querySelector("#app-content");


    content.innerHTML = `

        <div class="page">

            <div class="page-toolbar">

                <div>

                    <h2>
                        I tuoi risparmi
                    </h2>

                    <p>
                        Trasforma ciò che vuoi comprare
                        in un piano concreto.
                    </p>

                </div>


                <button
                    class="primary-button"
                    onclick="openSavingsModal()"
                >
                    + Nuovo obiettivo
                </button>

            </div>


            <div class="savings-grid">

                ${
                    data.savings.length
                        ? data.savings
                            .map(renderSavingsGoal)
                            .join("")
                        : renderEmptySavings()
                }

            </div>


            <div id="savings-modal-container"></div>

        </div>

    `;

}

function renderSavingsGoal(goal) {

    const calculation =
        calculateSavingsGoal(goal);


    const plan =
        generateSavingsPlan(goal);


    const status =
        getSavingsStatus(goal);


    return `

        <article
            class="card savings-goal-card"
        >

            <div class="savings-goal-header">

                <div class="goal-icon">
                    ${goal.icon || "💰"}
                </div>


                <div>

                    <h3>
                        ${escapeHTML(goal.title)}
                    </h3>

                    <span
                        class="
                            savings-status
                            ${status.type}
                        "
                    >
                        ${status.label}
                    </span>

                </div>

            </div>


            <div class="savings-big-number">

                <strong>
                    ${formatCurrency(calculation.saved)}
                </strong>

                <span>
                    / ${formatCurrency(calculation.target)}
                </span>

            </div>


            <div class="progress-wrapper">

                <div class="progress-info">

                    <span>
                        Progresso
                    </span>

                    <span>
                        ${Math.round(
                            calculation.percentage
                        )}%
                    </span>

                </div>


                <div class="progress-bar">

                    <div
                        class="progress-value"
                        style="
                            width:
                            ${calculation.percentage}%
                        "
                    ></div>

                </div>

            </div>


            <div class="savings-numbers">

                <div>

                    <strong>
                        ${formatCurrency(
                            calculation.remaining
                        )}
                    </strong>

                    <span>
                        Mancano
                    </span>

                </div>


                <div>

                    <strong>
                        ${calculation.days}
                    </strong>

                    <span>
                        Giorni
                    </span>

                </div>

            </div>


            ${
                plan.status === "active"
                    ? `
                        <div class="savings-plan-box">

                            <span class="eyebrow">
                                PIANO CONSIGLIATO
                            </span>

                            <strong>
                                ${formatCurrency(
                                    plan.monthly
                                )}
                                / mese
                            </strong>

                            <p>
                                ${escapeHTML(
                                    plan.message
                                )}
                            </p>

                        </div>
                    `
                    : `
                        <div class="savings-plan-box">

                            <strong>
                                ${escapeHTML(
                                    plan.message
                                )}
                            </strong>

                        </div>
                    `
            }


<div class="savings-card-actions">

    <button
        class="secondary-button"
        onclick="
            openAddMoneyModal(
                '${goal.id}'
            )
        "
    >
        + Aggiungi soldi
    </button>

    <button
        class="secondary-button"
        onclick="
            openSavingsDetails(
                '${goal.id}'
            )
        "
    >
        Dettagli
    </button>

</div>

        </article>

    `;
}

function openSavingsModal() {

    const container =
        document.querySelector(
            "#savings-modal-container"
        );


    container.innerHTML = `

        <div
            class="modal-backdrop"
            onclick="closeSavingsModal(event)"
        >

            <div
                class="modal"
                onclick="event.stopPropagation()"
            >

                <div class="modal-header">

                    <div>

                        <span class="eyebrow">
                            NUOVO OBIETTIVO
                        </span>

                        <h2>
                            Crea un obiettivo
                        </h2>

                    </div>


                    <button
                        class="modal-close"
                        onclick="closeSavingsModal()"
                    >
                        ×
                    </button>

                </div>


                <form
                    onsubmit="
                        saveSavingsGoal(event)
                    "
                >

                    <label>

                        Cosa vuoi comprare?

                        <input
                            id="savings-title"
                            type="text"
                            maxlength="60"
                            placeholder="Es. Nuovo iPhone"
                            required
                        >

                    </label>


                    <label>

                        Quanto costa?

                        <input
                            id="savings-target"
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="1199"
                            required
                        >

                    </label>


                    <label>

                        Quanto hai già?

                        <input
                            id="savings-saved"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="340"
                            value="0"
                        >

                    </label>


                    <label>

                        Entro quando?

                        <input
                            id="savings-deadline"
                            type="date"
                            required
                        >

                    </label>


                    <label>

                        Icona

                        <input
                            id="savings-icon"
                            type="text"
                            maxlength="4"
                            value="🎯"
                        >

                    </label>


                    <button
                        type="submit"
                        class="primary-button full-width"
                    >
                        Crea obiettivo
                    </button>

                </form>

            </div>

        </div>

    `;

}

function saveSavingsGoal(event) {

    event.preventDefault();


    const data = loadData();


    const title =
        document.querySelector(
            "#savings-title"
        ).value.trim();


    const target =
        Number(
            document.querySelector(
                "#savings-target"
            ).value
        );


    const saved =
        Number(
            document.querySelector(
                "#savings-saved"
            ).value
        ) || 0;


    const deadline =
        document.querySelector(
            "#savings-deadline"
        ).value;


    const icon =
        document.querySelector(
            "#savings-icon"
        ).value.trim() || "🎯";


    if (
        !title ||
        target <= 0 ||
        !deadline
    ) {

        return;

    }

    data.savings.push({

        id:
            crypto.randomUUID(),

        title,

        icon,

        target,

        saved:
            Math.min(
                saved,
                target
            ),

        deadline,

        createdAt:
            new Date().toISOString(),

        equivalents: [],

        deposits: []

    });


    saveData(data);


    addTimelineEvent({

        type: "savings",

        title: "Nuovo obiettivo di risparmio",

        description:
            `${title} · Obiettivo ${formatCurrency(target)}`

    });


    closeSavingsModal();

    renderSavingsPage();

}

function closeSavingsModal(event) {

    if (
        event &&
        event.target !== event.currentTarget
    ) {
        return;
    }


    const container =
        document.querySelector(
            "#savings-modal-container"
        );


    if (container) {

        container.innerHTML = "";

    }

}

function openAddMoneyModal(goalId) {

    const container =
        document.querySelector(
            "#savings-modal-container"
        );


    container.innerHTML = `

        <div
            class="modal-backdrop"
            onclick="closeSavingsModal(event)"
        >

            <div
                class="modal"
                onclick="event.stopPropagation()"
            >

                <div class="modal-header">

                    <div>

                        <span class="eyebrow">
                            RISPARMIO
                        </span>

                        <h2>
                            Aggiungi denaro
                        </h2>

                    </div>


                    <button
                        class="modal-close"
                        onclick="closeSavingsModal()"
                    >
                        ×
                    </button>

                </div>


                <form
                    onsubmit="
                        addMoneyToGoal(
                            event,
                            '${goalId}'
                        )
                    "
                >

                    <label>

                        Quanto hai messo da parte?

                        <input
                            id="deposit-amount"
                            type="number"
                            min="0.01"
                            step="0.01"
                            placeholder="50"
                            required
                        >

                    </label>


                    <label>

                        Nota

                        <input
                            id="deposit-note"
                            type="text"
                            maxlength="80"
                            placeholder="Risparmio del mese"
                        >

                    </label>


                    <button
                        type="submit"
                        class="primary-button full-width"
                    >
                        Salva risparmio
                    </button>

                </form>

            </div>

        </div>

    `;

}

function addMoneyToGoal(
    event,
    goalId
) {

    event.preventDefault();


    const amount =
        Number(
            document.querySelector(
                "#deposit-amount"
            ).value
        );


    const note =
        document.querySelector(
            "#deposit-note"
        ).value.trim();


    if (
        !amount ||
        amount <= 0
    ) {
        return;
    }


    const data = loadData();


    const goal =
        data.savings.find(
            item => item.id === goalId
        );


    if (!goal) return;


    const remaining =
        Math.max(
            0,
            goal.target - goal.saved
        );


    const actualAmount =
        Math.min(
            amount,
            remaining
        );


    goal.saved += actualAmount;


    if (!goal.deposits) {
        goal.deposits = [];
    }


    goal.deposits.push({

        id:
            crypto.randomUUID(),

        amount:
            actualAmount,

        note,

        date:
            new Date().toISOString()

    });


    saveData(data);

    closeSavingsModal();

    renderSavingsPage();

}

function openSavingsDetails(goalId) {

    const data = loadData();


    const goal =
        data.savings.find(
            item => item.id === goalId
        );


    if (!goal) return;


    const calculation =
        calculateSavingsGoal(goal);


    const content =
        document.querySelector(
            "#app-content"
        );


    content.innerHTML = `

        <div class="page">

            <button
                class="back-button"
                onclick="renderSavingsPage()"
            >
                ← Tutti i risparmi
            </button>


<div class="goal-detail-header">

    <div>

        <div class="goal-detail-icon">
            ${goal.icon}
        </div>

        <h2>
            ${escapeHTML(goal.title)}
        </h2>

        <p>
            Il tuo piano per raggiungere
            questo obiettivo.
        </p>

    </div>

    <div class="goal-detail-actions">

        <button
            class="secondary-button"
            onclick="
                openSavingsEditModal(
                    '${goal.id}'
                )
            "
        >
            Modifica
        </button>

        <button
            class="danger-button"
            onclick="
                deleteSavingsGoal(
                    '${goal.id}'
                )
            "
        >
            Elimina
        </button>

    </div>

</div>


            <div class="detail-stats">

                <div class="card detail-stat">

                    <span>RISPARMIATI</span>

                    <strong>
                        ${formatCurrency(
                            calculation.saved
                        )}
                    </strong>

                    <small>
                        su ${formatCurrency(
                            calculation.target
                        )}
                    </small>

                </div>


                <div class="card detail-stat">

                    <span>MANCANO</span>

                    <strong>
                        ${formatCurrency(
                            calculation.remaining
                        )}
                    </strong>

                    <small>
                        da raggiungere
                    </small>

                </div>


                <div class="card detail-stat">

                    <span>AL GIORNO</span>

                    <strong>
                        ${formatCurrency(
                            calculation.daily
                        )}
                    </strong>

                    <small>
                        piano necessario
                    </small>

                </div>

            </div>


            ${renderSavingsEquivalents(goal)}

            ${renderDeposits(goal)}

        </div>

    `;

}

function renderSavingsEquivalents(goal) {

    const amount =
        Number(goal.target);


    const equivalents = [
        {
            icon: "⏱️",
            name: "Ore di lavoro",
            value: 10,
            unit: "€/ora"
        },
        {
            icon: "🍕",
            name: "Cene",
            value: 10,
            unit: "€/cena"
        },
        {
            icon: "⛽",
            name: "Pieni di benzina",
            value: 50,
            unit: "€/pieno"
        },
        {
            icon: "🎧",
            name: "Acquisti",
            value: 100,
            unit: "€/acquisto"
        }
    ];


    return `

        <section class="card savings-equivalents">

            <div class="card-header">

                <div>

                    <div class="card-title">
                        Quanto vale davvero?
                    </div>

                    <div class="card-subtitle">
                        ${formatCurrency(amount)}
                        visto in modo diverso.
                    </div>

                </div>

            </div>


            <div class="equivalent-grid">

                ${
                    equivalents.map(item => `

                        <div class="equivalent">

                            <span class="equivalent-icon">
                                ${item.icon}
                            </span>

                            <strong>
                                ${Math.round(
                                    calculateEquivalent(
                                        amount,
                                        item.value
                                    )
                                )}
                            </strong>

                            <span>
                                ${item.name}
                            </span>

                            <small>
                                ${item.value} ${item.unit}
                            </small>

                        </div>

                    `).join("")
                }

            </div>

        </section>

    `;

}

function renderDeposits(goal) {

    const deposits =
        goal.deposits || [];


    return `

        <section class="card deposits-card">

            <div class="card-header">

                <div>

                    <div class="card-title">
                        Storico risparmi
                    </div>

                    <div class="card-subtitle">
                        I tuoi versamenti
                    </div>

                </div>

            </div>


            ${
                deposits.length
                    ? `

                        <div class="activity-list">

                            ${
                                deposits
                                    .slice()
                                    .reverse()
                                    .map(
                                        deposit => `

                                            <div class="activity-item">

                                                <div class="activity-dot"></div>


                                                <div class="activity-content">

                                                    <div class="activity-name">
                                                        + ${formatCurrency(
                                                            deposit.amount
                                                        )}
                                                    </div>


                                                    <div class="activity-time">

                                                        ${
                                                            escapeHTML(
                                                                deposit.note ||
                                                                "Risparmio"
                                                            )
                                                        }

                                                        ·

                                                        ${
                                                            formatDate(
                                                                deposit.date
                                                            )
                                                        }

                                                    </div>


                                                    <div class="activity-actions">

                                                        <button
                                                            class="text-button"
                                                            onclick="
                                                                editDeposit(
                                                                    '${goal.id}',
                                                                    '${deposit.id}'
                                                                )
                                                            "
                                                        >
                                                            Modifica
                                                        </button>


                                                        <button
                                                            class="text-button danger-text"
                                                            onclick="
                                                                deleteDeposit(
                                                                    '${goal.id}',
                                                                    '${deposit.id}'
                                                                )
                                                            "
                                                        >
                                                            Elimina
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        `
                                    )
                                    .join("")
                            }

                        </div>

                    `
                    : `

                        <div class="empty-state">

                            <strong>
                                Nessun versamento
                            </strong>

                            Inizia a mettere da parte
                            qualcosa per questo obiettivo.

                        </div>

                    `
            }

        </section>

    `;

}

function updateSavingsGoal(
    event,
    goalId
) {

    event.preventDefault();


    const data = loadData();


    const goal =
        data.savings.find(
            item => item.id === goalId
        );


    if (!goal) return;


    const title =
        document.querySelector(
            "#edit-savings-title"
        ).value.trim();


    const target =
        Number(
            document.querySelector(
                "#edit-savings-target"
            ).value
        );


    const deadline =
        document.querySelector(
            "#edit-savings-deadline"
        ).value;


    const icon =
        document.querySelector(
            "#edit-savings-icon"
        ).value.trim() || "🎯";


    if (
        !title ||
        target <= 0 ||
        !deadline
    ) {
        return;
    }


    goal.title =
        title;


    goal.target =
        target;


    goal.deadline =
        deadline;


    goal.icon =
        icon;


    // Se il nuovo prezzo è inferiore
    // a quanto già risparmiato,
    // consideriamo l'obiettivo completato.
    if (goal.saved > target) {

        goal.saved =
            target;

    }


    saveData(data);

    closeSavingsModal();

    renderSavingsPage();

}

function deleteSavingsGoal(goalId) {

    const data = loadData();


    const goal =
        data.savings.find(
            item => item.id === goalId
        );


    if (!goal) return;


    const confirmed =
        confirm(
            `Vuoi eliminare l'obiettivo "${goal.title}"?`
        );


    if (!confirmed) {
        return;
    }


    data.savings =
        data.savings.filter(
            item => item.id !== goalId
        );


    saveData(data);

    renderSavingsPage();

}

function renderEmptySavings() {

    return `

        <div class="empty-state savings-empty-state">

            <div class="empty-state-icon">
                €
            </div>

            <h3>
                Nessun obiettivo di risparmio
            </h3>

            <p>
                Crea il tuo primo obiettivo
                e trasforma un desiderio
                in un piano concreto.
            </p>

            <button
                class="primary-button"
                onclick="openSavingsModal()"
            >
                + Crea il primo obiettivo
            </button>

        </div>

    `;

}

function deleteDeposit(goalId, depositId) {

    if(
        !confirm(
            "Eliminare questo versamento?"
        )
    ) return;


    const data = loadData();


    const goal =
        data.savings.find(
            item => item.id === goalId
        );


    if(!goal) return;


    const deposit =
        goal.deposits.find(
            item => item.id === depositId
        );


    if(!deposit) return;


    goal.saved =
    Math.max(
        0,
        goal.saved - deposit.amount
    );


    goal.deposits =
        goal.deposits.filter(
            item =>
            item.id !== depositId
        );


    saveData(data);

    openSavingsDetails(goalId);

}

function editDeposit(goalId, depositId) {

    const data = loadData();


    const goal =
        data.savings.find(
            item => item.id === goalId
        );


    if (!goal) return;


    const deposit =
        goal.deposits.find(
            item => item.id === depositId
        );


    if (!deposit) return;


    const amount =
        prompt(
            "Modifica importo:",
            deposit.amount
        );


    const newAmount =
        Number(amount);


    if (
        !amount ||
        !newAmount ||
        newAmount <= 0
    ) {
        return;
    }


    const note =
        prompt(
            "Modifica nota:",
            deposit.note || ""
        );


    const difference =
        newAmount - deposit.amount;


    const newTotal =
        goal.saved + difference;


    if (newTotal > goal.target) {

        alert(
            "Il nuovo importo supera il valore dell'obiettivo."
        );

        return;

    }


    if (newTotal < 0) {

        alert(
            "Il nuovo totale non può essere negativo."
        );

        return;

    }


    goal.saved =
        newTotal;


    deposit.amount =
        newAmount;


    deposit.note =
        note
            ? note.trim()
            : "";


    saveData(data);


    openSavingsDetails(goalId);

}
