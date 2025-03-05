const DEFAULTHALFSHOGIBOARD = [
    [1,1,1,1,1,1,1,1,1],
    [0,2,0,0,0,0,0,3,0],
    [4,5,6,7,8,7,6,5,4]
]
const SHOGIPIECECONVTABLE = {
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
    constructor(x, y, id,side=false) {
        this.rotate = side?Math.PI:0;
        this.backgtound = new text();
        this.backgtound.text = "☗";
        this.backgtound.width = Math.ceil(150*this.scale);
        this.backgtound.height = Math.ceil(150*this.scale);
        this.backgtound.fontColor = "#DACA9E";
        this.backgtound.rotate = this.rotate;

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
        this.letter.rotate = this.rotate;

        this.backgtound.group = this;
        this.letter.group = this;


        this.id = id
        this.side = side;
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
class ShogiManager {
    constructor(canvas){
        this.canvas = canvas;
        this.pieces = [];
        this.board = []
        for (let i = 0; i < 9; i++) {
            this.board.push([])
            for (let j = 0; j < 9; j++) {
                let pos = this.conv_to_pos(i,j);
                let x = pos[0];
                let y = pos[1];
                if (i < 3){
                    if (DEFAULTHALFSHOGIBOARD[2-i][8-j] != 0){
                        this.board[i].push(new ShogiPiece(x,y,DEFAULTHALFSHOGIBOARD[2-i][8-j],true));
                        continue;
                    }
                }else if (i > 5){
                    if (DEFAULTHALFSHOGIBOARD[i-6][j] != 0){
                        this.board[i].push(new ShogiPiece(x,y,DEFAULTHALFSHOGIBOARD[i-6][j],false));
                        continue;
                    }
                }else{
                    this.board[i].push(null);
                }
            }
        }
    }
    conv_to_pos(x,y){
        return [y*45+20,x*45+20]
    }
    push_canvas(){
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j] != null){
                    this.board[i][j].push_canvas(this.canvas);
                }
            }
        }
    }
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