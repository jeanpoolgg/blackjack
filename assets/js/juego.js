
const miModulo = (()=>{
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias del HTML
    const btnNuevo = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          nombreJugador1 = document.querySelector('#jugador1');


    const puntosHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');

    const pedirNombre = () => {
        nombreJugador1.innerText = `${prompt('Ingresa tu nombre: ', 'Mi nombre')} - 0`;
    }

    const crearDeck = () => {
        deck = [];
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
        return  _.shuffle(deck);
    }


    const inicializarJuego = ( numJugadores = 2) => {
        pedirNombre();
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }


    const pedirCarta = () => {
        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length-1);
        return (isNaN(valor))? ( (valor === 'A')? 11 : 10) : valor*1;
    }

    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [puntosMinimo, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if(puntosComputadora === puntosMinimo){
                alert('Nadie gana :(');
            }else if(puntosMinimo > 21){
                alert('La computadora gana!');
            }else if(puntosComputadora > 21){
                alert('El jugador Gana');
            }else {
                alert('La computadora gana!');
            }
        }, 100 );
    }

    // Turno de la computadora
    const turnoComputadora = (puntosMinimo) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
           
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            if(puntosMinimo > 21){
                break;
            }
        }while( (puntosComputadora < puntosMinimo) && (puntosMinimo <= 21));
        determinarGanador();
    }

    // Eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if( puntosJugador > 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if( puntosJugador === 21){
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    })


    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    })

    // btnNuevo.addEventListener('click', () => {
    //     inicializarJuego();
    // })

    return {
        nuevoJuego: inicializarJuego
    }
})();
