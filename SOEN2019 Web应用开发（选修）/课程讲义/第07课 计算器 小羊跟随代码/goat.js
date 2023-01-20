let img = document.querySelector(".img");
let imgToX = 0;
let ImgToY = 0;
let imgl = 0;
let imgt = 0;
let step = 50;


window.addEventListener("mousemove", e => {
    console.log(e.x, e.y);
    imgToX = e.x - img.offsetLeft;
    imgToY = e.y - img.offsetTop;
    step = 0;
});


setInterval( ()=> {
    step++;
    if (step < 50) {
        imgl += imgToX / 50;
        imgt += imgToY / 50;
    }

    img.style.left = imgl + 'px';
    img.style.top = imgt + 'px';

}, 20);