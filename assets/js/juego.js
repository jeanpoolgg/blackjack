

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

const crearDeck = () => {
    for(let i = 2; i < 11; i++ ){
        for(let tipo of tipos){
            deck.push(i+tipo);
        }
    }

    for(let especial of especiales){
        for(let tipo of tipos){
            deck.push(especial+tipo);
        }
    }
    console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}


crearDeck();