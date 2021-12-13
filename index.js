const main = document.querySelector("select");
const manioption = document.querySelector("option")
const mainDiv = document.querySelector(".result");
const display = document.querySelector(".displaybox");

// deaths num each Country
const deathsP = document.createElement("p");
deathsP.innerText = "Deaths: ";
mainDiv.appendChild(deathsP);
const deathsNum = document.createElement("span");
deathsP.appendChild(deathsNum);
// Incident_Rate
const incident = document.createElement("p");
incident.innerText = "Incident Rate: ";
display.appendChild(incident);
const incidentNum = document.createElement("span");
incident.appendChild(incidentNum);
// Confirmed number
const confirmed = document.createElement("p");
confirmed.innerText = "Confirmed: ";
mainDiv.appendChild(confirmed);
const confirmedNum = document.createElement("span");
confirmed.appendChild(confirmedNum);
// last update
const lastUpdate = document.createElement("p");
lastUpdate.innerText = "Last Update: ";
display.appendChild(lastUpdate);
const lastUpdateNum = document.createElement("span");
lastUpdate.appendChild(lastUpdateNum);
// published
const publish = document.createElement("p");
publish.innerText = "Published By: ";
display.appendChild(publish);
const publishNum = document.createElement("a");
publish.appendChild(publishNum);
publishNum.setAttribute("href","https://www.umbc.edu/");
publishNum.setAttribute("target","_blank");

// Province_State ეს გაკეთდა ქვემოთ if ით რადგან ყველა ქვეყანას არ აქ შტატი...
// const provincie = document.createElement("p");
// provincie.innerText = "Province State: ";
// mainDiv.appendChild(provincie);
// const provinceNum = document.createElement("span");
// provincie.appendChild(provinceNum);


// viwe more botton
const botton = document.createElement("button");
botton.innerText = "view more";
mainDiv.appendChild(botton);

// replace
const button = document.createElement("button");
button.innerText = "Global static";
mainDiv.appendChild(button);


let arr = [];
let deaths = [];
let incident_Rate = [];
let confirmed_num = [];
let published = [];
let last_updatee = [];
let province_State = [];
axios
    .get("https://coronavirus.m.pipedream.net/")
    .then((r) => {
        for(let i = 0; i < r.data.rawData.length/10; i++){
            arr.push(r.data.rawData[i].Combined_Key);
            deaths.push(r.data.rawData[i].Deaths);
            incident_Rate.push(r.data.rawData[i].Incident_Rate);
            confirmed_num.push(r.data.rawData[i].Confirmed);
            published.push(r.data.dataSource.publishedBy);
            last_updatee.push(r.data.rawData[i].Last_Update);
            province_State.push(r.data.rawData[i].Province_State);
            const option = document.createElement("option");
            main.appendChild(option);
            option.innerText = arr[i];

        }
        
        deathsNum.innerText = r.data.summaryStats.global.deaths;
        confirmedNum.innerText = r.data.summaryStats.global.confirmed;
        console.log(r.data)
        console.log(arr);
        console.log(deaths);
    })



main.addEventListener('change',(e) =>{
    deathsNum.innerHTML = deaths[arr.indexOf(e.target.value)];
    incidentNum.innerHTML = Math.round(incident_Rate[arr.indexOf(e.target.value)]);
    confirmedNum.innerHTML = confirmed_num[arr.indexOf(e.target.value)];
    publishNum.innerHTML = published[arr.indexOf(e.target.value)];
    lastUpdateNum.innerHTML = last_updatee[arr.indexOf(e.target.value)];
    if(province_State[arr.indexOf(e.target.value)] !== ""){
        const provincie = document.createElement("p");
        provincie.innerText = "Province State: ";
        display.appendChild(provincie);
        const provinceNum = document.createElement("span");
        provincie.appendChild(provinceNum);
    
        provinceNum.innerHTML = province_State[arr.indexOf(e.target.value)];
    }
    manioption.classList.add("dissapear");

})
// button click
botton.addEventListener('click',() => {
    display.classList.toggle("dissapear");
    if(!display.classList.contains("dissapear")){
        botton.innerText = "less";
    }else{
        botton.innerText = "view more"
    }
})

button.addEventListener('click',() =>{
    location.reload();
    
})
button.style.marginLeft = "50px";