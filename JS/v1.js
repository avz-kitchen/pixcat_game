class Player {
    constructor() {
        this.width = 80;
        this.height = 80;
        this.positionX = 0 + this.width; //Default Location
        this.location = plank[startLocation]; // Start Position of X
        this.points = 0;
        this.life = 1;

        this.playerElm = document.getElementById("player");
        const plank = document.getElementById("plank")
        this.createPlayer();

        this.moveToNewLocation(newLocation);
        this.newLocation = plank[newLocation];

        this.hasLife(() => {
            if (this.newLocation <= this.detectSafeArea()) {
                console.log("Still has life");
                this.points++
            }
        });
    }

    createPlayer() {

        this.playerElm.style.left = this.positionX + "px";
        this.playerElm.style.width = this.width + "px";
        this.playerElm.style.height = this.height + "px";
        this.playerElm.style.backgroundImage = "url('images/kitty.png')";
        this.playerElm.style.backgroundSize = "cover";

        // Append Child

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.plankElm);
    }

    moveToNewLocation(newLocation) {
        if (plank.drawPlank) {
            return newLocation = plank.endLocation
        }
    }

    d
}

class Plank {
    constructor() {
        this.height = 24;
        this.width = 120;
        this.spaceDownTime = null;
        this.spaceUpTime = null;
        this.location = [
            positionX = 0,
            positionY = 36,
        ];
        this.createPlank();
        this.drawPlank();

        this.newWidth = newWidth;
        this.newLocation();



        createPlank() {
            this.plankElm = document.createElement("div");
            this.plankElm.className = "plank";
            this.plankElm.style.left = this.location.positionX + "%";
            this.plankElm.style.bottom = this.location.positionY + "%";
            this.plankElm.style.width = this.width + "px";
            this.plankElm.style.height = this.height + "px";

            const parentElm = document.getElementById("board");
            parentElm.appendChild(this.plankElm);
        };
        drawPlank(){
            document.addEventListener('keydown', (event) => {
                if (event.code === 'Space' && !this.spaceDownTime) {
                    this.spaceDownTime = new Date();
                }
            });

            document.addEventListener('keyup', (event) => {
                if (event.code === 'Space' && this.spaceDownTime) {
                    this.spaceUpTime = new Date();
                    const duration = (this.spaceUpTime - this.spaceDownTime) / 1000; // Duration in seconds
                    this.newLocation(); // Move player to the end of the plank
                    this.spaceDownTime = null; // Reset the down time for the next press
                }
            })
        }
        newLocation(){
            this.newWidth
        }



    }
}

const player = new Player;
const plank = new Plank;