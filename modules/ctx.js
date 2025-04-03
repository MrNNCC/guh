export default class ctxClass {
    constructor(ctx) {
        this.ctx = ctx
    }
    clearRect(pos,size) {
        let x = pos.x , y = pos.y , w = size.x , h = size.y 
        return this.ctx.clearRect(x,y,w,h)
    }
    fillStyle(color) {
        this.ctx.fillStyle = color
    }
    fillRect(pos, size) {
        let x = pos.x , y = pos.y , w = size.x , h = size.y 
        return this.ctx.fillRect(x,y,w,h)
    }
    // image
    urlImage(url) {
        return new Promise( (resolve, reject) => {
            let img = new Image()
            img.crossOrigin = "Anonymous"
            
            img.onload = () => {
                resolve(img)
            }
    
            img.onerror = (msg) => {
                reject(msg)
            }
    
            img.src = url
        })

    }

    drawImage(img,pos,size) {
        let x = pos.x , y = pos.y , w = size.x , h = size.y 
        return this.ctx.drawImage(img,x,y,w,h)
    }
    getImageData(pos,size) {
        let x = pos.x , y = pos.y , w = size.x , h = size.y 
        return this.ctx.getImageData(x,y,w,h)
    }

    //text
    font(style) {
        this.ctx.font = style
    }
    fillText(text,vec) {
        let x = vec.x , y = vec.y
        this.ctx.fillText(text,x,y)
    }
    textAlign(style) {
        this.ctx.textAlign = style
    }
    textBaseline(style) {
        this.ctx.textBaseline = style
    }

    //saving restoring
    save() {
        this.ctx.save()
    }
    restore() {
        this.ctx.restore()
    }
}