let tic = true;
let win = '';
let ticSign = 'X';
let tacSign = '0';
let game =[];
let gameCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

window.addEventListener('load', () => {

    let click = document.getElementsByClassName("item");
    for (var i = 0; i < click.length; i++) {
        click[i].onclick = function (e) {
            let elem = e.target.classList;
            if (!elem.contains('tic') && !elem.contains('tac')) {
                if(tic){
                    elem.add('tic');
                    game[e.target.id-1]='X';
                }else{
                    elem.add('tac');
                    game[e.target.id-1]='0';
                }
                tic = !tic;
                checkWin('X');
                checkWin('0');
            }
        };
    }

    document.getElementById('restart').onclick = function () {
        var tic = document.querySelectorAll('.tic');
        for (var i = 0; i < tic.length; i++) {
            tic[i].classList.remove('tic');
        }
        var tac = document.querySelectorAll('.tac');
        for (var i = 0; i < tac.length; i++) {
            tac[i].classList.remove('tac');
        }
        game = [];
    }
});

function checkWin(item){
    let map = gameCombinations.map((array) => array.every((elem) => game[elem] == item));
    console.log(map.indexOf(true));
    return map.indexOf(true);
}