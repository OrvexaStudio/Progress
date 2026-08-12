function openTermsPage(){

    const content =
        document.querySelector("#app-content");


    content.innerHTML = `

    <div class="page">


        <button
            class="back-button"
            onclick="navigateTo('settings')"
        >
            ← Indietro
        </button>



        <div class="page-intro">

            <h2>
                Termini di utilizzo
            </h2>

            <p>
                Condizioni e informazioni sull'utilizzo
                di Progress.
            </p>

        </div>



        <div class="card legal-card">


            <h3>
                Accettazione dei termini
            </h3>

            <p>
                Utilizzando Progress l'utente accetta
                le condizioni riportate in questa
                pagina e si impegna a utilizzare
                l'applicazione in modo corretto.
            </p>



            <h3>
                Scopo dell'applicazione
            </h3>

            <p>
                Progress è uno strumento personale
                progettato per aiutare l'utente
                a organizzare obiettivi, attività
                e monitorare il proprio percorso
                di crescita personale.
            </p>



            <h3>
                Gestione dei dati
            </h3>

            <p>
                I dati inseriti nell'applicazione
                vengono salvati esclusivamente
                sul dispositivo dell'utente.
                
                Progress non utilizza server,
                database online o sistemi cloud
                per archiviare le informazioni
                personali.
            </p>



            <h3>
                Responsabilità dell'utente
            </h3>

            <p>
                L'utente è responsabile dei dati
                inseriti nell'applicazione e deve
                utilizzare il dispositivo in modo
                sicuro per proteggere le proprie
                informazioni.
            </p>



            <h3>
                Backup ed esportazione
            </h3>

            <p>
                La funzione di esportazione permette
                all'utente di creare autonomamente
                una copia dei propri dati.
                
                Progress non conserva copie dei
                backup creati dall'utente.
            </p>



            <h3>
                Eliminazione dei dati
            </h3>

            <p>
                L'utente può eliminare in qualsiasi
                momento i dati salvati localmente
                tramite la funzione presente nelle
                impostazioni dell'applicazione.
            </p>



            <h3>
                Disponibilità dell'applicazione
            </h3>

            <p>
                Progress può essere aggiornata,
                modificata o migliorata nel tempo
                per introdurre nuove funzionalità
                o correggere eventuali problemi.
            </p>



            <h3>
                Limitazione di responsabilità
            </h3>

            <p>
                L'applicazione viene fornita come
                strumento di supporto personale.
                I risultati ottenuti dipendono
                dall'utilizzo dell'utente e
                dall'impegno personale nel proprio
                percorso.
            </p>



            <h3>
                Modifiche ai termini
            </h3>

            <p>
                I presenti termini possono essere
                aggiornati in futuro per riflettere
                modifiche all'applicazione o
                nuove funzionalità.
            </p>


        </div>


    </div>

    `;

}
