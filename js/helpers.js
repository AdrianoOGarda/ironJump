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

function updatePlatformPosition() {


    if (doodle.y <= halfHeight) {
        board.update(doodle.velY);

        plataformas.forEach((p) => {
            p.update(doodle.velY)
        })
    }
}

function generaNuevaPlataforma() {
    let lastIndex = plataformas.length - 1;
    let nuevaPlataforma = new Platform(0, 0);

    nuevaPlataforma.x = Math.floor(Math.random() * ($canvas.width - nuevaPlataforma.width))
    nuevaPlataforma.width -= (dificultad * 5)
    nuevaPlataforma.y = plataformas[lastIndex].y - (doodle.maxVelY * 0.75) - Math.floor(Math.random() * ((60 + (dificultad * 25)) + 20))


    return nuevaPlataforma
}

// function updateMonsterPos() {

// }

function writeText() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(`DoodleSpeed = ${doodle.velY}`, halfWidth - 175, $canvas.height - 100);
}

function gameOver() {
    if (doodle.y > $canvas.height + doodle.height) {
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