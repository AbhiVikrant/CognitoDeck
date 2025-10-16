// global store
let listOfCountries=[];
let filteredCountries=[];
let currentPage=1;
let itemsPerPage=12;

//  element selection

const search=document.querySelector('#text');
const select=document.querySelector('#regionFilter');
const countryList=document.querySelector('#countryLists');
const pagination=document.querySelector('#pagination');

 

// fetching api
async function fetchAPI()
{
    try
    {
        const resonse=await fetch(
            'https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json'
        );
        if(!resonse.ok)
            throw new Error(`HTTPS Status Code: ${resonse.status}`);
        const data=await resonse.json();
        return data;
    }
    catch(error)
    {
        console.log('Error',error);
        
    }
}

// rendering UI

function renderLists(data)
{
     countryList.innerHTML='';
     data.forEach((country)=>{
        const cardDiv=document.createElement('div');
        cardDiv.className='card';

        const cardImage=document.createElement('div');
        cardImage.className='cardImage';
        const img=document.createElement('img');
        img.src=country.flag;
        img.alt=country.name;
        cardImage.appendChild(img);

        const cardContent=document.createElement('div');
        cardContent.className='cardContent';
        const name=document.createElement('h2');
        name.className='countryName';
        name.textContent=`Country Name: ${country.name}`;
        const region=document.createElement('p');
        region.textContent=`Region: ${country.region}`;
        const pop=document.createElement('p');
        pop.textContent=`Population: ${country.population}`;

         cardContent.append(name,region,pop);
         cardDiv.append(cardImage,cardContent);

         countryList.appendChild(cardDiv);

     })
}

//  pagination

function renderPagination(totalItems)
{
    pagination.innerHTML='';
    const totalPages=Math.ceil(totalItems/itemsPerPage);

    // prev
    const prevBtn=document.createElement('button');
    prevBtn.textContent='Prev';
    prevBtn.disabled=(currentPage===1);
    prevBtn.onclick=()=>changePage(--currentPage);
    pagination.appendChild(prevBtn);

    // pages btn
    for(let i=1; i<=totalPages; i++)
    {
        const pageBtn=document.createElement('button');
        pageBtn.textContent=i;
        pageBtn.className=(i===currentPage)?'activePage':'';
        pageBtn.onclick=()=>changePage(i);
        pagination.appendChild(pageBtn);
    }

    // next btn
    const nextBtn=document.createElement('button');
    nextBtn.textContent='Next';
    nextBtn.disabled=(currentPage===totalPages);
    nextBtn.onclick=()=>changePage(currentPage+1);
    pagination.appendChild(nextBtn);
}

function displayPage(data)
{
  const start=(currentPage-1)*itemsPerPage;
   const end = start + itemsPerPage;
   const pageData = data.slice(start, end);
   renderLists(pageData);
   renderPagination(data.length);
}

function changePage(pageNum)
{
   currentPage=pageNum;
   displayPage(filteredCountries.length?filteredCountries:listOfCountries);
}

// Apply filtering and searching

function applyFilter()
{
    const searchVal=search.value.trim().toLowerCase();
    const selectedRegion=select.value;

    filteredCountries=listOfCountries.filter((country)=>{
        const matchesName=country.name.toLowerCase().includes(searchVal);
        const matchedRegion=selectedRegion?country.region===selectedRegion:true;
        return matchesName && matchedRegion;
    })
    currentPage=1;
    displayPage(filteredCountries.length?filteredCountries:listOfCountries);
}

// --- Initialization ---

async function init()
{
    listOfCountries=await fetchAPI();
    displayPage(listOfCountries);
}

// performance optimization
function debounce(func,delay)
{
    let timeout;
    return (...args)=>{
        clearTimeout(timeout);
        timeout=setTimeout(()=>func.apply(this,args),delay);
    }
}
const debouncedFilter = debounce(applyFilter, 400);
search.addEventListener('input', debouncedFilter);
select.addEventListener('change',applyFilter);

init();