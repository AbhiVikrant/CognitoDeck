const colorPicker=document.getElementById('select-color');
const backgroundColor=document.getElementById('select-background-color');
const  font=document.getElementById('select-font');
const canvas=document.getElementById('canvas');
const clrbtn=document.getElementById('clear-button');
const savebtn=document.getElementById('save-button');
const retrievebtn=document.getElementById('retrieve-button');
// console.log(colorPicker,backgroundColor,font,canvas,clrbtn,savebtn,retrievebtn);
const ctx=canvas.getContext('2d');
  ctx.strokeStyle=(colorPicker.value);
    ctx.fillStyle=backgroundColor.value;
    ctx.lineWidth=font.value/5;
    console.log(font.value)
     ctx.fillRect(0,0,840,420);
let isDrawing=false;
let lastX=0,lastY=0;
//  set pen color
colorPicker.addEventListener('change', (e)=>
{
    ctx.strokeStyle=(e.target.value);
    ctx.fillStyle=e.target.value;
});
backgroundColor.addEventListener('change', (e)=>
{
    ctx.fillStyle=e.target.value;
    ctx.fillRect(0,0,820,420);
});
font.addEventListener('change', (e)=>
{
    ctx.lineWidth=e.target.value/5;
})
canvas.addEventListener('mousedown', (e)=>
{
    isDrawing=true;
    lastX=e.offsetX;
    lastY=e.offsetY;
});
canvas.addEventListener('mousemove', (e)=>
{
   if(isDrawing)
   {
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();

    lastX=e.offsetX;
    lastY=e.offsetY;
   }
});
canvas.addEventListener('mouseup',(e)=>
{
    isDrawing=false;
}
);
canvas.addEventListener('mouseout',(e)=>
{
    isDrawing=false;
}
);

clrbtn.addEventListener('click',()=>
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle=colorPicker.value;
    ctx.fillStyle=backgroundColor.value;
     ctx.fillRect(0,0,canvas.width,canvas.height);
})
savebtn.addEventListener('click',()=>{
    localStorage.setItem('canvasContext', canvas.toDataURL());
    let link=document.createElement('a');
    link.download='signature.png';
    link.href=canvas.toDataURL();
    link.click();

});
retrievebtn.addEventListener('click',()=>
{
    let savedCanvas=localStorage.getItem('canvasContext');
    if(savedCanvas)
    {
        let img=new Image();
        img.src=savedCanvas;
        ctx.drawImage(img,0,0);
    }
})

// mobile touch

canvas.addEventListener('touchstart', (e)=>
{
    isDrawing=true;
    lastX=e.offsetX;
    lastY=e.offsetY;
});
canvas.addEventListener('touchmove', (e)=>
{
   if(isDrawing)
   {
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();

    lastX=e.offsetX;
    lastY=e.offsetY;
   }
});
canvas.addEventListener('touchend',(e)=>
{
    isDrawing=false;
}
);

