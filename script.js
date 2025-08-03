let textBox=document.getElementById('text');
let addButton=document.getElementById('addButton');
const result=JSON.parse(localStorage.getItem('result'))|| [];
// A global object to hold the current values of your toggles
const toggleStates = {}; 

// time formater
 const formatter = new Intl.DateTimeFormat('en-US', {
                               year: 'numeric',
                               month: 'long',
                               day: 'numeric',
                               hour: '2-digit',
                               minute: '2-digit',
                               second: '2-digit',
                               timeZoneName: 'short'
                            });
 // function to save to do on click add
function saveTodos() {
            localStorage.setItem('result', JSON.stringify(result));
        }
addButton.addEventListener('click',
    ()=>
    {
       
       handleClick(event);
    }
)
// enter button
textBox.addEventListener('keydown',(event)=>{
    if(event.keyCode===13 || event.key === "Enter")
    {
        event.preventDefault();
        addButton.click();
    }
});
// function handle click
function handleClick(event)
{
    event.preventDefault();
    let textBoxValue=textBox.value.trim();
    if(textBoxValue.length===0 || textBoxValue===null)
       {
        addButton.style.color="red";
        showErrorMessage("Enter some text in input field");
        textBox.focus();

       }
     else
       {
         addButton.style.color="";
         if( errorMessageBox.style.display=='block')
         {
            errorMessageBox.style.display='none';
         }
          const doc=new Date();
         
        //   console.log(formatter.format(doc));
        // handle checkduplicates
           function checkDuplicates()
           {
                 for(let i=0; i<result.length;i++)
                 {
                    if(result[i].activityToDo==textBoxValue)
                        return true;
                 }
                 return false;
           };
           if(checkDuplicates()==false)
           {
            if( errorMessageBox.style.display=='block')
             {
            errorMessageBox.style.display='none';
            }
             result.push(
            {
                activityToDo:  textBoxValue,
                dateOfCreation: formatter.format(doc),
                lastUpdatedTime:formatter.format(doc),
                status:'Pending'
            }
           );
          
           saveTodos(); 
           renderTable();
            textBox.value=''; 
           }
           else
           {
            showErrorMessage("It's already in your loop to do");

            textBox.value='';
            textBox.focus();
           }
       }
    }
    

// error handling
function showErrorMessage(message)
{
    const errorMessageBox=document.getElementById('errorMessageBox');
    const errorText=document.getElementById('errorMessage');
    errorText.textContent=message;
    errorMessageBox.style.display='block';

}
function hideErrorMessage()
{
    const errorMessageBox=document.getElementById('errorMessageBox');
    errorMessageBox.style.display="none";
}
// render UI
function renderTable()
{
    const dataBox=document.getElementById('dataBox');
    if(result.length!=0)
    {
        dataBox.style.display='block';
    }
    const tbody=document.getElementById('tbody');
    tbody.innerHTML='';
    result.forEach((data,index)=>{
        const tr=document.createElement('tr');
        let x=index;
        tr.innerHTML=
        `
                        <td>${++x}</td>
                        <td>${data.activityToDo}</td>
                        <td>${data.dateOfCreation}</td>
                        <td>${data.lastUpdatedTime}</td>
                        <td>
                        <div class="togleBox">
                        <input type="range" name="point" min="1" step="1" id="custom-toggle-${index}" class="tgl-def custom-toggle"
                            max="3" value="1" onchange="updateToggleStatus(this.value, ${index});">
                               </div>
                           <span id="status-text-${index}">Pending</span>
                         </td>
                        <td><button onclick="handleEdit(${index})">Edit</button></td>
                         <td><button onclick="handleDelete(event,${index})" style="background-color:red;">Delete</button></td>
        
        `
         tbody.appendChild(tr);
    });
    
}
// handle delete
function handleDelete(event, index)
{
      var td = event.target.parentNode; 
      var tr = td.parentNode; // the row to be removed
      tr.parentNode.removeChild(tr);
      result.splice(index,1);
      saveTodos();
      renderTable();
}
// handle Edit button
function handleEdit(index)
{
    const newText=prompt('Edit your task', result[index].activityToDo);
    if(newText!==null || newText.trim()!='')
    {
        result[index].activityToDo=newText.trim();
        result[index].lastUpdatedTime= formatter.format(new Date());
        saveTodos();
        renderTable();
    }
}
// function to handle status
// function handleStatus(value)
// {
//     const inputF=document.getElementById('custom-toggle'+index);
//     console.log(inputF);
//     let value=inputF.value;
//     console.log( value)
//     filterme(index);
// function filterme(value,index) {
//     const inputF=document.getElementById('custom-toggle'+index);
//     const id=inputF.id;
//     document.addEventListener('DOMContentLoaded', () => {
//      if (valuePresave.hasOwnProperty(id)) {
//             inputF.value= valuePresave[id];
//             console.log(inputF.value)
//         }
//          value=(inputF.value);
//          console.log(value)
      
