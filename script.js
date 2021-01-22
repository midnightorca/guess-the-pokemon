const NUMBER_POKEMON = 3;
const pokemon = {};

pokemon.baseUrl = 'https://pokeapi.co/api/v2';

//get random pokemon character

//get name of said pokemon character and two other random ones
//if player guesses correct, show this
//if player guesses wrong, show this

pokemon.getCharacter = (pokemonId) => {
    let response = $.ajax({
        url: `${pokemon.baseUrl}/pokemon/${pokemonId}/`,
        dataType: 'json',
        method: 'GET', 
        async: false
    }).responseJSON;
    return response;
};

pokemon.getPokemonArray = quantity => {
    let pokemonData = [];
    for (let i = 0; i < quantity; i++) {
        
        let pokemonId = Math.floor(Math.random() * 150 + 1);
        //
        // const isPokemonId = id => {
        //     return pokemonId === id;
        // };
        // console.log(pokemonData.find(isPokemonId));
        
        // const found = pokemonData.find(pokemonId);
        // if (found === pokemonId) {
        //     console.log('duplicate found');
        // } else {
        //     console.log(pokemonId);
        // }
        // console.log('found it');
        //
        const onePokemon = pokemon.getCharacter(pokemonId);
        pokemonData.push({
            id: onePokemon.id,
            name: onePokemon.name,
            image_url: onePokemon.sprites.front_default
        });        
    };
    return pokemonData;
};

pokemon.makeButtons = pokemonData => {
    //make a button for each pokemon in array
    pokemonData.forEach(poke => {
        const htmlToAppend = `
        <button class="choice hover" id="pokemon${poke.id}">${poke.name}</button>`
        $('#choices').append(htmlToAppend);
    });
};

pokemon.choosePokemon = multiPokemon => {
    let chosen = Math.floor(Math.random() * multiPokemon.length);
    return multiPokemon[chosen];    
};

pokemon.displayImg = onePokemon => {
    const imgToAppend = `<img id="randomPoke" src="${onePokemon.image_url}"/>`;
    //append img to html
    $('#pokeShadow').append(imgToAppend);
    //create silhouette of img
    $('#randomPoke').css('filter', `contrast(10000%) brightness(0) saturate(100%) grayscale(100%)`);
};

pokemon.setAnswerClick = () => {  
    $('button.choice').on('click', event => {
        $(event.target).css({'background-color': 'black', 'border': '5px double #ECF6AC'});
        $('.choice').css({'color': 'red', 'cursor': 'unset'});
        $('.choice').removeClass('hover');
        $('.correct').css('color', 'green');
        $('#randomPoke').css('filter', 'initial');
        $('.choice').prop('disabled', true);  

        setTimeout(function() {
            $('#randomPoke').css('visibility', 'hidden');
            // $('.choice').css('visibility', 'hidden');
            $('#playAgain').css('visibility', 'visible');

        }, 1000);
    });
};

pokemon.setPlayAgainClick = () => {
    $('#playAgain').on('click', () => {
        $('#pokeShadow').empty();
        $('#choices').empty();
        $('#playAgain').css('visibility', 'hidden');

        let pokemonData = pokemon.getPokemonArray(NUMBER_POKEMON);
        console.log(pokemonData);
        
        pokemon.makeButtons(pokemonData);

        let chosenPokemon = pokemon.choosePokemon(pokemonData);
        pokemon.displayImg(chosenPokemon);

        //add class of 'correct' to chosen pokemon button
        $(`#pokemon${chosenPokemon.id}`).addClass('correct');
        //reveal correct answer
        pokemon.setAnswerClick();
        pokemon.setPlayAgainClick();
    })
};

pokemon.startGame = () => {
    //when use click's let's play, hide button
    $('.starter').on('click', () => {
        $('#start').css('visibility', 'hidden');
        $('#start').css('margin-top', '0px');
        //
        let pokemonData = pokemon.getPokemonArray(NUMBER_POKEMON);
        console.log(pokemonData);
        
        pokemon.makeButtons(pokemonData);

        let chosenPokemon = pokemon.choosePokemon(pokemonData);
        pokemon.displayImg(chosenPokemon);

        //add class of 'correct' to chosen pokemon button
        $(`#pokemon${chosenPokemon.id}`).addClass('correct');
        //reveal correct answer
        pokemon.setAnswerClick();
        pokemon.setPlayAgainClick();
    });
};


pokemon.init = () => {
    pokemon.startGame();
}

$(function(){
    pokemon.init();//document ready
});