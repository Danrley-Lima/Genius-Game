let sequence = []
let clickedSequence = []
let score = 0

/* 
0 = green
1 = red
2 = yellow
3 = blue
*/

const green = document.querySelector(".green")
const red = document.querySelector(".red")
const yellow = document.querySelector(".yellow")
const blue = document.querySelector(".blue")

// Gera a sequência aleatória de cores
const shuffleSequence = () => {
    let colorRandom = Math.floor(Math.random() * 4)
    sequence[sequence.length] = colorRandom
    clickedSequence = []

    for (let i in sequence) {
        let elementColor = createColorElement(sequence[i])
        lightColor(elementColor, Number(i) + 1)
    }
}

// Acender a próxima cor 
const lightColor = (element, number) => {
    number = number * 500
    setTimeout(() => {
        element.classList.add('selected')
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected')
    }, number + 250);
}

// Check se os botões clicados são os mesmos da ordem gerada
const checkSequence = () => {
    for (let i in clickedSequence) {
        if (clickedSequence[i] !== sequence[i]) {
            gameOver()
            break;
        }
    }
    if (clickedSequence.length == sequence.length) {
        alert(`Sua pontuação foi de: ${score}\nIrei começar o próximo nível`)
        nextLevel()
    }
}

// CLick do usuário
const click = (color) => {
    clickedSequence[clickedSequence.length] = color
    createColorElement(color).classList.add('selected')

    setTimeout(() => {
        createColorElement(color).classList.remove('selected')
        checkSequence();
    }, 250)

}

// Retornar a cor para a sequência
const createColorElement = (color) => {
    if (color === 0) {
        return green
    } else if (color === 1) {
        return red
    } else if (color === 2) {
        return yellow
    } else if (color === 3) {
        return blue
    }
}

// Aumentar o nível do jogo
const nextLevel = () => {
    score++
    shuffleSequence()
}

// Perdeu o jogo
const gameOver = () => {
    alert(`Game Over\nVocê perdeu!\nSua pontuação: ${score}\nClique em OK para recomeçar`)
    sequence = []
    clickedSequence = []

    playGame();
}

// Iniciar o jogo
const playGame = () => {
    alert("Bem vindo ao Genius!\nComeçando um novo jogo.")
    score = 0

    nextLevel()
}

// Eventos de clique
green.addEventListener('click', () => { click(0) })
red.addEventListener('click', () => { click(1) })
yellow.addEventListener('click', () => { click(2) })
blue.addEventListener('click', () => { click(3) })

// Iniciar o jogo
playGame()