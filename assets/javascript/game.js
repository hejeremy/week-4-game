//Polar Bear Cafe

//Backgrounds list
var backgrounds = ['cafe', 'bar', 'table', 'patio'];
generateOptions(backgrounds, $('#backgrounds'), 'backgroundOptions');

//Character list
var characters = {
    cafe: ['polarBear', 'panda', 'penguin'],
    bar: ['polarBear', 'panda', 'penguin'],
    table: ['polarBear', 'panda', 'penguin'],
    patio: ['polarBear', 'panda', 'penguin'],
};

//Audio import that loops
var audio1 = new Audio('assets/audio/openForBusiness.mp3');
audio1.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

var audio2 = new Audio('assets/audio/goodnightThankYou.mp3');
audio2.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

//Conversation interval
var conversationInterval;

//Clears portrait
//$('#conversationWords').css('visibility', 'hidden');

//Tracks your current location
var currentLocation = 'cafe';
setBackground(currentLocation);
generateOptions(characters[currentLocation], $('#characters'), 'characterOptions');
playAudio(currentLocation);

//Call this to reattach onclick to the button classes
resetCharacterButtons();

//Tracks if you're in a conversation
var talking = false;
showButtons();
var talkingTo = '';

//Character info and stats
var polarBear = {
    name: 'Polar Bear',
    //species: 'polar bear',
    affection: 0,
    startConversation: function() {
        if (this.affection === 0) {
            return ["Hi there!",
                "My name is Polar Bear.",
                "Welcome to my cafe!"];
        }
        else if (this.affection > 0 && this.affection < 5) {
            return ["Yes?",
                "Is there something on your mind?"];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["Ah, welcome back!",
                "It's good to see you again."];
        } else {
            return ["Hello friend!",
                "Would you like the usual?"];
        }
    },
    cafe: function() {
        if (this.affection > 15) {
            return ["It's always good to see a familiar face.",
                "Sometimes this place doesn't have many patrons,",
                "And it feels rather lonely.",
                "...",
                "Just so you know.",
                "You will always be welcome here."];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["You've been coming more often.",
                "I wonder if you've taken a liking to this place.",
                "I opened this cafe as a place for customers to relax.",
                "So please enjoy your stay."];
        } else {
            return ["Surprised to see a polar bear running this cafe?",
                "It's not too uncommon you know.",
                "Us bears like to open these small joints.",
                "I have a grizzly bear friend who runs a bar uptown."];
        }
    },
    bar: function() {
        if (this.affection > 9) {
            return ["Oh, back again are we?",
                "Don't have too much now.",
                "You'll feel sick later if you do.",
                "Here have some more water.",
                "Always hydrate well when drinking."];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["Fancy a drink friend?",
                "Or just a tonic for now?",
                "Feel free to talk about your problems.",
                "I'll do my best to listen."];
        } else {
            return ["It's a bit early for a drink isn't it?",
                "I'll start you off with some water for now.",
                "Take your time to decide."];
        }
    },
    table: function() {
        if (this.affection > 15) {
            return ["Being lost in thought is a wonderful thing.",
                "After all,",
                "Dreams are what push us forward,",
                "And always towards a better tomorrow.",
                "But enough about the future.",
                "Let us enjoy the present."];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["Just hanging out today friend?",
                "I find myself lost in thought when I am here.",
                "Perhaps you have much on your mind.",
                "I'll leave you to it."];
        } else {
            return ["This corner is really quiet.",
                "People usually come to this corner to think.",
                "Or maybe you just enjoy the silence?"];
        }
    },
    patio: function() {
        if (this.affection > 15) {
            return ["I see you also enjoy the great outdoors.",
                "Grizzly and I often visit the mountains.",
                "We love to discover new wild ingredients to bring back.",
                "It lets us invent new items for our menus.",
                "Keeping things fresh and bringing new wonders back for our customers."];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["The scenery out here is nice isn't it?",
                "Being able to relax and enjoy the air.",
                "I often come out here myself to relax after a days work.",
                "It really is peaceful."];
        } else {
            return ["The patio is a nice place to sit.",
                "You can really feel the breeze out here.",
                "Of course I should probably clear the weeds sometime."];
        }
    },
    /* Unfinished portion
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
    },
    */
};

