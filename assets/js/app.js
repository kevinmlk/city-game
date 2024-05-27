const latitudeEl = document.querySelector("#lat");
const longitudeEl = document.querySelector("#long");
const accuracyEl = document.querySelector("#acc");
const feedbackEl = document.querySelector("#feedback");

let locationWatch;
let marker;
let circle;
let zoomed;

document.querySelector("#btn-request").addEventListener("click", getGeolocation);
document.querySelector("#btn-watch").addEventListener("click", watchGeolocation);
document.querySelector("#btn-stop").addEventListener("click", stopWatchGeolocation);

function getGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    feedbackEl.textContent = "let\'s see where you are, just this once...";
  } else {
    feedbackEl.textContent = "Geolocation is not supported by this browser.";
  }
}

function watchGeolocation() {
  if (navigator.geolocation) {
    locationWatch = navigator.geolocation.watchPosition(success, error);
    console.log("started location watcher");
    feedbackEl.textContent = "Following your location...";
  } else {
    feedbackEl.textContent = "Geolocation is not supported by this browser.";
  }
}

function stopWatchGeolocation() {
  if (navigator.geolocation) {
    //stop watcher stored in locationWatch
    navigator.geolocation.clearWatch(locationWatch);
    console.log("cleared location watcher");
    feedbackEl.textContent = "No more following your location...";
  }

}
function showPosition(pos) {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  const accuracy = pos.coords.accuracy;

  if (marker && circle) {
    map.removeLayer(marker);
    map.removeLayer(circle);
  }

  marker = L.marker([lat, lng]).addTo(map);
  circle = L.circle([lat, lng], {radius: accuracy}).addTo(map);

  zoomed = map.fitBounds(circle.getBounds());

  map.setView([lat, lng]);

  latitudeEl.innerText = pos.coords.latitude;//always returned
  longitudeEl.innerText = pos.coords.longitude;//always returned
  accuracyEl.innerText = pos.coords.accuracy;
  console.log(pos);
}

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

function success(pos) {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  const accuracy = pos.coords.accuracy;

  if (marker) {
    map.removeLayer(marker);
    map.removeLayer(circle);
  }

  marker = L.marker([lat, lng]).addTo(map);
  circle = L.circle([lat, lng], {radius: accuracy}).addTo(map);

  if (!zoomed) {
    zoomed = map.fitBounds(circle.getBounds());
  }

  map.setView([lat, lng]);

  latitudeEl.innerText = pos.coords.latitude;//always returned
  longitudeEl.innerText = pos.coords.longitude;//always returned
  accuracyEl.innerText = pos.coords.accuracy;
  console.log(pos);
};

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
castleRooigem.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);