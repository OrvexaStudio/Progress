function openPrivacyPage(){

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
                Privacy
            </h2>

            <p>
                Informativa sul trattamento dei dati personali.
            </p>

        </div>



        <div class="card legal-card">


            <h3>
                Protezione della privacy
            </h3>

            <p>
                Progress attribuisce grande importanza
                alla protezione dei dati personali
                degli utenti e alla trasparenza
                nella gestione delle informazioni.
            </p>


            <h3>
                Dati raccolti
            </h3>

            <p>
                L'applicazione può memorizzare dati
                inseriti volontariamente dall'utente,
                come obiettivi personali, attività,
                statistiche e preferenze.
            </p>


            <h3>
                Modalità di conservazione
            </h3>

            <p>
                I dati vengono conservati direttamente
                sul dispositivo dell'utente attraverso
                la memoria locale dell'applicazione.
            </p>


           <h3>
    Accesso ai dati
</h3>

<p>
    Progress non ha accesso ai dati personali
    inseriti dall'utente. Le informazioni
    vengono salvate esclusivamente in locale
    sul dispositivo utilizzato e non vengono
    inviate a server esterni.
</p>


<h3>
    Nessuna sincronizzazione online
</h3>

<p>
    L'applicazione non è collegata a database
    o servizi cloud. Non raccogliamo,
    visualizziamo o analizziamo i dati
    personali dell'utente tramite sistemi
    esterni.
</p>


<h3>
    Condivisione dei dati
</h3>

<p>
    I dati rimangono sotto il controllo
    dell'utente e non vengono venduti,
    condivisi o trasferiti a terze parti.
</p>


            <h3>
                Backup dei dati
            </h3>

            <p>
                L'utente può creare autonomamente
                copie di sicurezza dei propri dati
                tramite la funzione di esportazione.
            </p>


            <h3>
                Eliminazione dei dati
            </h3>

            <p>
                L'utente può eliminare completamente
                i propri dati utilizzando la funzione
                "Cancella tutti i dati" presente
                nelle impostazioni.
            </p>


            <h3>
                Aggiornamenti
            </h3>

            <p>
                La presente informativa può essere
                aggiornata per riflettere modifiche
                all'applicazione o nuove funzionalità.
            </p>


        </div>


    </div>

    `;

}
