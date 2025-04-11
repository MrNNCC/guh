import frame from '../modules/frame.js'
import InputHandlerClass from '../modules/inputHandler.js'
import { easeOutSine, lerp, wait } from '../modules/misc.js'
import { vec2, vec4 } from '../modules/vec.js'

const InputHandler = new InputHandlerClass()

const bg = new frame()

const dialog = new frame()
var dialogOrder = 0
const dialogText = [
    "",
    "dsl;kfsdgsdmgsfkdmvcxvxf.xf,d;f",
    `The quick brown fox jumps over the lazy dog`,
    "hewwo",
    "gooodbye",
    ""
]

var spacepressed = false
var textspeed = 10

var time = 0

var character1 = new frame()
var animTime1 = 0

var character2 = new frame()
var animTime2 = 0

export async function init(ctx,FireEvent) {
    await wait()

    //!!!
    bg.FireEvent = FireEvent
    dialog.FireEvent = FireEvent
    character1.FireEvent = FireEvent
    //!!!

    bg.pos = new vec2(0,0)
    bg.setColor(new vec4(100,100,100,255))
    bg.layer = 0

    dialog.anchor = new vec2(0.5,1)
    dialog.setPosLerp(new vec2(0.5,0.5))
    dialog.size = new vec2(100,100)
    dialog.setColor( new vec4(150,150,150,255) )
    dialog.layer = 2


    await ctx.urlImage("./assets/images/character1.png").then( result => {character1.image =  result})
    character1.setColor( new vec4(0,0,0,0))
    character1.anchor = new vec2(0.5,1)
    character1.layer = 1

    await ctx.urlImage("./assets/images/character2.png").then( result => {character2.image =  result})
    character2.setColor( new vec4(0,0,0,0))
    character2.anchor = new vec2(0.5,1)
    character2.layer = 1

    FireEvent("addObject", [character1,character2,dialog,bg])
}

export async function update(ctx,deltaTime,FireEvent) {
    let screenRatio = window.innerWidth / window.innerHeight
    
    bg.size = new vec2(window.innerWidth,window.innerHeight)
    
    dialog.setTextColor( new vec4(0,0,0,255))
    if (InputHandler.isKeyPressed(" ") && !spacepressed) {
        if (dialogOrder < dialogText.length-1) {
            spacepressed = true
            dialogOrder++
            time = 0
        }
    }
    if (spacepressed) {
        if (time > 3 && InputHandler.isKeyPressed(" ")) {
            textspeed = 100
        } else {
            textspeed = 10
        }
        time += deltaTime * textspeed
        if (time > dialogText[dialogOrder].length && !InputHandler.isKeyPressed(" ") ) {
            spacepressed = false
        }
    }
    dialog.text = dialogText[dialogOrder].slice(0,~~(time))

    dialog.textFont = 20 * screenRatio + "px sans-serif"


    dialog.size = new vec2(450 * screenRatio,150 * screenRatio)
    dialog.setPosLerp(new vec2(0.5,1))
    character1.size = new vec2(300 * screenRatio,300 * screenRatio)
    if (dialogOrder > 1 && !(dialogOrder == dialogText.length - 1)) {
        animTime1 += deltaTime
        animTime1 = Math.min(animTime1, 1)
    } else {
        animTime1 -= deltaTime
        animTime1 = Math.max(animTime1,0)
    }
    character1.pos = new vec2(lerp(lerp(0,window.innerWidth,-0.5),lerp(0,window.innerWidth,0.1),easeOutSine(animTime1)),window.innerHeight )
    character2.size = new vec2(350 * screenRatio,350 * screenRatio)
    character2.setPosLerp(new vec2(0.9,1))
    if (dialogOrder > 0 && !(dialogOrder == dialogText.length - 1)) {
        animTime2 += deltaTime
        animTime2 = Math.min(animTime2, 1)
    } else {
        animTime2 -= deltaTime
        animTime2 = Math.max(animTime2,0)
    }
    character2.pos = new vec2(lerp(lerp(0,window.innerWidth,1.5),lerp(0,window.innerWidth,0.9),easeOutSine(animTime2)),window.innerHeight )
}
 
