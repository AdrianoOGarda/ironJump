const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext('2d')

const gravity = 0.5

const halfWidth = 300
const halfHeight = 400

let frames = 0
let keys = []
let intervalID
let score = 0;
let distancia = 0;
let dificultad = 0;
let plataformasDestruidas = 0;


const board = new Board()
const doodle = new Jugador(halfWidth - 60, halfHeight - 200)

const numPlataformas = 35;
let plataformas = [];
generarPlataformasV2()

let monstruos = [];
let monstruos2 = [];


function mainLoop(time) {
    clearCanvas()

    board.update()
    board.draw();

    checkKeys();

    doodle.update();
    doodle.draw();

    drawPlatforms()
    drawMonstruos();
    drawMonstruos2();
    checkCollisions();
    checkCollisions2();
    drawScore()
    gameOver()


    requestAnimationFrame(mainLoop);
}

mainLoop();