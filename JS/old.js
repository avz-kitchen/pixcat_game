console.log("hello World");
class Player {
    constructor() {
        this.width = 80;
        this.height = 80;
        this.positionX = 0; // Initialize player position X
        this.positionY = 36; // Initialize player position Y
        this.playerElm = document.getElementById("player");
        this.updatePosition(0); // Initialize player position
        this.moveTonewPosition();
        // Set initial player position
        this.playerElm.style.left = this.positionX + "%";
        this.playerElm.style.bottom = this.positionY + "%";
        this.playerElm.style.width = this.width + "px";
        this.playerElm.style.height = this.height + "px";
        this.playerElm.style.backgroundImage = "url('images/kitty.png')";
        this.playerElm.style.backgroundSize = "cover";
    }

    updatePosition(endOfPlankX) {
        this.positionX = endOfPlankX;
        // Update player element position accordingly
        this.playerElm.style.left = this.positionX + "px";
    }

    moveTonewPosition() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                // Move player to end point of plank
                const endPosition = plank.positionX + plank.width;
                player.updatePosition(endPosition);
            }
        });
    }
}

class Plank {
    constructor() {
        this.height = 24;
        this.width = 120;
        this.positionX = 0; // Initialize plank position X
        this.positionY = 35; // Initialize plank position Y
        this.plankElm = null;
        this.spaceDownTime = null;
        this.spaceUpTime = null;
        this.player = document.getElementById("player"); // Store the player reference
        this.createPlankElement();
        this.addEventListeners();
        this.endPositionX = null;
    }


    createPlankElement() {
        this.plankElm = document.createElement("div");
        this.plankElm.className = "plank";
        this.plankElm.style.left = this.positionX + "%";
        this.plankElm.style.bottom = this.positionY + "%";
        this.plankElm.style.width = this.width + "px";
        this.plankElm.style.height = this.height + "px";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.plankElm);
    };

    addEventListeners() {
        // Event listeners for space key
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && !this.spaceDownTime) {
                this.spaceDownTime = new Date();
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.code === 'Space' && this.spaceDownTime) {
                this.spaceUpTime = new Date();
                const duration = (this.spaceUpTime - this.spaceDownTime) / 1000; // Duration in seconds
                this.growPlank(duration);
                this.movePlayerToEnd(); // Move player to the end of the plank
                this.spaceDownTime = null; // Reset the down time for the next press
            }
        });
    }

    growPlank(duration) {
        const startWidth = this.width;
        const targetWidth = startWidth + duration * 100; // Adjust multiplier as needed
        const step = 10; // Width increment step
        const interval = 100; // Update interval in milliseconds
    
        // Function to update plank width gradually
        const updateWidth = () => {
            if (this.width < targetWidth) {
                this.width += step;
                this.plankElm.style.width = this.width + "px";
                this.movePlayerToEnd(); // Update player position as plank grows
                // Check if the plank fits within the safe area
                if (this.fitsInSafeArea()) {
                    // Check if the plank is long enough to reach the next platform
                    if (this.width >= this.nextPlatform.positionX - this.currentPlatform.positionX) {
                        // Create a new platform
                        const newPlatform = new Platform();
                        newPlatform.createSinglePlatform(false);
                        // Reset plank position and width
                        this.positionX = 0;
                        this.width = 0;
                        this.plankElm.style.width = "0px";
                    }
                } else {
                    // Game over condition
                    console.log("Plank does not fit in safe area. Game over!");
                    clearInterval(intervalId); // Stop updating width when game over
                }
            } else {
                clearInterval(intervalId); // Stop updating width when target is reached
            }
        };
    
        // Interval to update plank width gradually
        const intervalId = setInterval(updateWidth, interval);
    }

    movePlayerToEnd() {
        const player = document.getElementById("player");
        player.style.left = this.width + "px"; // Set player position to the end of the plank's width
    }



}


//Multiple platforms by defining the number
class Platform {
    constructor(numberOfPlatforms = 1) {
        if (numberOfPlatforms === 1) {
            this.createSinglePlatform(true); // Pass true for the first platform
        } else {
            this.createMultiplePlatforms(numberOfPlatforms);
        }
    }

