
const form = document.querySelector('form');
const inputWeight = document.querySelector('#weight');
const inputHeight = document.querySelector('#height');
const Modal = {

    wrapper: document.querySelector('.modal-wrapper'),
    message: document.querySelector('.modal .tittle span'),
    weightM: document.querySelector('.modal .tittle span.modal-weight'),
    image: document.querySelector('.modal img.img-imc'),
    buttonClose: document.querySelector('.modal button.close'),

    open() {
        Modal.wrapper.classList.add('open')
    },
    close() {
        Modal.wrapper.classList.remove('open')
    },
}
const AlertError = {
    element: document.querySelector('.alert-error'),

    open() {
        AlertError.element.classList.add('open')
    },
    close() {
        AlertError.element.classList.remove('open')
    }
}
function notNumber(value) {
    return isNaN(value) || value == ""
}
function calculateIMC(weight, height) {
    return (weight / ((height / 100) ** 2)).toFixed(2)
}

inputWeight.oninput = () => AlertError.close()
inputHeight.oninput = () => AlertError.close()

form.onsubmit = event => {
    event.preventDefault()

    const weight = inputWeight.value
    const height = inputHeight.value
    const weightOrHeightIsNotANumber = notNumber(weight) || notNumber(height)

    if (weightOrHeightIsNotANumber) {
        AlertError.open()
        return;
    }
    AlertError.close()


    const result = calculateIMC(weight, height)
    displayResultMessage(result)

}
function displayResultMessage(result) {
    const message = `Seu IMC é de ${result}`

    Modal.message.innerText = message

    if (result <= 18.5) {
        Modal.weightM.innerText = 'ABAIXO DO PESO'
        Modal.weightM.style.color = '#00b7ee'
        Modal.image.src = '../imagens/baixo-peso.png';
    }
    else if (result <= 24.9) {
        Modal.weightM.innerText = 'PESO NORMAL'
        Modal.weightM.style.color = '#00a761'
        Modal.image.src = '../imagens/peso-normal.png';
    }
    else if (result <= 29.9) {
        Modal.weightM.innerText = 'EXCESSO DE PESO'
        Modal.weightM.style.color = '#ffd200'
        Modal.image.src = '../imagens/excesso-de-peso.png';
    }
    else if (result <= 35) {
        Modal.weightM.innerText = 'OBESIDADE'
        Modal.weightM.style.color = '#ff7900'
        Modal.image.src = '../imagens/obesidade.png';
    }
    else {
        Modal.weightM.innerText = 'OBESIDADE EXREMA'
        Modal.weightM.style.color = '#ff1035'
        Modal.image.src = '../imagens/obesidade-extrema.png';
    }

    Modal.open()
}
Modal.buttonClose.onclick = () => {
    Modal.close()
}

window.addEventListener('keydown', handleKeyDown)

function handleKeyDown(event) {
    if (event.key === 'Escape') {
        Modal.close()
    }
}




