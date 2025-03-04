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
        //すでに描画されているならばスキップ
        if(sprite._drawed_flag)return;

        sprite._drawed_flag = true;

        //もし再描画が有効であればスプライトを再描画
        if(sprite.rerendering_flag) sprite.rendering();

        //もし親スプライトが設定されていたら、親スプライトを描画して、その親スプライトの座標をもとに絶対座標を計算
        if(sprite.parent != null) {
            this.drawing(sprite.parent);
            sprite.x = sprite.parent.x + sprite.relativeX;
            sprite.y = sprite.parent.x + sprite.relativeX;
            sprite.rotation = sprite.parent.rotation + sprite.relativeRotation;
        }

        //canvas1→貼り付け先

        // canvas2を回転してcanvas1に描画
        canvas.ctx.save();  // 現在の状態を保存

        // canvas2の中央を基準に回転
        canvas.ctx.translate(canvas.dom.width / 2, canvas.dom.height / 2);  // canvas1の中央に移動
        canvas.ctx.rotate(sprite.rotate); 

        // 回転後、canvas2をcanvas1に描画（中心を合わせる）
        canvas.ctx.drawImage(sprite.offscreen, -sprite.offscreen.width / 2, -sprite.offscreen.height / 2);

        canvas.ctx.restore();  // 状態を元に戻す


    },
    frame: function(){
        //描画したかどうかを記録する変数を初期化
        for(let i = 0;i < this.sprites.length;i++)
            this.sprites_list[this.sprites[i]]._drawed_flag = false;
        
        for(let i = 0;i < this.sprites.length;i++){
            let _sprite = this.sprites[i];
        }
        requestAnimationFrame(this.frame);
    }
}