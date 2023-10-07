let tic = true;
let winTac = 0;
let winTic = 0;
let win = '';
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
            console.log(tic);
            if (!elem.contains('tic') && !elem.contains('tac') && win == '') {
                if(tic){
                    elem.add('tic');
                    game[e.target.id-1]='X';
                    document.documentElement.style.setProperty('--gamer', 'red');
                }else{
                    elem.add('tac');
                    game[e.target.id-1]='0';
                    document.documentElement.style.setProperty('--gamer', '#0000cd');
                }

                if(checkWin('X') > 0)
                    writeWin('X', '.tics', winTic)

                if(checkWin('0') > 0)
                    writeWin('0', '.tacs', winTac)

                if(winTic == 3)
                    alert('Win X');

                if(winTac == 3)
                    alert('Win 0');

                tic = !tic;
            }
        };
    }

    document.getElementById('restart').onclick = function () {
        var allTic = document.querySelectorAll('.tic');
        for (var i = 0; i < allTic.length; i++) {
            allTic[i].classList.remove('tic');
        }
        var allTac = document.querySelectorAll('.tac');
        for (var i = 0; i < allTac.length; i++) {
            allTac[i].classList.remove('tac');
        }
        game = [];
        win = '';
        tic = true;
        document.documentElement.style.setProperty('--gamer', '#0000cd');
        unblockConteiner();
    }
});

function checkWin(item){
    let map = gameCombinations.map((array) => array.every((elem) => game[elem] == item));
    return map.indexOf(true);
}

function writeWin(who, className){
    var cls = document.querySelectorAll(className);
    for (var i = 0; i < cls.length; i++) {
        if(!cls[i].classList.contains('win')){
            cls[i].classList.add('win');
            i = cls.length;
        }
    }
    win = who;
    if(who == 'X'){
        winTic++;
    }else{
        winTac++;
    }
    blockConteiner();
}

function blockConteiner(){
    var block = document.querySelectorAll('.item');
    for (var i = 0; i < block.length; i++) {
        block[i].classList.add('block');
    }
}

function unblockConteiner(){
    var block = document.querySelectorAll('.item');
    for (var i = 0; i < block.length; i++) {
        block[i].classList.remove('block');
    }
}