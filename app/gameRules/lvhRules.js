const noBonus = {
    petit: false,
    poignee: 0,
    chelem: 0
};

const petitAsLast = petit => (petit ? 20 : 0);

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
    console.log(takerPoint, contract, bouts);
    const { petit, poignee, chelem } = bonus;
    const basicScore =
        takerPoint * 2 + contractScore[contract] + petitAsLast(petit) + poigneeScore[poignee] + chelemScore[chelem];

    return basicScore;
    // contrat
    // nombre de bout
    // petit au bout ?
    // Poignée ?
    // Chelem
};
