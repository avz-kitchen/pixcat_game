let catLocation = 0;
let pathLength = 0;
let counter = 0;
let startTime = 0;
let endTime = 0;


class Cat {
    constructor(positionX) {

        this.width = 80;
        this.height = 80;
        this.positionX = catLocation + this.width; // Default Location
        this.positionY = 40; // Start Position
        this.score = 0;
        this.cat = document.createElement("div");
        this.cat.id = "cat";

        this.cat.style.position = "absolute";
        this.cat.style.left = this.positionX + "px";
        this.cat.style.bottom = this.positionY + "vh";

        this.cat.style.backgroundImage = "url('images/kitty.png')";
        this.cat.style.backgroundSize = "cover";


        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.cat);
    }

    createACat() {
        console.log(`Cat is on screen. at ${this.positionX}`);
    }


}



class Path {
    constructor(positionX, width) {
        this.positionX = 0 + cat.positionX + cat.width;
        this.positionY = cat.positionY;
        this.width = 120 ;
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
        this.safeArea = document.createElement("div"); // Create the start safeArea
        this.safeArea.className = "safe-area";
        this.safeArea.style.width = this.width + "px"; // Fixed width for start safeArea
        this.safeArea.style.left = this.positionX + "%";

        this.safeArea.style.bottom = "0";
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.safeArea);

        console.log("Platform created.");
        console.log(`At Positon X: ${this.positionX}  Max Position X: ${this.positionX + this.width}`);

    }

    detectCatPosition() {

    }

}

//USER MOVEMENT

function increasePathLength(){
document.addEventListener('keydown', event => {
    if (event.code === 'Space' && !startTime) {
        startTime = Date.now(); // Record start time
        console.log(`Space bar pressed down`);

        // Start increasing path width using setInterval
        const intervalId = setInterval(() => {
            pathLength += 1; // Increment path length
            drawPath(path, pathLength); // Update path width
        }, 10);

        // Event listener for spacebar release
        document.addEventListener('keyup', event => {
            if (event.code === 'Space' && startTime) {
                endTime = Date.now(); // Record end time
                const duration = endTime - startTime; // Calculate duration of spacebar press
                console.log(`Space bar released after ${duration} ms`);

                // Clear the interval
                clearInterval(intervalId);

                // Update width using the duration
                path.width += pathLength;
                cat.positionX += pathLength;
                console.log(`The new width is ${path.width} px`);

                // Reset variables
                startTime = 0;
                pathLength = 0;
            }
        });
    }
});
}
function drawPath(pathElement, amount) {
    pathElement.width += amount;
    pathElement.path.style.width = pathElement.width + "px";
}

// Rest of your code...

function drawPath(pathElement,amount){
    pathElement.width += amount;
    pathElement.path.style.width = pathElement.width + "px"

}
function holdNewCatPositionX() {
    cat.positionX = path.positionX + path.width;
    console.log(`${cat.positionX}`)
        }


// function isCatOnSafeArea() {
//     if (path.positionX < safeAreaA.positionX + safeAreaA.width ||
//         path.positionX + path.width > safeAreaA.positionX ||
//         path.positionY < safeAreaA.positionY + safeAreaA.height ||
//         path.positionY + path.height > safeAreaA.positionY) {
//         console.log("path is on safe Area A")

//     } else if (path.positionX < safeAreaB.positionX + safeAreaB.width ||
//         path.positionX + path.width > safeAreaB.positionX ||
//         path.positionY < safeAreaB.positionY + safeAreaB.height ||
//         path.positionY + path.height > safeAreaB.positionY) {
//         console.log("path is on safe Area B")

//     } 
//     else {
//         console.log("path is not on safe Area")
//     }
//     console.log(path.positionX)
//     console.log(path.positionX + safeAreaA.width)

// }



// Instantiating objects
const safeAreaA = new SafeArea(0, 400); // Create platforms first
const safeAreaB = new SafeArea(80, 120); // 
const cat = new Cat(); // Then create cat

const path = new Path();




function detectPosition(){
    if(path.positionX <= safeAreaA.positionX + safeAreaA.width && path.width <= safeAreaA.width ){
    console.log("Path is on safearea A")
    } else {
        console.log("Path is off the platform")
    }
}
// isCatOnSafeArea();
detectPosition();
increasePathLength(); // Call the function to activate the event listener
