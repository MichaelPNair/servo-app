

let map, infoWindow;

async function initMap() {
    
    const {Map} = await google.maps.importLibrary("maps");
    const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          document.querySelector('.lat').textContent = lat
          document.querySelector('.lng').textContent = lng
          const centerPosition = { lat: lat, lng: lng }
    
          const geocoder = new google.maps.Geocoder()
          const addressLatLng = new google.maps.LatLng(lat, lng)
    
          const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 6,
            minZoom: 9,
            center: centerPosition,
            mapId: "DEMO_MAP_ID",
          });
    
          let latLng = map.getCenter()
    
          map.addListener('center_changed', () => {
            latLng = map.getCenter()
            let lat = document.querySelector('.lat')
            let lng = document.querySelector('.lng')
            lat.innerText = latLng.lat()
            lng.innerText = latLng.lng()
    
            const addressLatLng = new google.maps.LatLng(latLng.lat(), latLng.lng())
    
            geocoder.geocode({ location: addressLatLng }, (results, status) => {
              if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                const address = results[0].formatted_address
                document.querySelector('.center-address').textContent = address;
              } else {
                document.querySelector('.center-address').textContent = 'Geocoding failed'
              }
            })
          })
   
   
    fetch('/api/stations/all')
        .then(response => response.json())
        .then(data => {
            infoWindow = new google.maps.InfoWindow()
            data.forEach(station => {
                const marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: { lat: station.latitude, lng: station.longitude },
                    address: station.address,
                    title: station.name,
                    icon: {
                        size: new google.maps.Size(64, 64),
                        scaledSize: new google.maps.Size(40, 40),
                        url: station.logo_url
                    }
                })

                
                marker.addListener('click', () => {
                    infoWindow.setContent(`<b>${marker.title}</b><p>${marker.address}</p>`)
                    infoWindow.open(map, marker)
                });
                // marker.addListener('mouseout', () => {
                //     infoWindow.close();
                // })
            })

            map.addListener('dragend', () => {
                let bounds = map.getBounds();
                let northEast = bounds.getNorthEast()
                let southWest = bounds.getSouthWest()
                let northWest = { lat: southWest.lat(), lng: northEast.lng() }
                let southEast = { lat: northEast.lat(), lng: southWest.lng() }

               console.log(`NE Lat ${northEast.lat()}, NE Lng: ${northEast.lng()}, SW lat ${southWest.lat()}, SW Lng ${southWest.lng()}`)
               console.log(`SE lat: ${southEast.lat}, NW lng: ${northWest.lng} NW lat ${northWest.lat}, SE lng: ${southEast.lng}`)
            })

            map.addListener('zoom_changed', () => {
                let bounds = map.getBounds()
                let northEast = bounds.getNorthEast()
                let southWest = bounds.getSouthWest()
                let northWest = { lat: southWest.lat(), lng: northEast.lng() }
                let southEast = { lat: northEast.lat(), lng: southWest.lng() }

               console.log(`NE Lat ${northEast.lat()}, NE Lng: ${northEast.lng()}, SW lat ${southWest.lat()}, SW Lng ${southWest.lng()}`)
               console.log(`SE lat: ${southEast.lat}, NW lng: ${northWest.lng} NW lat ${northWest.lat}, SE lng: ${southEast.lng}`)
            })

        
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
          //  console.log(data)
        })
        const refresh = document.querySelector('#refresh')
            refresh.addEventListener('click', fetch('/api/stations/random'))
    })

        })
    } else {
        alert("Please enable location services to use this feature.")
    }
    
}



initMap()