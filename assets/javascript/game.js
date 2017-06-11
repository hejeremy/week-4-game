//Instructions
$(document).ready(function() {
alert('Welcome to Polar Bear Cafe!'
        + "\nClick on the buttons to change scenery or talk to the characters."
        + "\nPressing the 'Enter' key during conversations is the same as clicking 'Next'."
        + "\nTalking to characters raises 'affection_lvl'."
        + "\nConversations change depending 'affection_lvl'."
        + "\nLook out for addtional conversation choices that appear! These depend on your location and add a boost to your 'affection_lvl'!");
});

//Backgrounds list
var backgrounds = ['cafe', 'bar', 'table', 'patio'];
generateOptions(backgrounds, $('#backgrounds'), 'backgroundOptions');

//Character list
var characters = {
    cafe: ['polarBear', 'panda', 'penguin'],
    bar: ['polarBear', 'panda', 'penguin'],
    table: ['penguin'],
    patio: ['panda'],
};

//Clears portrait
$('#conversationWords').css('visibility', 'hidden');

//Tracks your current location
var currentLocation = 'cafe';
setBackground(currentLocation);
generateOptions(characters[currentLocation], $('#characters'), 'characterOptions');
playAudio(currentLocation);

//Call this to reattach onclick to the button classes
resetCharacterButtons();

//Tracks if you're in a conversation
var talking = false;
var talkingTo = '';

//Character info and stats
var polarBear = {
    name: 'Polar Bear',
    species: 'polar bear',
    affection_lvl: 0,
    startConversation: function() {
        if (this.affection_lvl === 0) {
            return ["Hi there! My name is Polar Bear, welcome to my cafe!"];
        }
        else if (this.affection_lvl > 0 && this.affection_lvl < 5) {
            return ["Welcome!"];
        } else if (this.affection_lvl >= 5 && this.affection_lvl <= 9) {
            return ["It's good to see you again!"];
        } else {
            return ["Hello friend!",
                "Would you like the usual?"];
        }
    },
    cafe: function() {
        if (this.affection_lvl > 9) {
            return ["It's always good to see a familiar face.",
                "Sometimes this place doesn't have many patrons,",
                "and it feels rather lonely.",
                "Just so you know,",
                "you will always be welcome here."];
        } else if (this.affection_lvl >= 5 && this.affection_lvl <= 9) {
            return ["You've been coming more often.",
                "I wonder if you've taken a liking to this place.",
                "Please enjoy your stay."];
        } else {
            return ["Surprised to see a polar bear running this cafe?"];
        }
    },
    initialConversation1: function() {
        var speech = ['Would you like to order something?.'];
        //initiateConversation(speech);
        return 'pb1';
    },
    responseConversation1: function(input) {
        switch (input) {
            case '0':
                return ["I see.",
                "I'll leave you to it then."];
                break;
            case '1':
                return ["Coming right up!"];
                break;
            default:
                return ['...'];
                break;
        }
    },
    initialConversation2: function() {
        var speech = ['The weather today sure is nice.', 'I hope you are well.'];
        //initiateConversation(speech);
        return 'pb2';
    },
    responseConversation2: function(input) {
        switch (input) {
            case '0':
                return ["Good to hear!", "Today is great day after all."];
                break;
            case '1':
                return ["Oh dear.", "I hope you feel better."];
                break;
            default:
                return ['...'];
                break;
        }
    }
};

var panda = {
    name: 'Panda',
    species: 'giant panda',
    affection_lvl: 0,
    startConversation: function() {
        if (this.affection_lvl === 0) {
            return (["Hey! I'm Panda! I'm a regular here. Aren't I cute?"]);
        }
        else if (this.affection_lvl > 0 && this.affection_lvl < 5) {
            return ["I wonder when my food will arrive?"];
        } else if (this.affection_lvl >= 5 && this.affection_lvl <= 9) {
            return ["Oh hey, didn't see you there."];
        } else {
            return ["I hope you are having a great day!"];
        }
    },
    cafe: function() {
        if (this.affection_lvl > 9) {
            return ["Hey hey! Listen to this!",
                "Today at the zoo,",
                "some elementary school students came on a field trip.",
                "I put on a great show service for them!"];
        } else if (this.affection_lvl >= 5 && this.affection_lvl <= 9) {
            return ["You like talking to me don't you?", "I wonder if this means we're friends."];
        } else {
            return ["So today at the zoo..."];
        }
    },
    patio: function() {
        if (this.affection_lvl > 9) {
            return ["I appreciate you talking with me.",
                "It makes me feel all warm and fuzzy.",
                "Like basking in the sun!"];
        } else if (this.affection_lvl >= 5 && this.affection_lvl <= 9) {
            return ["When I first came here...",
                "This cafe didn't serve bamboo.",
                "Can you believe that?"];
        } else {
            return ["Normally I would be sitting inside,",
                "but being outside is nice too sometimes!"];
        }
    }
};

