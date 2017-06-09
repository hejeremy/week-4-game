
//Backgrounds list
var backgrounds = ['cafe', 'bar', 'table', 'patio'];
generateOptions(backgrounds, $('#backgrounds'), 'backgroundOptions');

//Character list
var characters = ['polarBear', 'panda', 'penguin'];
generateOptions(characters, $('#characters'), 'characterOptions');

//Tracks your current location
var currentLocation = 'cafe';
setBackground(currentLocation);

//Tracks if you're in a conversation
var talking = false;

//Character info and stats
var polarBear = {
    name: 'Polar Bear',
    species: 'polar bear',
    relation: 0,
    startConversation: function() {
        if (this.relation === 0) {
            return ("Hi there! My name is Polar Bear, welcome to my cafe!");
        }
        else if (this.relation > 0 && this.relation < 3) {
            return ("Welcome!");
        } else if (this.relation >= 3 && this.relation < 10) {
            return ("It's good to see you again!");
        } else {
            return ("Hello friend! Would you like the usual?");
        }
    }
}

var panda = {
    name: 'Panda',
    species: 'giant panda',
    relation: 0,
    startConversation: function() {
        if (this.relation === 0) {
            return ("Hey hey! I'm Panda! I'm a regular here. Aren't I cute?");
        }
        else if (this.relation > 0 && this.relation < 3) {
            return ("Whos are you again?");
        } else if (this.relation >= 3 && this.relation < 10) {
            return ("Oh hey, didn't see you there.");
        } else {
            return ("Hey hey! Listen to this!");
        }
    }
}

var penguin = {
    name: 'Penguin',
    species: 'penguin',
    relation: 0,
    startConversation: function() {
        if (this.relation === 0) {
            return ("Hello. I'm penguin. Nice to meet you!");
        }
        else if (this.relation > 0 && this.relation < 3) {
            return ("Hey again.");
        } else if (this.relation >= 3 && this.relation < 10) {
            return ("Will I ever pass the driving exam?");
        } else {
            return ("I got my license!");
        }
    }
}
//Sets background scene
function setBackground(inputValue) {
    console.log(inputValue);
    var imageName = inputValue + '.jpg';
    var imageLocation = 'url(assets/images/' + imageName + ')';
            $('body').css('background-image', imageLocation);
            $('body').css('background-size', '100%, auto');
            $('body').css('background-repeat', 'no-repeat');
            }

            //Generates button options from chosen array, then appends them to a selected element
            function generateOptions(inputArray, outputPlace, classOption) {
                outputPlace.empty();
                inputArray.forEach(function(item) {
                    var newOption = $('<button>');
                    newOption.addClass(classOption);
                    newOption.data('value', item);
                    newOption.text(item.toUpperCase());
                    //console.log(newOption.data('value'));
                    newOption.appendTo(outputPlace);
                });
            }

            //Conversation event handler
            function enterConversation(inputValue) {
                console.log(inputValue);
                generateConversation(inputValue);
            }

//Selects character to generate conversation with
function generateConversation(inputValue) {
    switch(inputValue) {
        case 'polarBear':
            callPolarBear();
            break;
        case 'panda':
            callPanda();
            break;
        case 'penguin':
            callPenguin();
            break;
        default:
            break;
    }
}


//WARNING INCOMPLETE CODE START <---------
//Generates character stats
function generateCharacterStats(inputObj) {
    var setCharacter = $('<div>');
    setCharacter.addClass('col-sm-4');
    for (x in inputObj) {
        var value = inputObj[x];
        //console.log(typeof value);
        if (typeof value != 'function') {
            var characterInfo = $('<p>');
            characterInfo.text = x.toUpperCase() + ': ' + inputObj[x];
            console.log(characterInfo.text);
            setCharacter.append(characterInfo);
        }
    }
    setCharacter.appendTo($('#characterStats'));
}

function clearStats() {
    $('characterStats').empty();
}

generateCharacterStats(polarBear);
generateCharacterStats(panda);
generateCharacterStats(penguin);
//------------> INCOMPLETE SEGMENT END

function callPolarBear() {
    alert(polarBear.startConversation());

    polarBear.relation++;
    talking = false;
}

function callPanda() {
    alert(panda.startConversation());

    panda.relation++;
    talking = false;
}

function callPenguin() {
    alert(penguin.startConversation());

    penguin.relation++;
    talking = false;
}

//Choses background from assets/images
$('.backgroundOptions').on('click', function() {
    //console.log($(this).data('value'));
    if(currentLocation === $(this).data('value')) {
        return;
    }
    currentLocation = $(this).data('value');
    //console.log(currentLocation);
    setBackground(currentLocation);
});

$('.characterOptions').on('click', function() {
    if (talking) {
        return;
    } else {
        talking = true;
    }
    var currentCharacter = $(this).data('value');
    enterConversation(currentCharacter);
});
