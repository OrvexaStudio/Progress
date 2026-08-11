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
