const STORAGE_KEY = "progress_app_data";


const defaultData = {
    profile: {
        name: "Francesco"
    },

    goals: [
        {
            id: "pilot-goal",
            title: "Diventare pilota",
            description: "Costruire il mio percorso verso il cockpit",
            icon: "✈️",
            progress: 37,
            hours: 126,
            milestones: 42
        }
    ],

    savings: [
        {
            id: "iphone-goal",
            title: "Nuovo iPhone",
            icon: "📱",
            target: 1199,
            saved: 340,
            deadline: "2027-05-23"
        }
    ],

    activities: [
        {
            id: 1,
            title: "Studio di matematica",
            duration: 45,
            date: new Date().toISOString()
        },
        {
            id: 2,
            title: "Ripasso aviazione",
            duration: 30,
            date: new Date(Date.now() - 86400000).toISOString()
        }
    ]
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
}


function resetData() {

    localStorage.removeItem(STORAGE_KEY);

    window.location.reload();
}
