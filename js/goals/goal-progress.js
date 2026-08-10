function calculateGoalProgress(goal) {

    if (!goal) return 0;

    const milestones = goal.milestones || [];

    if (!milestones.length) {
        return Number(goal.progress) || 0;
    }

    const completed = milestones.filter(
        milestone => milestone.completed
    ).length;

    return Math.round(
        (completed / milestones.length) * 100
    );
}


function calculateGoalHours(goal) {

    if (!goal || !goal.activities) {
        return 0;
    }

    const totalMinutes = goal.activities.reduce(
        (total, activity) => {
            return total + Number(activity.duration || 0);
        },
        0
    );

    return Math.round(
        (totalMinutes / 60) * 10
    ) / 10;
}


function calculateCompletedMilestones(goal) {

    if (!goal || !goal.milestones) {
        return 0;
    }

    return goal.milestones.filter(
        milestone => milestone.completed
    ).length;
}


function updateGoalProgress(goal) {

    if (!goal) return;

    goal.progress =
        calculateGoalProgress(goal);

    goal.hours =
        calculateGoalHours(goal);

    goal.completedMilestones =
        calculateCompletedMilestones(goal);

    goal.milestonesCount =
        goal.milestones?.length || 0;
}
