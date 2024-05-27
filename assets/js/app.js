const latitudeEl = document.querySelector("#lat");
const longitudeEl = document.querySelector("#long");
const accuracyEl = document.querySelector("#acc");
const feedbackEl = document.querySelector("#feedback");
const visitedEl = document.querySelector("#btn-visited");

let locationWatch;
let marker;
let circle;
let zoomed;

document.querySelector("#btn-request").addEventListener("click", getGeolocation);
document.querySelector("#btn-watch").addEventListener("click", watchGeolocation);
document.querySelector("#btn-stop").addEventListener("click", stopWatchGeolocation);

function showVisitedBtn(castle) {
  if (visitedEl.classList.contains("d-none")) {
    visitedEl.classList.remove("d-none");
    visitedEl.textContent = 'Mark ' + castle + ' as Visited';
  }
}

function hideVisitedBtn() {
  if (!visitedEl.classList.contains("d-none")) {
    visitedEl.classList.add("d-none");
  }
}

// Startpoint for the map
var map = L.map('map').setView([50.850346, 4.351721], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Castles
var castleRooigem = L.circle([51.217803, 3.264291], {
  color: '#FDDA24',
  fillColor: '#FDDA24 ',
  fillOpacity: 0.7,
  radius: 250
}).addTo(map);

console.log(castleRooigem._latlng.lat);

castleRooigem.bindPopup("Not yet visited");

var castleMale = L.circle([51.209272, 3.288367], {
  color: '#FDDA24',
  fillColor: '#FDDA24',
  fillOpacity: 0.7,
  radius: 250
}).addTo(map);

var castleRyckevelde = L.circle([51.197332, 3.295418], {
  color: '#FDDA24',
  fillColor: '#FDDA24',
  fillOpacity: 0.7,
  radius: 250
}).addTo(map);

var castleMinnewater = L.circle([51.199555, 3.22456], {
  color: '#FDDA24',
  fillColor: '#FDDA24',
  fillOpacity: 0.7,
  radius: 250
}).addTo(map);

var castleKevergem = L.circle([51.177403, 3.23568], {
  color: '#FDDA24',
  fillColor: '#FDDA24',
  fillOpacity: 0.7,
  radius: 250
}).addTo(map);

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

  // Check if the user is near a castle
  nearCastle(pos);
}



function nearCastle(currentPos) {

  switch (currentPos.coords.latitude && currentPos.coords.longitude) {
    case castleRooigem._latlng.lat && castleRooigem._latlng.lng:
      showVisitedBtn('Rooigem');
      console.log('Rooigem');
      break;
    case castleMale._latlng.lat && castleMale._latlng.lng:
      showVisitedBtn('Male');
      console.log('Male');
      break;
    case castleRyckevelde._latlng.lat && castleRyckevelde._latlng.lng:
      showVisitedBtn('Ryckevelde');
      console.log('Ryckevelde');
      break;
    case castleMinnewater._latlng.lat && castleMinnewater._latlng.lng:
      showVisitedBtn('Minnewater');
      console.log('Minnewater');
      break;
    case castleKevergem._latlng.lat && castleKevergem._latlng.lng:
      showVisitedBtn('Kevergem');
      console.log('Kevergem');
      break;
    default:
      hideVisitedBtn();
      console.log('Not near a castle...');
      break;
  }
  // if (currentPos.coords.latitude === castle._latlng.lat && currentPos.coords.longitude === castle._latlng.lng) {
  //   console.log('Ur near a castle!');
  // } else {
  //   console.log('Not near a castle...');
  // }

  console.log(currentPos.coords);
  // console.log(castle._latlng);
}

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

  // Check if the user is near a castle
  nearCastle(pos);
};

function error(err) {
 if (err.code === 1) {
   alert("Error: Access is denied!");
 } else {
   alert("Error: Cannot get location!");
 }
};
