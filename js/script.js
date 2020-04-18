const awan = document.querySelectorAll('.awan')
const setan = document.querySelectorAll('.setan')
const papanSkor = document.querySelector('.skor')
const gasak = document.querySelector('.gasak')
const level = document.querySelectorAll('#levels')
const msetan = document.querySelector('.msetan')

let modal = document.getElementById('myModal')
let awanSebelumnya
let selesai
let skor
let timeRand
let seconds
let timer
let span = document.getElementsByClassName('close')[0]
span.onclick = function () {
    modal.style.display = 'none'
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none'
    }
}

function randomAwan(awan) {
    const a = Math.floor(Math.random() * awan.length)
    const aRandom = awan[a]
    if (aRandom == awanSebelumnya) {
        randomAwan(awan)
    }
    awanSebelumnya = aRandom
    return aRandom
}

function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function munculkanSetan() {
    const aRandom = randomAwan(awan)
    aRandom.classList.add('muncul')

    setTimeout(() => {
        aRandom.classList.remove('muncul')
        if (!selesai) {
            munculkanSetan()
        }
    }, timeRand)
}

function getLevel() {
    for (let i = 0; i < level.length; i++) {
        const element = level[i].checked
        if (element) {
            if (level[i].value == '1') {
                // mudah
                timeRand = randomWaktu(800, 1800)
            } else if (level[i].value == '2') {
                // sedang
                timeRand = randomWaktu(700, 1200)
            } else if (level[i].value == '1') {
                // sulit
                timeRand = randomWaktu(500, 900)
            }
        }
    }
}

function mulai() {
    getLevel()
    msetan.textContent = 'mukulin setan'
    seconds = 1000 * 60 // set 1 menit
    countDown()
    selesai = false
    skor = 0
    papanSkor.textContent = 0
    munculkanSetan()
    setTimeout(() => {
        selesai = true
    }, seconds)
}

function pukul() {
    skor++
    gasak.play()
    this.parentNode.classList.remove('muncul')
    this.style.transition = 'top 0.1s;'
    papanSkor.textContent = skor
}

setan.forEach(item => {
    item.addEventListener('click', pukul)
})

function countDown() {
    if (seconds == 60000) {
        timer = setInterval(countDown, 1000)
    }
    seconds -= 1000
    document.querySelector('.timer').innerHTML = '00:' + seconds / 1000 + ' '
    if (seconds <= 0) {
        clearInterval(timer)
        modal.style.display = 'block'
        document.querySelector('.timer').innerHTML = '00:00'
    }
}

function stop() {
    msetan.textContent = ''
    selesai = true
    clearInterval(timer)
    document.querySelector('.timer').innerHTML = '00:00'
}
