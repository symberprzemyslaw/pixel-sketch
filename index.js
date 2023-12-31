//Dom elements
const palette = document.querySelector(".palette")
const popup = document.querySelector(".popup")
const popupInput = document.querySelector(".popup > input")
const canvas = document.querySelector("#canvas")
const resetBtn = document.querySelector("#reset")
const eraser = document.querySelector("#eraser")
const download = document.querySelector("#download")


// Variables
let drawingColor = 'black';
let qnt = 50;
let canDraw = false
eraser.value = '#ffffff'

// function that draws grid refering to input value (qnt)
const drawGrid = () => { 
    let newWidth = canvas.offsetWidth - (canvas.offsetWidth % qnt)
    let newHeight = canvas.offsetHeight - (canvas.offsetHeight % qnt)    
    canvas.style.width = `${newWidth}px` 
    canvas.style.height = `${newHeight}px`
 
    for(let i = 0; i < (qnt * qnt);i++){
        let div = document.createElement("div")
        canvas.appendChild(div)
        div.classList.add('grid-element')
        div.style.width = `${newWidth /qnt}px`
        div.style.height = `${newHeight /qnt}px`
    }
}

const setResolution = (value) => {
    if(value > 100){
        qnt = 100
    } else {
        qnt = value
    }
    
}

/* DOM */

// color selection and palette
palette.addEventListener(('click'), (e) => {
    if (e.detail !== 2) e.preventDefault();
    if(e.target.value){
      drawingColor = e.target.value
    }
})

palette.addEventListener(('input'), (e) => {
    if(e.target.value){
      drawingColor = e.target.value
    }
})

// drawing
canvas.addEventListener('mousedown',e => { 
    e.preventDefault()
    canDraw = true
})
canvas.addEventListener('mouseup',e => { 
    e.preventDefault()
    canDraw = false
})
// reset button
resetBtn.addEventListener('click', () => { 
    popup.style.display = 'flex'
    canvas.innerHTML = ''
})
canvas.addEventListener('mouseover', function(e){
        canDraw ? e.target.style.backgroundColor = drawingColor : 'black'
    })

canvas.addEventListener("click", (e) => {
    e.target.style.backgroundColor = drawingColor
})

//handling resolution input submit and enter button
popup.addEventListener('submit', e => {
    e.preventDefault()
    setResolution(popupInput.value)
    popup.style.display = 'none'
    drawGrid()
})

//downloading image
download.addEventListener("click", function () {
    htmlToImage.toJpeg(canvas, { quality: 0.95 })
    .then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = 'my-image-name.jpeg';
      link.href = dataUrl;
      link.click();
    });
  });