    createSinglePlatform(isFirstPlatform) {
        this.positionY = 0;
        this.height = 36;

        this.platformElm = document.createElement("div");
        this.platformElm.className = "platform";
        this.platformElm.style.bottom = this.positionY + "%";

        // Calculate random width
        const minWidth = 10;
        const maxWidth = 20;
        const randomWidth = Math.random() * (maxWidth - minWidth) + minWidth;

        // Apply styles
        this.platformElm.style.width = randomWidth + "%";
        this.platformElm.style.height = this.height + "%";
        this.platformElm.style.backgroundColor = "var(--platforms)";
        this.platformElm.style.borderRadius = "24px 24px 0px 0px";

        // Append to parent element
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.platformElm);

        // Set platform position
        if (isFirstPlatform) {
            this.platformElm.style.left = "0"; // First platform starts from the left side
        } else {
            const boardWidth = parentElm.clientWidth;
            const maxXPosition = boardWidth - randomWidth;
            const randomXPosition = Math.random() * maxXPosition;
            this.platformElm.style.left = randomXPosition + "px";
        }
    }

    createMultiplePlatforms(numberOfPlatforms) {
        for (let i = 0; i < numberOfPlatforms; i++) {
            new Platform().createSinglePlatform(false); // Pass false for subsequent platforms
        }
    }
}


const startPlatform = new Platform();
startPlatform.createSinglePlatform(true);




// Create subsequent platforms
const numberOfPlatforms = 3; // Specify the number of platforms you want to create
const multiplePlatforms = new Platform(numberOfPlatforms);

// Create player and plank
const player = new Player();
const plank = new Plank(player);

player.updatePosition(plank.endPositionX);




// Event listener for Space key


//EVENT LISTENER




console.log("hello World");
class Game {
    constructor(){
        this.createNewGame();
        this.Player = player;
        this.Plank = plank;
        this.FirstPlatform = firstPlatform;
        this.SecondPlatform = secondPlatform;
    }
    createNewGame (){
        this.newGame = document.createElement("div");
        this.plankElm.className = "board";
        this.plankElm.style.width = this.width + "px";
        this.plankElm.style.height = this.height + "px";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.plankElm);
    }
}
class Player {
    constructor() {
        this.width = 80;
        this.height = 80;
        this.positionX = 0 + this.width; // Initialize player position X
        this.positionY = 36; // Initialize player position Y
        this.playerElm = document.getElementById("player");
        this.createPlayer();
        this.checkGameStatus();
        this.isWithinSafeArea();
        this.moveTonewPosition();


        setTimeout(() => {
            this.moveTonewPosition();
        }, 0);


    }
    createPlayer() {
        // Set initial player position

        this.playerElm.style.left = this.positionX + "px";
        this.playerElm.style.width = this.width + "px";
        this.playerElm.style.height = this.height + "px";
        this.playerElm.style.backgroundImage = "url('images/kitty.png')";
        this.playerElm.style.backgroundSize = "cover";
    }


    isWithinSafeArea() {
        const safeAreaStart = startPlatform.positionX + startPlatform.width;
        const safeAreaEnd = secondPlatform.positionX + secondPlatform.width;
        return this.positionX >= safeAreaStart && this.positionX <= safeAreaEnd;
    }
    // Game Over Redirect or new platform created

    checkGameStatus() {
        if (!this.isWithinSafeArea()) {
            console.log("Game Over!")
            // If player is not within safe area, move it off the screen vertically
            this.playerElm.style.bottom = "220px";
        } else {
            // If player is within safe area, set the initial position
            this.playerElm.style.bottom = this.positionY + "%";
            newPlatform.createSinglePlatform();
        }
    }
    moveTonewPosition() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                // Move player to end point of plank
                const endPosition = plank.positionX + plank.width;
                player.checkGameStatus(); // Check game status after updating position
            }
        });
    }
}

