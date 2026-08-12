function exportProgressData() {

    const data = loadData();

    const json = JSON.stringify(data, null, 2);

    const blob = new Blob(
        [json],
        { type: "application/json" }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        `progress-backup-${getTodayDate()}.json`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

}


function importProgressData(event) {

    const file =
        event.target.files[0];

    if (!file) {
        return;
    }


    const reader =
        new FileReader();


    reader.onload = function () {

        try {

            const imported =
                JSON.parse(
                    reader.result
                );


            if (
                !imported ||
                typeof imported !== "object"
            ) {
                throw new Error(
                    "Formato non valido"
                );
            }


            const confirmed =
                confirm(
                    "Importando questo backup sostituirai i dati attuali. Continuare?"
                );


            if (!confirmed) {
                return;
            }


            localStorage.setItem(
    "progress_app_data",
    JSON.stringify(imported)
);


            alert(
                "Dati importati correttamente."
            );


            location.reload();


        } catch (error) {

            console.error(error);

            alert(
                "Il file selezionato non è un backup Progress valido."
            );

        }

    };


    reader.readAsText(file);

}


function deleteAllProgressData() {

    const confirmed =
        confirm(
            "ATTENZIONE: verranno eliminati tutti i tuoi dati. Questa operazione non può essere annullata."
        );


    if (!confirmed) {
        return;
    }


    const secondConfirmation =
        confirm(
            "Sei davvero sicuro di voler cancellare tutto?"
        );


    if (!secondConfirmation) {
        return;
    }


    localStorage.removeItem(
    "progress_app_data"
);


    location.reload();

}


function getTodayDate() {

    const date =
        new Date();


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}
