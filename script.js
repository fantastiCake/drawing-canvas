
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const brushColors = document.querySelector(".control-panel__brush-colors");
const brushSize = document.querySelector(".control-panel__brush-size");
const clearButton = document.querySelector(".control-panel__clear");
const brushTypeButton = document.querySelector(".control-panel__fill");

let mousemoveToggle = false;
const brushTypes = {
  paint: "paintBrush",
  fill: "fillBrush"
}
let currentBrush = brushTypes.paint;

function trackMousePos(event) {
  const canvasRect = canvas.getBoundingClientRect();

  /*
  // track touch position on mobile
  const posX = Math.round(event.touches[0].clientX - canvasRect.left);
  const posY = Math.round(event.touches[0].clientY - canvasRect.top) / 2;
  */
  
  // track mouse position on pc
  const posX = Math.round(event.clientX - canvasRect.left);
  const posY = Math.round(event.clientY - canvasRect.top) / 2;
  
  return [posX, posY];
}

function handleMousedown(event) {
  const pos = trackMousePos(event);
  const posX = pos[0];
  const posY = pos[1];

  if(currentBrush == brushTypes.fill) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  mousemoveToggle = true;
  ctx.beginPath();
  ctx.moveTo(posX, posY);
}

function handleMousemove(event) {
  const pos = trackMousePos(event);
  const posX = pos[0];
  const posY = pos[1];

  if(mousemoveToggle) {
    ctx.lineTo(posX, posY);
    ctx.moveTo(posX, posY);
    ctx.stroke();
  }
}

function handleMouseup(event) {
  mousemoveToggle = false;
}

function handleClickColor(event) {
  currentColor = event.target.style.backgroundColor;
  ctx.fillStyle = currentColor;
  ctx.strokeStyle = currentColor;
  event.target.style.transform = "scale(0.9)";

  for(let i=0; i<brushColors.childNodes.length; i++) {
    const childNode = brushColors.childNodes[i];
    if(childNode != event.target && childNode.nodeName == "DIV") {
      brushColors.childNodes[i].style.transform = "scale(1)";
    }
  }
}

function handleChangeBrush(event) {
  if(currentBrush == brushTypes.paint) {
    currentBrush = brushTypes.fill;
    event.target.classList = "fas fa-paint-brush fa-2x";
  }
  else {
    currentBrush = brushTypes.paint;
    event.target.classList = "fas fa-fill fa-2x";
  }
}

function handleInput(event) {
  newBrushSize = event.target.value;
  ctx.lineWidth = newBrushSize;
}

function hancleClearButton(event) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function init() {
  
  /*
  // touch event on mobile
  canvas.addEventListener("touchstart", handleMousedown);
  canvas.addEventListener("touchmove", handleMousemove);
  canvas.addEventListener("touchend", handleMouseup);
  */

  // mouse event on pc
  canvas.addEventListener("mousedown", handleMousedown);
  canvas.addEventListener("mousemove", handleMousemove);
  canvas.addEventListener("mouseup", handleMouseup);

  brushTypeButton.addEventListener("click", handleChangeBrush);
  brushSize.addEventListener("input", handleInput);
  clearButton.addEventListener("click", hancleClearButton);
  for(let i=0; i<brushColors.childNodes.length; i++) {
    const childNode = brushColors.childNodes[i];
    if(childNode.nodeName == "DIV")
      childNode.addEventListener("click", handleClickColor)
  }
}

init();