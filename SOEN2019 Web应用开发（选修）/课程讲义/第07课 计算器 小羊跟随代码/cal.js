let buttons = document.querySelectorAll('button');
let showResult = document.querySelector('.input-area');

buttons.forEach( (btn)=>{
    btn.addEventListener('click', function() {
        if (this.innerHTML === "=") {
            showResult.innerHTML = eval(showResult.innerHTML)
        } else if (this.innerHTML === "Clear") {
            showResult.innerHTML = "";
        } else {
            showResult.innerHTML += this.innerHTML;
        }
    })
} )