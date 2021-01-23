const NUMBER_POKEMON = 3;
const pokemon = {};

pokemon.baseUrl = 'https://pokeapi.co/api/v2';

//get info from api
pokemon.getCharacter = (pokemonId) => {
    let response = $.ajax({
        url: `${pokemon.baseUrl}/pokemon/${pokemonId}/`,
        dataType: 'json',
        method: 'GET',
        async: false
    }).responseJSON;
    return response;
};

//get info of number of pokemon requested
pokemon.getPokemonArray = quantity => {
    let pokemonData = [];
    for (let i = 0; i < quantity; i++) {
        
        let pokemonId;
        
        //loop to check for duplicates in array
        do {
            pokemonId = Math.floor(Math.random() * 150 + 1);
        } while (pokemonData.includes(pokemonId)); 
        
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

//function to choose random pokemon to be displayed
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
    //create event listener for when user chooses an answer
    $('button.choice').on('click', event => {
        $(event.target).css({'background-color': 'black', 'border': '5px double #ECF6AC'});
        $('.choice').css({'color': 'red', 'cursor': 'unset'});
        $('.choice').removeClass('hover');
        $('.correct').css('color', 'green');
        $('#randomPoke').css('filter', 'initial');
        $('.choice').prop('disabled', true);  
        //create timeout for play again button to pop up
        setTimeout(function() {
            $('#randomPoke').css('visibility', 'hidden');
            $('#playAgain').css('visibility', 'visible');
        }, 1000);
    });
};

pokemon.setPlayAgainClick = () => {
    //event listener for when user clicks play again
    $('#playAgain').on('click', () => {
        $('#pokeShadow').empty();
        $('#choices').empty();
        $('#playAgain').css('visibility', 'hidden');

        let pokemonData = pokemon.getPokemonArray(NUMBER_POKEMON);
        
        pokemon.makeButtons(pokemonData);

        let chosenPokemon = pokemon.choosePokemon(pokemonData);
        pokemon.displayImg(chosenPokemon);

        $(`#pokemon${chosenPokemon.id}`).addClass('correct');
        
        pokemon.setAnswerClick();
        pokemon.setPlayAgainClick();
    });
};

pokemon.startGame = () => {
    //when use click's let's play, hide button
    $('.starter').on('click', () => {
        $('#start').css('visibility', 'hidden');
        $('#start').css('margin-top', '0px');
        $('#background').css('visibility', 'visible');
        $('#choices').css('visibility', 'visible');
        //
        let pokemonData = pokemon.getPokemonArray(NUMBER_POKEMON);
        
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
};

$(function(){
    pokemon.init();//document ready
});