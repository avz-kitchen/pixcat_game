const board = document.querySelector("board")
let catLocation = 0;
let pathLength = 0;
let isUpdating = false;
let durationOfKeyPress = 0;
let startTime = 0;
let endTime = 0;
let scorePoint = document.getElementById("score");
let score = 0;


const minNumber = 200;
const maxNumber = 600;
const randomNumber = Math.random() * (maxNumber - minNumber) + minNumber;

document.addEventListener('DOMContentLoaded', () => {

    class SafeArea {
        constructor(positionX) {
            this.positionX = positionX;
            this.width = randomNumber;
            this.safeArea = document.createElement("div"); // Create the start safeArea
            this.safeArea.className = "safe-area";
            this.safeArea.style.width = this.width + "px"; // Fixed width for start safeArea
            this.safeArea.style.left = this.positionX + "px";

            this.safeArea.style.bottom = "0";
            const parentElm = document.getElementById("board");
            parentElm.appendChild(this.safeArea);

            console.log("Platform created.");
            console.log(`At Positon X: ${this.positionX}  Max Position X: ${this.positionX + this.width}`);

        }

    }


    class Cat {
        constructor(positionX) {

            this.width = 80;
            this.height = 80;
            this.positionX = catLocation; // Default Location
            this.positionY = 40; // Start Position
            this.catElm = document.createElement("img");
            this.catElm.id = "cat";

            this.catElm.style.position = "absolute";
            this.catElm.style.left = this.positionX + "px";
            this.catElm.style.bottom = this.positionY + "vh";

            this.catElm.src = 'images/kitty.png';
            this.catElm.style.backgroundSize = "cover";


            const parentElm = document.getElementById("board");
            parentElm.appendChild(this.catElm);
        }

    }



    class Path {
        constructor(positionX, width) {
            this.positionX = 0 + cat.positionX + cat.width;
            this.positionY = cat.positionY;
            this.width = 80;
            this.height = 24;
            this.pathElm = document.createElement("div"); // Initialize path property
            this.lengthActive = false;
            this.pathElm.className = "path";

            // Set position based on properties
            this.pathElm.style.position = "absolute"
            this.pathElm.style.left = this.positionX + "px";
            this.pathElm.style.bottom = this.positionY + "%";
            this.pathElm.style.width = this.width + "px";
            this.pathElm.style.height = this.height + "px";
            this.pathElm.style.backgroundColor = "var(--plank)";
            this.pathElm.style.borderRadius = "24px"

            const parentElm = document.getElementById("board");
            parentElm.appendChild(this.pathElm);

        }


    }



    // User movement

    function moveCat() {
        cat.positionX += path.positionX + path.width; // Add position to cat
        cat.catElm.style.left = cat.positionX + "px";
        console.log(`cat should move to ${cat.positionX} `);
        const hasFallen = isCatOnSafeArea();

        if (isCatOnSafeArea === hasFallen) {
            moveCat();
        }

    }

    function isCatOnSafeArea() {

        // detect collision with safe Area A
        if (cat.positionX <= safeAreaA.positionX + safeAreaA.width && cat.positionX + cat.width >= safeAreaA.positionX && cat.positionX + cat.width < safeAreaA.width) {
            console.log("Cat is on safe Area A");
            return true;
        }

        // detect collision with safe Area B
        if (cat.positionX <= safeAreaB.positionX + safeAreaB.width && cat.positionX + cat.width >= safeAreaB.positionX) {
            console.log("Cat is on safe Area B");
            increasePoints(10);
            return true;
        }

        // detect collision with plank
        if (cat.positionX <= path.positionX + path.width && cat.positionX <= path.positionX) {
            console.log("Cat is on Plank");
            return true;
        }

        // gameover
        console.log("Cat has dieded");
        return fallingCat();

    }

    function increasePoints(points) {
        score += points;
        scorePoint.textContent = `Score: ${score}`;
    }


    // Instantiating objects
    const safeAreaA = new SafeArea(0); // Create platform first
    const safeAreaB = new SafeArea(860); //  Creatte platform second
    const cat = new Cat(); // Then create cat

    const path = new Path();




    //USER MOVEMENT

    document.addEventListener('keydown', event => {
        if (event.code === 'Space' && !startTime && !isUpdating) {
            startTime = new Date(); // Record start time
        }
    });

    // Event listener for spacebar release
    document.addEventListener('keyup', event => {
        if (event.code === 'Space' && startTime) {
            endTime = new Date(); // Record end time
            durationOfKeyPress = endTime - startTime; // Calculate duration of spacebar press
            console.log(`Space bar released after ${durationOfKeyPress} ms`);
            increasePathLength();
        }
    });


    function increasePathLength() { //Draw Path

        let growingTimeCounter = 0;
        let intervalDelay = 10;

        isUpdating = true;

        // Start increasing path width using setInterval
        const intervalId = setInterval(() => {

            growingTimeCounter = growingTimeCounter + intervalDelay;

            path.width += 5; // Increment path length
            path.pathElm.style.width = path.width + "px";
            if (growingTimeCounter > durationOfKeyPress) {
                clearInterval(intervalId);

                // Reset variables
                startTime = 0;
                endTime = 0;
                durationOfKeyPress = 0;

                // move cat
                moveCat();
            }
        }, intervalDelay);
    }
    function fallingCat() {

        const catFallInterval = setInterval(function () {
            // cat Falling
            cat.positionY -= 0;
            cat.catElm.style.bottom = cat.positionY + "px";
            fallingCat();
        }, 94);
        if (cat.positionY > board.style.height) {
            clearInterval(catFallInterval);
        }

    }
    function gameover() {

        setInterval(function () {
            // Redirect to gameover page
            document.location.href = "gameover.html";
        }, 2000);


    };

})
