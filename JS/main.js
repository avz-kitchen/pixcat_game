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


 
    }
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX--;
            this.playerElm.style.left = this.positionX + "vw";
        }
    }
}
class Plank {
    constructor() {
        this.height = 24;
        this.width = 120;
        this.positionX = 50;
        this.positionY = 38;
        this.plankElm = null;
        this.createDomElement();
    };
    createDomElement() {
        this.plankElm = document.createElement("div");
        this.plankElm.className = "plank";
        this.plankElm.style.left = this.positionX + "vw";
        this.plankElm.style.bottom = this.positionY + "vh";
        this.plankElm.style.width = this.width + "px";
        this.plankElm.style.height = this.height + "px";
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.plankElm);
    }
}
class Platform {
    constructor() {
        this.height = 36;
        this.width = 24;
        this.positionX = 50;
        this.positionY = 0;
        this.platformElm = null;

        this.createDomElement();
    };
    createDomElement() {
        this.platformElm = document.createElement("div");
        this.platformElm.className = "platform";
        this.platformElm.style.left = this.positionX + "vw";
        this.platformElm.style.bottom = this.positionY + "vh";
        this.platformElm.style.width = this.width + "%";
        this.platformElm.style.height = this.height + "%";
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.platformElm);
    }
}



const player = new Player();
const plank = new Plank();
const platform = new Platform();


//move all obstacles



//EVENT LISTENER

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        player.moveLeft();
    } else if (e.code === "ArrowRight") {
        player.moveRight();

    }
})