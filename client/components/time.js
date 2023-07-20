const datetime = new Date().getDate();
//console.log(datetime)

function refreshTime() {
  const timeDisplay = document.querySelector(".show-time")
  const date = new Date()
  const dateString = date.toDateString()
  
  timeDisplay.textContent = dateString
}

function updateClock() {
  const d = new Date(); //object of date()
  const hr = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  const hr_rotation = 30 * hr + min / 2; //converting current time
  const min_rotation = 6 * min;
  const sec_rotation = 6 * sec;

  const hour = document.getElementById("hour");
  const minute = document.getElementById("minute");
  const second = document.getElementById("second")

  hour.style.transform = `rotate(${hr_rotation}deg)`;
  minute.style.transform = `rotate(${min_rotation}deg)`;
  second.style.transform = `rotate(${sec_rotation}deg)`;
}

setInterval(() => {
  refreshTime()
  updateClock()
}, 1000)