var panda = {
    name: 'Panda',
    //species: 'giant panda',
    affection: 0,
    startConversation: function() {
        if (this.affection === 0) {
            return (["Hi! I'm Panda!",
                    "I'm a regular here.",
                    "Do you think I'm cute?"]);
        }
        else if (this.affection > 0 && this.affection < 5) {
            return ["It's been a while.",
                "I wonder when my food will arrive?"];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["Oh hey, didn't see you there."];
        } else {
            return ["Today is a good day!",
                "I hope you are also having a good day!"];
        }
    },
    cafe: function() {
        if (this.affection > 15) {
            return ["Hey hey! Listen to this!",
                "Today at the zoo,",
                "Some elementary school students came on a field trip.",
                "I put on an amazing show for them!"];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["You like talking to me don't you?",
                "I don't usually talk so much to people.",
                "Does this mean we're friends?"];
        } else {
            return ["So today at the zoo...",
                "No, it's too embarrassing to say."];
        }
    },
    bar: function() {
        if (this.affection > 15) {
            return ["I wonder if I can get a drink now?",
                "But Polar Bear said I shouldn't...",
                "Then again...",
                "No, definitely not!"];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["Polar Bear won't let me have any hard drinks.",
                "I swear I'm old enough!",
                "Then again, my tolerance is bad..."];
        } else {
            return ["...",
                "Maybe just a little.",
                "...",
                "Nevermind..."];
        }
    },
    table: function() {
        if (this.affection > 15) {
            return ["Zzzzz...",
                "Huh? Wuzzat?",
                "Oh, I was just dreaming of eating bamboo.",
                "What!?",
                "You don't dream of eating bamboo?"];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["I often sit with Penguin here.",
                "And talk to him about eating bamboo.",
                "He doesn't seem very interested in eating it.",
                "I always tell him, don't knock it til you've tried it!"];
        } else {
            return ["You like this corner too?",
                "It is relaxing."];
        }
    },
    patio: function() {
        if (this.affection > 15) {
            return ["I like basking in the sun!",
                "It makes me feel warm and fuzzy on the outside.",
                "I also appreciate you coming to talk with me.",
                "It makes me feel warm and fuzzy on the inside."];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["When I first came here...",
                "This cafe didn't serve bamboo.",
                "Can you believe that?"];
        } else {
            return ["Normally I would be sitting inside,",
                "But being outside is nice too sometimes!"];
        }
    }
};

var penguin = {
    name: 'Penguin',
    //species: 'penguin',
    affection: 0,
    startConversation: function() {
        if (this.affection === 0) {
            return (["Hello.",
                    "I'm Penguin.",
                    "Nice to meet you!"]);
        }
        else if (this.affection > 0 && this.affection < 5) {
            return ["Is there something you need?",
                "Sorry but,",
                "I can't really help you right now."];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return (["Hey again.",
                    "I see you more often lately.",
                    "I guess you like this place too huh."]);
        } else {
            return (["I got my license!",
                    "I'm going to ask Ms. Penko out for a drive!"]);
        }
    },
    cafe: function() {
        if (this.affection > 15) {
            return ["I appreciate that you always listen to me.",
                "Because of your support,",
                "I passed the driving exam!",
                "I finally have a driver's liscense!"];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["I wonder if I'll do better this time?",
                "Oh well it's like they say,",
                "You can't succeed if you don't try."];
        } else {
            return (["Will I ever pass the driving exam?",
                    "I won't give up!"]);
        }
    },
    bar: function() {
        if (this.affection > 15) {
            return ["I'm so happy to have my driver's liscense.",
                "Just in time for my date with Ms. Penko this weekend!",
                "I'm glad you encouraged me all this way.",
                "Couldn't have done it without you!",
                "So let me buy your drinks tonight!"];
        } else if (this.affection >=5 && this.affection <=15) {
            return ["Nothing too strong for me.",
                "I have to attend driving lessons tomorrow.",
                "Just a tonic thanks."];
        } else {
            return ["I would like to take Ms. Penko here someday.",
                "I should probably ask her out first though."];
        }
    },
    table: function() {
        if (this.affection > 15) {
            return ["You know...",
                "Perhaps one day I will give it a try.",
                "Panda's bamboo talk that is.",
                "I'll have to be careful not to cut myself on the leaves.",
                "Just try to think of it as a salad..."];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["No Panda, I do not want to eat bam-",
                "Oh, it's you.",
                "Sorry about that.",
                "Panda is still trying to get me to eat his bamboo.",
                "I keep telling him penguins can't eat that stuff..."];
        } else {
            return ["I like this quiet corner",
                "It helps me think.",
                "...",
                "Does it seem like I'm brooding?"];
        }
    },
    patio: function() {
        if (this.affection > 15) {
            return ["Being in this tranquil atmosphere,",
                "Makes me think just maybe,",
                "I can enjoy this moment for what it's worth.",
                "You all are here with me,",
                "And that alone lessens the burden of my worries."];
        } else if (this.affection >= 5 && this.affection <= 15) {
            return ["It feels like a nice day.",
                "Of course it might rain at any moment.",
                "The sky looks clear though...",
                "No, no.",
                "I must always expect the worst."];
        } else {
            return ["It's a bit hot out here...",
                "And Polar Bear really needs to weed the yard."];
        }
    }
};

