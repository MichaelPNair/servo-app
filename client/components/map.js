let map, infoWindow;

async function initMap() {
    const {Map} = await google.maps.importLibrary("maps");
    const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");
    
//======= > finds current center position
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
        document.querySelector('.lat').textContent = lat;
        document.querySelector('.lng').textContent = lng;
        const centerPosition = { lat: lat, lng: lng  }

//======= > finds current address based on current center positions
        const geocoder = new google.maps.Geocoder()
        const addressLatLng = new google.maps.LatLng(lat, lng)

        geocoder.geocode({ location: addressLatLng }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                const address = results[0].formatted_address
                document.querySelector('.center-address').textContent = address
                    } else {
                        document.querySelector('.center-address').textContent = 'Geocoding failed'
                    }
            } else {
                document.querySelector('.center-address').textContent = 'Geocoding failed'
            }
        })

        map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        minZoom: 9,
        center: centerPosition,
        mapId: "DEMO_MAP_ID",
        });

        let latLng = map.getCenter();
        
        map.addListener('center_changed', () => {
            latLng = map.getCenter()
            let lat = document.querySelector('.lat')
            let lng = document.querySelector('.lng')
            lat.innerText = latLng.lat()
            lng.innerText = latLng.lng()

        })

//======= > creating markers       
        function createMarker(station) {
            const marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: { lat: station.latitude, lng: station.longitude },
                address: station.address,
                title: station.name,
                icon: {
                    size: new google.maps.Size(64, 64),
                    scaledSize: new google.maps.Size(40, 40),
                    url: station.logo_url,
                },
            })
        
            marker.addListener('click', () => {
                infoWindow.setContent(`<b>${marker.title}</b><p>${marker.address}</p>`)
                infoWindow.open(map, marker)
            })
        
            return marker
        }
        
//======= > placing markers only in specific bounds
        fetch('/api/stations/all')
            .then(response => response.json())
            .then(data => {
                infoWindow = new google.maps.InfoWindow()
                let markers = []
        
                map.addListener('dragend', () => {
                    let bounds = map.getBounds()
                        fetch(`/api/stations/bounds?neLat=${bounds.getNorthEast().lat()}&neLng=${bounds.getNorthEast().lng()}&swLat=${bounds.getSouthWest().lat()}&swLng=${bounds.getSouthWest().lng()}`)
                            .then(response => response.json())
                            .then(data => {
                                data.forEach(station => {
                                    if (bounds.contains({ lat: station.latitude, lng: station.longitude })) {
                                        const existingMarker = markers.find(marker => marker.title === station.name);
            
                                        if (existingMarker) {
                                            existingMarker.setPosition({ lat: station.latitude, lng: station.longitude });
                                        } else {
                                            const newMarker = createMarker(station);
                                            markers.push(newMarker);
                                        }
                                    }
                                })
                            })
    
                map.addListener('zoom_changed', () => {
                    let bounds = map.getBounds()
                        fetch(`/api/stations/bounds?neLat=${bounds.getNorthEast().lat()}&neLng=${bounds.getNorthEast().lng()}&swLat=${bounds.getSouthWest().lat()}&swLng=${bounds.getSouthWest().lng()}`)
                            .then(response => response.json())
                            .then(data => {
                                data.forEach(station => {
                                    if (bounds.contains({ lat: station.latitude, lng: station.longitude })) {
                                        const existingMarker = markers.find(marker => marker.title === station.name);
            
                                        if (existingMarker) {
                                            existingMarker.setPosition({ lat: station.latitude, lng: station.longitude });
                                        } else {
                                            const newMarker = createMarker(station);
                                            markers.push(newMarker);
                                        }
                                    }
                                })
                            })
                        })
                    })
                })
        })
        } else {
            alert("Please enable location services to use this feature.")
        }
        
    }

    initMap();