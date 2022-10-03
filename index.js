//variables
const powerbutton = document.querySelector('#powerbutton');
const submitButton = document.querySelector('#botonDeSubmit');

const pokemonTitle = document.querySelector('#pokemon-title');
const screenn = document.querySelector('#screen');

const inputNumber = document.querySelector('#inputNumber')

const arrowD = document.querySelector('#arrowD')
const arrowL = document.querySelector('#arrowL')

const notZero = document.querySelector('#notZero');
const incorrectNumber = document.querySelector('#incorrectNumber');
const notFoundError = document.querySelector('#notfounderror');
const pesoValue = document.querySelector('#peso-value-id');
const pesoIMG = document.querySelector('#pesoIMG')
const pesoContainerID = document.querySelector('#peso-container-id');
const errorOff = document.querySelector('#pokedexapagadaERROR');
const alturaContainer = document.querySelector('#altura-id');
const reglaIMG = document.querySelector('#regla-id');
const altValue = document.querySelector('#alt-value-id');
const hpValue = document.querySelector('#hp-value-id');
const imgHPID = document.querySelector('#imgHPID');
const hpContainer = document.querySelector('#hp-container')
const typesID = document.querySelector('#typesID');
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
        if(screenn.contains(typesID))
        {
            screenn.removeChild(typesID)
        }
        imgHPID.style.visibility = "hidden";
        hpValue.textContent = ""
        reglaIMG.style.visibility = "hidden";
        altValue.textContent = ""
        pesoIMG.style.visibility = "hidden";
        pesoValue.textContent = ""
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
    screenn.appendChild(typesID);
    screenn.appendChild(hpContainer);
    screenn.appendChild(alturaContainer)
    screenn.appendChild(pesoContainerID);

    const types = typesID.textContent = pokemonToRender.types.map(e=>(e.type.name)).join(", ");
    imgHPID.style.visibility = "visible";
    hpValue.textContent = pokemonToRender.stats[0].base_stat;

    reglaIMG.style.visibility = "visible";
    altValue.textContent = (pokemonToRender.height) / 10 + "M";

    pesoIMG.style.visibility = "visible";
    pesoValue.textContent = (pokemonToRender.weight) / 10 + "Kg";
}       
const getPokemon = async (id) =>{
    try{
        const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const pokemon = await promise.json();
        renderPokemon(pokemon);
        promesas.push(pokemon);
        
        
    }catch{
        notFoundError.style.visibility="visible";
        setTimeout(()=>{
            notFoundError.style.visibility = "hidden";
        },600)
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
            else if(inputNumber.value == 0 && inputNumber.value.length != 0){
                
                notZero.style.visibility = "visible";
                setTimeout(()=>{
                    notZero.style.visibility = "hidden";
                },600)
            }
            else if(inputNumber.value.length == 0){
                incorrectNumber.style.visibility = "visible";
                setTimeout(()=>{
                    incorrectNumber.style.visibility = "hidden";
                },600)
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
        screenn.appendChild(typesID);
        screenn.appendChild(hpContainer);
        screenn.appendChild(alturaContainer)
        screenn.appendChild(pesoContainerID)

        const types = typesID.textContent = pokemon[0].types.map(e=>(e.type.name)).join(", ");
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