DEFAULTHALFSHOGIBOARD = [
    [1,1,1,1,1,1,1,1,1]
    [0,2,0,0,0,0,0,3,0]
    [4,5,6,7,8,7,6,5,4]
]
SHOGIPIECECONVTABLE = {
    1: "歩",
    2: "角",
    3:"飛",
    4: "香",
    5: "桂",
    6: "銀",
    7: "金",
    8: "王",
    9: "玉",
    11: "と",
    12: "馬",
    13: "竜",
    14: "杏	",
    15: "圭",
    16: "全"
}
class ShogiPiece {
    scale = 0.3;
    constructor(x, y, id) {
        this.backgtound = new text();
        this.backgtound.text = "☗";
        this.backgtound.width = Math.ceil(150*this.scale);
        this.backgtound.height = Math.ceil(150*this.scale);
        this.backgtound.fontColor = "#DACA9E";

        this.backgtound.x = x;
        this.backgtound.y = y;

        this.letter = new text();
        this.letter.text = SHOGIPIECECONVTABLE[id];
        this.letter.width = Math.ceil(80*this.scale);
        this.letter.height = Math.ceil(80*this.scale);
        this.letter.parent = this.backgtound;

        this.letter.relativeX = Math.ceil(35*this.scale);
        this.letter.relativeY = Math.ceil(35*this.scale);
        this.letter.fontColor = "#000000";

        this.backgtound.group = this;
        this.letter.group = this;


        this.id = id
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
        this.width_per_grid = width;
        this.height_per_grid = height;
        this.width = width*x_count;
        this.height = height*y_count;
    }
    rendering(){
        super.rendering();
        this.ctx.save();
        this.ctx.fillStyle = "#FF0000";
        this.ctx.lineWidth = 3;
        for(let i = 0;i < this.x_count;i++){
            this.drawline(i*this.width_per_grid,0,i*this.width_per_grid,this.height);
        }
        for(let i = 0;i < this.y_count;i++){
            this.drawline(0,i*this.height_per_grid,this.width,i*this.height_per_grid);
        }
        this.ctx.restore();
    }
    drawline(x,y,x2,y2){
        this.ctx.rect(this.x+x,this.y+y,x2-x,y2-y);
        this.ctx.stroke();

        return;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+x,this.y+y);
        this.ctx.lineTo(this.x+x2,this.y+y2);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    push_canvas(canvas){
        canvas.add_sprite(this);
    }
}