console.log("hello World");



class Player {
    constructor(){
        this.width = 80;
        this.height = 80;
        this.positionX = 50 - this.width / 2;
        this.positionY = 36;

        this.playerElm = document.getElementById("player");
        this.playerElm.style.left = this.positionX + "vw";
        this.playerElm.style.bottom = this.positionY + "vh";
        this.playerElm.style.width = this.width + "px";
        this.playerElm.style.height = this.height + "px";
        this.playerElm.style.backgroundImage = "url('images/kitty.png')";
        this.playerElm.style.backgroundSize = "cover";

        this.updatePosition();

 
    }
    updatePosition(endOfPlankX) {
        this.positionX = endOfPlankX - this.width / 2;
        // Update player element position accordingly
    }

}
class Plank {
    constructor() {
        this.height = 24;
        this.width = 120;
        this.positionX = platformPositionX - this.width / 2;
        this.positionY = platform.height;
        this.plankElm = null;
        this.createPlankElement();
        this.addEventListeners();

    };
    createPlankElement() {
        this.plankElm = document.createElement("div");
        this.plankElm.className = "plank";
        this.plankElm.style.left = this.positionX + "vw";
        this.plankElm.style.bottom = this.positionY + "vh";
        this.plankElm.style.width = this.width + "px";
        this.plankElm.style.height = this.height + "px";
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.plankElm);
    };
    addEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && !this.spaceDownTime) {
                this.spaceDownTime = new Date();
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.code === 'Space' && this.spaceDownTime) {
                this.spaceUpTime = new Date();
                let duration = this.spaceUpTime - this.spaceDownTime;
                this.growPlank(duration);
                this.spaceDownTime = null; // Reset the down time for the next press
            }
        });
    }

    growPlank(duration) {
        if (this.width > 0) {
            this.width += duration * 0.5;
            this.plankElm.style.width = this.width + "px";
            // Calculate end position of the plank
            const endOfPlankX = this.positionX + this.width;
            // Update player position to the end of the plank
            player.updatePosition(endOfPlankX);
        }
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
        this.height = 35;

        this.platformElm = document.createElement("div");
        this.platformElm.className = "platform";
        this.platformElm.style.bottom = this.positionY + "vh";

        // Calculate random width
        const minWidth = 10;
        const maxWidth = 20;
        const randomWidth = Math.random() * (maxWidth - minWidth) + minWidth;

        // Apply styles
        this.platformElm.style.width = randomWidth + "vw";
        this.platformElm.style.height = this.height + "vh";
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
for (let i = 1; i < numberOfPlatforms; i++) {
    const platform = new Platform();
    platform.createSinglePlatform(false);
}
const multiplePlatforms = new Platform(2);
const player = new Player();
const plank = new Plank();

// Event listener for Space key
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        // Move player to end point of plank
        const endPosition = plank.positionX + plank.width;
        player.updatePosition(endPosition);
    }
});

//EVENT LISTENER

