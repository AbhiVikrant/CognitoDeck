let allCountry=[];
async function fetchAPI()
{
    try
    {
        const response=await fetch('https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json');
        if(!response.ok)
        {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }
        const data= await response.json();   
        return data;
    }
    catch(error)
    {
        console.log(error);
    }
}
const countryListDiv = document.querySelector('#countryLists');
function renderLists(data)
{
    try
    {
        countryListDiv.innerHTML = '';
         data.forEach((values)=>{
            const cardDiv=document.createElement('div');
            cardDiv.className='card';
            // image div
            const cardImage=document.createElement('div');
            cardImage.className='card-img';
            const imageContainer=document.createElement('img');
            imageContainer.src=values.flag;
            imageContainer.className='country-image';
            imageContainer.alt=values.name;

            // content div

            const contentDiv=document.createElement('div');
            contentDiv.className='card-content';
            const countryName=document.createElement('h2');
            countryName.textContent=`Country Name: ${values.name}`;
            const region=document.createElement('p');
            region.textContent=`Region: ${values.region}`
            const population=document.createElement('p');
            population.textContent=`Population: ${values.population}`
            contentDiv.append(countryName,region,population);
            cardDiv.append(imageContainer,contentDiv);
            // 
            countryListDiv.appendChild(cardDiv)
         })
        
    }
    catch(error)
    {
        console.log(error);
        
    }
}
async function displayData()
{
    try
    {
        const data=await fetchAPI();
        allCountry=data;
        renderLists(allCountry);
        
    }
    catch(error)
    {
        console.log(error);
        
    }
}


function handleSubmit()
{
    const search=document.getElementById('search');
    const typedValue=search.value.trim().toLowerCase();
    console.log(typedValue);

    if(typedValue!='')
    {
        const filteredData=allCountry.filter(country=>
            country.name.toLowerCase().includes(typedValue)
        );
        console.log(filteredData);
        renderLists(filteredData);
        
    }
    else
    {
        renderLists(allCountry);
    }
    
    
    
}
displayData();



