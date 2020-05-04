let a = new Date()
let b = Date.now()
let ampm
let userData = []

for (let i = 1; i < 24; i++) {
  (i > 12) ? ampm = 'PM' : ampm = "AM"


  let newElem = document.createElement('div')
  newElem.innerHTML = `  
<div class = "row">
    <div class= "hour" data-hourIndex="${i}"> <p>${i}:00 ${ampm}</p> </div>
    <input type="textarea" class="description" id="description" data-descIndex="${i}" placeholder="Task">      
    <button class="saveBtn" type="button" id="saveBtn" data-btnIndex="${i}"=>Save</button>
</div>`

  document.getElementById('container').append(newElem)
}

let timeList = document.querySelector('#container')
let descList = timeList.querySelectorAll('#description')
let hourList = timeList.querySelectorAll('.hour')

document.addEventListener('click', (event) => {
  if (event.target.id === "saveBtn" && descList[event.target.dataset.btnindex].value.length > 0) {
    let tempData = new Object()
    tempData.time = hourList[event.target.dataset.btnindex].textContent
    tempData.task = descList[event.target.dataset.btnindex].value

    let tempIndex = userData.findIndex(x => x.time === `${tempData.time}`)
    let tempLength = descList[event.target.dataset.btnindex].value.length
    // console.log(tempIndex)


    if (tempLength > 0 && tempIndex === -1) {
      console.log("is pushed")
      userData.push(tempData)
      setData()
    }
    else {
      userData[tempIndex].task = descList[event.target.dataset.btnindex].value
      setData()
    }
  }

})


let setData = () => {
  localStorage.setItem("data", JSON.stringify(userData))
}


const getData = () => {
  if (JSON.parse(localStorage.getItem('data')) != null) { return JSON.parse(localStorage.getItem('data')) }
  else {
    return []
  }
}

userData = getData()

for (let i = 0; i < 24; i++) {
  let tempIndex = userData.findIndex(x => x.time === hourList[i].textContent)

  if (tempIndex !== -1)
    descList[i].value = userData[tempIndex].task
}

document.getElementById("currentDay").textContent = `${Date().slice(0, 33)}`
setInterval(function () {

  document.getElementById("currentDay").textContent = `${Date().slice(0, 33)}`
  check()
}, 1000)

let check = () => {
  let moment = Date().slice(16, 18)
  for (let i = 0; i < 24; i++) {
    if (parseInt(moment) > parseInt(hourList[i].textContent.slice(0, 3).replace(/:/g, ""))) { descList[i].setAttribute("class", "past") }

    if (parseInt(moment) === parseInt(hourList[i].textContent.slice(0, 3).replace(/:/g, ""))) { descList[i].setAttribute("class", "present") }

    if (parseInt(moment) < parseInt(hourList[i].textContent.slice(0, 3).replace(/:/g, ""))) { descList[i].setAttribute("class", "future") }
  }
}