class ShogiPiece {
    constructor(x, y, type) {
        this.backgtound = new text();
        this.backgtound.text = "☗";
        this.backgtound.width = 150
        this.backgtound.height = 150
        this.backgtound.fontColor = "#DACA9E";

        this.backgtound.x = x;
        this.backgtound.y = y;

        this.letter = new text();
        this.letter.text = type;
        this.letter.width = 80
        this.letter.height = 80
        this.letter.parent = this.backgtound;

        this.letter.relativeX = 35;
        this.letter.relativeY = 35;
        this.letter.fontColor = "#000000";

        this.letter.text = type;

        this.piece = type;
    }
    push_canvas(canvas){
        canvas.add_sprite(this.backgtound);
        canvas.add_sprite(this.letter);
    }
}