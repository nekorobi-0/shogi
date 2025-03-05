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
    canmove(x,y,id = null){
        switch(id==null?this.id:id){
            case 1:
                if(x=1 && y==0){
                    return true;
                }
                break;
            case 2:
                if (Math.abs(x) == Math.abs(y)&&x!=0) {
                    return true;
                }
                break;
            case 3:
                if ((x!=0||y!=0)&&x*y!=0) {
                    return true;
                }
                break;
            case 4:
                if (x==0&&y>0) {
                    return true;
                }
                break;
            case 5:
                if (Math.abs(x)==1&&y==2) {
                    return true;
                }
                break;
            case 6:
                if ((Math.abs(x)==Math.abs(y)&&Math.abs(y)==1)||(x==1&&y==1)) {
                    return true;
                }
                break;
            case 7:
            case 11:
            case 14:
            case 15:
            case 16:
                if ((x*y==0&&Math.abs(x)+Math.abs(y)>0)|| Math.abs(x)*y==1){
                    return true;
                }
                break;
            case 8:
            case 9:
                if (x^2+y^2<=2) {
                    return true;
                }
                break;
            case 12:
                return this.canmove(x,y,7)||this.canmove(x,y,2);
            case 13:
                return this.canmove(x,y,7)||this.canmove(x,y,3);
        }
        return false;
    }
    set_pos(x,y){
        this.backgtound.x = x;
        this.backgtound.y = y;
        this.resetisdrawed();
    }
    resetisdrawed(){
        this.backgtound._drawed_flag = false;
        this.letter._drawed_flag = false;
    }
}
class ShogiManager {
    constructor(canvas){
        this.inventory = {false: [], true: []};
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
    move(x,y,x2,y2){
        let piece = this.board[x][y];
        if (piece == null){
            return false;
        }
        if (piece.canmove(x2-x,y2-y)){
            if ((x2-x)^2+(y2-y)^2>=2){
                let max = Math.max(Math.abs(x2-x),Math.abs(y2-y));
                for (let i = 0; i < max-1; i++) {
                    if(this.board[x+Math.floor((x2-x)/max)*i][y+Math.floor((y2-y)/max)*i] != null){
                        return false;
                    }
                }
            }
            if (this.board[x2][y2] != null){
                this.inventory[side].push(this.board[x2][y2]);
            }
            this.board[x2][y2] = piece;
            this.board[x][y] = null;
            let pos = this.conv_to_pos(x,y);
            piece.set_pos(pos[0],pos[1]);
            this.reqire_rendering();
            return true;
        }
        return false;
    }
    reqire_rendering(){
        this.canvas.frame()
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