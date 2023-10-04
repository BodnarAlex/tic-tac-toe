let tic = true;

window.addEventListener('load', () => {
let click = document.getElementsByClassName("item");
console.log(click);
    for (var i = 0; i < click.length; i++) {
        click[i].onclick = function (e) {
            let elem = e.target.classList;
            if(!elem.contains('tic') && !elem.contains('tac')){
                if(tic){
                    elem.add('tic');  
                } else{
                    elem.add('tac');
                }
                tic = !tic;
            }
        };
    }
});