var penguin = {
    name: 'Penguin',
    species: 'penguin',
    affection_lvl: 0,
    startConversation: function() {
        if (this.affection_lvl === 0) {
            return (["Hello. I'm penguin. Nice to meet you!"]);
        }
        else if (this.affection_lvl > 0 && this.affection_lvl < 5) {
            return (["Hey again."]);
        } else if (this.affection_lvl >= 5 && this.affection_lvl <= 9) {
            return (["Will I ever pass the driving exam?"]);
        } else {
            return (["I got my license!",
                    "I'm going to ask Ms. Penko out for a drive!"]);
        }
    },
    cafe: function() {
        if (this.affection_lvl > 9) {
            return ["I appreciate that you always listen to me.",
                "Because of your support,",
                "I passed the driving exam!",
                "I finally have a driver's liscense!"];
        } else if (this.affection_lvl >= 5 && this.affection_lvl <= 9) {
            return ["I wonder if I'll do better this time?",
                "Oh well it's like they say,",
                "you can't succeed if you don't try."];
        } else {
            return ["Is there something you need?",
                "I can't really help you right now."];
        }
    },
    table: function() {
        if (this.affection_lvl > 9) {
            return ["I appreciate that you always listen to me.",
                "Because of your support,",
                "I passed the driving exam!",
                "I finally have a driver's liscense!"];
        } else if (this.affection_lvl >= 5 && this.affection_lvl <= 9) {
            return ["I won't give up on the driving exam!",
                "It's like they say,",
                "you can't succeed if you don't try."];
        } else {
            return ["Sometimes I like this quiet corner",
                "It helps me think."];
        }
    }
};
//Sets background scene
function setBackground(inputValue) {
    var imageName = inputValue + '.jpg';
    var imagePath = "url(assets/images/" + imageName + ")";

    var body = $('body');
    body.css('background-image', imagePath);
    //$('body').css('background-size', '100%, auto');
    body.css('background-repeat', 'no-repeat')

}

//Generates button options from chosen array, then appends them to a selected element
function generateOptions(inputArray, outputPlace, classOption) {
    outputPlace.empty();
    inputArray.forEach(arrayLoop);
    function arrayLoop(item) {
        var newOption = $('<button>');
        newOption.addClass(classOption);
        if (classOption === 'characterOptions') {
            newOption.addClass('btn btn-success');
        } else if (classOption === 'backgroundOptions') {
            newOption.addClass('btn btn-primary');
        } else {
            newOption.addClass('btn btn-default');
        }
        newOption.data('value', item);
        newOption.text(item.toUpperCase());
        //console.log(newOption.data('value'));
        newOption.appendTo(outputPlace);
    }
}

