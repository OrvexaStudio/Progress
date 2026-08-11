const pageTitles = {
    dashboard: "Dashboard",
    goals: "Obiettivi",
    savings: "Risparmi",
    activity: "Attività",
    settings: "Impostazioni"
};


function initializeNavigation() {

    const buttons = document.querySelectorAll(".nav-item");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const page = button.dataset.page;

            navigateTo(page);

        });

    });

}


function navigateTo(page) {

    const buttons = document.querySelectorAll(".nav-item");

    buttons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === page
        );

    });


    const title =
        pageTitles[page] || "Progress";

    const titleElement =
    document.querySelector("#page-title");

if(titleElement){
    titleElement.textContent = title;
}


    renderPage(page);

}


function renderPage(page) {

    const content =
        document.querySelector("#app-content");


    if (!content) {
        return;
    }


    if (page === "dashboard") {

        renderDashboard();

        return;
    }


    if (page === "goals") {

        renderGoalsPage();

        return;
    }
   
    if (page === "savings") {

    renderSavingsPage();

    return;
}
if (page === "activity") {

    renderActivityPage();

    return;
}
    if (page === "settings") {

    renderSettingsPage();

    return;

}

    content.innerHTML = `

        <div class="page placeholder-page">

            <div>

                <div class="placeholder-icon">
                    ${getPageIcon(page)}
                </div>

                <h2>
                    ${pageTitles[page] || "Progress"}
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

function initializeMobileSidebar() {

    const toggle =
        document.querySelector(
            "#mobile-sidebar-toggle"
        );

    const overlay =
        document.querySelector(
            "#mobile-sidebar-overlay"
        );

    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    if (
        !toggle ||
        !overlay ||
        !sidebar
    ) {
        return;
    }


    function toggleSidebar() {

        const isOpen =
            sidebar.classList.contains(
                "mobile-open"
            );


        sidebar.classList.toggle(
            "mobile-open",
            !isOpen
        );

        overlay.classList.toggle(
            "active",
            !isOpen
        );

        toggle.classList.toggle(
            "active",
            !isOpen
        );

        toggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

    }


    toggle.addEventListener(
        "click",
        toggleSidebar
    );


    overlay.addEventListener(
        "click",
        toggleSidebar
    );


    const navItems =
        sidebar.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 768
                ) {

                    sidebar.classList.remove(
                        "mobile-open"
                    );

                    overlay.classList.remove(
                        "active"
                    );

                    toggle.classList.remove(
                        "active"
                    );

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    });

}
