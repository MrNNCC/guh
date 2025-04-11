import { vec2 } from './vec.js';
import { lerp } from './misc.js';
export default class frame {
    constructor(FireEvent = () => {} , initCallback = () => {} , updateCallback = () => {}) {
        this.pos = new vec2(0,0)
        this.size = new vec2(100,100)
        this.layer = 0
        this.color = "#FF000000"
        
        this.anchor = new vec2(0,0)

        //text
        this.text = ""
        this.textColor = ""
        this.textFont = "10px sans-serif"
        this.lineHeight = 24

        //image
        this.image = null

        //logic
        this.init = initCallback
        this.update = updateCallback


        this.FireEvent = FireEvent
        this.Event = (command, args) => {
            switch(command) {
                default:
                    return null
            }
        }
    }
    draw(ctx) {
        ctx.save()
        
        //Rect
        ctx.fillStyle(this.color)

        let x = this.pos.x - this.size.x * this.anchor.x
        let y = this.pos.y - this.size.y * this.anchor.y

        ctx.fillRect(new vec2(x,y),this.size)
        
        //Image
        if (this.image != null) {
            ctx.drawImage(this.image,new vec2(x,y),this.size)
        }

        //Text
        let text = this.text
        let splitted = text.split("\n")
        ctx.font(this.textFont)
        ctx.fillStyle(this.textColor)
        ctx.textAlign("start")
        ctx.textBaseline("middle")


        for (let i = 0;i < splitted.length;i++) {
            ctx.fillText(splitted[i], new vec2(x + this.size.x / 25, (y + this.size.y / 8) + (this.lineHeight * i) ))
        }

        ctx.restore()
    }
    setColor(vec4) {
        let r = vec4.x.toString(16)
        r = vec4.x < 16 ? "0" + r : r 

        let g = vec4.y.toString(16)
        g = vec4.y < 16 ? "0" + g : g 

        let b = vec4.z.toString(16)
        b = vec4.z < 16 ? "0" + b : b 

        let a = vec4.w.toString(16)
        a = vec4.w < 16 ? "0" + a : a 

        this.color = "#" + r + g + b + a
    }
    setTextColor(vec4) {
        let r = vec4.x.toString(16)
        r = vec4.x < 16 ? "0" + r : r 

        let g = vec4.y.toString(16)
        g = vec4.y < 16 ? "0" + g : g 

        let b = vec4.z.toString(16)
        b = vec4.z < 16 ? "0" + b : b 

        let a = vec4.w.toString(16)
        a = vec4.w < 16 ? "0" + a : a 

        this.textColor = "#" + r + g + b + a
    }
    setPosLerp(vec) {
        let x = vec.x
        let y = vec.y
        this.pos = new vec2(lerp(0,window.innerWidth,x),lerp(0,window.innerHeight,y))
        return this.pos
    }
    setSizeLerp(vec) {
        let x = vec.x
        let y = vec.y
        this.size = new vec2(lerp(0,window.innerWidth,x),lerp(0,window.innerHeight,y))
        return this.size
    }
    checkCollision(mouseX, mouseY, camera) { // god bless chat gpt 🙏
        // Преобразуем координаты мыши с учетом камеры
        const transformedMouseX = (mouseX - camera.pos.x) / camera.scale;
        const transformedMouseY = (mouseY - camera.pos.y) / camera.scale;
    
        // Преобразуем позицию объекта с учетом anchorPoint
        const anchorOffsetX = this.size.x * this.anchor.x;
        const anchorOffsetY = this.size.y * this.anchor.y;
    
        // Перерасчитываем фактические координаты объекта
        const adjustedPosX = this.pos.x - anchorOffsetX;
        const adjustedPosY = this.pos.y - anchorOffsetY;
    
        // Проверка, находится ли мышь внутри прямоугольника с учетом anchorPoint
        return  transformedMouseX >= adjustedPosX && 
                transformedMouseX <= adjustedPosX + this.size.x &&
                transformedMouseY >= adjustedPosY && 
                transformedMouseY <= adjustedPosY + this.size.y;
    }
}