//Conversation event handler
function enterConversation(inputValue) {
    //console.log(inputValue);
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

//Opens stats
generateAllStats();

//Generates character stats
function generateCharacterStats(inputObj) {
    var setCharacter = $('<div>');
    setCharacter.addClass('col-sm-4 panel panel-info');
    var setCharacterHeader = $('<div>');
    setCharacterHeader.addClass('panel-heading');
    var panelTitle = $('<h3>');
    panelTitle.addClass('panel-title');
    panelTitle.text(inputObj['name']);
    setCharacterHeader.append(panelTitle);
    var setCharacterBody = $('<div>');
    setCharacterBody.addClass('panel-body');
    for (x in inputObj) {
        var value = inputObj[x];
        //console.log(typeof value);
        if (typeof value != 'function') {
            var characterInfo = $('<p>');
            characterInfo.text(x.toUpperCase() + ': ' + inputObj[x]);
            //console.log(characterInfo.text);
            setCharacterBody.append(characterInfo);
        }
    }
    setCharacter.append(setCharacterHeader);
    setCharacter.append(setCharacterBody);
    setCharacter.appendTo($('#characterStats'));
}

//Clears all stuff from $('#characterStats');
function clearStats() {
    $('#characterStats').empty();
}

function refreshStats () {
    clearStats();
    generateAllStats();
}

function generateAllStats() {
    generateCharacterStats(polarBear);
    generateCharacterStats(panda);
    generateCharacterStats(penguin);
}


//Calls to start conversation
var characterImage = $('#characterImage');

var conversationWords = $('#conversationWords');

function sentencePackage(input) {
    var newParagraph = $('<p>');
    newParagraph.text(input);
    return newParagraph;
}

function panelPackage(input) {
    var newPanel = $('<div>');
    newPanel.addClass('panel-body w3-container w3-animate-opacity');
    newPanel.append(input);
    return newPanel;
}

//Not working
function callPolarBear() {
    if (talking) {
        return;
    } else {
        talking = true;
    }
    talkingTo = 'polarBear';
    initiateConversation(polarBear.startConversation(), talkingTo);

    polarBear.affection_lvl++;
    checkLocationConversation();
    //talking = false;
}

function callPanda() {
    if (talking) {
        return;
    } else {
        talking = true;
    }
    talkingTo = 'panda';
    initiateConversation(panda.startConversation(), talkingTo);

    panda.affection_lvl++;
    checkLocationConversation();
    //talking = false;
}

function callPenguin() {
    if (talking) {
        return;
    } else {
        talking = true;
    }
    talkingTo = 'penguin';
    initiateConversation(penguin.startConversation(), talkingTo);

    penguin.affection_lvl++;
    checkLocationConversation();
    //talking = false;
}

function playAudio(inputValue) {
    //console.log(inputValue);
    switch(inputValue) {
        case 'cafe':
        case 'patio':
            $('#audio2')[0].pause();
            $('#audio2')[0].currentTime = 0;
            $('#audio1')[0].play();
            break;
        case 'bar':
        case 'table':
            $('#audio1')[0].pause();
            $('#audio1')[0].currentTime = 0;
            $('#audio2')[0].play();
        default:
            break;
    }
}

var conversationHolder = {
    dialogue: [],
    dialogueLength: 0,
    dialoguePlace: 0
};

function loadConversation(inputArray) {
    conversationHolder.dialogue = inputArray;
    conversationHolder.dialogueLength = inputArray.length;
    conversationHolder.dialoguePlace = 0;
    //console.log(conversationHolder);
}

function createConversation(conversationHolder) {
    createNextButton(conversationHolder);
    setNextButton();
    return handleConversation();
}

function handleConversation() {
    var conversation = conversationHolder.dialogue[conversationHolder.dialoguePlace];
    conversationHolder.dialoguePlace++;
    //console.log(conversationHolder.dialoguePlace);
    //console.log(conversation);
    conversationWords.html(panelPackage(sentencePackage(conversation)));
    return conversation;
}

function createNextButton(conversationHolder) {
    var nextButton = $('#nextButton');
    var newButton = $('<button>');
    newButton.attr('id', 'buttonNext');
    newButton.addClass('btn btn-info');
    newButton.text('Next');
    if (conversationHolder.dialoguePlace >= conversationHolder.dialogueLength) {
        nextButton.empty();
    } else {
        nextButton.empty();
        nextButton.append(newButton);
    }
}

function setNextButton() {
    $('#buttonNext').on('click', nextButtonFunction);
}

function nextButtonFunction() {
    if (conversationHolder.dialoguePlace >= conversationHolder.dialogueLength) {
        $('#conversationWords').empty();
        characterImage.css('background-image', 'none');
        $('#conversationWords').css('visibility', 'hidden');
        talking = false;
        refreshStats();
        $('#nextButton').empty();
    } else {
        handleConversation();
    }
}

$(document).keyup(function (event) {
    if (talking && event.key.toLowerCase() === 'enter') {
        nextButtonFunction();
    } else {
        return;
    }
    //alert('The key pressed was: ' + event.key.toLowerCase());
});

function checkTalkingTo() {
    switch(talkingTo) {
        case 'polarBear':
            //Do something
            console.log('Talking to ' + talkingTo + '.');
            break;
        case 'panda':
            //Do something
            console.log('Talking to ' + talkingTo + '.');
            break;
        case 'penguin':
            //Do something
            console.log('Talking to ' + talkingTo + '.');
            break;
        default:
            break;
    }
}

//Choses background from assets/images
var backgroundOptions = $('.backgroundOptions');
backgroundOptions.on('click', function() {
    if(currentLocation === $(this).data('value')) {
        return;
    }
    currentLocation = $(this).data('value');
    playAudio(currentLocation);
    setBackground(currentLocation);
    generateOptions(characters[currentLocation], $('#characters'), 'characterOptions');
    checkLocationConversation();
    resetCharacterButtons();
});

//This needs to be called each time options are generated because .empty removes it
function resetCharacterButtons() {

    var characterOptions = $('.characterOptions');
    characterOptions.on('click', function() {
        /*
           if (talking) {
           console.log('still running');
           return;
           } else {
           talking = true;
           }
           */
        var currentCharacter = $(this).data('value');
        enterConversation(currentCharacter);
        //talking = false;
        //refreshStats();
    });
}

function initiateConversation(inputConversation, inputCharacter) {
    setCharacterBackground(inputCharacter);
    loadConversation(inputConversation);
    createConversation(conversationHolder);
}

function setCharacterBackground(inputCharacter) {
    switch (inputCharacter) {
        case 'polarBear':
            characterImage.css('background-image', 'url(./assets/images/polarBear1.jpg)');
            $('#conversationWords').css('visibility', 'visible');
            break;
        case 'panda':
            characterImage.css('background-image', 'url(./assets/images/panda1.jpg)');
            $('#conversationWords').css('visibility', 'visible');
            break;
        case 'penguin':
            characterImage.css('background-image', 'url(./assets/images/penguin1.jpg)');
            $('#conversationWords').css('visibility', 'visible');
            break;
        default:
            break;
    }
}

function checkLocationConversation() {
    var additionalOptions = $('#conversationOptions');
    additionalOptions.empty();
    var type = 'locationConversation';
    switch (currentLocation) {
        case 'cafe':
            characters.cafe.forEach(function(input) {
                var keyChance = 0;
                if (selectCharacter(input)['affection_lvl'] < 1) {
                    keyChance = 0;
                } else {
                    keyChance = .3;
                }
                if (checkForKey(input, 'cafe') && generateRandomKey(keyChance)) {
                    additionalOptions.append(packageButton(type, input, input));
                } else {
                    //console.log('Character ' + input + ' does not have this key.');
                }
            });
            break;
        case 'bar':
            characters.bar.forEach(function(input) {
                var keyChance = 0;
                if (selectCharacter(input)['affection_lvl'] < 1) {
                    keyChance = 0;
                } else {
                    keyChance = .3;
                }
                if (checkForKey(input, 'bar') && generateRandomKey(keyChance)) {
                    additionalOptions.append(packageButton(type, input, input));
                } else {
                    //console.log('Character ' + input + ' does not have this key.');
                }
            });
            break;
        case 'table':
            characters.table.forEach(function(input) {
                var keyChance = 0;
                if (selectCharacter(input)['affection_lvl'] < 1) {
                    keyChance = 0;
                } else {
                    keyChance = .3;
                }
                if (checkForKey(input, 'table') && generateRandomKey(keyChance)) {
                    additionalOptions.append(packageButton(type, input, input));
                } else {
                    //console.log('Character ' + input + ' does not have this key.');
                }
            });
            break;
        case 'patio':
            characters.patio.forEach(function(input) {
                var keyChance = 0;
                if (selectCharacter(input)['affection_lvl'] < 1) {
                    keyChance = 0;
                } else {
                    keyChance = .3;
                }
                if (checkForKey(input, 'patio') && generateRandomKey(keyChance)) {
                    additionalOptions.append(packageButton(type, input, input));
                } else {
                    //console.log('Character ' + input + ' does not have this key.');
                }
            });
            break;
        default:
            break;
    }
    setButtonByClass(type);
}

function generateRandomKey(inputChance) {
    return (Math.random() < inputChance);
}

//Checks if key is in object
function checkForKey(inputName, inputKey) {
    var loadObject = selectCharacter(inputName);
    return loadObject.hasOwnProperty(inputKey);
}

//Selects character object
function selectCharacter(input) {
    switch (input) {
        case 'polarBear':
            return polarBear;
            break;
        case 'panda':
            return panda;
            break;
        case 'penguin':
            return penguin;
            break;
        default:
            break;
    }
}

//Initiates a special conversation between you and a character
function startLocationConversation(characterInput, locationInput) {
    var character = selectCharacter(characterInput);
    switch(locationInput) {
        case 'cafe':
            initiateConversation(character.cafe(), characterInput);
            break;
        case 'bar':
            initiateConversation(character.bar(), characterInput);
            break;
        case 'table':
            initiateConversation(character.table(), characterInput);
            break;
        case 'patio':
            initiateConversation(character.patio(), characterInput);
            break;
        default:
            break;
    }
}

function packageButton(inputClass, inputValue, inputCharacter) {
    var newButton = $('<button>');
    var classValue = 'btn btn-default ' + inputClass;
    newButton.addClass(classValue);
    newButton.attr('value', inputValue);
    newButton.text('+' + inputCharacter.toUpperCase());
    return newButton;
}

//Sets special conversation buttons
function setButtonByClass(inputClass) {
    switch (inputClass) {
        case 'locationConversation':
            setLocationConversationButton();
            break;
        case 'personalConversation':
            setSpecialConversationButton();
            break;
        case 'responsiveConversation':
            setSpecialConversationButton();
            break;
        default:
            break;
    }
}

//Special conversation: personalConversation
function setLocationConversationButton() {
    $('.locationConversation').on('click', function() {
        if (talking) {
            return;
        } else {
            talking = true;
        }
        var buttonValue = $(this).attr('value');
        var updateCharacter = selectCharacter(buttonValue);
        startLocationConversation(buttonValue, currentLocation);
        updateCharacter['affection_lvl'] += 5;
        //console.log('Runs and returns value: ' + $(this).attr('value'));
        $(this).remove();
    });
}

//Special conversation: responsiveConversation
function setResponsiveConversationButton() {
    $('.responsiveConverstion').on('click', function() {
        $(this).remove();
    });
}
