derecha_x = 0
izquierda_x = 0
derecha_y = 0
izquierda_y = 0
derecha_score = 0
izquierda_score = 0
speed = 1
volume = 1



function setup() {
    canvas = createCanvas(400, 400)
    canvas.parent("#canvas")
    canvas.center()
    background("cyan")
    video = createCapture(VIDEO)
    video.size(400, 400)
    modelo = ml5.poseNet(video, listo)
    modelo.on("pose", respuesta)
    video.hide()
}

function listo() {
    console.log("ya cargo")
}

function respuesta(resultados) {
    if (resultados.length > 0) {
        console.log(resultados)
        izquierda_x = resultados[0].pose.leftWrist.x
        derecha_x = resultados[0].pose.rightWrist.x
        izquierda_y = resultados[0].pose.leftWrist.y
        derecha_y = resultados[0].pose.rightWrist.y
        derecha_score = resultados[0].pose.keypoints[10].score
        izquierda_score = resultados[0].pose.keypoints[9].score
    }
}

function draw() {
    image(video, 0, 0, 400, 400)
    if (derecha_score > 0.2) {
        fill("blue")
        circle(derecha_x, derecha_y, 20)
        if (derecha_y > 300) {
            speed = 1
        }

        else if (derecha_y > 200) {
            speed = 2
        }

        else if (derecha_y > 100) {
            speed = 3
        }

        else if (derecha_y > 0) {
            speed = 4
        }
        song.rate(speed)
        document.getElementById("speed").innerHTML = "Velocidad :" + speed;

    }
    if (izquierda_score > 0.2) {
        fill("purple")
        circle(izquierda_x, izquierda_y, 20)

        volume = (izquierda_y * 4) / 400
        volume = Math.round(volume * 10) / 10
        document.getElementById("volume").innerHTML = "volumen : " + volume
        song.setVolume(volume)

    }

}

function cambiar_cancion()
{
    option = document.getElementById("canciones").value
    song.stop()
    if (option == 1) {
        song = cancion_1
    } else if (option == 2) {
        song = cancion_2
    } else if (option == 3) {
        song = cancion_3
    } else if (option == 4) {
        song = cancion_4
    }
    play()
    console.log(option)
}

function play() {
    if (!song.isPlaying()) {
        song.play()
        song.setVolume(1)
        song.rate(1)
    }

}

function preload() {

    cancion_1 = loadSound("x100to_badbunny.mp3")
    cancion_2 = loadSound("OjitosLindos_BadBunnyBomba Estéreo.mp3")
    cancion_3 = loadSound("QUEVEDO_BZRP.mp3")
    cancion_4 = loadSound("Ella Baila Sola - (Video Oficial) - Eslabon Armado y Peso Pluma - DEL Records 2023.mp3")
    song = cancion_1


}

function stop() {
    song.stop()
}