//Instructions
function instructionsAlert() {
    alert('Welcome to Polar Bear Cafe!\n'
            + "\nClick on the buttons to change scenery or initiate basic conversation with the characters.\n"
            + "\nPressing the 'Enter' key during conversations is the same as clicking 'Next'.\n"
            + "\nTalking to characters raises 'AFFECTION'.\n"
            + "\nConversations change depending on 'AFFECTION'.\n"
            + "\nLook out for '+' conversation choices that appear! These are unique and don't always spawn. They vary depending on your location, so visit different spots frequently! Click these to add a boost to your 'affection'!\n"
            + "\nBe sure to reset 'AFFECTION' occasionally as some unique conversations no longer appear after 'AFFECTION' exceeds a certain point.\n",
            + "\nTry to discover all unique conversations!");
}

function reset() {
    polarBear.affection = 0;
    panda.affection = 0;
    penguin.affection = 0;
    refreshStats();
}

function restart() {
    reset();
    instructionsAlert();
}

//Starts game
restart();

//Restart button
//$('#resetButton').mouseup(restart());

//Sets background scene
function setBackground(inputValue) {
    var imageName = inputValue + '.png';
    var imagePath = "url(assets/images/" + imageName + ")";

    var body = $('body');
    body.css('background-image', imagePath);
    body.css('background-repeat', 'no-repeat');
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
        newOption.appendTo(outputPlace);
    }
}

