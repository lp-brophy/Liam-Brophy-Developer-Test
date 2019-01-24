/*
 * Globals
 */
const STARTING_CARDS = 6;   // The number of cards to start with            default: 6
var kittenMode = false;     // Determines whether kitten mode is on or off  default: false
let cards = [];             // The array to hold the cards

/*
 * Sets up the cards to the page
 */
function setupCards() {
    createCards();
    displayCards();
}

/*
 * Creates the starting cards and stores them within the cards array
 */
function createCards() {
    for (let i = 0; i < STARTING_CARDS; i++) {
        let card = new Card(i);
        cards.push(card);
    }
}

/*
 * Refreshes the page and displays all of the current cards
 */
function displayCards() {
    const cardContainer = document.getElementById("card_container");
    cardContainer.innerHTML = "";
    
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let newDiv = document.createElement("div");
        newDiv.id = getCardIdString(card.id);
        newDiv.className = `card ${getCardActiveClass(card.active)}`;
        if (kittenMode && !card.active) {
            newDiv.style.backgroundImage = `url('${getURL(i)}')`
        }
        newDiv.appendChild(document.createTextNode(`${(card.active ? i + 1 : " ")}`));
        newDiv.setAttribute("onclick", `clickHandler('${i}')`);
        cardContainer.appendChild(newDiv);
    }
}

/*
 * Checks the card's current active status and returns the appropriate class string
 */
function getCardActiveClass(active) {
    let classString = "";
    if (active) {
        classString = "active";
    } else {
        classString = "inactive";
    }
    return classString;
}

/*
 * Gets the card's id string
 */
function getCardIdString(id) {
    return `card-${id}`;
}

/*
 * Gets a different image from placekitten.com depending on the card number
 */
function getURL(i) {
    return `http://placekitten.com/${250 + i}/${350 + i}`;
}

/*
 * Creates a new card with the given id
 */
function Card(id) {
    this.id = id;
    this.active = false;
}

/*
 * Handles card clicks
 *
 * Toggles the clicked card and sets all others to inactive
 */
function clickHandler(clickedDivNo) {
    for (let i = 0; i < cards.length; i++) {
        if (i == clickedDivNo) { 
            cards[i].active = !cards[i].active;
        } else {
            cards[i].active = false;
        }
    }
    
    displayCards();
}

/*
 * Toggles kitten mode and refreshes the page
 */
function toggleKittens() {
    kittenMode = !kittenMode;
    displayCards();
}

/*
 * Adds a new card to the deck and refreshes the page
 */
function addCard() {
    let card = new Card(cards.length);
    cards.push(card);
    displayCards();
}

/*
 * Removes a card from the deck and refreshes the page
 */
function removeCard() {
    cards.pop();
    displayCards();
}