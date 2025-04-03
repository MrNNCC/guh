import gameClass from "./modules/game.js"



const canvas = document.getElementById("viewport")

function FireEvent(command, arg) {
    let responce = []
    game.Objects.forEach((Entity) => {
      responce.push(Entity.Event(command, arg))
    })
    let len = responce.length
    for(let i = 0; i < len; i++ )
      responce[i] && responce.push(responce[i]);
    responce.splice(0 , len); 
    return responce
  }

let game = new gameClass(FireEvent)

async function init() {
    await game.gameInit(canvas)
    requestAnimationFrame(update)
}

function update(currentTime) {
    game.gameTick(currentTime)
    requestAnimationFrame(update)
}

// canvas.addEventListener("click", (event) => {
//     let hoveredObj = []
//     Objects.forEach((item) => {
//         if (item.checkCollision(event,camera)) {
//             hoveredObj.push(item)
//         }
//     })
//     hoveredObj.sort( (a , b) => a.layer - b.layer )
//     if (hoveredObj.length == 0) return
//     hoveredObj[hoveredObj.length-1].onClick()
// })

// canvas.addEventListener("mousemove", (event) => {
//     let hoveredObj = []
//     Objects.forEach((item) => {
//         if (item.checkCollision(event,camera)) {
//             hoveredObj.push(item)
//         } else {
//             item.unHover()
//         }
//     })
//     hoveredObj.sort( (a , b) => a.layer - b.layer )
//     if (hoveredObj.length == 0) return
//     hoveredObj[hoveredObj.length-1].onHover()
// })

window.onload = await init()