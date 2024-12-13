const COUNT_CELLS = 9;
let tic = true;
let winTac = 0;
let winTic = 0;
let win = '';
let game = [];
let gameCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.addEventListener("DOMContentLoaded", function () {
    const gameBoard = document.getElementById("game-board");
    for (let i = 1; i <= COUNT_CELLS; i++) {
        const cell = document.createElement("div");
        cell.classList.add("item");
        cell.id = i;
        gameBoard.appendChild(cell);
    }

    const common_tic_wins = document.getElementsByClassName("common_tic_wins")[0];
    for (let i = 1; i <= 3; i++) {
        const cell = document.createElement("div");
        cell.classList.add("tic_win");
        common_tic_wins.appendChild(cell);
    }

    const common_tac_wins = document.getElementsByClassName("common_tac_wins")[0];
    for (let i = 1; i <= 3; i++) {
        const cell = document.createElement("div");
        cell.classList.add("tac_win");
        common_tac_wins.appendChild(cell);
    }
});

window.addEventListener('load', () => {
    let click = document.getElementsByClassName("item");
    for (var i = 0; i < click.length; i++) {
        click[i].onclick = clickBlock;
    }

    document.getElementById('restart').onclick = function () {
        refresh();
    }
});

function clickBlock(e) {
    let elem = e.target.classList;
    if (!elem.contains('tic') && !elem.contains('tac') && win == '') {
        if (tic) {
            elem.add('tic');
            game[e.target.id - 1] = 'X';
            document.documentElement.style.setProperty('--gamer', 'red');
        } else {
            elem.add('tac');
            game[e.target.id - 1] = '0';
            document.documentElement.style.setProperty('--gamer', '#0000cd');
        }

        if (checkWin('X'))
            writeWin('X', '.tic_win', winTic);
        else if (checkWin('0'))
            writeWin('O', '.tac_win', winTac)
        else if (game.filter(x => x !== undefined).length === game.length && game.length == COUNT_CELLS)
            showModal(`No winner`);
        tic = !tic;
    }
}

function refresh() {
    clearWins();
    clearField();
}

function checkWin(item) {
    return gameCombinations.some(combination =>
        combination.every(index => game[index] === item)
    );
}

function writeWin(who, className) {
    var cls = document.querySelectorAll(className);
    for (var i = 0; i < cls.length; i++) {
        if (!cls[i].classList.contains('win')) {
            cls[i].classList.add('win');
            i = cls.length;
        }
    }
    win = who;
    if (who == 'X')
        winTic++;
    else
        winTac++;

    if (winTic == 3)
        showModal("Tic win", 'Refresh');
    else if (winTac == 3)
        showModal("Tac win", 'Refresh');
    else
        showModal(`${win} got point`);
    blockcontainer();
}

function blockcontainer() {
    var block = document.querySelectorAll('.item');
    for (var i = 0; i < block.length; i++) {
        block[i].classList.add('block');
    }
}

function unblockcontainer() {
    var block = document.querySelectorAll('.item');
    for (var i = 0; i < block.length; i++) {
        block[i].classList.remove('block');
    }
}

function clearField() {
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
    unblockcontainer();
}

function clearWins() {
    var allTic = document.querySelectorAll('.win');
    for (var i = 0; i < allTic.length; i++) {
        allTic[i].classList.remove('win');
    }
    winTac = 0;
    winTic = 0;
}

function showModal(header, text) {
    if (document.getElementById("custom-modal")) {
        return;
    }

    const modal = document.createElement("div");
    modal.id = "custom-modal";
    const modalHeader = document.createElement("h3");
    modalHeader.innerText = header;
    modal.appendChild(modalHeader);

    if (text) {
        const refreshButton = document.createElement("button");
        refreshButton.innerText = text;
        refreshButton.classList.add("button");
        refreshButton.onclick = function () {
            document.body.removeChild(modal);
            refresh();
        };
        modal.appendChild(refreshButton);

        clearField();
    } else {
        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.classList.add("button");
        closeButton.onclick = function () {
            document.body.removeChild(modal);
            clearField();
        };
        modal.appendChild(closeButton);
    }

    document.body.appendChild(modal);

}