class Cat {
    constructor() {

        this.width = 80;
        this.height = 80;
        this.positionX = 0 + this.width; // Default Location
        this.positionY = 40; // Start Position
        this.score = 0;
        this.cat = document.createElement("div");
        this.cat.id = "cat";

        this.cat.style.position = "absolute";
        this.cat.style.left = this.positionX + "px";
        this.cat.style.bottom = this.positionY + "vh";

        this.cat.style.backgroundImage = "url('../images/kitty.png')";
        this.cat.style.backgroundSize = "cover";


        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.cat);
    }

    createACat() {

 
        console.log("Cat is on screen.");
    }


}
 let pathLength = 120;



class Path {
    constructor(positionX, width) {
        this.positionX = 0 + cat.positionX + cat.width;
        this.positionY = cat.positionY;
        this.width = 120;
        this.height = 24;
        this.path =  document.createElement("div"); // Initialize path property
        this.lengthActive = false;
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

    }

    startPath() {
        // Create a path element

        console.log(`Here is the start Point X: ${this.positionX} and the path is : ${this.width} px long`)
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

function drawPath(pathElement,amount){
    pathElement.width += amount;
    pathElement.path.style.width = pathElement.width + "px"

}
function moveCat(catElement,pathElement){
    const newPositionX = pathElement.positionX + pathElement.width - catElement.width;

    // Update the position of the cat element
    catElement.positionX = newPositionX;
    catElement.cat.style.left = newPositionX + "px";

    console.log(`cat is moving ${newPositionX}`)
}

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



function increasePathLength() {
    document.addEventListener('keydown', event => {
        if (event.code === 'Space') {
            pathLength++; // Increase path length
            console.log(`I am counting the space down`);
            drawPath(path,pathLength)
            moveCat(cat,pathLength)
        }
    });
}

increasePathLength(); // Call the function to activate the event listener

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        console.log(`The length is ${pathLength} px`);
        // Update width using the increased path length
        path.width += pathLength;
        cat.positionX += pathLength;
        console.log(`The new width is ${pathLength} px`);
        pathLength = 0; // Reset path length
    }
});

