/**
 * スプライトの定義
 */
class sprite {
    width = 0;
    height = 0;
    x = 0;
    y = 0;
    
    //スプライト表示時にスプライトの画像を再生成するかどうか
    rerendering_flag = false;

    //画像を描いていくキャンバス
    offscreen = new OffscreenCanvas(0,0);
    ctx = this.offscreen.getContext("2d");

    //画像を生成する
    rendering(){
        this.offscreen = new OffscreenCanvas(this.width, this.height);
        this.ctx = this.offscreen.getContext("2D");
    }
    event = {
        click: function(){}
    }
}