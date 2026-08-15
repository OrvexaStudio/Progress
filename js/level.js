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

function addXP(amount, data = null) {

    const currentData =
        data || loadData();

    const oldXP =
        Number(currentData.xp) || 0;

    const oldLevel =
        getLevelData(oldXP).level;


    currentData.xp =
        oldXP +
        Math.max(
            0,
            Number(amount) || 0
        );


    const newLevel =
        getLevelData(currentData.xp).level;


    // Se ci è stato passato un oggetto data,
    // NON salviamo subito: lo farà il chiamante.
    if (!data) {
        saveData(currentData);
    }


    if (newLevel > oldLevel) {

        console.log(
            `LEVEL UP! Livello ${newLevel}`
        );

    }


    return currentData.xp;

}
