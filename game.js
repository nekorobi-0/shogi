selectX = null;
selectY = null

stage.event.click = function(e){

    let x = e.gridX;
    let y = e.gridY;

    if(selectX == null || selectY == null){
        selectX = x;
        selectY = y;
        manager.board[y][x].background.fontColor = 'orange'
    }else{
        manager.board[selectY][selectX].background.fontColor = '#DACA9E'
        let flag = manager.move(selectY,selectX,y,x)
        console.log(selectY,selectX,y,x)
        
        selectX = null;
        selectY = null;
        
    }
    console.log(x,y);
}