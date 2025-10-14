// WAP for multiple api call using callback

function multipleAPICall(apiURL,callback)
{
    fetch(apiURL)
    .then(response=>response.json())
    .then(data=>callback(data))
    .catch(error=>console.error(error.message))
};

function handleData(data)
{
    console.log('Processed Data', data);
    
}

function main()
{
    const url1='https://jsonplaceholder.typicode.com/posts/1';
    const url2='https://jsonplaceholder.typicode.com/posts/2';
    const url3='https://jsonplaceholder.typicode.com/posts/3';
    
    multipleAPICall(url1,handleData);
    multipleAPICall(url2,handleData);
    multipleAPICall(url3,handleData);
};

main();