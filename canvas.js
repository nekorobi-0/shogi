/**
 * Canvasの大きさの設定
 * スプライトの描画
 * スプライトの当たり判定
 */
let canvas = {
    sprites: [],
    /**
     * canvasの再描画
     */
    frame: function(){
        
        requestAnimationFrame(this.frame);
    }
}