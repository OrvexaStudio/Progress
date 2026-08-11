applyProgressTheme();

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadData();

        initializeNavigation();
        initializeMobileSidebar();

        updateGlobalProfile();

        navigateTo("dashboard");

    }
);
