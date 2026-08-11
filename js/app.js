applyProgressTheme();
document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadData();

        initializeNavigation();
        initializeMobileSidebar();

        navigateTo("dashboard");

    }
);
