const btn = document.querySelector("button");
const div =  document.querySelector("div");

div.addEventListener("click", (e)=>{
    console.log("click div");
    console.log(e);
});

btn.addEventListener("click", (e)=>{
    e.stopPropagation();
    console.log("click button");
    console.log(e);
});








