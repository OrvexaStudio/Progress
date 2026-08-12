function renderTimelinePage(){
console.log("TIMELINE APERTA");
    const content =
        document.querySelector(
            "#app-content"
        );


    const data =
        loadData();


    const timeline =
        data.timeline || [];



    content.innerHTML = `


    <div class="page">


        <div class="page-toolbar">


            <div>

                <h2>
                    Timeline
                </h2>


                <p>
                    Il tuo percorso e i tuoi progressi.
                </p>


            </div>


        </div>




        <div class="timeline-container">


        ${
            timeline.length

            ?

            [...timeline]
.sort(
    (a,b)=>
    new Date(b.date)
    -
    new Date(a.date)
)
            .map(
                renderTimelineItem
            )
            .join("")


            :

            `

            <div class="card empty-card">

                <h3>
                    Nessun evento ancora
                </h3>


                <p>
                    Completa attività e raggiungi obiettivi
                    per costruire il tuo percorso.
                </p>

            </div>

            `

        }


        </div>


    </div>


    `;


}



function renderTimelineItem(event){


    const date =
        new Date(event.date)
        .toLocaleDateString(
            "it-IT",
            {
                day:"numeric",
                month:"long",
                year:"numeric"
            }
        );



    return `


    <article class="card timeline-item">


        <div class="timeline-date">

            ${date}

        </div>



        <h3>

            ${escapeHTML(event.title)}

        </h3>



        <p>

            ${escapeHTML(event.description)}

        </p>



    </article>


    `;

}




function addTimelineEvent(event){
console.log("ADD TIMELINE CHIAMATA:", event);

    const data =
        loadData();



    if(!data.timeline){

        data.timeline = [];

    }



    data.timeline.push({

        id:
            Date.now(),


        type:
            event.type || "general",


        title:
            event.title,


        description:
            event.description,


        date:
            new Date().toISOString()

    });



    saveData(data);


}
window.addEventListener(
    "dataUpdated",
    () => {

        const title =
            document.querySelector("#page-title");


        if(
            title &&
            title.textContent === "Timeline"
        ){

            renderTimelinePage();

        }

    }
);
