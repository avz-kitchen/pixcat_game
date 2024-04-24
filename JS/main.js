class Cat {
    constructor(positionX) {

        this.width = 80;
        this.height = 80;
        this.positionX = 0 + this.width; // Default Location
        this.positionY = 36; // Start Position
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
        console.log("Cat created.");
    }
    isCatOnSafeArea() {
        if (cat.positionX < safeArea.positionX + safeArea.width &&
            cat.positionX + cat.width > safeArea.positionX &&
            cat.positionY < safeArea.positionY + safeArea.height &&
            cat.positionY + cat.height > safeArea.positionY) {
            console.log("Cat is on safe Area")

        } else {
            console.log("game over my fren!")
        }
    }

}



class SafeArea {
    constructor(positionX,width) {
        this.positionX = positionX;
        this.width = width;
        this.createSafeArea(); // Create the start safeArea
    }

    createSafeArea() {
        const safeArea = document.createElement("div");
        safeArea.className = "safeArea";
        safeArea.style.width = this.width + "%"; // Fixed width for start safeArea
        safeArea.style.left = this.positionX + "%";

        safeArea.style.bottom = "0";
        const parentElm = document.getElementById("board");
        parentElm.appendChild(safeArea);

        console.log("Platform created.");
    }

}




// Instantiating objects
const safeAreaA = new SafeArea(0,20); // Create platforms first
const safeAreaB = new SafeArea(80, 10); // 
const cat = new Cat(); // Then create cat


