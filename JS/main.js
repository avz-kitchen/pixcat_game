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

