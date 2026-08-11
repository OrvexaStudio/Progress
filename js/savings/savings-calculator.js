function calculateSavingsGoal(goal) {

    const target = Number(goal.target) || 0;
    const saved = Number(goal.saved) || 0;

    const remaining = Math.max(
        0,
        target - saved
    );

    const percentage = target > 0
        ? Math.min(
            100,
            (saved / target) * 100
        )
        : 0;

    const days = getDaysRemaining(
        goal.deadline
    );

    const daily = days > 0
        ? remaining / days
        : remaining;

    const weekly = daily * 7;

    const monthly = daily * 30.4375;

    return {
        target,
        saved,
        remaining,
        percentage,
        days,
        daily,
        weekly,
        monthly
    };
}


function calculateWorkHours(
    amount,
    hourlyRate
) {

    if (!hourlyRate || hourlyRate <= 0) {
        return 0;
    }

    return amount / hourlyRate;
}


function calculateEquivalent(
    amount,
    unitPrice
) {

    if (!unitPrice || unitPrice <= 0) {
        return 0;
    }

    return amount / unitPrice;
}
