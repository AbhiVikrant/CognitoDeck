const inputText=document.getElementById("inputText");
console.log(typeof(inputText.innerText));
const count = (s) => {
    const a = Array(256).fill(0);
    for (const char of s) {
        a[char.charCodeAt(0)]++;
    }
    return a;
};
const calculate=document.querySelectorAll(".operation").forEach(function(item){
    item.addEventListener("click", function(e){
        //console.log(item);
        let lastValue=inputText.innerText.substring(inputText.innerText.length,inputText.innerText.length-1 );
        //console.log("lastValue", lastValue, !isNaN(lastValue));
        const occuranceOfDot=count(inputText.innerText)['.'.charCodeAt(0)];
        //console.log(!isNaN(lastValue));
        if( (!isNaN(lastValue) )&& (e.target.innerText==='=' ))
        {   
            if((occuranceOfDot===1 || occuranceOfDot===0 )){
                inputText.innerText=eval(inputText.innerText);

                console.log('running eval');
            }
                
                
            else 
            {
                inputText.innerText='0';
                console.log('running eval else part');
            }
        }
        else if(e.target.innerText==='AC')
        {
            inputText.innerText='0';
        }
        else if(e.target.innerText==='DEL')
        {
           
            inputText.innerText=inputText.innerText.substring(0,inputText.innerText.length-1);
            if(inputText.innerText.length==0)
            {
                inputText.innerText='0';
            }
        }
        else if((e.target.innerText==='+/-' )) 
            {
               console.log( lastValue, '+/-');
                if(isNaN(lastValue))
                {
                    inputText.innerText='0';
                }
                {
                   inputText.innerText=-(inputText.innerText); 
                   
                }
            }  
        else{    
               if(!isNaN(lastValue))
               {
                inputText.innerText+=e.target.innerText;
                console.log('running else whole');
               }
               if(inputText.innerText==='NaN')
               {
                inputText.innerText='0';
               }

             }
    })
});

const numberClicked=document.querySelectorAll(".number").forEach(function(item){
    item.addEventListener("click", function(e){
        // console.log(item);
        if(inputText.innerText==="0")
            inputText.innerText='';
        inputText.innerText+=e.target.innerText.trim();
        
    })
})



