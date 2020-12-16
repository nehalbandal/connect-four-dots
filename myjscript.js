// ask player name & assign colors to each player

var table = $('table tr')

function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

// get & change color of chip accordingly

function changeColor(rowIdx, colIdx, color){
    return table.eq(rowIdx).find('td').eq(colIdx).find('button').css('background-color', color)
}

function getColor(rowIdx, colIdx){
    return table.eq(rowIdx).find('td').eq(colIdx).find('button').css('background-color')
}

// pick out bottom most available chip in selected row

function checkBottom(colIdx){
    var colorReport = getColor(5, colIdx);
    for(var row=5; row > -1; row--){
        colorReport=getColor(row, colIdx);
        console.log("colorReport "+colorReport);
        if(colorReport==='rgb(128, 128, 128)')
            return row
    }

}

// check for horizontal, verticle, diagonal connects
// Check to see if 4 inputs are the same color
function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck(){
    for(var row=0; row<6; row++){
        for(var col=0; col<4; col++){
            if(colorMatchCheck(getColor(row, col), getColor(row, col+1), getColor(row, col+2), getColor(row, col+3))){
                console.log('Horizontal Match');
                reportWin(row, col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

function verticalWinCheck(){
    for(var col=0; col<7; col++){
        for(var row=0; row<3; row++){
            if(colorMatchCheck(getColor(row, col), getColor(row+1, col), getColor(row+2, col), getColor(row+3, col))){
                console.log('Verticle Match');
                reportWin(row, col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

function diagonalWinCheck(){
    for(var col=0; col<7; col++){
        for(var row=0; row<3; row++){
            if(colorMatchCheck(getColor(row, col), getColor(row+1, col+1), getColor(row+2, col+2), getColor(row+3, col+3))){
                console.log('Diagonal Match');
                reportWin(row, col);
                return true;
            }
            else if(colorMatchCheck(getColor(row, col), getColor(row-1, col+1), getColor(row-2, col+2), getColor(row-3, col+3))){
                console.log('Diagonal Match');
                reportWin(row, col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

// game logic
// Start with Player One
function startGame(){
    var player1 = prompt("Player One: Enter Your Name , you will be Blue");
    var player1Color = 'rgb(86, 151, 255)'     // blue

    var player2 = prompt("Player Two: Enter Your Name, you will be Red");
    var player2Color = 'rgb(237, 45, 73)'      // red

    var currentPlayer = 1;
    var currentName = player1;
    var currentColor = player1Color;

    $('h3').text(currentName + " it's your turn, pick a column to drop in!")

    $('.board button').on('click', function(){
        var col = $(this).closest('td').index()
        // console.log("Selected Col: " + col);
        var bottomAvail = checkBottom(col)
        // console.log("bottomAvail: " + bottomAvail);

        changeColor(bottomAvail, col, currentColor)

        if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
            setTimeout(function(){alert("Winner is: "+currentName); location.reload();}, 1000)
        }

        currentPlayer = currentPlayer * -1
        if(currentPlayer===1){
            currentName = player1
            $('h3').text(currentName + " it's your turn!")
            currentColor = player1Color
        }
        else{
            currentName = player2
            $('h3').text(currentName + " it's your turn!")
            currentColor = player2Color
        }
    })
}
