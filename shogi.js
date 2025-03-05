class ShogiPiece extends Sprite {
    constructor(x, y, type) {
        super(x, y, 100, 100);
        this.piece = type;
    }
}