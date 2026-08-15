const STORAGE_KEY = "progress_app_data";


const defaultData = {

    tutorialCompleted: false,

    profile: {
        name: ""
    },

    goals: [],

    savings: [],

    activities: [],

    timeline: [],

    xp: 0

};


function loadData() {

    const saved =
        localStorage.getItem(STORAGE_KEY);


    if (!saved) {

        const data =
            structuredClone(defaultData);

        saveData(data);

        return data;

    }


    try {

        const data =
            JSON.parse(saved);


        // =========================
        // NORMALIZZAZIONE DATI
        // =========================

        if (!Array.isArray(data.goals)) {
            data.goals = [];
        }


        if (!Array.isArray(data.savings)) {
            data.savings = [];
        }


        if (!Array.isArray(data.activities)) {
            data.activities = [];
        }


        if (!Array.isArray(data.timeline)) {
            data.timeline = [];
        }


        if (!data.profile || typeof data.profile !== "object") {

            data.profile = {
                name: ""
            };

        }


        if (typeof data.xp !== "number") {

            data.xp =
                Number(data.xp) || 0;

        }


        if (typeof data.tutorialCompleted !== "boolean") {

            data.tutorialCompleted =
                Boolean(data.tutorialCompleted);

        }


        // =========================
        // NORMALIZZA GLI OBIETTIVI
        // =========================

        data.goals =
            data.goals.map(goal => {

                if (!goal || typeof goal !== "object") {
                    return null;
                }


                if (!Array.isArray(goal.milestones)) {
                    goal.milestones = [];
                }


                if (!Array.isArray(goal.activities)) {
                    goal.activities = [];
                }


                if (typeof goal.progress !== "number") {
                    goal.progress =
                        Number(goal.progress) || 0;
                }


                if (typeof goal.hours !== "number") {
                    goal.hours =
                        Number(goal.hours) || 0;
                }


                if (!goal.id) {
                    goal.id =
                        crypto.randomUUID();
                }


                return goal;

            })
            .filter(Boolean);


        // =========================
        // SALVA I DATI NORMALIZZATI
        // =========================

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );


        return data;


    } catch (error) {

        console.error(
            "Errore nel caricamento dei dati:",
            error
        );


        const data =
            structuredClone(defaultData);


        saveData(data);


        return data;

    }

}


function saveData(data) {

    if (!data || typeof data !== "object") {
        return;
    }


    // =========================
    // GARANTISCI GLI ARRAY
    // =========================

    if (!Array.isArray(data.goals)) {
        data.goals = [];
    }


    if (!Array.isArray(data.savings)) {
        data.savings = [];
    }


    if (!Array.isArray(data.activities)) {
        data.activities = [];
    }


    if (!Array.isArray(data.timeline)) {
        data.timeline = [];
    }


    // =========================
    // SALVATAGGIO
    // =========================

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );


    // =========================
    // AGGIORNA L'INTERFACCIA
    // =========================

    if (
        !document.querySelector(
            ".tutorial-page"
        )
    ) {

        window.dispatchEvent(
            new Event("dataUpdated")
        );

    }

}


function resetData() {

    localStorage.removeItem(
        STORAGE_KEY
    );


    window.location.reload();

}
