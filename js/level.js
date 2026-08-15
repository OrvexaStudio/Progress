function getLevelData(xp) {

    xp = Math.max(0, Number(xp) || 0);

    let level = 1;
    let xpForNextLevel = 200;
    let xpUsed = 0;

    while (xp >= xpUsed + xpForNextLevel) {

        xpUsed += xpForNextLevel;

        level++;

        xpForNextLevel += 200;

    }

    const xpInLevel =
        xp - xpUsed;

    const remaining =
        xpForNextLevel - xpInLevel;

    const percentage =
        Math.min(
            100,
            Math.round(
                (xpInLevel / xpForNextLevel) * 100
            )
        );

    return {

        level,

        xp,

        xpInLevel,

        xpForNextLevel,

        remaining,

        percentage

    };

}

function addXP(amount) {

    const data = loadData();

    const oldXP =
        Number(data.xp) || 0;

    const oldLevel =
        getLevelData(oldXP).level;


    const xpToAdd =
        Math.max(
            0,
            Number(amount) || 0
        );


    if (xpToAdd <= 0) {
        return;
    }


    data.xp =
        oldXP + xpToAdd;


    const newLevel =
        getLevelData(data.xp).level;


    saveData(data);


    console.log(
        `+${xpToAdd} XP | Totale: ${data.xp} | Livello: ${newLevel}`
    );


    if (newLevel > oldLevel) {

        console.log(
            `LEVEL UP! Livello ${newLevel}`
        );

    }

}
