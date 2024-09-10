const showHour = document.querySelector(".showHour");

let $setTrabajo = document.querySelector(".trabajo");
let $setDescanso = document.querySelector(".descansar");
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

console.log(50%50);


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

	const minutos = new Date().getMinutes();
	const segundos = new Date().getSeconds();
	const hora = new Date().getHours();
	showHour.innerHTML = `
	 	${hora} : ${minutos} : ${segundos}
	`
	console.log(`${minutos} : ${segundos}`);
    console.log({setTrabajo, setDescanso});

    if(Number(setTrabajo) + 1 === minutos){
        audio1.muted = false
        audio1.pause();
    }

    if(Number(setDescanso) + 1 === minutos){
        audio2.muted = false
        audio2.pause();
    }

    if((minutos)=== Number(setTrabajo)){
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

