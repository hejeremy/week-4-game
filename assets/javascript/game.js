
//Backgrounds list
var backgrounds = ['cafe', 'bar', 'table', 'patio'];
generateOptions(backgrounds, $('#backgrounds'), 'backgroundOptions');

//Character list
var characters = {
    cafe: ['polarBear', 'panda', 'penguin'],
    bar: ['polarBear', 'panda', 'penguin'],
    table: ['panda'],
    patio: ['penguin'],
};

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
            return (["Hi there! My name is Polar Bear, welcome to my cafe!"]);
        }
        else if (this.affection_lvl > 0 && this.affection_lvl < 3) {
            return (["Welcome!"]);
        } else if (this.affection_lvl >= 3 && this.affection_lvl < 6) {
            return (["It's good to see you again!"]);
        } else {
            return (["Hello friend! Would you like the usual?", "I got something nice.", "Just in today!"]);
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
        else if (this.affection_lvl > 0 && this.affection_lvl < 3) {
            return (["I wonder when my food will arrive?"]);
        } else if (this.affection_lvl >= 3 && this.affection_lvl < 6) {
            return (["Oh hey, didn't see you there."]);
        } else {
            return (["Hey hey! Listen to this!"]);
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
        else if (this.affection_lvl > 0 && this.affection_lvl < 3) {
            return (["Hey again."]);
        } else if (this.affection_lvl >= 3 && this.affection_lvl < 6) {
            return (["Will I ever pass the driving exam?"]);
        } else {
            return (["I got my license!"]);
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
    newPanel.addClass('panel-body');
    newPanel.append(input);
    return newPanel;
}

//Not working
function callPolarBear() {
    talkingTo = 'polarBear';
    characterImage.css('background-image', 'url(./assets/images/polarBear1.jpg)');
    loadConversation(polarBear.startConversation());
    var sentence = createConversation(conversationHolder);

    polarBear.affection_lvl++;
    talking = false;
}

function callPanda() {
    talkingTo = 'panda';
    characterImage.css('background-image', 'url(./assets/images/panda1.jpg)');
    loadConversation(panda.startConversation());
    var sentence = createConversation(conversationHolder);

    panda.affection_lvl++;
    talking = false;
}

function callPenguin() {
    talkingTo = 'penguin';
    characterImage.css('background-image', 'url(./assets/images/penguin1.jpg)');
    loadConversation(penguin.startConversation());
    var sentence = createConversation(conversationHolder);

    penguin.affection_lvl++;
    talking = false;
}

function playAudio(inputValue) {
    console.log(inputValue);
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
    console.log(conversationHolder);
}

function createConversation(conversationHolder) {
    createNextButton(conversationHolder);
    setNextButton();
    return handleConversation();
}

function handleConversation() {
    var conversation = conversationHolder.dialogue[conversationHolder.dialoguePlace];
    conversationHolder.dialoguePlace++;
    console.log(conversationHolder.dialoguePlace);
    console.log(conversation);
    conversationWords.html(panelPackage(sentencePackage(conversation)));
    return conversation;
}

function createNextButton(conversationHolder) {
    var nextButton = $('#nextButton');
    var newButton = $('<button>');
    newButton.attr('id', 'button');
    newButton.text('Next');
    if (conversationHolder.dialoguePlace >= conversationHolder.dialogueLength) {
        nextButton.empty();
    } else {
        nextButton.empty();
        nextButton.append(newButton);
    }
}

function setNextButton() {
    $('#button').on('click', function() {
        if (conversationHolder.dialoguePlace >= conversationHolder.dialogueLength) {
            $('#nextButton').empty();
            $('#conversationWords').empty();
            characterImage.css('background-image', 'none');
            checkTalkingTo();
        } else {
            handleConversation();
        }
    });
}

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
    resetCharacterButtons();
});

//This needs to be called each time options are generated because .empty removes it
function resetCharacterButtons() {

    var characterOptions = $('.characterOptions');
    characterOptions.on('click', function() {
        if (talking) {
            console.log('still running');
            return;
        } else {
            talking = true;
        }
        var currentCharacter = $(this).data('value');
        enterConversation(currentCharacter);
        talking = false;
        clearStats();
        generateAllStats();
    });
}
