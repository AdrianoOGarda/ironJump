function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

function generarPlataformas() {
    //Genera Plataforma Inicial
    plataformas.push(new Platform(doodle.x - 15, doodle.y + 100))

    for (let i = plataformas.length; i < numPlataformas; i++) {

        let nuevaPlataforma = new Platform(0, 0);

        nuevaPlataforma.x = Math.floor(Math.random() * ($canvas.width - nuevaPlataforma.width))
        nuevaPlataforma.y =
            plataformas[i - 1].y -
            nuevaPlataforma.height -
            (nuevaPlataforma.gap - dificultad) -
            Math.floor(Math.random() * ((60 + (dificultad * 25)) + 20))

        plataformas.push(nuevaPlataforma);
    }
}

function drawPlatforms() {

    plataformas.forEach((p) => {
        p.draw()

    })
}

function drawMonstruos() {

    monstruos.forEach((m) => {
        m.update();
        m.draw()

    })
}

function updatePlatformPosition() {


    if (doodle.y <= halfHeight) {
        board.update(doodle.velY);

        plataformas.forEach((p) => {
            p.update(doodle.velY)
        })
    }
}


let plataformasGeneradas = 0;

function generaNuevaPlataforma() {
    let lastIndex = plataformas.length - 1;
    let nuevaPlataforma = new Platform(0, 0);

    nuevaPlataforma.x = Math.floor(Math.random() * ($canvas.width - nuevaPlataforma.width))
    nuevaPlataforma.width -= (dificultad * 5)
    nuevaPlataforma.y = plataformas[lastIndex].y - (doodle.maxVelY * 0.75) - Math.floor(Math.random() * ((60 + (dificultad * 25)) + 20))

    if (dificultad >= 2 && Math.random() > 0.75 && plataformasGeneradas >= 35) {
        generarMonstruo(nuevaPlataforma.x, nuevaPlataforma.y, nuevaPlataforma.width);
        plataformasGeneradas = 0;
    }
    plataformasGeneradas++;
    return nuevaPlataforma
}

function generarMonstruo(x, y, width) {

    let monstruo = new Monster(x + width / 2, y + 10)
    monstruos.push(monstruo);
}


function writeText() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(`DoodleSpeed = ${doodle.velY}`, halfWidth - 175, $canvas.height - 100);
}

function gameOver() {
    if (doodle.y > $canvas.height + doodle.height || doodle.isDead) {
        clearCanvas()
        ctx.font = `50px 'Arial'`
        ctx.fillStyle = "crimson"
        ctx.fillText("Game Over", 200, 400)
    }
}


function drawScore() {
    ctx.font = "30px 'Arial'"
    ctx.fillStyle = "crimson"
    ctx.fillText(score, 100, 100)
}

function checkCollisions() {
    monstruos.forEach((monstruo) => {
        if (doodle.isTouching(monstruo)) doodle.isDead = true
            // if (doodle.isTouchingAbove(monstruo)) doodle.jump()
    })
}

// function restart() {
//     if (doodle.isDead) {
//         clearCanvas()
//     }
// }