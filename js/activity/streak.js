function calculateStreak(){

    const data = loadData();

    const activities =
        data.activities || [];


    if(activities.length === 0){

        return {
            current: 0,
            record: 0
        };

    }


    const days = [
        ...new Set(
            activities.map(activity =>
                new Date(activity.date)
                .toDateString()
            )
        )
    ];


    const sorted =
        days
        .map(day => new Date(day))
        .sort(
            (a,b)=> b-a
        );


    let streak = 1;


    for(let i = 0; i < sorted.length - 1; i++){

        const difference =
            (sorted[i] - sorted[i+1])
            /
            (1000 * 60 * 60 * 24);


        if(difference === 1){

            streak++;

        }
        else{

            break;

        }

    }



    const savedRecord =
        Number(
            localStorage.getItem(
                "progress_streak_record"
            )
        ) || 0;



    const record =
        Math.max(
            savedRecord,
            streak
        );


    localStorage.setItem(
        "progress_streak_record",
        record
    );



    return {

        current: streak,
        record: record

    };

}
