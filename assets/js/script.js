let tic = true;
let game = [[], [], []];

window.addEventListener('load', () => {
    let click = document.getElementsByClassName("item");
    console.log(click);
    for (var i = 0; i < click.length; i++) {
        click[i].onclick = function (e) {
            let elem = e.target.classList;
            if (!elem.contains('tic') && !elem.contains('tac')) {
                (tic) ? elem.add('tic') : elem.add('tac');
                tic = !tic;
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
    }
});