let map;
let route_list = [];
let currentSelection;
// let waypointId = null;

async function initMap() {
    // 必要なライブラリを読み込む
    const { Map } = await google.maps.importLibrary("maps");
    const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary("routes");

    // 立教大学新座キャンパスを中心とした地図のインスタンスを作成
    map = new Map(document.getElementById("map"), {
        center: { lat: 35.813828642214, lng: 139.5651521243 }, // 立教大学新座キャンパスの緯度経度
        zoom: 15,
        mapId: "DEMO_MAP_ID",
    });

    directionsService = new DirectionsService();
    directionsRenderer = new DirectionsRenderer({ draggable: true });
    directionsRenderer.setMap(map);

    directionsRenderer.addListener("directions_changed", () => {
        const directions = directionsRenderer.getDirections();
        if (directions) computeTotalDistance(directions);
    });
}


function clickAndGetLatLng(waypointId) {
    console.log(currentSelection, waypointId)
    map.addListener("click", (mapsMouseEvent) => {
        const gotLatLng = mapsMouseEvent.latLng.toJSON();

        if (currentSelection === "startpoint") {
            route_list[0] = gotLatLng;
            specifyLocationAndChangeButton();
        } else if (currentSelection === "endpoint") {
            route_list[route_list.length] = gotLatLng;
        } else if (currentSelection === "waypoint" && waypointId !== null) {
            route_list[Number(waypointId)] = gotLatLng;
        }

        calculateRoute();

        currentSelection = null;
    });
}

async function calculateRoute() {
    if (route_list.length >= 2) {
        let request;

        if (route_list.length === 2) {
            request = {
                origin: route_list[0],
                destination: route_list[1],
                travelMode: "WALKING",
            };
        } else {
            request = {
                origin: route_list[0],
                destination: route_list[route_list.length - 1],
                waypoints: route_list.slice(1, route_list.length - 1).map(location => ({ location })), // ここ合っているの？
                travelMode: "WALKING",
            };
        }

        directionsService.route(request)
            .then(response => directionsRenderer.setDirections(response))
            .catch(error => console.error("Directions request failed:", error))
    }
}



let count = 0;

// function addWaypoint() {
//     count += 1;

//     const waypointDiv = document.createElement("div");
//     waypointDiv.innerHTML = `
//         <button type="button" id="${count}">途中地点${count}を選択</button>    
//     `;
//     document.getElementById("waypoints").appendChild(waypointDiv);

//     document.getElementById(`${count}`).addEventListener("click", () => {
//         currentSelection = "waypoint";
//         clickAndGetLatLng(count);
//         console.log(currentSelection, count);
//     });
// }


function addWaypoint() {
    count += 1;

    const waypointDiv = document.createElement("div");
    waypointDiv.innerHTML = `
        <button type="button" id="${count}">途中地点${count}を選択</button>    
    `;
    document.getElementById("waypoints").appendChild(waypointDiv);

    (function(waypointId) {
        document.getElementById(waypointId).addEventListener("click", () => {
            currentSelection = "waypoint";
            clickAndGetLatLng(waypointId);
            console.log(currentSelection, waypointId);
        });
    })(count);
}



const computeTotalDistance = (result) => {
    let total = 0;
    const myroute = result.routes[0];
  
    if (!myroute) return;
  
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }

    total = total / 1000; 
    document.getElementById("total").innerHTML = total + " km";
};

const specifyLocationAndChangeButton = () => {
    if (route_list[0]) {
        const startpointEl = document.getElementById("startpoint");
        startpointEl.classList.remove(...startpointEl.classList);
        startpointEl.classList.add("w-full", "mx-auto", "rounded-full", "border-2", "border-purple-700", "p-2", "bg-white", "text-purple-700", "font-medium");
        startpointEl.textContent = "スタート地点設定完了！";
    }
};



// ボタンイベントの設定
document.getElementById("startpoint").addEventListener("click", () => {
    currentSelection = "startpoint";
    clickAndGetLatLng(null);
});
document.getElementById("endpoint").addEventListener("click", () => {
    currentSelection = "endpoint";
    clickAndGetLatLng(null)
});
document.getElementById("addWaypoint").addEventListener("click", addWaypoint);