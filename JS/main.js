class Cat {
    constructor(positionX, score) {

        this.width = 80;
        this.height = 80;
        this.positionX = 0 + this.width; // Default Location
        this.positionY = 40; // Start Position
        this.score = 0;
        this.catElm = this.createACat();

    }

    createACat() {
        const catElm = document.createElement("div");
        catElm.id = "cat";

        catElm.style.position = "absolute";
        catElm.style.left = this.positionX + "px";
        catElm.style.bottom = this.positionY + "vh";

        catElm.style.backgroundImage = "url('../images/kitty.png')";
        catElm.style.backgroundSize = "cover";


        const parentElm = document.getElementById("board");
        parentElm.appendChild(catElm);
        console.log("Cat is on screen.");
    }


    moveCat() {


    }

}

class Path {
    constructor(positionX, width) {
        this.positionX = 0 + cat.positionX + cat.width;
        this.positionY = cat.positionY;
        this.width = 120;
        this.height = 24;
        this.path = this.startPath(); // Initialize path property
        this.lengthActive = false;
        this.getLength();
    }

    startPath() {
        // Create a path element
        this.path = document.createElement("div");
        this.path.className = "path";

        // Set position based on properties
        this.path.style.position = "absolute"
        this.path.style.left = this.positionX + "px";
        this.path.style.bottom = this.positionY + "%";
        this.path.style.width = this.width + "px";
        this.path.style.height = this.height + "px";
        this.path.style.backgroundColor = "var(--plank)";
        this.path.style.borderRadius = "24px"

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.path);

        console.log(`Here is the start Point X: ${this.positionX} and the path is : ${this.width} px long`)
    }

    getLength() {
        this.lengthActive = true;
        let length = 0;

        document.addEventListener('keydown', event => {
            if (event.code === 'Space') {
                length++;
                console.log(`I am counting the space down`);

            }
        });

        document.addEventListener('keyup', event => {
            if (event.code === 'Space') {
                console.log(`Spacebar pressed ${length} times`);
                this.width += length;
                this.updatePathWidth();
                length = 0;
            }
        });
    }
    updatePathWidth(width) {
        if (this.path === this.lengthActive) {
            this.path.style.width = this.width + "px";
            console.log(`Path width has changed to ${this.width} `);

        }
    }
}



class SafeArea {
    constructor(positionX, width) {
        this.positionX = positionX;
        this.width = width;
        this.createSafeArea(); // Create the start safeArea
    }

    createSafeArea() {
        const safeArea = document.createElement("div");
        safeArea.className = "safe-area";
        safeArea.style.width = this.width + "px"; // Fixed width for start safeArea
        safeArea.style.left = this.positionX + "%";

        safeArea.style.bottom = "0";
        const parentElm = document.getElementById("board");
        parentElm.appendChild(safeArea);

        console.log("Platform created.");
        console.log(`Min Positon X: ${this.positionX}  Max Position X: ${this.positionX + this.width}`);

    }

    detectCatPosition() {

    }

}

//USER MOVEMENT



function isCatOnSafeArea() {
    if (cat.positionX < safeArea.positionX + safeArea.width &&
        cat.positionX + cat.width > safeArea.positionX &&
        cat.positionY < safeArea.positionY + safeArea.height &&
        cat.positionY + cat.height > safeArea.positionY) {
        console.log("Cat is on safe Area")

    } else {
        console.log("game over my fren!")
    }
}



// Instantiating objects
const safeAreaA = new SafeArea(0, 400); // Create platforms first
const safeAreaB = new SafeArea(80, 120); // 
const cat = new Cat(); // Then create cat
const path = new Path();


