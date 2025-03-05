class ShogiPiece {
    scale = 0.3;
    constructor(x, y, type) {
        this.backgtound = new text();
        this.backgtound.text = "☗";
        this.backgtound.width = Math.ceil(150*this.scale);
        this.backgtound.height = Math.ceil(150*this.scale);
        this.backgtound.fontColor = "#DACA9E";

        this.backgtound.x = x;
        this.backgtound.y = y;

        this.letter = new text();
        this.letter.text = type;
        this.letter.width = Math.ceil(80*this.scale);
        this.letter.height = Math.ceil(80*this.scale);
        this.letter.parent = this.backgtound;

        this.letter.relativeX = Math.ceil(35*this.scale);
        this.letter.relativeY = Math.ceil(35*this.scale);
        this.letter.fontColor = "#000000";

        this.backgtound.group = this;
        this.letter.group = this;

        this.letter.text = type;

        this.piece = type;
    }
    push_canvas(canvas){
        canvas.add_sprite(this.backgtound);
        canvas.add_sprite(this.letter);
    }

    del_canvas(canvas){
        canvas.del_sprite(this.backgtound);
        canvas.del_sprite(this.letter);
    }
}
class ShogiHandler{
    constructor(canvas){
        this.canvas = canvas;
        this.pieces = [];
    }
    add_piece
}

class Grid extends sprite {
    constructor(x,y,width,height,x_count,y_count){
        super();
        this.x = x;
        this.y = y;
        this.width = width*x_count;
        this.height = height*y_count;
    }
    rendering(){
        this.ctx.fillStyle = "#000000";
        for(let i = 0;i < this.x_count;i++){
            this.ctx.beginPath();
            this.ctx.moveTo(i*this.width,0);
            this.ctx.lineTo(i*this.width,this.y_count*this.height);
            this.ctx.stroke();
        }
        for(let i = 0;i < this.y_count;i++){
            this.ctx.beginPath();
            this.ctx.moveTo(0,i*this.height);
            this.ctx.lineTo(this.x_count*this.width,i*this.height);
            this.ctx.stroke();
        }
    }
    drawline(x,y,x2,y2){
        this.ctx.beginPath();
        this.ctx.moveTo(x,y);
        this.ctx.lineTo(x2,y2);
        this.ctx.stroke();
    }
}