// global
let products=[];
let filteredProducts=[];
let itemsPerPage=6;
let currentPage=1;

// 
const productListDiv=document.querySelector('.productLists');
const searchInput=document.querySelector('.inputField');
const paginationDiv=document.querySelector('.paginationDiv');
const sort=document.getElementById('sort');
// console.log(sort);



// fetch api data

async function fetchAPI()
{
    try
    {
        const res=await fetch('https://dummyjson.com/products');
        if(!res.ok)
            throw new Error(`HTTP Status Code:  ${res.status}`)
        const data=await res.json();
        return data;
    }
    catch(er)
    {
        console.log(er);
        
    }
};

function renderUI(data)
{
    productListDiv.innerHTML='';

    
    {
        data.map((product,id)=>{

             const cardDiv=document.createElement('div');
                   cardDiv.className='cardDiv';

             const imageDiv=document.createElement('div');
             imageDiv.className='imageDiv';

             const image=document.createElement('img');
             image.src=product.images;
             image.alt=product.title;
             imageDiv.appendChild(image);

             const descriptionDiv=document.createElement('div');
             descriptionDiv.className='cardContent'
             descriptionDiv.innerHTML=`
                 <h2>${product.title}</h2>
                 <p>${product.description}</p>
                 <span> Category: ${product.category}</span>
                  <span class='mrp'> MRP: ${product.price}</span>
                 <span> price: ${product.price-(product.price*product.discountPercentage)/100}</span>
                <div class="star-rating">
                       <span class="empty-stars">★★★★★</span>
                        <span class="filled-stars" style="width: ${(product.rating * 100) / 5}%;">★★★★★</span>
                </div>

             `
             cardDiv.append(imageDiv,descriptionDiv);
             productListDiv.appendChild(cardDiv);
        })
    }
}

// pagination 

     function renderPagination(totalItems)
     {
           paginationDiv.innerHTML='';
           let totalPages=Math.ceil(totalItems/itemsPerPage);
        //    previous
        const prevBtn=document.createElement('button');
        prevBtn.textContent='Prev';
        prevBtn.disabled=currentPage===1;
        prevBtn.onclick=()=>changePage(currentPage-1);
        paginationDiv.appendChild(prevBtn);

        //  pages

        for(let i=1; i<=totalPages; i++)
        {
            const pagesBtn=document.createElement('button');
            pagesBtn.textContent=i;
            pagesBtn.className=(i===currentPage)?'activePage':'';
            pagesBtn.onclick=()=>changePage(i);
            paginationDiv.appendChild(pagesBtn);
        }
        // next button
        const nextBtn=document.createElement('button');
        nextBtn.textContent='Next';
        nextBtn.disabled=currentPage===totalPages;
        nextBtn.onclick=()=>changePage(currentPage+1);
        paginationDiv.appendChild(nextBtn);

     }

    //   function to display page data

    function displayPageData(data)
    {
        // console.log(data.length);
        
        let start=(currentPage-1)*itemsPerPage;
        let end=start+itemsPerPage;
        // console.log(start,end);
        
        const pageData=data.slice(start,end);
        renderUI(pageData);
        renderPagination(data.length);
    }
    function changePage(pageNumber)
    {
        currentPage=pageNumber;
        console.log(currentPage);
        
        displayPageData(filteredProducts.length?filteredProducts:products);
    }
// 
function filterData() {
  const searchInputVal = searchInput.value.trim().toLowerCase();
  const sortValue = sort.value;

  // Step 1: Filter based on search input
  filteredProducts = products.filter(item => {
    return (
      item.title.toLowerCase().includes(searchInputVal) ||
      item.description.toLowerCase().includes(searchInputVal) ||
      item.category.toLowerCase().includes(searchInputVal) ||
      item.brand.toLowerCase().includes(searchInputVal)
    );
  });

  // Step 2: Sort if applicable
  if (sortValue === 'asc') {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === 'desc') {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortValue === 'low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  else if(sortValue==='low-high-rating'){
    filteredProducts.sort((a,b)=>a.rating-b.rating);
  }
     else if(sortValue==='high-low-rating'){
    filteredProducts.sort((a,b)=>b.rating-a.rating);
  }

  // Step 3: Reset pagination and display
  currentPage = 1;
  displayPageData(filteredProducts.length ? filteredProducts : products);
}

async function init()
{
    products=await fetchAPI();
    products=products.products;
    // console.log(products);
    
    displayPageData(products);
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
const debouncedFilter = debounce(filterData, 400);
searchInput.addEventListener('input', debouncedFilter);
sort.addEventListener('change',filterData);
init();