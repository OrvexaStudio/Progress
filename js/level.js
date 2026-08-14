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