//     //   console.log(valuePresave[index].hasOwnProperty(id))
//     //   if(valuePresave[index].hasOwnProperty(id))
//     //   {
//     //      valuePresave[index].id=value;
//     //   }
//     //   else
//     //   {
//     //     valuePresave.push(
//     //     obj
//     // ); 
//     //   }
//      value = parseInt(value, 10); // Convert to an integer
//    if (value === 2) {
//     valuePresave[id]=value;
//     saveValuePresave();
//     (inputF).classList.remove('tgl-on');
//     inputF.classList.remove( 'tgl-off');
//     inputF.classList.add('tgl-def');
//     result[index].status="Review";
//     result[index].lastUpdatedTime=formatter.format(new Date());
//      saveTodos();
//      renderTable();
    
     
//   } 
//   else if (value === 3) {
   
//     (inputF).classList.remove('tgl-on');
//     (inputF).classList.remove('tgl-def');
//     inputF.classList.add('tgl-off');
//     result[index].status="Completed";
//      result[index].lastUpdatedTime=formatter.format(new Date());
//       valuePresave[id]=value;
//     saveValuePresave();
//      saveTodos();
//      renderTable();
//     // console.log(value, result[index]);

//   }
//     });
    
    
// }
//  input value save and get


function updateToggleStatus(value, index) {
    const inputF = document.getElementById('custom-toggle-' + index); // Use index directly in ID
    const statusSpan = document.getElementById('status-text-' + index);

    // Update the value in the global object
    toggleStates['custom-toggle-' + index] = parseInt(value, 10); 

    // Save the entire toggleStates object to localStorage
    localStorage.setItem('toggleStates', JSON.stringify(toggleStates)); 

    // Update the class based on the toggle's value
    if (value === '1') {
        inputF.classList.remove('tgl-on', 'tgl-off');
        inputF.classList.add('tgl-def');
        statusSpan.textContent = "Pending";
        result[index].status = statusSpan.textContent; 
        result[index].lastUpdatedTime = formatter.format(new Date());
         saveTodos(); 
    } else if (value === '2') {
        inputF.classList.remove('tgl-def', 'tgl-off');
        inputF.classList.add('tgl-on'); // You might need to adjust class names based on your CSS
        statusSpan.textContent = "Review";
        result[index].status = statusSpan.textContent; 
        result[index].lastUpdatedTime = formatter.format(new Date());
        saveTodos();  
    } else if (value === '3') {
        inputF.classList.remove('tgl-def', 'tgl-on');
        inputF.classList.add('tgl-off'); // You might need to adjust class names based on your CSS
        statusSpan.textContent = "Completed"; // Or whatever your third status is
        result[index].status = statusSpan.textContent; 
      result[index].lastUpdatedTime = formatter.format(new Date());
         saveTodos();  
    }
      
    // You can also update your 'result' array and save 'todos' here if needed
      
}

// Function to load saved toggle states on page load
function loadToggleStates() {
    const savedStates = localStorage.getItem('toggleStates');
    if (savedStates) {
        Object.assign(toggleStates, JSON.parse(savedStates)); // Restore previous states

        // Iterate through the stored states and apply them to the toggles
        for (const id in toggleStates) {
            const inputF = document.getElementById(id);
            if (inputF) {
                inputF.value = toggleStates[id]; // Set the value of the toggle
                // Trigger the onchange event manually to update the display
                inputF.dispatchEvent(new Event('change')); 
            }
        }
    }
}

// Call loadToggleStates when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', loadToggleStates);

// initial render
 renderTable();