//variables
const powerbutton = document.querySelector('#powerbutton');
const submitButton = document.querySelector('#botonDeSubmit');

const pokemonTitle = document.querySelector('#pokemon-title');
const screen = document.querySelector('#screen');
const inputNumber = document.querySelector('#inputNumber')

const arrowD = document.querySelector('#arrowD')
const arrowL = document.querySelector('#arrowL')

const errorOff = document.querySelector('#pokedexapagadaERROR');

const pokedexContainer = document.querySelector('#pokedexcontainer');
//pkedex inicia apagada (false)
let statuss = false;

const reset = ()=>{
    pokemonTitle.textContent = "";

}

const powerOrOff = ()=>{
    // !statuss ? statuss = true : statuss = false;
    if(!statuss){
        statuss = true;
        reset();
        powerbutton.classList.add('colorON');

    }else{
        statuss = false;
        pokemonTitle.textContent = "Off";
        powerbutton.classList.remove('colorON');
    }

}


const init = ()=>{
    powerbutton.addEventListener('click', (e) =>{
        powerOrOff();
    })

    submitButton.addEventListener('click', (e) =>{
        if(statuss){

        }
        else{
            errorOff.style.display="grid";
            setTimeout(e=>{
                errorOff.style.display="none";
            },600)
        }
    })
}
init();