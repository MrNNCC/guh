import scene from "./scene.js"
import frame from "./frame.js"
import { vec2, vec3, vec4 } from "./vec.js"
import { exportJson } from "./misc.js"


export default class gameClass {
    constructor(FireEvent) {
        this.canvas = null
        this.scene = null

        this.fpsTarget = 60
        this.interval = 1000 / this.fpsTarget

        this.lastTime = 0

        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight

        this.loadedscene = null

        this.Objects = [this]

        this.FireEvent = FireEvent

        this.Event = (command, args) => {
            switch(command) {
                case "addObject":
                    args.forEach(element => {
                        element.FireEvent = this.FireEvent
                        this.Objects.push(element)
                    });
                default:
                    return null
            }
        }

    }
    resize() {
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight

        this.canvas.height = this.windowHeight
        this.canvas.width = this.windowWidth
    }
    async gameInit(canvas) {
        this.canvas = canvas

        this.scene = new scene()
        this.scene.newCtx(this.canvas)

        //let settings = await exportJson("../settings.json")

        this.loadedscene = await this.scene.loadScene("../scenes/game.js")
        this.loadedscene.init(this.scene.ctx,this.FireEvent)
        this.Objects = [this]
    }

    

    gameTick(currentTime) {
        var deltaTime = (currentTime - this.lastTime) / 1000
        if (currentTime - this.lastTime >= this.interval) {
            this.lastTime = currentTime
    
            this.scene.clear()
            this.resize()

            this.loadedscene.update(this.scene.ctx,deltaTime,this.FireEvent)

            this.scene.renderAllObjects(this.Objects)
        }

       
    }
}
