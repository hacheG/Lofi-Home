const showHour = document.querySelector(".showHour");

let $setTrabajo = document.querySelector(".trabajo");
let $setDescanso = document.querySelector(".descansar");
const pokemon = document.querySelector(".pokemon");
const pokemonBack = document.querySelector(".pokemon-back")
const boton = document.querySelector(".button");


const audio1 = document.querySelector(".trabajar");
const audio2 = document.querySelector(".descanso");

const silencio1 = document.querySelector(".silencio1");
silencio1.addEventListener("click", () => {
    audio1.muted = true;
});

const silencio2 = document.querySelector(".silencio2");
silencio2.addEventListener("click", () => {
    audio2.muted = true;
});

let setTrabajo;
let setDescanso;
let deshabilitado = true;

$setTrabajo.addEventListener("change", e => setTrabajo = e.target.value);
$setDescanso.addEventListener("change", e => setDescanso = e.target.value);

boton.addEventListener("click", () => {
    if(deshabilitado){
        $setDescanso.disabled = deshabilitado;
        $setTrabajo.disabled = deshabilitado;
        deshabilitado = false
    } else {
        $setDescanso.disabled = deshabilitado;
        $setTrabajo.disabled = deshabilitado;
        deshabilitado = true
    }
});

setInterval( () => {

	const dateMinutos = new Date();
    const minutos = dateMinutos.getMinutes();

	const dateSegundos = new Date();
	const segundos = dateSegundos.getSeconds()

    const dateHora = new Date();
    const hora = dateHora.getHours()

	showHour.innerHTML = `
	 	${hora} : ${minutos} : ${segundos}
	`
	// console.log(`${minutos} : ${segundos}`);
    // console.log({setTrabajo, setDescanso});

    if(Number(setTrabajo) + 1 === minutos){
        audio1.muted = false
        audio1.pause();
    }

    if(Number(setDescanso) + 1 === minutos){
        audio2.muted = false
        audio2.pause();
    }

    if( ((minutos)=== Number(setTrabajo)) ){
	    console.log(`${minutos} : ${segundos}`);
        sonidoATrabajar();
        }

	if( minutos === Number(setDescanso)){
        sonidoDescanso()
    };

},1000)

function sonidoATrabajar(){
    audio1.play();
    console.log("en funcion trabajo");
};

function sonidoDescanso(){
    audio2.play();
    console.log("en funcion descanso");
};
function pokeSearch(){
    let numberPokemon = Math.floor(Math.random() * (1008 - 1) + 1) ;
    let numberPokemonBack = Math.floor(Math.random() * (1008 - 1) + 1) ;
    console.log({numberPokemon, numberPokemonBack});

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

document.addEventListener("DOMContentLoaded", pokeSearch)