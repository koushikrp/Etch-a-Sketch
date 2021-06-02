
const body = document.querySelector('body');
const container = document.createElement('div');
container.classList.add('container');
function createDivs(numSquares){
    for(let i=0;i<numSquares;i++){
       const element = document.createElement('div');
       element.style.borderColor='black';
       element.setAttribute('count','1');
       container.appendChild(element);

       element.addEventListener('mouseenter',addToPath);
    }
}
createDivs(256);
body.appendChild(container);

const rgbStringToArray = rgb => rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).splice(1, 3)
  .map(v => Number(v));

function addToPath(e){
    let curCount = Number(e.target.getAttribute('count'));
    if(curCount===1){
        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)} ${Math.floor(Math.random()*256)} ${Math.floor(Math.random()*256)})`;
    }
    else{
        let curColor = window.getComputedStyle( e.target ,null).getPropertyValue('background-color');
        let rgbColor = rgbStringToArray(curColor);
        rgbColor[0] = parseInt(rgbColor[0] * (100 - 10*curCount) / 100);
        rgbColor[1] = parseInt(rgbColor[1] * (100 - 10*curCount) / 100);
        rgbColor[2] = parseInt(rgbColor[2] * (100 - 10*curCount) / 100);

        rgbColor[0] = (rgbColor[0]<0)?0:rgbColor[0];  
        rgbColor[1] = (rgbColor[1]<0)?0:rgbColor[1];  
        rgbColor[2] = (rgbColor[2]<0)?0:rgbColor[2];  

        e.target.style.backgroundColor = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
    }
    console.log(e.target.style.backgroundColor);
    e.target.setAttribute('count',`${curCount+1}`);
}

const button = document.createElement('button');
button.textContent = "Clear Grid";
button.style.padding= '20px';
button.style.position = 'relative';
button.style.left = '48%';
container.before(button);

button.addEventListener('click', (e) =>{
    let newSquares;
    do{
        newSquares = prompt('Enter required Squares per side in new grid: ');
    }while(newSquares>100);
    const newSideLength = Math.floor(960/newSquares);
    while(container.firstChild){
        container.firstChild.remove();
    }
    createDivs(newSquares*newSquares);
    let divs = document.querySelectorAll(`.container div`);
    divs.forEach(div => {
        div.style.width = newSideLength;
        div.style.height = newSideLength;
    }
    );
}
);
