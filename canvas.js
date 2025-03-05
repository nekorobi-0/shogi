/**
 * Canvasの大きさの設定
 * スプライトの描画
 * スプライトの当たり判定
 */
/**
 * 
 * 都合上、子スプライトが描画されると、親スプライトも描画されるようにする
 */
let canvas = {
    dom: document.getElementsByTagName("canvas")[0],
    ctx: document.getElementsByTagName("canvas")[0].getContext("2d"),
    //sprites: 表示する順にidを配置する インデックスが小さい方が先に表示される。つまり背面に配置される。
    sprites: [],
    sprites_list: {},//スプライトとidを紐付け
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


    },
    frame: function(){
        canvas.ctx.clearRect(0,0,1920,1440);
        //描画したかどうかを記録する変数を初期化
        for(let i = 0;i < canvas.sprites.length;i++)
            canvas.sprites_list[canvas.sprites[i]]._drawed_flag = false;
        
        for(let i = 0;i < canvas.sprites.length;i++){
            let _sprite = canvas.sprites_list[canvas.sprites[i]];
            canvas.drawing(_sprite);
        }
        requestAnimationFrame(canvas.frame);
    }
}