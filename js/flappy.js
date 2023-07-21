window.lose = false

function moverCanos(element, inicio, passo, fim) {
    if(!window.lose) {
        let proximoPasso = inicio - passo
        if(proximoPasso >= fim) {
        element.style.left = proximoPasso + 'px'
        setTimeout(() => moverCanos(element, proximoPasso, passo,fim), 7)
    }
    }
}

const gerarAlturaAleatoria = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function gerarTamanhoCanos (canos) {
    let alturaCima = gerarAlturaAleatoria(60, 360)
    let alturaBaixo = 600 - 140 - alturaCima
    canos[0].style.height = `${alturaCima}px`
    canos[1].style.height = `${alturaBaixo}px`
}

function criarCanos (id) { 
    let flexBoxCanos = document.createElement('div')
    flexBoxCanos.classList.add('canos')
    flexBoxCanos.setAttribute('id', id)
    document.querySelector('[wm-flappy]').appendChild(flexBoxCanos)

    let canoCima = document.createElement('div')
    canoCima.classList.add('cima')
    flexBoxCanos.appendChild(canoCima)

    let canoBaixo = document.createElement('div')
    canoBaixo.classList.add('baixo')
    flexBoxCanos.appendChild(canoBaixo)

    let bordaCima = document.createElement('div')
    bordaCima.classList.add('borda')
    canoCima.appendChild(bordaCima)

    let bordaBaixo = document.createElement('div')
    bordaBaixo.classList.add('borda')
    canoBaixo.appendChild(bordaBaixo)
}

function loop (idCanos, contador) {
    if (!window.lose) {
        idCanos += 1

    if (idCanos <= 4) {
        criarCanos(idCanos)
    } 

    if (contador < 4) {
        contador += 1

        let canos = Array.from(document.getElementById(`${contador}`).children)
        gerarTamanhoCanos(canos)

        let boxCanos = document.getElementById(`${contador}`)
        moverCanos(boxCanos, 1100, 1, -120)

        setTimeout(() => loop(idCanos, contador), 3600)
    } else {
        contador = 0
        loop(idCanos, contador)
    }}

}

 function descerPassaro (passaro, alturaAltual) {
    if (!window.lose) {
        alturaAltual += 1
        passaro.style.top = alturaAltual + 'px'
        setTimeout(() => descerPassaro(passaro, alturaAltual), 7)
    }
}

function controlarPassaro (alturaAltual, press) {
    if (!window.lose) {
        let passaro = document.querySelector('.bird > img')

        document.onkeydown = () => {
            if (alturaAltual > 0) {
                press = true
                alturaAltual -= 5
                passaro.style.top = alturaAltual + 'px'
            }
        }

        document.onkeyup = () => press = false

        if(!press) {
            if (alturaAltual < 565) {
                alturaAltual += 1
                passaro.style.top = alturaAltual + 'px'
            }
        }

        setTimeout(() => controlarPassaro(alturaAltual, press), 7)
    }
}


controlarPassaro(100, false )
loop(0, 0)



function isCollide(a, b) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    );
}

function detectarColisao () {
    let passaro = document.querySelector('.bird > img')
    let canosCima = Array.from(document.querySelectorAll('.cima'))
    let canosBaixo = Array.from(document.querySelectorAll('.baixo'))
    let bordas = Array.from(document.querySelectorAll('.borda'))
    let canos = bordas.concat(canosCima.concat(canosBaixo))

    for(let i in canos) {
        if(isCollide(canos[i], passaro)) {
            window.lose = true
            document.onkeydown = () => location.reload()
        }
    }

    setTimeout(() => detectarColisao(), 5)
}

detectarColisao()
