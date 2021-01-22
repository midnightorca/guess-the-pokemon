const pokemon = {};

pokemon.baseUrl = 'https://pokeapi.co/api/v2';

//get random pokemon character

//get name of said pokemon character and two other random ones
//if player guesses correct, show this
//if player guesses wrong, show this

pokemon.randomId = Math.floor(Math.random() * 150 + 1);
pokemon.randomNum1 = Math.floor(Math.random() * 150 + 1);
pokemon.randomNum2 = Math.floor(Math.random() * 150 + 1);

// const randomId1 = () => {
//     let randomNum1 = Math.floor(Math.random() * 150 + 1);
//     if (randomNum1 === randomId) {
//         randomId1();
//     } else {
//         console.log(randomNum1);
//     }
// };


pokemon.getCharacter = () => {
    $.ajax({
        url: `${pokemon.baseUrl}/pokemon/${pokemon.randomId}/`,
        dataType: 'json',
        method: 'GET'  
    }).then(result => {
        console.log(pokemon.randomId);
        pokemon.displayShadow(result);
        pokemon.displayName(result);
    });
};


pokemon.displayShadow = (result) => {
    const imgToAppend = `<img id="randomPoke" src="${result.sprites.front_default}"/>`;
    //append img to html
    $('#pokeShadow').append(imgToAppend);
    // $('#randomPoke').css('mix-blend-mode', 'color-burn');
    $('#randomPoke').css('filter', `contrast(10000%) brightness(0) saturate(100%) grayscale(100%)`);
};

pokemon.displayName = (result) => {
    // const nameToAppend = `<button class="choice" id="correct">${result.name}</button>`;
    $('#poke0').html(`${result.name}`);
};

pokemon.displayName1 = (result) => {
    // const nameToAppend = `${result.name}`;
    $('#poke1').html(`${result.name}`);
};

pokemon.displayName2 = (result) => {
    // const nameToAppend = `${result.name}`;
    $('#poke2').html(`${result.name}`);
};

pokemon.randomName1 = () => {
    $.ajax({
        url: `${pokemon.baseUrl}/pokemon/${pokemon.randomNum1}/`,
        dataType: 'json',
        method: 'GET'
    }).then( res => {
        // console.log('random1 works');
        pokemon.displayName1(res);
        // return res.name;
    });
};

pokemon.randomName2 = () => {
    $.ajax({
        url: `${pokemon.baseUrl}/pokemon/${pokemon.randomNum2}/`,
        dataType: 'json',
        method: 'GET'
    }).then( results => {
        // console.log('random1 works');
        pokemon.displayName2(results);
        // return res.name;
    });
};

//create array of buttons to shuffle
pokemon.createArray = () => {
    // $('#choices').toArray();
    // console.log('it works');
    const choiceArray = document.querySelectorAll("button.choice");
    console.log(choiceArray);
};

// pokemon.guessName = 
pokemon.correctGuess = () => {
    // console.log('hello');
    $('div').on('click', '.choice', () => {
        // let selected = $('.choice').val();
        // if (selected === poke0) {
        //     console.log('correct');
        // } else {
        //     console.log('incorrect');
        // }
        console.log('correct!');
        $('.choice').css('color', 'red');
        $('#poke0').css('color', 'green');
        $('#randomPoke').css('filter', 'initial');

    });
};

// filter: contrast(10000%) brightness(0) saturate(100%) grayscale(100%);



pokemon.startGame = () => {
    //when use click's let's play, hide button
    $('#start').on('click', () => {
        $('#start').css('visibility', 'hidden');
        $('#start').css('margin-top', '0px');
        pokemon.getCharacter();
        pokemon.randomName1();
        pokemon.randomName2();
        pokemon.createArray();
        $('button.choice').css('visibility', 'visible');
        pokemon.correctGuess();
    });
    // $('.choice').on('click', () => {
    //     console.log('correct!');
    // });
};



pokemon.init = () => {
    pokemon.startGame();
}

$(function(){
    pokemon.init();//document ready
});