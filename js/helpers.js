function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

function generarPlataformas() {
    //Genera Plataforma Inicial
    plataformas.push(new Platform(doodle.x - 15, doodle.y + 100))

    for (let i = plataformas.length; i < numPlataformas; i++) {

        let nuevaPlataforma = new Platform(0, 0);

        nuevaPlataforma.x = Math.floor(Math.random() * ($canvas.width - nuevaPlataforma.width))
        nuevaPlataforma.y = plataformas[i - 1].y - Math.floor(Math.random() * (80 - 40) + 40)

        plataformas.push(nuevaPlataforma);
    }
}

function drawPlatforms() {

    plataformas.forEach((p) => {
        p.draw()

    })
}