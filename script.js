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






// step-1
const loadIssues = () => {
        manageSpinner(true);
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(response => response.json())
        .then(data => loadIssueCard(data.data));

};





// step-2
const loadIssueCard = (dataset) => {

    const cardCon = document.getElementById('card-container');
    cardCon.innerHTML=``;

    if(dataset.length == 0){
        
        cardCon.innerHTML = `<div id="no-btn" class="p-16 text-center space-y-6">
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

    cardCon.appendChild(card);
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


































// const removeActive = () => {
//   const arr = document.querySelectorAll(".lsn-btn");

//   for (let ar of arr) {
//     ar.classList.remove('active');
//   }
// }

// // display json er function er kach theke onclick korle invoke hochhe , input nichhe level number k

// const loadLevelWord = (id) => {
  
//     manageSpinner(true);
//     const url = `https://openapi.programming-hero.com/api/level/${id}`;
//     fetch(url).then(res => res.json()).then(data => {
//         displayLevelWord(data.data);
//         removeActive();
//         const something = document.getElementById(`lsn-${id}`);
//         something.classList.add("active");
//     });

// }



// per level er jonno word fetch kore ene card format e show kortese



//  eikhane buttons gula load kortesi, shathe onclick function jure dichhi jeikhane button er id jachhe parameter hishebe

// const displayJSON = (posts) => {

// const x = document.getElementById('div1');
// x.innerHTML=``;


// posts.forEach(element => {
//     const newElement = document.createElement("button");
//     newElement.id = `lsn-${element.level_no}`;
//     newElement.classList.add("btn", "btn-outline", "btn-primary", "lsn-btn");

//     newElement.onclick = () => {loadLevelWord(element.level_no);}

//     newElement.innerHTML = `<i class="fa-solid fa-book-open"></i>Lesson-${element.level_no}`;
//     x.appendChild(newElement);
    
// });

// }



loadIssues();

// document.getElementById("inp-src").addEventListener("input", function () {

//   const value = this.value.trim().toLowerCase();

//   console.log(value);
//   fetch('https://openapi.programming-hero.com/api/words/all').
//   then(res => res.json()).then(data => {
//     const allWords = data.data;
//     const filtered = allWords.filter(word =>
//     word.word && word.word.toLowerCase().includes(value));

//     displayLevelWord(filtered);
//   });



// });