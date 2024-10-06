
const formulario = document.querySelector("#formulario");
const pokemon = document.querySelector(".pokemon");
const pokemonBack = document.querySelector(".pokemon-back");
const audio1 = document.querySelector(".trabajar");
const audio2 = document.querySelector(".descanso");
const showHour = document.querySelector(".showHour");
const instrucciones = document.querySelector(".instrucciones");

instrucciones.onclick = showInstrution;

function showInstrution(){
    console.log("on click");
    const show = document.querySelector(".show");
    if(show){
        instrucciones.innerHTML = "INSTRUCCIONES (click para abrir)";
    } else {
        instrucciones.innerHTML = `<pre class="show">
        INSTRUCCIONES
        Ponga en el campo INICIO TRABAJO el valor numerico del minuto en el que iniciara a trabajar
        despues...
        Ponga en el campo INICIO DESCANSO el valor numerico del minuto en el que iniciara su descancito
        
        De click en el boton Settear tiempo y a trabajar !!!!
        tendra un par de amigos acompañandole...
        
        Si desea cambiar los tiempos que a puesto con anterioridad, solo de click en el boton 
        Restablecer tiempo

        (click para cerrar)
        </pre>`
    }
};

const intervalID = setInterval(() => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let abbrevation = "";
    if(hours > 12)hours -= 12

    if(new Date().getHours() > 12){
        abbrevation = "PM";
    } else {
        abbrevation = "AM";
    }
    showHour.innerHTML = `
        ${hours} : ${minutes} : ${seconds} ${abbrevation}
        `
}, 1000);


const silencio1 = document.querySelector(".silencio1");
silencio1.addEventListener("click", () => {
    audio1.muted = true;
    audio2.muted = true;
});

let pomodoroTimes = {
    inicioTrabajo: "",
    inicioDescanso: ""
};

formulario.addEventListener("submit", validateField);
formulario.addEventListener("reset", () => {
    window.location.reload();
});

function validateField(e){
    e.preventDefault();
    const inicioTrabajo = document.querySelector(".trabajo").value;
    const inicioDescanso = document.querySelector(".descansar").value;

    pomodoroTimes = {
        inicioTrabajo,
        inicioDescanso,
    };
    
    const validado = Object.values(pomodoroTimes).every( value => value !== "")
    if(!validado){
        showAlert("llena ambos campos, por favor!")
        return;
    };

    comparation(pomodoroTimes);
};

function comparation({inicioTrabajo, inicioDescanso}){

    const myWorker = new Worker("demoWorkers.js");
    // console.log(myWorker);
    myWorker.onmessage = (e) => {
        clearInterval(intervalID)
        showHour.innerHTML = `
        ${e.data[0]} : ${e.data[1]} : ${e.data[2]} ${e.data[3]}
        `
        // console.log(inicioTrabajo, inicioDescanso);

        if(Number(inicioTrabajo) === e.data[1] && e.data[2] === 0){
            sonidoATrabajar()
        };

        if(Number(inicioDescanso) === e.data[1] && e.data[2] === 0){
            sonidoADescansar()
        };
    };
};

function showAlert(msj){
    const mensaje = document.querySelector(".alerta");
    mensaje.textContent = msj
    setInterval(() => {
        mensaje.textContent = ""
    }, 3000);
};

function sonidoATrabajar(){
    audio1.muted = false;
    audio1.play();
    console.log("en funcion trabajo");
};

function sonidoADescansar(){
    audio2.muted = false;
    audio2.play();
    console.log("en funcion descanso");
};

function pokeSearch(){
    let numberPokemon = Math.floor(Math.random() * (1008 - 1) + 1) ;
    let numberPokemonBack = Math.floor(Math.random() * (1008 - 1) + 1) ;
    // console.log({numberPokemon, numberPokemonBack});

    const url = `https://pokeapi.co/api/v2/pokemon/${numberPokemon}`
    const url2 = `https://pokeapi.co/api/v2/pokemon/${numberPokemonBack}`
    const urlPsy = `https://pokeapi.co/api/v2/pokemon/54`

    const psyduck = `url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/54.png")`

    fetch(url)
    .then( response => response.json())
    .then( json => pokeShow(json.name, json.sprites.front_default, json.sprites.back_default))
    .catch( err => console.log(err))

    fetch(url2)
    .then( response => response.json())
    .then( json => pokeShowBack(json.name, json.sprites.front_default, json.sprites.back_default))
    .catch( err => console.log(err))
};

function pokeShow(nombre, pokeImage){
    pokemon.textContent = nombre
    pokemon.style.backgroundImage = `url(${pokeImage})`
    pokemon.style.backgroundRepeat = "no-repeat";
    pokemon.style.backgroundSize= "cover";
};

function pokeShowBack(nombre, pokeImage, pokeBack ){
    
    if(pokeBack === null){
        console.log("el nulo...");
        pokemonBack.textContent = nombre
        pokemonBack.style.backgroundImage = `url(${pokeImage})`
        pokemonBack.style.backgroundRepeat = "no-repeat";
        pokemonBack.style.backgroundSize= "cover";
    } else {
        pokemonBack.textContent = nombre
        pokemonBack.style.backgroundImage = `url(${pokeBack})`
        pokemonBack.style.backgroundRepeat = "no-repeat";
        pokemonBack.style.backgroundSize= "cover";
    }
}

document.addEventListener("DOMContentLoaded", pokeSearch);


 