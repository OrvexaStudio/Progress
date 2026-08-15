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

    xp: 0,

    xpAwards: {

        goalsCreated: [],

        milestonesCompleted: [],

        goalsCompleted: []

    }

};


function loadData() {

    const saved =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!saved) {

        const initialData =
            structuredClone(
                defaultData
            );

        saveData(initialData);

        return initialData;

    }


    try {

        const data =
            JSON.parse(saved);


        // Assicura che tutte
        // le proprietà principali esistano

        if (!data.profile) {
            data.profile = {
                name: ""
            };
        }


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


        if (
            typeof data.xp !== "number" ||
            Number.isNaN(data.xp)
        ) {

            data.xp = 0;

        }


        if (
            typeof data.tutorialCompleted !==
            "boolean"
        ) {

            data.tutorialCompleted = false;

        }


        return data;

    } catch (error) {

        console.error(
            "Errore nel caricamento dei dati:",
            error
        );


        const initialData =
            structuredClone(
                defaultData
            );


        saveData(initialData);


        return initialData;

    }

}


function saveData(data) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );


    if (
        !document.querySelector(
            ".tutorial-page"
        )
    ) {

        window.dispatchEvent(
            new Event(
                "dataUpdated"
            )
        );

    }

}


function resetData() {

    localStorage.removeItem(
        STORAGE_KEY
    );


    window.location.reload();

}
