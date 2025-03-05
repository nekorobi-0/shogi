/**
 * Canvasの大きさの設定
 * スプライトの描画
 * スプライトの当たり判定
 */
function update_canvas() {
    let canvas = document.getElementsByTagName("canvas")[0]
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
update_canvas()
window.addEventListener("resize", update_canvas);
/**
 * 
 * 都合上、子スプライトが描画されると、親スプライトも描画されるようにする
 */
let canvas = {
    /**
     * 当たり判定
     * [sprite,x,y,width,height]
     * 0に近いほど優先
     * 
     * 補足:描画される順番はspritesの順通りとは限らないから、配列spritesでは当たり判定がうまくいかない場合がある
     */
    hitbox: [],
    _hitbox: [], //描画が完了次第hitboxに反映させる。 
    dom: document.getElementsByTagName("canvas")[0],
    ctx: document.getElementsByTagName("canvas")[0].getContext("2d"),
    //sprites: 表示する順にidを配置する インデックスが小さい方が先に表示される。つまり背面に配置される。
    sprites: [],
    addSpriteList: function(id, sprite) {
        
    },
    /**
     * canvasの再描画
     */

    drawing: function(sprite) {
        if(sprite == null) return;
        //すでに描画されているならばスキップ
        if(sprite._drawed_flag)return;
        sprite._drawed_flag = true;

        //もし再描画が有効であればスプライトを再描画
        if(sprite.rerendering_flag) sprite.rendering();

        //もし親スプライトが設定されていたら、親スプライトを描画して、その親スプライトの座標をもとに絶対座標を計算
        if(sprite.parent != null) {
            canvas.drawing(sprite.parent);
            sprite.x = sprite.parent.x + sprite.relativeX;
            sprite.y = sprite.parent.y + sprite.relativeX;
        }

        canvas.ctx.drawImage(sprite.offscreen, sprite.x, sprite.y,sprite.width,sprite.height);

        
        //当たり判定の記述
        if(sprite.hitbox) {
            this._hitbox.push({"sprite": sprite,"x": sprite.x,"y": sprite.y,"width": sprite.width,"height": sprite.height});
        }
        

    },
    frame: function(){
        canvas.ctx.clearRect(0,0,canvas.width,canvas.height);
        //描画したかどうかを記録する変数を初期化
        for(let i = 0;i < canvas.sprites.length;i++)
            canvas.sprites[i]._drawed_flag = false;
        
        for(let i = 0;i < canvas.sprites.length;i++){
            let _sprite = canvas.sprites[i];
            canvas.drawing(_sprite);
        }
        this.hitbox = this._hitbox;
        this._hitbox = [];
        requestAnimationFrame(canvas.frame);
    },
    add_sprite: function(sprite) {
        canvas.sprites.push(sprite);
    }
}