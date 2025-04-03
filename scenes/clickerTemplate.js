import frame from "../modules/frame.js"
import { wait } from "../modules/misc.js"
import { vec2, vec4 } from "../modules/vec.js"
import InputHandlerClass from "../modules/inputHandler.js"

var inputHandler = new InputHandlerClass()

var bg = new frame()
var dialog = new frame()
var moneybar = new frame()

var cursorX, cursorY

var Camera = 
{
    pos : new vec2(0,0), 
    scale : 1
}

var money = 0

var leftmousebuttonDB = false

export async function init(ctx,FireEvent) {
    //background
    bg.pos = new vec2(0,0)
    bg.size = new vec2(window.innerWidth, window.innerHeight)
    bg.color = new vec4(0,0,0,0)
    bg.layer = 0
    bg.image = await ctx.urlImage("../assets/images/bg.png").then(result => {return result})

    //dialog
    dialog.size = new vec2(100,100)
    dialog.layer = 1
    dialog.image = await ctx.urlImage("../assets/images/nlo.png").then(result => {return result})

    //moneyBar
    moneybar.pos = new vec2(0,0)
    moneybar.anchor = new vec2(0.5,0)
    moneybar.setSizeLerp(new vec2(1,0.15))
    moneybar.layer = 3
    moneybar.setColor(new vec4(0,0,0,0)) 

    FireEvent("addObject",[bg,dialog,moneybar])
}

export async function update(ctx,deltaTime,FireEvent) {
    cursorX = inputHandler.cursorX
    cursorY = inputHandler.cursorY

    dialog.setPosLerp(new vec2(0.5,0.5))
    dialog.pos = dialog.pos.add(new vec2(-(dialog.size.x / 2), -(dialog.size.y / 2)))

    moneybar.text = "money : " + money
    moneybar.textFont = "50px sans-serif"
    moneybar.setTextColor(new vec4(0,0,0,255))
    moneybar.setPosLerp(new vec2(0,0))
    moneybar.setSizeLerp(new vec2(1,0.15))

    bg.size = new vec2(window.innerWidth, window.innerHeight)
    if (dialog.checkCollision(cursorX,cursorY,Camera) && inputHandler.mouseLeftButton && !leftmousebuttonDB) {
        money += 1
        leftmousebuttonDB = true
    }
    if (leftmousebuttonDB && !inputHandler.mouseLeftButton) leftmousebuttonDB = false
}
