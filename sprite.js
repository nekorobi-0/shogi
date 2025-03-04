/**
 * スプライトの定義
 */
class sprite {
    width = 0;
    height = 0;
    x = 0;
    y = 0;
    rotation = 0;//弧度法
    //すでに描画されたかどうか
    _drawed_flag = false;

    /**
     * 相対座標
     * parentにspriteが代入された時、レンダリング時に親要素の座標と、下にて設定する相対座標を元に上の絶対座標を
     * 算出。
     */
    parent = null;//親スプライト(代入すると上の絶対座標は、レンダリング時に決定されるようになる)
    relativeX = 0;//相対座標(X) parentがnullの時は無視される
    relativeY = 0;//相対座標(Y) 仕様はrelativeX同様。
    relativeRotation = 0;
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
/**
 * テキストを描画するスプライト
 */
class text extends sprite {
    fontFamily = "Arial"; //フォントの定義はCSSで可能
    fontSize = 12; //単位はpx
    fontColor = "black";
    text = "label"; //表示されるテキストである。初期値をlabelしたのは気分である。
    
    //親クラスにて指定された幅、高さにテキストの大きさが合うようにして描画
    rendering() {
        super.rendering();
        ctx.save(); // 現在のコンテキスト状態を保存

        // スプライトサイズに合わせるスケールを計算
        let textMetrics = ctx.measureText(text);
        let scaleX = spriteWidth / textMetrics.width;
        let scaleY = spriteHeight / (spriteHeight * 0.8);
    
        // スプライトの中心に合わせてスケール
        ctx.translate(spriteWidth / 2, spriteHeight / 2);
        ctx.scale(scaleX, scaleY);
        ctx.translate(-spriteWidth / 2, -spriteHeight / 2);
    
        // テキストを描画
        ctx.font = `${this.fontSize} ${this.fontFamily}`; // 基本の大きめフォント（スケールするので適当）
        ctx.fillStyle = this.fontColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, spriteWidth / 2, spriteHeight / 2);
    
        ctx.restore(); // 変形をリセット
    }
}