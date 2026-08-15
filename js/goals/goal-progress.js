function calculateGoalProgress(goal) {

    if (!goal) return 0;

    const milestones = Array.isArray(goal.milestones)
        ? goal.milestones
        : [];

    if (!milestones.length) {
        return Number(goal.progress) || 0;
    }

    const completed = milestones.filter(
        milestone => milestone.completed === true
    ).length;

    return Math.round(
        (completed / milestones.length) * 100
    );
}


function calculateGoalHours(goal) {

    if (!goal || !Array.isArray(goal.activities)) {
        return 0;
    }

    const totalMinutes =
        goal.activities.reduce(
            (total, activity) => {

                return total +
                    Number(activity.duration || 0);

            },
            0
        );


    return Math.round(
        (totalMinutes / 60) * 10
    ) / 10;
}


function calculateCompletedMilestones(goal) {

    if (!goal) {
        return 0;
    }


    const milestones =
        Array.isArray(goal.milestones)
            ? goal.milestones
            : [];


    return milestones.filter(
        milestone =>
            milestone &&
            milestone.completed === true
    ).length;
}


function updateGoalProgress(goal) {

    if (!goal) return;


    const oldProgress =
        Number(goal.progress) || 0;


    goal.progress =
        calculateGoalProgress(goal);


    goal.hours =
        calculateGoalHours(goal);


    goal.completedMilestones =
        calculateCompletedMilestones(goal);


    goal.milestonesCount =
        Array.isArray(goal.milestones)
            ? goal.milestones.length
            : 0;


    if (
        oldProgress < 100 &&
        goal.progress >= 100 &&
        !goal.completed
    ) {

        goal.completed = true;

        console.log(
            "OBIETTIVO COMPLETATO:",
            goal.title
        );

    }

}
