const LVH_CONSTANT = 2;

export const falseGivesScore= -10;

const noBonus = {
    petit: 0,
    poignee: 0,
    chelem: 0
};

const petitScore = {
    0: 0,
    1: 20,
    2: 20
};

const petitAsLastTaker = petit => (petit === 1 ? petitScore[petit] : 0);

const petitAsLastDefense = petit => (petit === 2 ? petitScore[petit] : 0);

const poigneeScore = {
    0: 0,
    1: 20, // Simple
    2: 40, // Double
    3: 60 // Triple
};

const chelemScore = {
    0: 0,
    1: 400, // Annoncé + réal.
    2: 200, // Réal
    3: -200 // Annoncé + fail
};

const boutsScore = {
    0: 56,
    1: 51,
    2: 41,
    3: 36
};

const contractScore = {
    0: 10, // prise
    1: 20, // Pousse
    2: 40, // Garde
    3: 70, // Garde sans le chien
    4: 100 // Garde contre le chien
};

export const calculatePoint = (takerPoint, contract, bouts, bonus = noBonus) => {
    const { petit, poignee, chelem } = bonus;
    const basicScore = Math.abs(takerPoint - boutsScore[bouts]);
    const contractBasicScore = basicScore * LVH_CONSTANT + contractScore[contract];
    const bonusScore = contractBasicScore + poigneeScore[poignee];
    const sideBonus = -petitAsLastDefense(petit) + petitAsLastTaker(petit) + chelemScore[chelem];
    if (takerPoint > boutsScore[bouts]) {
        // taker wins
        const defScore = bonusScore + sideBonus;
        return [defScore * 3, -defScore];
    }
    const defScore = bonusScore - sideBonus;
    return [-defScore * 3, defScore];
};
