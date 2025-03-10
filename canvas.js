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
        canvas.ctx.clearRect(0,0,canvas.dom.width,canvas.dom.height);
        //描画したかどうかを記録する変数を初期化
        for(let i = 0;i < canvas.sprites.length;i++)
            canvas.sprites[i]._drawed_flag = false;
        
        for(let i = 0;i < canvas.sprites.length;i++){
            let _sprite = canvas.sprites[i];
            canvas.drawing(_sprite);
        }

        //最後に描画されたスプライトが一番上に来るように、配列を反転させる
        canvas._hitbox.reverse();
        canvas.hitbox = canvas._hitbox;
        canvas._hitbox = [];
        requestAnimationFrame(canvas.frame);
    },
    add_sprite: function(sprite) {
        canvas.sprites.push(sprite);
    },
    del_sprite: function(sprite) {
        canvas.sprites.splice(canvas.sprites.indexOf(sprite),1);
    },
    /**
     * x,yの一番上にスプライトを返す
     */
    getSpriteFromLocation(x,y){
        for(let i = 0;i < canvas.hitbox.length;i++){
            //x,yがスプライト内にあるかを判定
            let _box = canvas.hitbox[i];
            if(
                _box.x <= x && x <= _box.x + _box.width &&
                _box.y <= y && y <= _box.y + _box.height                
            ){
                //枠内にあった
                return  _box.sprite;
            }
        }
    }
}
let eventlist = ['click'];
//クリックイベント処理
for(let i = 0;i < eventlist.length;i++){
    canvas.dom.addEventListener(eventlist[i],function(e){
        // キャンバスの位置を取得
        const rect = canvas.dom.getBoundingClientRect();

        // クリックされた位置の相対座標を計算
        const x = e.clientX - rect.left;  // キャンバスの左端からの距離
        const y = e.clientY - rect.top;   // キャンバスの上端からの距離

        let sprite = canvas.getSpriteFromLocation(x,y);
        if(sprite == null) return;


        let event = {
            'pointX': x,
            'pointY': y
        };

        //eventの値に対してスプライトの種類固有の処理をする
        event = sprite.eventData(event);

        sprite.event[eventlist[i]](event);
    })
}
