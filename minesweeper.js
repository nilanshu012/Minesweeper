var board=[];
var row=8;
var col=8;

var minesCount=10;
var minesLocation=[];

var cellsClicked=0;
var flag=false;

var gameOver=false;

window.onload=function(){
    start();
}

function start(){
    
    setMines();
    document.getElementById("mines_count").innerText=minesCount;
    document.getElementById("flag_btn").addEventListener("click",toggleFlag);
    for(let r=0;r<row;r++)
    {
        let row=[];
        for(let c=0;c<col;c++)
        {
            let cell=document.createElement("div");
            cell.id= r+"-"+c;
            cell.addEventListener("click",cellClicked)
            document.getElementById("board").append(cell);
            row.push(cell);
        }
        board.push(row);
    }
    console.log(board);
}

function setMines(){
    
    let minesRem=minesCount;
    while(minesRem>0)
    {
        let r= Math.floor(Math.random()*row);
        let c= Math.floor(Math.random()*col);
        let id= r.toString()+"-"+c.toString();
        if(!minesLocation.includes(id)){
            minesLocation.push(id);
            minesRem-=1;
        }
    }
    // minesLocation.push("2-2");
    // minesLocation.push("2-3");
    // minesLocation.push("5-6");
    // minesLocation.push("3-4");
    // minesLocation.push("1-1");

}

function toggleFlag(){
    if(flag)
    {
        flag=false;
        document.getElementById("flag_btn").style.backgroundColor="lightgrey";
    }
    else
    {
        flag=true;
        document.getElementById("flag_btn").style.backgroundColor="darkgrey";
    }
}

function cellClicked(){

    let cell=this;
    if(gameOver || cell.classList.contains("cell_clicked"))
        return;
    if(flag)
    {
        if(cell.innerText==""){
            cell.innerText="🚩";
           // minesCount-=1;
        }
            
        else if(cell.innerText=="🚩"){
            cell.innerText="";
          //  minesCount+=1;
        }
            
       // document.getElementById("mines_count").innerText=minesCount;
        return;
    }

    if(minesLocation.includes(cell.id))
    {
        gameOver=true;
        showMines();
        return;
    }

    
    let r=cell.id.slice(0,1);
    let c=cell.id.slice(2,3);
    r=parseInt(r);
    c=parseInt(c);
    // console.log("r="+r+"  c="+c);
    checkMines(r,c);

}

function showMines(){
    for(let r=0;r<row;r++)
    {
        for(let c=0;c<col;c++)
        {
            let cell=board[r][c];
            if(minesLocation.includes(cell.id)){
                cell.innerText="💣";
                cell.style.backgroundColor="red";
            }
        }
        
    }
}

function checkMines(r,c){

    if(r<0 || r>=row || c<0 ||  c>=col)
        return ;

    if(board[r][c].classList.contains("cell_clicked"))
        return;

    board[r][c].classList.add("cell_clicked");
    board[r][c].style.backgroundColor="darkgrey";
    cellsClicked+=1;
    let count=0;
    
    count+=checkCell(r-1,c-1);
    count+=checkCell(r-1,c);
    count+=checkCell(r-1,c+1);
    count+=checkCell(r,c+1);
    count+=checkCell(r,c-1);
    count+=checkCell(r+1,c-1);
    count+=checkCell(r+1,c);
    count+=checkCell(r+1,c+1);

    if(count>0)
    {
        board[r][c].innerText=count;
        board[r][c].classList.add("m"+count.toString());
    }
    else
    {
        checkMines(r-1,c-1);
        checkMines(r-1,c);
        checkMines(r-1,c+1);
        checkMines(r,c-1);
        checkMines(r,c+1);
        checkMines(r+1,c-1);
        checkMines(r+1,c);
        checkMines(r+1,c+1);
    }

    if(cellsClicked== row*col-minesCount)
    {
        document.getElementsByTagName("h2")[0].innerText="All Mines Cleared!";
        gameOver=true;
        //showMines();
    }
}

function checkCell(r,c){
    if(r<0 || r>=row || c<0 ||  c>=col)
        return 0;
    // console.log(r.toString()+"-"+c.toString());
    if(minesLocation.includes(r+"-"+c))
        return 1;
    return 0;
}