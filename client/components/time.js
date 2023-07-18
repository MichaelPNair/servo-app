const datetime = new Date().getDate();
//console.log(datetime)

function refreshTime() {
  const timeDisplay = document.querySelector(".show-time")
  const date = new Date()
  const dateString = date.toDateString()
  const timeString = date.toLocaleTimeString()
  
  timeDisplay.textContent = `${dateString} ${timeString}`
}

setInterval(refreshTime, 1000)