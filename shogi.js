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