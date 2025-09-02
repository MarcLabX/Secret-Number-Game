let sortNumbersList = [];
let limitNumber = 10
let secretNumber = generateRandomNumber();
let attemps = 1;

function showTextInScreen(tag, text) {
    let camp = document.querySelector(tag);
    camp.innerHTML = text;
    responsiveVoice.speak(text, 'UK English Female', {rate:1});
}

function showWelcomeMessage() {
    showTextInScreen('h1', 'Secret Number Game');
    showTextInScreen('p', `Choose a number between 1 and ${limitNumber}:`);
}
showWelcomeMessage();

function verifyKick() {
    let kick = document.querySelector('input').value;
    let attempWord = attemps > 1 ? 'attemps' : 'attemp';
    let attempMessage = `You found the secret number with ${attemps} ${attempWord}.`;

    if (kick == secretNumber) {
        showTextInScreen('h1','You got it!');
        showTextInScreen('p', attempMessage);
        document.getElementById('Reload').removeAttribute('disabled');
        document.getElementById('kickButton').setAttribute('disabled', true);
    } else {
        if (kick > secretNumber) {
            showTextInScreen('p', 'The secret number is less than kick');
        } else {
            showTextInScreen('p', 'The secret number is greater than kick');
        }
        attemps++;
        cleanCamp();
    }
}

function generateRandomNumber() {
    let selectedNumber = parseInt(Math.random() * limitNumber + 1);
    let quantityElementsInList = sortNumbersList.length;

    if (quantityElementsInList == limitNumber) {
        sortNumbersList = [];
    }
    if (sortNumbersList.includes(selectedNumber)) {
        return generateRandomNumber();
    } else {
        sortNumbersList.push(selectedNumber);
        return selectedNumber;
    }
}

function cleanCamp() {
    kick = document.querySelector('input');
    kick.value = '';
}

function reloadGame() {
    showWelcomeMessage()
    document.getElementById('Reload').setAttribute('disabled', true);
    document.getElementById('kickButton').removeAttribute('disabled');
    secretNumber = generateRandomNumber();
    attemps = 1;
    cleanCamp();
}