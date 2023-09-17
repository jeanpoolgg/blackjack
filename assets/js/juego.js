

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small'); 
const divCartasJugador = document.querySelector('#jugador-cartas');


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
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}


crearDeck();


const pedirCarta = () => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1);
    return (isNaN(valor))? ( (valor === 'A')? 11 : 10) : valor*1;
}


// Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if( puntosJugador > 21){
        btnPedir.disabled = true;
        console.warn('Lo siento mucho, perdiste')
    }else if( puntosJugador === 21){
        console.warn('21, genial!');
        btnPedir.disabled = true;
    }
})