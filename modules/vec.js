export class vec2 {
    constructor(x,y) {
        this.x = x
        this.y = y
    }
    add(vec) {
        return new vec2(this.x + vec.x, this.y + vec.y)
    }
}

export class vec3 {
    constructor(x,y,z) {
        this.x = x
        this.y = y
        this.z = z
    }
    add(vec) {
        return new vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z)
    }
}

export class vec4 {
    constructor(x,y,z,w) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }
    add(vec) {
        return new vec4(this.x + vec.x, this.y + vec.y, this.z + vec.z, this.w + vec.w)
    }
}