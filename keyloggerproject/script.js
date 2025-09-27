let startButton=document.getElementById('start-btn');
let stopButton=document.getElementById('stop-btn');
const logDiv=document.getElementsByClassName('log')[0];
const stateDiv=document.getElementsByClassName('state')[0];

// handle start 

startButton.addEventListener('click',()=>
{
    document.addEventListener('keydown',handleDown);
    document.addEventListener('keyup',handleUp);
    startButton.disabled=true;
    stopButton.disabled=false;
})
stopButton.addEventListener('click',()=>
{
    document.removeEventListener('keydown',handleDown);
    document.removeEventListener('keyup',handleUp);
    logDiv.textContent='';
    stateDiv.textContent='';
    startButton.disabled=false;
    stopButton.disabled=true;
})

function handleDown(e)
{
  logDiv.textContent=` Key ${e.key} is pressed down`;
  stateDiv.textContent=`Key is down`;
}
function handleUp(e)
{
   logDiv.textContent=` Key ${e.key} is pressed up`;
  stateDiv.textContent=`Key is up`;
}