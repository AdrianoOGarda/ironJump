class Board {
    constructor() {
        this.x = 0
        this.y = 0
        this.width = $canvas.width
        this.height = $canvas.height
            // this.isDead = false
        this.img = new Image()
        this.img.src = "../imgs/background4.jpg"
        this.img.onload = () => {
            this.draw()
        }
    }

    update(menosY = 0) {
        this.y -= menosY;
        if (this.y > $canvas.height) this.y = 0
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img, this.x, this.y - $canvas.height, this.width, this.height)
    }
}

class Jugador {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 60
        this.height = 80
        this.velX = 5
        this.velY = 0
        this.maxVelY = -13.5;
        this.img = new Image()
        this.imgLeft = "../imgs/bunny1_walk1.png"
        this.imgRight = "../imgs/bunny1_walk2.png"
        this.img.src = this.imgLeft
        this.imgDir = 0 // 0 es izquierda y 1 es derecha  
        this.isDead = false
        this.sound = new Audio("../audio/jump_07.wav");
    }

    moveLeft() {
        this.imgDir = 0
        this.img.src = this.imgLeft
        this.x -= this.velX
        if (this.x < -this.width) this.x = $canvas.width

    }

    moveRight() {
        this.imgDir = 1
        this.img.src = this.imgRight
        this.x += this.velX
        if (this.x > $canvas.width) this.x = -this.width
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    jump() {
        this.velY = this.maxVelY;
        if (!this.isDead) {
            let playedPromise = this.sound.play()

            if (playedPromise) {
                playedPromise.catch((e) => {
                    console.log(e)
                    if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
                        console.log(e.name);
                    }
                }).then(() => {
                    //console.log("playing sound !!!");
                });
            }

            this.sound.currentTime = 0;
        }
    }

    isTouching(monstruo) {
        return (
            this.x + this.width > monstruo.x &&
            this.x < monstruo.x + monstruo.width &&
            this.y < monstruo.y + monstruo.height &&
            this.y + this.height > monstruo.y
        )
    }

    isTouching(monstruo2) {
        return (
            this.x + this.width > monstruo2.x &&
            this.x < monstruo2.x + monstruo2.width &&
            this.y < monstruo2.y + monstruo2.height &&
            this.y + this.height > monstruo2.y
        )
    }

    update() {
        this.velY = this.velY + gravity
        if (this.y <= halfHeight - 100 && this.velY <= 0) {
            board.update(this.velY);

            let arraySplice = []

            plataformas.forEach((currentPlatform, index) => {
                currentPlatform.update(this.velY)

                if (currentPlatform.y > $canvas.height) {
                    arraySplice.unshift(index)
                    plataformasDestruidas++
                    if (plataformasDestruidas === 50) {
                        plataformasDestruidas = 0
                        dificultad = dificultad >= 5 ? 5 : dificultad + 1;

                    }
                }
            })

            arraySplice.forEach((platIndex) => {
                plataformas.splice(platIndex, 1);
                plataformas.push(generaNuevaPlataformaV2())
            })

            monstruos.forEach((currentMonstruo) => {
                currentMonstruo.updateVertical(this.velY)
            })
        } else {
            this.y += this.velY;
        }

        distancia -= this.velY

        if (this.velY >= 0) {
            plataformas.forEach((elemento, i) => {
                if (this.x >= elemento.x - this.width &&
                    this.x <= elemento.x + elemento.width &&
                    this.y >= elemento.y - this.height &&
                    this.y <= elemento.y + elemento.height - this.height)
                    this.jump()
            })
        }

    }

}


class Platform {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 100
        this.height = 20
        this.color = '#6ADA00'
        this.gap = 20
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    update(velY = 0) {
        this.y -= velY * 2
    }
}

class Monster {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.velX = 5
        this.width = 80
        this.height = 80
        this.img = new Image()
        this.img.src = Monster.monsterImg()
        this.dir = 1 // 0 - Izq | 1 - Der
        this.isDead = false;
    }

    static monsterImg() {
        let monsterType = Math.floor(Math.random() * (3)) % 3
        switch (monsterType) {
            //verde
            case 0:
                return "../imgs/zorn2_64.png";
                //rojo
            case 1:
                return "../imgs/alan2_64.png";
                //azul
            case 2:
                return "../imgs/piorn2_64.png"
        }
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    update() {
        this.x += this.dir == 0 ? -(this.velX + (2*dificultad)): this.velX + (2 * dificultad);
        if (this.x + this.width > $canvas.width) this.dir = 0;
        if (this.x <= 0) this.dir = 1;
    }
    updateVertical(velY = 0) {
        this.y -= velY * 2
    }
}

class Monster2 {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.velY = 8
        this.dir = 1
        this.width = 80
        this.height = 80
        this.img = new Image()
        this.img.src = Monster2.monster2img()
    }

    static monster2img() {
        let monster2Type = Math.floor(Math.random() * (3)) % 3
        switch (monster2Type) {
            //verde
            case 0:
                return "../imgs/zorn2_64.png";
                //rojo
            case 1:
                return "../imgs/alan2_64.png";
                //azul
            case 2:
                return "../imgs/piorn2_64.png"
        }
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)

    }
    update() {
        this.y += this.dir == 0 ? -this.velY : this.velY;
    }
}