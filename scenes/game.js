import frame from '../modules/frame.js'
import InputHandlerClass from '../modules/inputHandler.js'
import { easeOutSine, lerp, wait } from '../modules/misc.js'
import { vec2, vec4 } from '../modules/vec.js'

function objLength(obj) {
    return Object.keys(obj).length
}


const InputHandler = new InputHandlerClass()

const bg = new frame()

const dialog = new frame()
var dialogOrder = 0
const dialogText = {
    [0] : {
        speaker : "",
        text : "Розділ 1",
    },
    [1] : {
        speaker : "",
        text : "Розділ 1",
    },
    [2] : {
        speaker : "",
        text : "Вечірнє сонце заливало світлом вузьку вуличку,\nколи Марко та Юрко підійшли до старого будинку\nна краю міста."
    },
    [3] : {
        speaker : "",
        text : "Його фасад був потрісканим, шибки – припалі\nпилом, а колись розкішний сад обріс диким\nвиноградом."
    },
    [4] : {
        speaker : "Марко",
        text : "– Тут нікого не було десятки років."
    },
    [5] : {
        speaker : "",
        text : "Cказав Марко, обережно відчиняючи скрипучі\nдвері."
    },
    [6] : {
        speaker : "",
        text : "Юрко ковзнув поглядом по темних стінах і\nкивнув."
    },
    [7] : {
        speaker : "",
        text : "Вони вирішили дослідити будинок, бо в місті\nходили легенди, що колись тут жив відомий\nмандрівник, який несподівано зник."
    },
    [8] : {
        speaker : "",
        text : "Усередині пахло старим деревом і папером."
    },
    [9] : {
        speaker : "",
        text : "На стінах висіли картини із зображенням\nнезнайомих місцевостей, а у вітальні стояв\nвеликий стіл, завалений книжками та\nпожовклими аркушами."
    },
    [10] : {
        speaker : "",
        text : ""
    },
}

const speakerTitle = new frame()

var spacepressed = false
var textspeed = 10

var time = 0

const character1 = new frame()
var animTime1 = 0

const character2 = new frame()
var animTime2 = 0

export async function init(ctx,FireEvent) {
    await wait()
    FireEvent("addObject", [character1,character2,dialog,bg,speakerTitle])
    // //!!!
    // bg.FireEvent = FireEvent
    // dialog.FireEvent = FireEvent
    // character1.FireEvent = FireEvent
    // character2.FireEvent = FireEvent
    // //!!!

    bg.pos = new vec2(0,0)
    bg.setColor(new vec4(100,100,100,255))
    bg.layer = 0

    dialog.anchor = new vec2(0.5,1)
    dialog.setPosLerp(new vec2(0.5,0.5))
    dialog.size = new vec2(100,100)
    dialog.setColor( new vec4(125,125,125,255) )
    dialog.layer = 2

    speakerTitle.anchor = new vec2(0,1)
    speakerTitle.layer = 99
    speakerTitle.setColor(new vec4(255,255,255,255))

    await ctx.urlImage("./assets/images/character1.png").then( result => {character1.image =  result})
    character1.setColor( new vec4(0,0,0,0))
    character1.anchor = new vec2(0.5,1)
    character1.layer = 1

    await ctx.urlImage("./assets/images/character2.png").then( result => {character2.image =  result})
    character2.setColor( new vec4(0,0,0,0))
    character2.anchor = new vec2(0.5,1)
    character2.layer = 1

    
}

export async function update(ctx,deltaTime,FireEvent) {
    let screenRatio = window.innerWidth / window.innerHeight
    
    bg.size = new vec2(window.innerWidth,window.innerHeight)
    
    dialog.setTextColor( new vec4(0,0,0,255))
    if ((InputHandler.isKeyPressed(" ") || InputHandler.mouseLeftButton) && !spacepressed) {
        if (dialogOrder < objLength(dialogText)-1) {
            spacepressed = true
            dialogOrder++
            time = 0
        }
    }
    if (spacepressed) {
        if (time > 3 && (InputHandler.isKeyPressed(" ") || InputHandler.mouseLeftButton)) {
            textspeed = 100
        } else {
            textspeed = 10
        }
        time += deltaTime * textspeed
        if (time > dialogText[dialogOrder].text.length && !(InputHandler.isKeyPressed(" ") || InputHandler.mouseLeftButton) ) {
            spacepressed = false
        }
    }
    dialog.text = dialogText[dialogOrder].text.slice(0,~~(time))
    dialog.textFont = 20 * screenRatio + "px monserrat"
    dialog.lineHeight = 24 * screenRatio

    dialog.size = new vec2(450 * screenRatio,150 * screenRatio)
    dialog.setPosLerp(new vec2(0.5,1))

    character1.size = new vec2(300 * screenRatio,300 * screenRatio)
    if (dialogOrder > 1 && !(dialogOrder == objLength(dialogText) - 1)) {
        animTime1 += deltaTime
        animTime1 = Math.min(animTime1, 1)
    } else {
        animTime1 -= deltaTime
        animTime1 = Math.max(animTime1,0)
    }
    character1.pos = new vec2(lerp(lerp(0,window.innerWidth,-0.5),lerp(0,window.innerWidth,0.1),easeOutSine(animTime1)),window.innerHeight )
    character2.size = new vec2(350 * screenRatio,350 * screenRatio)
    character2.setPosLerp(new vec2(0.9,1))
    if (dialogOrder > 0 && !(dialogOrder == objLength(dialogText) - 1)) {
        animTime2 += deltaTime
        animTime2 = Math.min(animTime2, 1)
    } else {
        animTime2 -= deltaTime
        animTime2 = Math.max(animTime2,0)
    }
    character2.pos = new vec2(lerp(lerp(0,window.innerWidth,1.5),lerp(0,window.innerWidth,0.9),easeOutSine(animTime2)),window.innerHeight )

    speakerTitle.pos = new vec2(dialog.pos.x - (200 * screenRatio), dialog.pos.y - (150 * screenRatio) )
    speakerTitle.size = new vec2(250*screenRatio,30*screenRatio)
    speakerTitle.text = dialogText[dialogOrder].speaker
    speakerTitle.setTextColor(new vec4(0,0,0,255))
    speakerTitle.textFont = 10 * screenRatio +"px monserrat"
}
 
