
const body = document.querySelector('body');
const container = document.createElement('div');
container.classList.add('container');

for(let i=0;i<256;i++){
    const element = document.createElement('div');
    element.style.borderColor='black';
    container.appendChild(element);
    element.addEventListener('mouseenter',addToPath);
}
body.appendChild(container);

function addToPath(e){
    e.target.style.backgroundColor='white';
}
