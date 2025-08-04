const input=document.querySelector('.wrapper .input-field');
const typingText=document.querySelector('.typing-text p');
const time=document.querySelector('.time span b');
const mistakes=document.querySelector('.mistake span');
const wpm=document.querySelector('.wpm span');
const cpm=document.querySelector('.cpm span');
const btn=document.querySelector('.content button')
// set value initialisation 
let timer;
let maxTime=60;
let leftTime=maxTime;
let charIndex=0;
let mistake=0;
let isTyping=false;

function loadParagraph()
{
    const para=["Every minute counts when words flow freely from your fingertips.",
"A minute of focused typing can unlock a world of words.",
"Mastering your keyboard, one precise word per minute at a time.",
"The quicker your fingers dance on the keys, the more you achieve in a single minute.",
"Transforming thoughts into text at speed: the power of a typing minute.",
"One minute, one goal: maximizing words per minute for effortless communication.",
"Typing faster means more efficient communication and time saved.",
"Practice and accuracy are key to a high WPM in one minute.",
"A higher WPM in a typing test indicates strong keyboarding skills and proficiency.",
"aLl kInDs oF fRuItS aNd vEgEtAbLeS arE HeAlThY fOr yoU. $12.34",
"tHe wEaThEr tOdaY iS qUiTe nIcE. iT's AboUt 72 deGrEeS! @#*",
"dO yOu LiKe pIzZa WiTh pEpPeRoNi oR cHeEsE? &%^",
"THe qUiCk bRoWn fOx jUmPs oVeR tHe lAzY dOg. 9876",
"My nEw CoMpUtEr HaS 16gb rAm. #!%",
"i Am gOiNg tO tHe sToRe tO BuY mIlK AnD BrEaD. 5678",
"tHe eArTh rOtAtEs aRoUnD tHe sUn. 24/7",
"DoN't FoRgEt tO dRiNk eNoUgH wAtEr eVeRy dAy. 1.25L",
"tHe mOuNtAiNs aRe BeAuTiFuL iN ThE WiNtEr. @$!",
];
// getting random index and get access random para value 
const randomIndex=Math.floor(Math.random()*para.length);
typingText.innerHTML='';
for(const char of para[randomIndex])
{
    typingText.innerHTML+=`<span>${char}</span>`
    // console.log(char);
}
// console.log(typingText.querySelectorAll('span')[0]);
typingText.querySelectorAll('span')[0].classList.add('active');
document.addEventListener('keydown',()=>{
    input.focus();
})
}
// handleInputInteraction
function initTyping()
{
   const char=typingText.querySelectorAll('span');
   const typedChar=input.value.charAt(charIndex);
//    console.log( typedChar)
if(charIndex<char.length && leftTime>0)
{
    if(!isTyping)
    {
        timer=setInterval(initTime,1000);
        isTyping=true;
    }
    if(char[charIndex].innerText===typedChar)
    {
        char[charIndex].classList.add('correct');
        //  console.log('correct');
    }
    else
    {
        mistake++;
         char[charIndex].classList.add('incorrect');
        //  console.log('incorrect');
    }
    mistakes.innerText=mistake;
    char[charIndex].classList.add('active');
    (charIndex-mistake)==-1? cpm.innerText= 0 : cpm.innerText=(charIndex-mistake);
     charIndex++;   
}
else
{
     clearInterval(timer);
     input.value='';
}
}
// time start function
function initTime()
{
    if(leftTime>0)
    {
        leftTime--;
        time.innerText=leftTime;
        let calWPM=Math.round(((charIndex-mistake)/5)/(maxTime-leftTime)*60);
        wpm.innerText=calWPM;
    }
    else
    {
       clearInterval(timer);
    }
}
//  handleReset Button
function handleReset()
{
    loadParagraph();
    clearInterval(timer);
    leftTime=maxTime;
    charIndex=0;
     mistake=0;
     isTyping=false;
     time.innerText=0;
     mistakes.innerText=0;
     wpm.innerText=0;
     cpm.innerText=0;
}
input.addEventListener("input",initTyping);
loadParagraph();
// console.log(input,typingText,time,mistakes,wpm,cpm,btn);
