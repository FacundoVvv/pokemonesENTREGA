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
let promesas = [];

//pkedex inicia apagada (false)
let statuss = false;

const powerOrOff = ()=>{
    const imageP = document.querySelector('#pokemonIMAGEid');
    if(!statuss){
        statuss = true;
        pokemonTitle.textContent = "";
        powerbutton.classList.add('colorON');
        inputNumber.value="";

    }else{
        statuss = false;
        pokemonTitle.textContent = "Off";
        powerbutton.classList.remove('colorON');
        inputNumber.value="";
        if(screenn.contains(imageP)){
            screenn.removeChild(imageP)
        }
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
    screenn.appendChild(errorOff);
}

const pokemonSelected = {};
const getPokemon = async (id) =>{
    try{
        const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const pokemon = await promise.json();
        renderPokemon(pokemon);
        promesas.push(pokemon);
        
    }catch{
        console.log("error")
    }
    
}

const init = ()=>{
    powerbutton.addEventListener('click', (e) =>{
        powerOrOff();
    })

    submitButton.addEventListener('click', (e) =>{
        promesas = []; //reseteo promesas para evitar bug
        if(statuss){
            if(inputNumber.value >=1){
                getPokemon(inputNumber.value)
            }
        }
       else if (!statuss)
            {
        
                errorOff.style.display="grid";
                    setTimeout(e=>{
                        errorOff.style.display="none";
                    },600)
            }
    })

    let imagenStatus = 0; //front

    const changeImage = (pokemon, imagePath)=>{
        screenn.innerHTML = ` <img id="pokemonIMAGEid" 
        class='pokemonIMAGE' src='${pokemon[0].sprites[`${imagePath}`]}'> `;
        screenn.appendChild(errorOff);
        
    }  

    arrowD.addEventListener('click', e=>{
        
        Promise.all(promesas).then((res)=>{
            if(statuss){
                switch(imagenStatus){
                    case 0: changeImage(res, 'back_default')
                           imagenStatus = 1;
                           break;
                    case 1:changeImage(res, 'front_default')
                           imagenStatus = 0;
                           break;
                }
            }
        })
    })
    arrowL.addEventListener('click', e=>{
        Promise.all(promesas).then((res)=>{
            if(statuss)
            {
                switch(imagenStatus){
                    case 0:changeImage(res, 'back_default')
                           imagenStatus = 1;
                           break;
                    case 1:changeImage(res, 'front_default')
                           imagenStatus = 0;
                           break;
                }
            }
        })
    })
}
init();