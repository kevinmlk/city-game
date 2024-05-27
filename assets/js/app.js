var map = L.map('map').setView([50.850346, 4.351721], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var castleRooigem = L.circle([51.217803, 3.264291], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 250
}).addTo(map);

var castleMale = L.circle([51.209272, 3.288367], {
  color: 'red',
  fillColor: '#f52',
  fillOpacity: 0.5,
  radius: 250
}).addTo(map);

var castleRyckevelde = L.circle([51.197332, 3.295418], {
  color: 'red',
  fillColor: '#f89',
  fillOpacity: 0.5,
  radius: 250
}).addTo(map);

var castleMinnewater = L.circle([51.199555, 3.22456], {
  color: 'red',
  fillColor: '#f56',
  fillOpacity: 0.5,
  radius: 250
}).addTo(map);

var castleKevergem = L.circle([51.177403, 3.23568], {
  color: 'red',
  fillColor: '#f11',
  fillOpacity: 0.5,
  radius: 250
}).addTo(map);

// navigator.geolocation.watchPosition(success, error);

let marker;
let circle;
let zoomed;

// function success(pos) {
//   const lat = pos.coords.latitude;
//   const lng = pos.coords.longitude;
//   const accuracy = pos.coords.accuracy;

//   if (marker) {
//     map.removeLayer(marker);
//     map.removeLayer(circle);
//   }

//   marker = L.marker([lat, lng]).addTo(map);
//   circle = L.circle([lat, lng], {radius: accuracy}).addTo(map);

//   if (!zoomed) {
//     zoomed = map.fitBounds(circle.getBounds());
//   }

//   map.setView([lat, lng]);

//   console.log(pos);
// };

function error(err) {
 if (err.code === 1) {
   alert("Error: Access is denied!");
 } else {
   alert("Error: Cannot get location!");
 }
};

var polygon = L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047]
]).addTo(map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);