//Conversation event handler
function enterConversation(inputValue) {
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
//generateAllStats();

//Generates character stats
function generateCharacterStats(inputObj) {
    var setCharacter = $('<div>');
    setCharacter.addClass('col-sm-4 panel panel-info statsPanel');
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
        if (typeof value != 'function') {
            var characterInfo = $('<p>');
            characterInfo.text(x.toUpperCase() + ': ' + inputObj[x]);
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

//Working
function callPolarBear() {
    if (talking) {
        return;
    } else {
        talking = true;
        hideButtons();
    }
    talkingTo = 'polarBear';
    initiateConversation(polarBear.startConversation(), talkingTo);

    polarBear.affection++;
    checkLocationConversation();
}

function callPanda() {
    if (talking) {
        return;
    } else {
        talking = true;
        hideButtons();
    }
    talkingTo = 'panda';
    initiateConversation(panda.startConversation(), talkingTo);

    panda.affection++;
    checkLocationConversation();
}

function callPenguin() {
    if (talking) {
        return;
    } else {
        talking = true;
        hideButtons();
    }
    talkingTo = 'penguin';
    initiateConversation(penguin.startConversation(), talkingTo);

    penguin.affection++;
    checkLocationConversation();
}

function playAudio(inputValue) {
    switch(inputValue) {
        case 'cafe':
        case 'patio':
            audio2.pause();
            audio2.currentTime = 0;
            audio1.play();
            break;
        case 'bar':
        case 'table':
            audio1.pause();
            audio1.currentTime = 0;
            audio2.play();
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
}

function createConversation(conversationHolder) {
    createNextButton(conversationHolder);
    setNextButton();
    return handleConversation();
}

function handleConversation() {
    var conversation = conversationHolder.dialogue[conversationHolder.dialoguePlace];
    conversationHolder.dialoguePlace++;
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
    $('#buttonNext').mouseup(nextButtonFunction);
}

function nextButtonFunction() {
    if (conversationHolder.dialoguePlace >= conversationHolder.dialogueLength) {
        $('#conversationWords').empty();
        characterImage.css('background-image', 'none');
        $('#conversationWords').css('visibility', 'hidden');
        talking = false;
        showButtons();
        resetIntervalFunction();
        refreshStats();
        $('#nextButton').empty();
    } else {
        handleConversation();
        resetIntervalFunction();
        setConversationInterval();
    }
}

$(document).keyup(function (event) {
    if (talking && event.key.toLowerCase() === 'enter') {
        nextButtonFunction();
    } else {
        return;
    }
});

function checkTalkingTo() {
    switch(talkingTo) {
        case 'polarBear':
            console.log('Talking to ' + talkingTo + '.');
            break;
        case 'panda':
            console.log('Talking to ' + talkingTo + '.');
            break;
        case 'penguin':
            console.log('Talking to ' + talkingTo + '.');
            break;
        default:
            break;
    }
}

//Choses background from assets/images
var backgroundOptions = $('.backgroundOptions');
backgroundOptions.mouseup(function() {
    if(currentLocation === $(this).data('value') || talking) {
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
    characterOptions.mouseup(function() {
        var currentCharacter = $(this).data('value');
        enterConversation(currentCharacter);
    });
}

function initiateConversation(inputConversation, inputCharacter) {
    setCharacterBackground(inputCharacter);
    loadConversation(inputConversation);
    createConversation(conversationHolder);
    setConversationInterval();
}

function setCharacterBackground(inputCharacter) {
    switch (inputCharacter) {
        case 'polarBear':
            characterImage.css('background-image', 'url(./assets/images/polarBear1.png)');
            $('#conversationWords').css('visibility', 'visible');
            break;
        case 'panda':
            characterImage.css('background-image', 'url(./assets/images/panda1.png)');
            $('#conversationWords').css('visibility', 'visible');
            break;
        case 'penguin':
            characterImage.css('background-image', 'url(./assets/images/penguin1.png)');
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
    var spawnRate = .45;
    switch (currentLocation) {
        case 'cafe':
            characters.cafe.forEach(function(input) {
                var keyChance = 0;
                if (selectCharacter(input)['affection'] < 1) {
                    keyChance = 0;
                } else {
                    keyChance = spawnRate;
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
                if (selectCharacter(input)['affection'] < 1) {
                    keyChance = 0;
                } else {
                    keyChance = spawnRate;
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
                if (selectCharacter(input)['affection'] < 1) {
                    keyChance = 0;
                } else {
                    keyChance = spawnRate;
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
                if (selectCharacter(input)['affection'] < 1) {
                    keyChance = 0;
                } else {
                    keyChance = spawnRate;
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
            setPersonalConversationButton();
            break;
        case 'responsiveConversation':
            setResponsiveConversationButton();
            break;
        default:
            break;
    }
}

//Special conversation: personalConversation
function setLocationConversationButton() {
    $('.locationConversation').mouseup(function() {
        if (talking) {
            return;
        } else {
            talking = true;
            hideButtons();
        }
        var buttonValue = $(this).attr('value');
        var updateCharacter = selectCharacter(buttonValue);
        startLocationConversation(buttonValue, currentLocation);
        updateCharacter['affection'] += 3;
        $(this).remove();
    });
}

//Special conversation: responsiveConversation
function setResponsiveConversationButton() {
    $('.responsiveConverstion').mouseup(function() {
        $(this).remove();
    });
}

$('#resetLink').mouseup(function() {
    reset();
});

function hideButtons() {
    $('#backgrounds').css('visibility','hidden');
    $('#characters').css('visibility','hidden');
    $('#conversationOptions').css('visibility','hidden');
}

function showButtons() {
    $('#backgrounds').css('visibility','visible');
    $('#characters').css('visibility','visible');
    $('#conversationOptions').css('visibility','visible');
}

function setConversationInterval() {
    conversationInterval = setInterval(nextButtonFunction, 3000);
}

function resetIntervalFunction() {
    clearInterval(conversationInterval);
}
