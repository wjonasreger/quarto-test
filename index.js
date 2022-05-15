;(function () {
  const canvas = document.getElementById('gameCanvas')
  const ctx = canvas.getContext('2d')

})()

// initialize config variables here
let canvas, ctx

// setup config variables and start the program
function init () {
    // set our config variables
    canvas = document.getElementById('gameCanvas')
    ctx = canvas.getContext('2d')
  
    // outlined square X: 50, Y: 35, width/height 50
    ctx.beginPath()
    ctx.strokeRect(50, 35, 50, 50)
  
    // filled square X: 125, Y: 35, width/height 50
    ctx.beginPath()
    ctx.fillRect(125, 35, 50, 50)
  }

// wait for the HTML to load
document.addEventListener('DOMContentLoaded', init)