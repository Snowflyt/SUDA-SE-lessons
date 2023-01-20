const btn = document.querySelector('#btnAdd')
const inputBox = document.querySelector('#inputBox')

btn.addEventListener('click', ()=> {
    const ulEl = document.querySelector('ul');
    const liElToAdd = document.createElement('li');
    liElToAdd.innerText = inputBox.value;
    liElToAdd.className = 'itemBox';
    liElToAdd.addEventListener('click', ()=> {
        liElToAdd.classList.toggle('redBackground')
    })
    ulEl.appendChild(liElToAdd);
});


setInterval( ()=>{
    console.log('show me');
},1000 );



