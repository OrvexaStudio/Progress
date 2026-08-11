function generateSavingsPlan(goal) {

    const calculation =
        calculateSavingsGoal(goal);


    const {
        remaining,
        days,
        daily,
        weekly,
        monthly
    } = calculation;


    if (remaining <= 0) {

        return {
            status: "completed",
            message:
                "Hai già raggiunto questo obiettivo."
        };

    }


    if (days <= 0) {

        return {
            status: "expired",
            message:
                "La data dell'obiettivo è già passata."
        };

    }


    const monthlyRounded =
        Math.ceil(monthly);


    return {

        status: "active",

        daily:
            Math.ceil(daily * 100) / 100,

        weekly:
            Math.ceil(weekly * 100) / 100,

        monthly:
            monthlyRounded,

        message:
            `Metti da parte circa ${formatCurrency(monthlyRounded)} al mese per raggiungere il tuo obiettivo.`

    };

}


function getSavingsStatus(goal) {

    const calculation =
        calculateSavingsGoal(goal);


    if (calculation.remaining <= 0) {

        return {
            type: "success",
            label: "Obiettivo raggiunto"
        };

    }


    if (calculation.days <= 0) {

        return {
            type: "danger",
            label: "Scadenza superata"
        };

    }


    return {
        type: "active",
        label: "In corso"
    };

}
