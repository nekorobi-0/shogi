/**
 * スプライトの定義
 */
class sprite {
    width = 200;
    height = 100;
    x = 0;
    y = 0;
    //すでに描画されたかどうか
    _drawed_flag = false;

    //当たり判定の有無
    hitbox = true;

    /**
     * 相対座標
     * parentにspriteが代入された時、レンダリング時に親要素の座標と、下にて設定する相対座標を元に上の絶対座標を
     * 算出。
     */
    parent = null;//親スプライト(代入すると上の絶対座標は、レンダリング時に決定されるようになる)
    relativeX = 0;//相対座標(X) parentがnullの時は無視される
    relativeY = 0;//相対座標(Y) 仕様はrelativeX同様。

    //スプライト表示時にスプライトの画像を再生成するかどうか
    rerendering_flag = true;

    //画像を描いていくキャンバス
    offscreen = new OffscreenCanvas(1,1);
    ctx = this.offscreen.getContext("2d");

    //画像を生成する
    rendering(){
        this.offscreen = new OffscreenCanvas(this.width, this.height);
        this.ctx = this.offscreen.getContext("2d");
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
        this.ctx.save(); // 現在のコンテキスト状態を保存

        // スプライトサイズに合わせるスケールを計算
        let textMetrics = this.ctx.measureText(this.text);
        let scaleX = this.width / textMetrics.width;
        let scaleY = this.height / (this.fontSize);
    
        // スプライトの中心に合わせてスケール
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.scale(scaleX, scaleY);
        this.ctx.translate(-this.width / 2, -this.height / 2);
    
        // テキストを描画
        this.ctx.font = `${this.fontSize} ${this.fontFamily}`; // 基本の大きめフォント（スケールするので適当）
        this.ctx.fillStyle = this.fontColor;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.text, this.width / 2, this.height / 2);
    
        this.ctx.restore(); // 変形をリセット
    }
}