# Servo App

This is a single page application done in HTML, CSS and Javascript with express. That utilizes the Google Maps API, Google Geocoding API and FuturesAPI to help users search for all petrol stations in Australia. The application provides users with the latest prices of oil and gas allows users to find their nearest stations.

## Technologies used

* Front-end technologies: HTML, CSS, JavaScript, Express
* Back-end technologies : Node.js, EJS
* Database: Postgres SQL
* Google Maps API
* Google Geocoding API
* FuturesAPI
* Trello
* Git

## Features

* Map: Upon loading the page the app displays the map centered on your current location and adds markers for petrol station within the map. If you drag or zoom the map, the markers will be updated.
* Stats Section: From a database of petrol stations, this displays the number of petrol stations for each owner in descending order.
* Petrol Station Search: Users can search for petrol stations in Australia using the application.
* Latest Oil and Gas Prices: The application fetches and displays the latest prices of oil and gas.
* Nearest Station Finder: the application will get your current location and calculate and display the nearest stations.
* Clock: gets your current time and displays it. The clock updates per second.
* Map Center Location: Gets your current location and displays the latitude, longitude and the address associated using Google's Geocoding API.


## Team members

- Michael Nair [GitHub Profile](https://github.com/MichaelPNair)
- Chatkamon Chantaraparsop [Github Profile](https://github.com/zebelity)
- Geoff Lazarus [GitHub](https://github.com/geoffjlazarus/)
- Andy Wang [GitHub Profile](https://github.com/andysw8)
- Alessandra Manalansan [GitHub Profile](https://github.com/alesmnlnsan)

## Screenshots
### Initial Screen
![Screenshot initial servo app page](/screenshot/servo_app_screen.png)


## Future Improvements

* Price Comparison: Implement a price comparison feature that allows users to compare petrol prices between different stations in the same area.
* Map nearest stations updated when the current map center changes.
