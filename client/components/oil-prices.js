const date = new Date()
const dateString = date.toLocaleDateString('en-GB')
const oilDate = document.querySelector('.date')
oilDate.textContent = dateString