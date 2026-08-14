const STORAGE_KEY = "progress_app_data";

const defaultData = {

    tutorialCompleted: false,

    profile: {
        name: ""
    },

    goals: [],

    savings: [],

    activities: [],
    timeline: []
};


function loadData() {

const saved = localStorage.getItem(STORAGE_KEY);

if (!saved) {
    saveData(defaultData);
    return structuredClone(defaultData);
}

try {

    const data = JSON.parse(saved);

    if (!data.timeline) {
        data.timeline = [];
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );
    }

    return data;

} catch (error) {
    console.error("Errore nel caricamento dei dati:", error);

    saveData(defaultData);

    return structuredClone(defaultData);
}
if (!data.activities) {
data.activities = [];
    }
    }

function saveData(data) {

    const current =
        localStorage.getItem(STORAGE_KEY);

    if (current) {

        try {

            const existing =
                JSON.parse(current);

            if (
                Array.isArray(existing.timeline) &&
                !Array.isArray(data.timeline)
            ) {

                data.timeline =
                    existing.timeline;

            }

        } catch (error) {

            console.error(
                "Errore nel recupero della timeline:",
                error
            );

        }

    }


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );


    if (
        !document.querySelector(".tutorial-page")
    ) {

        window.dispatchEvent(
            new Event("dataUpdated")
        );

    }

}


function resetData() {

    localStorage.removeItem(STORAGE_KEY);

    window.location.reload();
}
