import ctxClass from "./ctx.js"
import { vec2 , vec3 } from "./vec.js"
import frame from "./frame.js"

export default class scene {
    constructor() {
        this.ctx = null

        this.bg = new frame()
        this.bg.pos = new vec2(0,0)
        this.bg.size = new vec2(window.innerWidth, window.innerHeight)

        this.selectedScene = null
        
    }
    newCtx(canvas) {
        this.ctx = new ctxClass(canvas.getContext("2d"))
        return this.ctx
    }
    drawBg(ctx) {
        this.bg.draw(ctx)
    }
    getCtx() {
        return this.ctx
    }
    clear() {
        this.ctx.clearRect(new vec2(0,0),new vec2(window.innerWidth,window.innerHeight))
    }
    async loadScene(path) {
        let scene = await import(path).then(module => {return module})
        this.selectedScene = scene
        return scene
    }
    updateAllObjects(lst) {
        if (lst.length == 0) return
        lst.forEach(item => item.Update())
    }

    renderAllObjects(lst) {
        if (lst.length == 0) return
        lst.sort((a , b) => a.layer - b.layer)
        lst.forEach((item) => {
            if (item instanceof frame) {
                item.draw(this.ctx)
            }
        })
    }
}