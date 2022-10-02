//variables
const powerbutton = document.querySelector('#powerbutton');
const submitButton = document.querySelector('#botonDeSubmit');

const pokemonTitle = document.querySelector('#pokemon-title');
const screenn = document.querySelector('#screen');

const inputNumber = document.querySelector('#inputNumber')

const arrowD = document.querySelector('#arrowD')
const arrowL = document.querySelector('#arrowL')

const errorOff = document.querySelector('#pokedexapagadaERROR');

const pokedexContainer = document.querySelector('#pokedexcontainer');
const promesas = [];

//pkedex inicia apagada (false)
let statuss = false;
const powerOrOff = ()=>{
    // !statuss ? statuss = true : statuss = false;
    if(!statuss){
        statuss = true;
        powerbutton.classList.add('colorON');
        pokemonTitle.textContent = "";

    }else{
        statuss = false;
        pokemonTitle.textContent = "Off";
        powerbutton.classList.remove('colorON');
    }

}
const pokemonNameToUpperCase = (nameToUpper)=>{
    const firstLetter = nameToUpper.charAt(0).toUpperCase();
    const restText = nameToUpper.substring(1);
    return firstLetter+restText;
}

const renderPokemon = (pokemonToRender)=>{
    pokemonTitle.textContent = pokemonNameToUpperCase(pokemonToRender.name);
    screenn.innerHTML = `<img id="pokemonIMAGEid" class='pokemonIMAGE' src='${pokemonToRender.sprites['front_default']}'>`;

}

const getPokemon = async (id) =>{
    try{
        const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const pokemon = await promise.json();
        renderPokemon(pokemon);
    }
    catch{
        alert("error");
    }
}


const init = ()=>{
    powerbutton.addEventListener('click', (e) =>{
        powerOrOff();
    })

    submitButton.addEventListener('click', (e) =>{
        if(statuss){
            if(inputNumber.value >=1){
                getPokemon(inputNumber.value)
            }
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