fetch('/api/stations/random')
    .then(response => response.json())
    .then(data => {
        const name = document.querySelector('.name')
        const address = document.querySelector('.address')
        const logo = document.querySelector('#logo')
        const logoImage = document.createElement("img")
        logo.appendChild(logoImage)
        logoImage.src = data.logo_url
        logoImage.style.height = '64px'
        logoImage.style.width = '64px'
        
        name.innerText = data.name
        address.innerText = data.address
    })

//===== > refresh hyperlink to display another random station
const refresh = document.querySelector('#refresh')
    refresh.addEventListener('click', fetch('/api/stations/random'))