class Player {
    constructor() {
        const plank = document.getElementById("plank")

        this.width = 80;
        this.height = 80;
        this.positionX =  0 + this.width; // Default Location
        this.positionY = 36; // Start Position of Y
        this.points = 0;
        this.life = 1;
        this.playerElm = this.createAPlayer();
        this.moveInterval = null;
        this.detectSafeArea();
        this.newLocation= 0;
this.createAPlayer();
        this.newLocation(() => {
            document.addEventListener('keydown', (event) => {
                if (event.code === 'Space' && !this.moveInterval) {
                    this.moveInterval = setInterval(() => {
                        this.movesToNewPositionAfterSpacebarPressed();
                    }, 100);
                }
            });
    
            document.addEventListener('keyup', (event) => {
                if (event.code === 'Space' && this.moveInterval) {
                    clearInterval(this.moveInterval);
                    this.moveInterval = null;
                }
            });
        })

    }

    createAPlayer() {
        const playerElm = document.createElement("div");
        playerElm.id = "player";
        playerElm.style.width = this.width + "px";
        playerElm.style.height = this.height + "px";
        playerElm.style.position = "absolute";
        playerElm.style.left = this.positionX + "px";
        playerElm.style.bottom = this.positionY + "vh";
        playerElm.style.backgroundImage = "url('./images/kitty.png')";
        playerElm.style.backgroundSize = "cover";
        const parentElm = document.getElementById("board");
        parentElm.appendChild(playerElm);
        console.log("Player created.");
        return playerElm;
    }

    movesToNewPositionAfterSpacebarPressed() {
        this.positionX = plank.newPlayerLocation();
        this.playerElm.style.left = this.positionX + "px";
        console.log("Player moved to new position after spacebar pressed.");
        this.detectSafeArea();
    }
    detectSafeArea() {
        if (this.positionX <= platforms.safeArea()) {
            console.log("Player in safe area.");
            platforms.createNextPlatform(); // Create the next platform
        } else {
            console.log("Player in dead zone.");
        }
    }

    collectPoints() {
        if (platforms.hasAPoint() || catnip.hasAPoint()) {
            this.points++;
            console.log("Player collected a point.");
        }
    }
}

class Plank {
    constructor() {
        this.height = 24;
        this.width = 120;
        this.positionX = 0; // Initial X
        this.positionY = 36;
        this.createPlankElement();
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

    drawPlank() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                this.getTheNewWidth();
            }
        });
    }

    getTheNewWidth() {
        let newWidth = this.width;
        const interval = setInterval(() => {
            newWidth += 1; // Increase width by 1px
            if (newWidth >= 200) { // Max width
                clearInterval(interval);
            }
        }, 10);
        console.log("Plank width increased.");
        return newWidth;
    }

    startLocation() {
        return this.positionX;
    }

    endLocation() {
        return this.getTheNewWidth() - player.width;
    }

    newPlayerLocation() {
        const newLocation = this.endLocation();
        console.log("New player location calculated.");
        return newLocation;
    }
}

class Platforms {
    constructor() {
        this.minWidth = 20;
        this.maxWidth = 40;
        this.currentPosition = 0; // Initial position
        this.nextPosition = this.randomPosition(); // Position of the next platform
        this.createStartPlatform(); // Create the start platform
        this.createNextPlatform(); // Create the start platform

    }

    createStartPlatform() {
        const platformElm = document.createElement("div");
        platformElm.className = "platform";
        platformElm.style.width = "20%"; // Fixed width for start platform
        platformElm.style.position = "absolute";
        platformElm.style.left = this.currentPosition + "%";
        
        platformElm.style.bottom = "0";
        const parentElm = document.getElementById("board");
        parentElm.appendChild(platformElm);
        console.log("Start platform created.");
    }

    createNextPlatform() {
        const platformElm = document.createElement("div");
        platformElm.className = "platform";
        platformElm.style.width = this.randomWidth() + "%";
        platformElm.style.position = "absolute";
        platformElm.style.left = this.nextPosition;
        platformElm.style.bottom = "0";
        const parentElm = document.getElementById("board");
        parentElm.appendChild(platformElm);
        console.log("Next platform created.");
        this.currentPosition = this.nextPosition; // Update current position
        this.nextPosition = this.randomPosition(); // Calculate position for the next platform
    }
    

    randomWidth() {
        return Math.floor(Math.random() * (this.maxWidth - this.minWidth + 1)) + this.minWidth;
    }

    randomPosition() {
        return Math.random() * (100 - this.maxWidth) + "%"; // Random position within the board width
    }

    safeArea() {
        return (this.currentPosition + this.width) * this.height;
    }

    hasAPoint() {
        return true; // Placeholder for now
    }
}


class Catnip {
    constructor() {
        this.point = 0;
    }

    createCatnip() {
        // Create Catnip Element
    }

    hasAPoint() {
        return true; // Placeholder for now
    }
}

// Instantiating objects
const platforms = new Platforms(); // Create platforms first
const player = new Player(); // Then create player
const plank = new Plank();
// const catnip = new Catnip();