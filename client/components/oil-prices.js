
const date = new Date()
const dateString = date.toLocaleDateString('en-GB')
const oilDate = document.querySelector('.date')
oilDate.textContent = dateString
const symbols = ['CL', 'BB', 'NG']
const oilName = ['WTI OIL', 'Brent Oil', 'Natural Gas']
const oilUnits = ['USD per barrel', 'USD per barrel', 'USD per MMBtu']
const oilPrice = document.querySelector('.price')
const prices = ['.wti-price', '.brent-price', '.natural-price']

    for(let i = 0; i < symbols.length; i++) {
        fetch(`https://api.futures-api.com/last?symbol=${symbols[i]}`, {
            headers: {
                'x-api-key': 'xkhNjWSpLv1IqseSaCizE3g96ylVPKwE5I07UTJq'
            }
        } )
        .then(res => res.json())
        .then(res => {
            const last = res.data[0].last
            const oil = document.querySelector(prices[i])
            oil.textContent = `${oilName[i]} ${last} ${oilUnits[i]}`
        })  
    }

