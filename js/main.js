const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext('2d')

const gravity = 0.5

const halfWidth = 300
const halfHeight = 400

let frames = 0
let keys = []
let intervalID
let score = 0;

const board = new Board()
const doodle = new Jugador(halfWidth - 60, halfHeight - 200)

const numPlataformas = 50;
let plataformas = [];
generarPlataformas()


function mainLoop(time) {
    frames++
    clearCanvas()

    board.update()
    board.draw();

    //updatePlatformPosition();

    checkKeys();

    doodle.update();
    doodle.draw();
    drawPlatforms()
    drawScore()

    writeText()
    gameOver()

    requestAnimationFrame(mainLoop);
}

mainLoop();