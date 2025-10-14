//  Rewrite multiple api calls using callback using promises to avoid callback hell

function makeAPICall(url)
{
    return(
        
            fetch(url).then(res=>res.json())
        
    )
}

function handleData(data)
{
    console.log('Processed data', data);
    
}

function main()
{
    const url1='https://jsonplaceholder.typicode.com/posts/1';
    const url2='https://jsonplaceholder.typicode.com/posts/2';
    const url3='https://jsonplaceholder.typicode.com/posts/3';
    
    makeAPICall(url1).then(handleData).catch(error=>console.log(error));
     makeAPICall(url2).then(handleData).catch(error=>console.log(error));
      makeAPICall(url3).then(handleData).catch(error=>console.log(error));
    
}
main();