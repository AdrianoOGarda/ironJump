const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext('2d')

const gravity = 0.4

const halfWidth = 300
const halfHeight = 400

let frames = 0
let keys = []
let intervalID

const board = new Board()
const doodle = new Jugador(halfWidth - 60, halfHeight + 200)

const numPlataformas = 50;
let plataformas = [];
generarPlataformas()


function mainLoop(time) {

    clearCanvas()

    board.update()
    board.draw();



    checkKeys();

    doodle.update();
    doodle.draw();

    drawPlatforms()



    requestAnimationFrame(mainLoop);
}

mainLoop();