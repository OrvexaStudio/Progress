function calculateActivityStats(activities) {

    if (!Array.isArray(activities)) {
        activities = [];
    }


    const totalMinutes =
        activities.reduce(
            (total, activity) =>
                total +
                Number(activity.duration || 0),
            0
        );


    const totalHours =
        Math.round(
            (totalMinutes / 60) * 10
        ) / 10;


    const completed =
        activities.filter(
            activity =>
                activity.completed === true
        ).length;


    const categories = {};


    activities.forEach(activity => {

        const category =
            activity.category || "Altro";


        if (!categories[category]) {
            categories[category] = 0;
        }


        categories[category] +=
            Number(activity.duration || 0);

    });


    return {

        totalMinutes,

        totalHours,

        completed,

        totalActivities:
            activities.length,

        categories

    };

}


function getActivitiesForPeriod(
    activities,
    days
) {

    const limit =
        new Date();

    limit.setDate(
        limit.getDate() - days
    );


    return activities.filter(
        activity => {

            const date =
                new Date(activity.date);

            return date >= limit;

        }
    );

}
