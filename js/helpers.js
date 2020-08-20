function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

// function generarPlataformas() {
//     //Genera Plataforma Inicial
//     plataformas.push(new Platform(doodle.x - 15, doodle.y + 100))

//     for (let i = plataformas.length; i < numPlataformas; i++) {

//         let nuevaPlataforma = new Platform(0, 0);

//         nuevaPlataforma.x = Math.floor(Math.random() * ($canvas.width - nuevaPlataforma.width))
//         nuevaPlataforma.y =
//             plataformas[i - 1].y -
//             nuevaPlataforma.height -
//             (nuevaPlataforma.gap - dificultad) -
//             Math.floor(Math.random() * ((60 + (dificultad * 25)) + 20))

//         plataformas.push(nuevaPlataforma);
//     }
// }

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

function drawMonstruos2() {

    monstruos2.forEach((m) => {

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

// function generaNuevaPlataforma() {

//     let lastIndex = plataformas.length - 1;
//     let nuevaPlataforma = new Platform(0, 0);

//     nuevaPlataforma.x = Math.floor(Math.random() * ($canvas.width - nuevaPlataforma.width))
//     nuevaPlataforma.width -= (dificultad * 5)
//     nuevaPlataforma.y = plataformas[lastIndex].y - (doodle.maxVelY * 0.75) - Math.floor(Math.random() * ((60 + (dificultad * 25)) + 20))

//     if (dificultad >= 1 && Math.random() > 0.50 && plataformasGeneradas >= 35) {
//         generarMonstruo(nuevaPlataforma.x, nuevaPlataforma.y, nuevaPlataforma.width);
//         plataformasGeneradas = 0;
//     }
//     plataformasGeneradas++;
//     return nuevaPlataforma
// }

function generarMonstruo(x, y, width) {

    let monstruo = new Monster(x + width / 2, y + 10)
    monstruos.push(monstruo);
}

function generarMonstruo2(x, y, width) {
    let monstruo2 = new Monster2(x, y, width)
    monstruos2.push(monstruo2)
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
        ctx.fillStyle = "#8FBC8F"
        ctx.fillRect(120, 350, 375, 125)
        ctx.fillStyle = "crimson"
        ctx.fillText("Game Over", 175, 425)
    }
    if (doodle.y > $canvas.height + doodle.height)
        doodle.isDead = true
}


function drawScore() {

    if (distancia > score) {
        score = Math.round(distancia);
    }

    ctx.font = "30px 'Arial'"
        // ctx.fillStyle = "gray"
        // ctx.fillRect(30, 60, 200, 55)
    ctx.fillStyle = "crimson"
    ctx.fillText(`Score: ${score}`, 50, 100)
}

function checkCollisions() {
    monstruos.forEach((monstruo) => {
        if (doodle.isTouching(monstruo)) doodle.isDead = true
    })
}

function checkCollisions2() {
    monstruos2.forEach((monstruo2) => {
        if (doodle.isTouching(monstruo2)) doodle.isDead = true
    })
}

// function checkCollisions() {
//     monstruos.forEach((monstruo) => {
//         if (doodle.isTouching(monstruo)) {
//             if ((doodle.y + doodle.height) > monstruo.y) {
//                 doodle.jump()
//                 monstruo.isDead = true;
//             } else {
//                 doodle.isDead = true
//             }
//         }
//     })
// }


function restart() {
    if (doodle.isDead) {
        monstruos = [];
        monstruos2 = [];
        plataformas = [];
        score = 0;
        distancia = 0;
        doodle.x = halfWidth - 60;
        doodle.y = halfHeight - 200;
        doodle.velY = 0;
        doodle.isDead = false;
        plataformasGeneradas = 0;
        plataformasDestruidas = 0;
        dificultad = 0;
        generarPlataformasV2();
        //agregarScoreHTML();
    }
}

function generarPlataformasV2() {
    plataformas.push(new Platform(doodle.x - 15, doodle.y + 100))

    for (let i = plataformas.length; i < numPlataformas; i++) {
        plataformas.push(generaNuevaPlataformaV2())
    }
    plataformaGeneradas = 0;

}

function generaNuevaPlataformaV2() {

    let platformBelow = plataformas[plataformas.length - 1];
    let gap = platformBelow.height * 1.5
    let newPlatform = new Platform(0, 0);

    //Desde 0 hasta canvas width menos lo que mide la plataforma
    newPlatform.x = 0 + ~~(Math.random() * (($canvas.width - newPlatform.width) - 0))

    //lo mas que puede saltar el doodle en vertical es 160 (en una plataforma)

    //le quito de la plataforma anterior 2x  la altura + 10 por dificultad
    let minY = gap + (12.5 * dificultad)
    let maxY = 80 + (12.5 * dificultad)
    let rangeY = Math.random() * (maxY - minY) + minY
    newPlatform.y = platformBelow.y - rangeY

    if (dificultad >= 1 && Math.random() > 0.5 && plataformasGeneradas >= 25) {
        generarMonstruo(newPlatform.x, newPlatform.y, newPlatform.width);
        plataformasGeneradas = 0;
    }

    if (dificultad >= 2 && Math.random() > 0.7 && plataformasGeneradas >= 20) {
        generarMonstruo2(newPlatform.x, newPlatform.y, newPlatform.width);
        plataformasGeneradas = 0;
    }


    plataformasGeneradas++;


    return newPlatform;
}