const pageTitles = {
    dashboard: "Dashboard",
    goals: "Obiettivi",
    savings: "Risparmi",
    activity: "Attività",
    settings: "Impostazioni"
};


function initializeNavigation() {

    const buttons =
        document.querySelectorAll(".nav-item");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const page =
                button.dataset.page;

            navigateTo(page);
        });

    });
}


function navigateTo(page) {

    const buttons =
        document.querySelectorAll(".nav-item");

    buttons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === page
        );

    });


    document.querySelector("#page-title").textContent =
        pageTitles[page] || "Progress";


    renderPage(page);
}


function renderPage(page) {

    const content =
        document.querySelector("#app-content");


    if (page === "dashboard") {

        renderDashboard();
        return;
    }


    content.innerHTML = `

        <div class="page placeholder-page">

            <div>

                <div class="placeholder-icon">
                    ${getPageIcon(page)}
                </div>

                <h2>
                    ${pageTitles[page]}
                </h2>

                <p>
                    Questa sezione verrà costruita
                    nel prossimo step.
                </p>

            </div>

        </div>

    `;
}


function getPageIcon(page) {

    const icons = {
        goals: "◎",
        savings: "€",
        activity: "↗",
        settings: "⚙"
    };

    return icons[page] || "•";
}
