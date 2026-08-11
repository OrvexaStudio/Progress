function refreshApp(){

    if(typeof loadDashboard === "function"){
        loadDashboard();
    }

    if(typeof loadGoals === "function"){
        loadGoals();
    }

    if(typeof loadSavings === "function"){
        loadSavings();
    }

    if(typeof loadActivity === "function"){
        loadActivity();
    }

}


// evento globale
window.addEventListener(
    "dataUpdated",
    refreshApp
);
