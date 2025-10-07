//  WAP implement a try catch block to that occur error during data fetching


async function normalFunctionDataFetch()
{
    let res=await fetch('https://jsonplaceholder.typicode.com/posts');
    if(!res.ok)
    {
        throw new Error('error as response not ok');
    }
    const data= await res.json();
    return data;
}
(async()=>{
    const result=await normalFunctionDataFetch();
    console.log(result);
    
})();


async function fetchData()
{
    try
    {
        let response= await fetch('https://jsonplaceholder.typicode.com/posts');
        console.log(response.status);
        
        let data= await response.json();
        console.log(data);
        
    }
    catch(error)
    {
        console.log("Error"+ error);
        
    }
}

fetchData();