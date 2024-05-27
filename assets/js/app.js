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
visitedEl.addEventListener("click", () => {
  
});

function showVisitedBtn(castle) {
  if (visitedEl.classList.contains("d-none")) {
    visitedEl.classList.remove("d-none");
    visitedEl.textContent = 'Mark ' + castle + ' as Visited';
    visitedEl.addEventListener("click", function() {
      // Change the fillColor of the corresponding castle
      switch (castle) {
        case "Rooigem":
          castleRooigem.setStyle({color: 'green', fillColor: 'green'});
          visitedEl.classList.add("d-none");
          break;
        case "Male":
          castleMale.setStyle({color: 'green', fillColor: 'green'});
          visitedEl.classList.add("d-none");
          break;
        case "Ryckevelde":
          castleRyckevelde.setStyle({color: 'green', fillColor: 'green'});
          visitedEl.classList.add("d-none");
          break;
        case "Minnewater":
          castleMinnewater.setStyle({color: 'green', fillColor: 'green'});
          visitedEl.classList.add("d-none");
          break;
        case "Kevergem":
          castleKevergem.setStyle({color: 'green', fillColor: 'green'});
          visitedEl.classList.add("d-none");
          break;
        default:
          break;
      }
    });
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
  const userLat = currentPos.coords.latitude;
  const userLng = currentPos.coords.longitude;

  // Calculate the distance between two points using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180; // deg2rad below
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const d = R * c; // Distance in km
    return d;
  }

  // Check the distance between the user's position and each castle
  const distances = {
    "castleRooigem": calculateDistance(userLat, userLng, castleRooigem._latlng.lat, castleRooigem._latlng.lng),
    "castleMale": calculateDistance(userLat, userLng, castleMale._latlng.lat, castleMale._latlng.lng),
    "castleRyckevelde": calculateDistance(userLat, userLng, castleRyckevelde._latlng.lat, castleRyckevelde._latlng.lng),
    "castleMinnewater": calculateDistance(userLat, userLng, castleMinnewater._latlng.lat, castleMinnewater._latlng.lng),
    "castleKevergem": calculateDistance(userLat, userLng, castleKevergem._latlng.lat, castleKevergem._latlng.lng)
  };

  // Define a smaller threshold for the user to be considered near a castle
  const smallerThreshold = 0.1; // You can adjust this value as needed

  // Check if the user is within the range of any castle
  let nearCastleName = null;
  for (const castle in distances) {
    if (distances[castle] <= smallerThreshold) {
      nearCastleName = castle;
      break;
    }
  }

  // Show or hide the visited button based on the result
  if (nearCastleName) {
    showVisitedBtn(nearCastleName.replace('castle', ''));
    console.log(`You are near ${nearCastleName.replace('castle', '')}`);
  } else {
    hideVisitedBtn();
    console.log('Not near a castle...');
  }
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
