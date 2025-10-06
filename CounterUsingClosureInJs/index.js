const count=document.getElementById('count');
function createCounter(initialValues=0)
{
    let count=initialValues;
    return{
        increment: function () {
            count++;
            return count;
        },
        reset: function()
        {
            count=initialValues;
            return count;
        },
        decreament: function()
        {
            count--;
            return count;
        },
        getValue: function()
        {
            return count;
        }
    }
}

function display()
{
    let currentCount= counter.getValue();
    count.textContent=`Counts: ${currentCount}`
}

let counter=createCounter(0);
// 

function handleClick(event)
{
    if(event.target.className==='increment')
    {
        counter.increment();
        display();
    }
    else if(event.target.className==='decrease')
    {
        counter.decreament();
        display();
    }
    else
    {
        counter.reset();
        display();
    }
}


