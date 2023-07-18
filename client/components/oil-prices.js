// require('dotenv').config()


const date = new Date()
const dateString = date.toLocaleDateString('en-GB')
const oilDate = document.querySelector('.date')
oilDate.textContent = dateString

// const res = await axios.get(
    //     'api.futures-api.com/symbols', 
    //       {
        //         headers: {
            //             'x-api-key': {CHCzj9LdpT1pTjL76rBC01vhn6ghrZYh82lFaCez}
            //         }
            //       }
            //     )
            // console.log(res.data)

            const symbols = ['CL', 'BB', 'NG']

            const oilName = ['WTI OIL', 'Brent Oil', 'Natural Gas']

            const oilUnits = ['USD per barrel', 'USD per barrel', 'USD per MMBtu']
            
            const oilPrice = document.querySelector('.price')
            
            
            for(let i = 0; i < symbols.length; i++) {

                fetch(`https://api.futures-api.com/last?symbol=${symbols[i]}`, {
                    headers: {
                        'x-api-key': 'CHCzj9LdpT1pTjL76rBC01vhn6ghrZYh82lFaCez'
                    }
                } )
                .then(res => res.json())
                .then(res => {
                    const last = res.data[0].last
                    
              const oil = document.createElement('li')
              oil.textContent = `${oilName[i]} ${last} ${oilUnits[i]}`
              oilPrice.appendChild(oil)
            })
                
            }






          // CL = WTI
          // NG = NATURAL GAS
          // BB = BRENT OIL

          // How can we change the parameter without separate fetch requests