class Plank {
    constructor()
        this.height = 24;
        this.width = 120;
        this.positionX = 0; // Initialize plank position X
        this.positionY = 35; // Initialize plank position Y
        this.plankElm = null;
        this.spaceDownTime = null;
        this.spaceUpTime = null;
        this.player = document.getElementById("player"); // Store the player reference
        this.createPlankElement();
        this.addEventListeners();
        this.endPositionX = null;
    }


    createPlankElement() {
        this.plankElm = document.createElement("div");
        this.plankElm.className = "plank";
        this.plankElm.style.left = this.positionX + "%";
        this.plankElm.style.bottom = this.positionY + "%";
        this.plankElm.style.width = this.width + "px";
        this.plankElm.style.height = this.height + "px";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.plankElm);
    };

    addEventListeners() {
        // Event listeners for space key
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && !this.spaceDownTime) {
                this.spaceDownTime = new Date();
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.code === 'Space' && this.spaceDownTime) {
                this.spaceUpTime = new Date();
                const duration = (this.spaceUpTime - this.spaceDownTime) / 1000; // Duration in seconds
                this.growPlank(duration);
                this.movePlayerToEnd(); // Move player to the end of the plank
                this.spaceDownTime = null; // Reset the down time for the next press
            }
        });
    }

    growPlank(duration) {
        const startWidth = this.width;
        const targetWidth = startWidth + duration * 100; // Adjust multiplier as needed
        const step = 10; // Width increment step
        const interval = 100; // Update interval in milliseconds
        const player = document.getElementById("player")
        // Function to update plank width gradually
        const updateWidth = () => {
            if (this.width < targetWidth) {
                this.width += step;
                this.plankElm.style.width = this.width + "px";
                this.movePlayerToEnd(); // Update player position as plank grows
                // Check if the plank fits within the safe area
                if (this.player.isWithinSafeArea(this.nextPlatform)) {
                    // Check if the plank is long enough to reach the next platform
                    if (this.width >= this.nextPlatform.positionX - this.currentPlatform.positionX) {
                        // Create a new platform
                        const newPlatform = new Platform();
                        newPlatform.createSinglePlatform(false);
                        // Reset plank position and width
                        this.positionX = 0;
                        this.width = 0;
                        this.plankElm.style.width = "12px";
                    }
                } else {
                    // Game over condition
                    console.log("Plank does not fit in safe area. Game over!");
                    clearInterval(intervalId); // Stop updating width when game over
                }
            } else {
                clearInterval(intervalId); // Stop updating width when target is reached
            }
        };

        // Interval to update plank width gradually
        const intervalId = setInterval(updateWidth, interval);
    }


    movePlayerToEnd() {
        const player = document.getElementById("player");
        player.style.left = this.width + "px"; // Set player position to the end of the plank's width
    }



}


//Multiple platforms by defining the number
class Platform {
    constructor(numberOfPlatforms = 1) {
        if (numberOfPlatforms === 1) {
            this.createSinglePlatform(true); // Pass true for the first platform
        } else {
            this.createMultiplePlatforms(numberOfPlatforms);
        }
    }

    createSinglePlatform(isFirstPlatform) {
        this.positionY = 0;
        this.height = 36;

        this.platformElm = document.createElement("div");
        this.platformElm.className = "platform";
        this.platformElm.style.bottom = this.positionY + "%";

        // Calculate random width
        const minWidth = 10;
        const maxWidth = 20;
        const randomWidth = Math.random() * (maxWidth - minWidth) + minWidth;

        // Apply styles
        this.platformElm.style.width = randomWidth + "%";
        this.platformElm.style.height = this.height + "%";
        this.platformElm.style.backgroundColor = "var(--platforms)";
        this.platformElm.style.borderRadius = "24px 24px 0px 0px";

        // Append to parent element
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.platformElm);

        // Set platform position
        if (isFirstPlatform) {
            this.platformElm.style.left = "0"; // First platform starts from the left side
        } else {
            const boardWidth = parentElm.clientWidth;
            const maxXPosition = boardWidth - randomWidth;
            const randomXPosition = Math.random() * maxXPosition;
            this.platformElm.style.left = randomXPosition + "px";
        }
    }

    createMultiplePlatforms(numberOfPlatforms) {
        const firstPlatform = new Platform();
        firstPlatform.createSinglePlatform(true); // Create the first platform
        for (let i = 1; i < numberOfPlatforms; i++) {
            const subsequentPlatform = new Platform();
            subsequentPlatform.createSinglePlatform(false); // Create subsequent platforms
        }
    }

    getSafeArea() {
        const safeAreaStart = startPlatform.positionX + startPlatform.width;
        const safeAreaEnd = secondPlatform.positionX + secondPlatform.width;
        return { start: safeAreaStart, end: safeAreaEnd };
    }
}



//Create subsequent platforms
const newGame = new Game(

);
const startPlatform = new Platform();
startPlatform.createSinglePlatform(false);

const secondPlatform = new Platform();
secondPlatform.createSinglePlatform(false);

// Create player and plank
const player = new Player();
const plank = new Plank(player);





// Event listener for Space key


//EVENT LISTENER


