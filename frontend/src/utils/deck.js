const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = [
    { name: '2', val: 2 },
    { name: '3', val: 3 },
    { name: '4', val: 4 },
    { name: '5', val: 5 },
    { name: '6', val: 6 },
    { name: '7', val: 7 },
    { name: '8', val: 8 },
    { name: '9', val: 9 },
    { name: '10', val: 10 },
    { name: 'J', val: 11 },
    { name: 'Q', val: 12 },
    { name: 'K', val: 13 },
    { name: 'A', val: 14 },
];

export const createDeck = () => {
    const deck = [];
    for (const suit of SUITS) {
        for (const item of VALUES) {
            deck.push({
                id: `${item.name}-${suit}-${Math.random()}`,
                name: item.name,
                value: item.val,
                suit,
                color: suit === '♥' || suit === '♦' ? 'text-red-500' : 'text-slate-900',
            });
        }
    }
    return shuffle(deck);
};

export const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};