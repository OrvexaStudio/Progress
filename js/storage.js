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
    return JSON.parse(saved);
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

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );


    // aggiorna tutta l'app in tempo reale
    if(
    !document.querySelector(".tutorial-page")
){
    window.dispatchEvent(
        new Event("dataUpdated")
    );
}

}


function resetData() {

    localStorage.removeItem(STORAGE_KEY);

    window.location.reload();
}
