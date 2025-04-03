export default class InputHandlerClass {
    constructor() {
        this.keys = new Set();
        this.cursorX = 0;
        this.cursorY = 0;
        this.mouseLeftButton = false
        this.canvas = document.getElementById("viewport")
        window.addEventListener('keydown', (event) => {
            this.keys.add(event.key.toLowerCase());
        });

        window.addEventListener('keyup', (event) => {
            this.keys.delete(event.key.toLowerCase());
        });

        this.canvas.addEventListener('mousemove', (event) => {
            this.cursorX = event.clientX // (this.canvas.width / 640) //- event.target.getBoundingClientRect().left;
            this.cursorY = event.clientY // (this.canvas.height / 360)//- event.target.getBoundingClientRect().top;
        });
        this.canvas.addEventListener('mousedown', (event) => {
            this.mouseLeftButton = true
        })
        this.canvas.addEventListener('mouseup', (event) => {
            this.mouseLeftButton = false
        })
    }

    isKeyPressed(key) {
        return this.keys.has(key);
    }
}