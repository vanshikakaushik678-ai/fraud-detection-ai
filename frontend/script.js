let fraudCount=0
let safeCount=0
let totalTx=0

let riskChart
let fraudChart
let map


// -----------------------------
// GET USER REAL IP
// -----------------------------

async function getUserIP(){

let res = await fetch("https://api.ipify.org?format=json")

let data = await res.json()

document.getElementById("device").value = data.ip

}


// -----------------------------
// DARK MODE
// -----------------------------

function toggleMode(){
document.body.classList.toggle("dark")
}


// -----------------------------
// LOADER
// -----------------------------

function showLoader(){
document.getElementById("loader").style.display="block"
}

function hideLoader(){
document.getElementById("loader").style.display="none"
}


// -----------------------------
// PAGE LOAD
// -----------------------------

window.onload=function(){

getUserIP()

let ctx=document.getElementById("fraudChart")

fraudChart=new Chart(ctx,{
type:"bar",
data:{
labels:["Fraud","Safe"],
datasets:[{
label:"Transactions",
data:[0,0]
}]
}
})


let rctx=document.getElementById("riskChart")

riskChart=new Chart(rctx,{
type:"doughnut",
data:{
labels:["Risk","Safe"],
datasets:[{
data:[0,100]
}]
}
})

initMap()

}


// -----------------------------
// CHECK FRAUD
// -----------------------------

async function checkFraud(){

let amount=document.getElementById("amount").value
let time=document.getElementById("time").value
let deviceIP=document.getElementById("device").value
let location=document.getElementById("location").value


if(amount==""||time==""||deviceIP==""||location==""){
alert("Fill all fields")
return
}


// convert HH:MM → minutes

let hours=parseInt(time.split(":")[0])
let minutes=parseInt(time.split(":")[1])

let timeValue=hours*60+minutes


// convert IP → numeric value

let deviceValue=deviceIP.split(".").reduce((a,b)=>a+Number(b),0)


showLoader()


let res=await fetch("http://127.0.0.1:5000/predict",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

amount:Number(amount),
time:Number(timeValue),
device:Number(deviceValue),
location:Number(location)

})

})

let data=await res.json()

hideLoader()

let status="Safe"

if(data.prediction==1){

status="Fraud"

fraudCount++

document.getElementById("result").innerHTML="⚠ Fraud Detected"

addFraudLocation()

}else{

safeCount++

document.getElementById("result").innerHTML="✅ Safe Transaction"

}

totalTx++

updateDashboard()

addHistory(amount,time,deviceIP,location,status)

updateChart()

updateRisk(data.risk_score)

}


// -----------------------------
// DASHBOARD UPDATE
// -----------------------------

function updateDashboard(){

document.getElementById("totalTx").innerText=totalTx
document.getElementById("fraudCount").innerText=fraudCount
document.getElementById("safeCount").innerText=safeCount

}


// -----------------------------
// HISTORY TABLE
// -----------------------------

function addHistory(a,t,d,l,s){

let row=`
<tr>

<td>${a}</td>
<td>${t}</td>
<td>${d}</td>
<td>${l}</td>
<td>${s}</td>

</tr>
`

document.getElementById("history").innerHTML+=row

}


// -----------------------------
// CHART UPDATE
// -----------------------------

function updateChart(){

fraudChart.data.datasets[0].data=[fraudCount,safeCount]

fraudChart.update()

}


function updateRisk(score){

riskChart.data.datasets[0].data=[score,100-score]

riskChart.update()

}


// -----------------------------
// IMAGE SCAN
// -----------------------------

async function scanImage(){

let file=document.getElementById("imageInput").files[0]

let form=new FormData()

form.append("image",file)

let res=await fetch("http://127.0.0.1:5000/scan",{

method:"POST",
body:form

})

let data=await res.json()

document.getElementById("ocrText").innerText=data.detected_text

if(data.prediction==1){

document.getElementById("scanResult").innerHTML="⚠ Fraud Detected"

}else{

document.getElementById("scanResult").innerHTML="✅ Safe"

}

}


// -----------------------------
// MAP
// -----------------------------

function initMap(){

map=L.map('map').setView([20,78],4)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

}

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.querySelector("input[type=email]").value;
  const password = document.querySelector("input[type=password]").value;

  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  if(email === savedEmail && password === savedPassword) {
    alert("Login Successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials");
  }
});
function addFraudLocation(){

let lat=20+Math.random()*10
let lon=78+Math.random()*10

L.circle([lat,lon],{

color:"red",
radius:50000

}).addTo(map)

}