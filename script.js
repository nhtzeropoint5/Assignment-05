let openCount = 0;
let closedCount = 0;

const manageSpinner = (st) =>{
  if(st==true){
  document.getElementById('spin').classList.remove('hidden');
  document.getElementById('card-container').classList.add('hidden');
  }
  else{
  document.getElementById('spin').classList.add('hidden');
  document.getElementById('card-container').classList.remove('hidden');  
  }
}


const createElements = (arr) => {
    const newarr = arr.map((el) => `<span class="btn btn btn-soft rounded-full btn-primary">${el}</span>`);
    return newarr.join(' ');
}


function showOnly(id, id1){
    const home = document.getElementById('card-container'); // getting id's of the containers
    const op = document.getElementById('card-container-op');
    const cls = document.getElementById('card-container-cls');

    const btn1 = document.getElementById('home-page'); // getting id's of the all other buttons
    const btn2 = document.getElementById('op-page');
    const btn3 = document.getElementById('cls-page');

    const txt = document.getElementById('txt-cng');

    // const jobC = document.getElementById('tab-1');
    // const intC = document.getElementById('tab-2');
    // const rejC = document.getElementById('tab-3');


    home.classList.add('hidden');
    btn1.classList.remove('btn-active');
    op.classList.add('hidden');
    btn2.classList.remove('btn-active');
    cls.classList.add('hidden');
    btn3.classList.remove('btn-active');

    document.getElementById(id).classList.remove('hidden');// container hide 
    document.getElementById(id1).classList.add('btn-active'); // activate the btn


    // if (id === 'card-container-home') {
    //     txtN.innerText = jobC.innerText;
    //     txt.innerText = " Jobs";
    // }
    if (id === 'Job-container-op') {
        txt.innerText = openCount;
    } 
    else if (id === 'Job-container-rej') {
        txt.innerText = closedCount;
    }
}




// step-1
const loadIssues = () => {
        manageSpinner(true);
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(response => response.json())
        .then(data => loadIssueCard(data.data));
       

};



// step-2
const loadIssueCard = (dataset) => {

    const cardConH = document.getElementById('card-container');
    const cardConO = document.getElementById('card-container-op');
    const cardConC = document.getElementById('card-container-cls');
    openCount = dataset.filter(i => i.status === "open").length;
    closedCount = dataset.filter(i => i.status === "closed").length;
    cardConH.innerHTML=``;

    if(dataset.length == 0){
        
        cardConH.innerHTML = `<div id="no-btn" class="p-16 text-center space-y-6">
        <h1 class="text-3xl font-bangla">No Issues Found</h1>
        </div>`;
        manageSpinner(false);
        return;
    }


    dataset.forEach(data => {
    console.log(data);

    const card = document.createElement('div');
    card.innerHTML = `
    <div class="created-card min-h-[370px] text-left p-5 border-t-4 ${data.status == "open" ? "border-green-500": "border-purple-500"} space-y-5 shadow-lg rounded-xl" onclick="loadIssueDetails(${data.id})">
        <div class="flex justify-between align-middle">
            <div class="my-auto">
                <img src="./assets/${data.status == "open" ? "Open-Status.png": "Closed-Status.png"}" alt="">
            </div>
            ${data.priority == "high" ? `<div class="py-2 px-8 text-red-500 font-medium bg-red-100 rounded-3xl">
                <span>${data.priority.toUpperCase()}</span>
            </div>` : 
            data.priority == "medium" ?
            `<div class="py-2 px-8 text-amber-500 font-medium bg-amber-100 rounded-3xl">
                <span>${data.priority.toUpperCase()}</span>
            </div>` :

            `<div class="py-2 px-8 text-green-500 font-medium bg-green-100 rounded-3xl">
                <span>${data.priority.toUpperCase()}</span>
            </div>`}
            
        </div>
         <div class = "min-h-[130px]">
        <p class="text-black font-semibold text-lg mb-1">${data.title}</p>
        <p class="text-gray-500 text-sm my-2">${data.description}</p></div>
    
    
        <div class="flex gap-2">
            ${createElements(data.labels)}
        </div>
    
        <div class="-mx-5 border-t border-gray-300 "></div>
        <div class="text-sm text-gray-500 space-y-2">
            <p>#${data.id} by ${data.author}</p>
            <p>${data.createdAt}</p>
        </div>
</div>` ;

    // console.log(card);

    cardConH.appendChild(card);

        if (data.status === "open") {
        cardConO.appendChild(card.cloneNode(true));
    } else {
        cardConC.appendChild(card.cloneNode(true));
    }
    });

    manageSpinner(false);
}


//step-3
//issue details check korbe

const loadIssueDetails = async(id) =>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    showIssueDetails(details.data);
   
}


// "data": {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// }

//details show korbe
const showIssueDetails = (word) =>{
const detbox = document.getElementById('details-container');

detbox.innerHTML = `
    <div class="">
      <h2 class="text-2xl font-bold" >${word.title}</h2>
    </div>

    <div class="flex justify-start items-center gap-3">
    <button class="btn rounded-full btn-active btn-success">Opened</button>
    <p class="text-sm text-gray-500">• Opened by You • ${new Date().toLocaleDateString()}</p>
    </div>
   

    <div class="flex gap-2">
            ${createElements(word.labels)}
        </div>

    
      <div class="space-y-2">
        <p class="text-sm text-gray-500">${word.description}</p>
    </div>

   <div class="bg-slate-100 rounded-lg p-6 flex gap-20">

    <div><span class="flex-1 text-gray-500">Assignee: </span><br>
         <span class="text-black font-semibold">${word.assignee}</span>
    </div>
     <div class="flex-1"><span class="text-gray-500">Priority: </span><br>
     ${word.priority == 'high' ? `<button class="btn px-5 py-1 text-white btn-active rounded-full border-error btn-error btn-sm">HIGH</button>`
        : word.priority == 'medium' ? `<button class="btn px-5 py-1 text-white btn-active rounded-full border-warning btn-warning btn-sm">MEDIUM</button>`
        : `<button class="btn px-5 py-1 text-white btn-active rounded-full border-success btn-success btn-sm">LOW</button>`
     }
       
    </div>
      
    </div>`;

   document.getElementById('my_modal_5').showModal();

   
}









loadIssues();

