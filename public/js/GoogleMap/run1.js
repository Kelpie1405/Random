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

    // マップが初期化された後にボタンイベントを設定する
    setButtonListeners();
}

// ここから書く

// let clickListener = null;

// const startpointEl = document.getElementById("startpoint");
// startpointEl.addEventListener("click", () => {
//     startpointEl.textContent = "選択可能！"

//     if (clickListener) {
//         google.maps.event.removeListener(clickListener);
//     }

//     clickListener = map.addListener("click", (mapsMouseEvent) => {
//         const gotLatLng = mapsMouseEvent.latLng.toJSON();
//         route_list[0] = gotLatLng;

//         startpointEl.textContent = "設定完了！";
//         console.log("スタート：", route_list);
//     })
// });

// const endpointEl = document.getElementById("endpoint");
// endpointEl.addEventListener("click", () => {
//     endpointEl.textContent = "選択可能！"

//     if (clickListener) {
//         google.maps.event.removeListener(clickListener);
//     }

//     clickListener = map.addListener("click", (mapsMouseEvent) => {
//         const gotLatLng = mapsMouseEvent.latLng.toJSON();
//         route_list[route_list.length] = gotLatLng;
        
//         endpointEl.textContent = "設定完了！"

//         const request = {
//             origin: route_list[0],
//             destination: route_list[route_list.length - 1],
//             travelMode: "WALKING",
//         };
//         directionsService.route(request, (response) => {
//             directionsRenderer.setDirections(response);
//         });
//         console.log("ゴール：", route_list);
//     });
// });

let selectedPoint = "null";
let clickListener = null;
let count = 0;
let waypointEl = null;


const startpointEl = document.getElementById("startpoint");
const endpointEl = document.getElementById("endpoint");
const addWaypointEl = document.getElementById("addWaypoint");

function setButtonListeners() {
    startpointEl.addEventListener("click", () => setLocationPoint(startpointEl, 0, "スタート地点"));
    endpointEl.addEventListener("click", () => setLocationPoint(endpointEl, route_list.length, "ゴール地点"));

    addWaypointEl.addEventListener("click", () => {
        count += 1;

        // 新規追加されるボタンのHTML要素を作成
        const waypointDiv = document.createElement("div");
        waypointDiv.innerHTML = `
            <button type="button" id="${count}" class="waypoints">途中地点${count}を選択</button>    
        `;
        document.getElementById("waypoints").appendChild(waypointDiv);

        // 作成したボタンにイベントリスナーを登録
        waypointEl = document.getElementById(count);
        waypointEl.addEventListener("click", () => {
            setLocationPoint(waypointEl, route_list.length, `途中地点${count}`);
        });

        addWaypointEl.disabled = true;
    });
}


// function clickSetButtonListener(selectedPoint) {
//     console.log(selectedPoint);
// }

// startpointEl.addEventListener("click", () => {
//     startpointEl.textContent = "スタート地点設定可能！";
//     startpointEl.disabled = true;

//     clickListener = map.addListener("click", (mapsMouseEvent) => {
//         const gotLatLng = mapsMouseEvent.latLng.toJSON();
//         route_list[0] = gotLatLng;

//         startpointEl.textContent = "スタート地点設定完了！";
//         startpointEl.classList.remove(...startpointEl.classList);
//         startpointEl.classList.add("w-full", "mx-auto", "rounded-full", "border-2", "border-purple-700", "p-2", "bg-white", "text-purple-700", "font-medium");

//         google.maps.event.removeListener(clickListener);

//         console.log("スタート：", route_list);
//     })
// });

// endpointEl.addEventListener("click", () => {
//     endpointEl.textContent = "ゴール地点設定可能！";
//     endpointEl.disabled = true;

//     clickListener = map.addListener("click", (mapsMouseEvent) => {
//         const gotLatLng = mapsMouseEvent.latLng.toJSON();
//         route_list[route_list.length] = gotLatLng;
        
//         endpointEl.textContent = "ゴール地点設定完了！";
//         endpointEl.classList.remove(...endpointEl.classList);
//         endpointEl.classList.add("w-full", "mx-auto", "rounded-full", "border-2", "border-purple-700", "p-2", "bg-white", "text-purple-700", "font-medium");

//         google.maps.event.removeListener(clickListener);

//         const request = {
//             origin: route_list[0],
//             destination: route_list[route_list.length - 1],
//             travelMode: "WALKING",
//         };
//         directionsService.route(request, (response) => {
//             directionsRenderer.setDirections(response);
//         });
//         console.log("ゴール：", route_list);
//     });
// });

function setLocationPoint(buttonEl, index, label) {
    buttonEl.textContent = `${label}設定可能！`;
    buttonEl.disabled = true;

    clickListener = map.addListener("click", (mapsMouseEvent) => {
        const gotLatLng = mapsMouseEvent.latLng.toJSON();
        route_list[index] = gotLatLng;
        console.log(`${label}:${index}`, route_list, route_list.length);

        buttonEl.textContent = `${label}OK！`;
        buttonEl.classList.remove(...buttonEl.classList);
        buttonEl.classList.add("w-full", "mx-auto", "rounded-full", "border-2", "border-purple-700", "p-2", "bg-white", "text-purple-700", "font-medium");

        if (buttonEl === startpointEl) {
            addWaypointEl.disabled = false;
            endpointEl.disabled = false;
        } else if (buttonEl === endpointEl) {
            addWaypointEl.disabled = true;
            document.querySelectorAll(".waypoints").forEach((waypoint) => waypoint.disabled = true);
        } else if (buttonEl === waypointEl) {
            addWaypointEl.disabled = false;
        }
        
        if (route_list.length === 2) {
            const request = {
                origin: route_list[0],
                destination: route_list[1],
                travelMode: "WALKING",
            };

            directionsService.route(request, (response) => {
                directionsRenderer.setDirections(response);
            });
        } else if (route_list.length > 2) {
            const request = {
                origin: route_list[0],
                waypoints: route_list.slice(1, route_list.length - 1).map(location => ({ location })), // ここ合っているの？
                destination: route_list[route_list.length - 1],
                travelMode: "WALKING",
            };

            directionsService.route(request, (response) => {
                directionsRenderer.setDirections(response);
            });
        }
        // if (buttonEl === endpointEl) {
        //     const request = {
        //         origin: route_list[0],
        //         destination: route_list[route_list.length - 1],
        //         travelMode: "WALKING",
        //     };
        //     directionsService.route(request, (response) => {
        //         directionsRenderer.setDirections(response);
        //     });
        // } else if (buttonEl === waypointEl) {
        //     const request = {
        //         origin: route_list[0],
        //         waypoints: route_list.slice(1, route_list.length - 1).map(location => ({ location })), // ここ合っているの？
        //         destination: route_list[route_list.length - 1],
        //         travelMode: "WALKING",
        //     };
        //     directionsService.route(request, (response) => {
        //         directionsRenderer.setDirections(response);
        //     });
        // }

        google.maps.event.removeListener(clickListener);
    });
}



// ここまでだよ


// function clickAndGetLatLng(waypointId) {
//     console.log(currentSelection, waypointId)
//     map.addListener("click", (mapsMouseEvent) => {
//         const gotLatLng = mapsMouseEvent.latLng.toJSON();

//         if (currentSelection === "startpoint") {
//             route_list[0] = gotLatLng;
//             specifyLocationAndChangeButton();
//         } else if (currentSelection === "endpoint") {
//             route_list[route_list.length] = gotLatLng;
//         } else if (currentSelection === "waypoint" && waypointId !== null) {
//             route_list[Number(waypointId)] = gotLatLng;
//         }

//         calculateRoute();

//         currentSelection = null;
//     });
// }

// async function calculateRoute() {
//     if (route_list.length >= 2) {
//         let request;

//         if (route_list.length === 2) {
//             request = {
//                 origin: route_list[0],
//                 destination: route_list[1],
//                 travelMode: "WALKING",
//             };
//         } else {
//             request = {
//                 origin: route_list[0],
//                 destination: route_list[route_list.length - 1],
//                 waypoints: route_list.slice(1, route_list.length - 1).map(location => ({ location })), // ここ合っているの？
//                 travelMode: "WALKING",
//             };
//         }

//         directionsService.route(request)
//             .then(response => directionsRenderer.setDirections(response))
//             .catch(error => console.error("Directions request failed:", error))
//     }
// }



// let count = 0;

// // function addWaypoint() {
// //     count += 1;

// //     const waypointDiv = document.createElement("div");
// //     waypointDiv.innerHTML = `
// //         <button type="button" id="${count}">途中地点${count}を選択</button>    
// //     `;
// //     document.getElementById("waypoints").appendChild(waypointDiv);

// //     document.getElementById(`${count}`).addEventListener("click", () => {
// //         currentSelection = "waypoint";
// //         clickAndGetLatLng(count);
// //         console.log(currentSelection, count);
// //     });
// // }


// function addWaypoint() {
//     count += 1;

//     const waypointDiv = document.createElement("div");
//     waypointDiv.innerHTML = `
//         <button type="button" id="${count}">途中地点${count}を選択</button>    
//     `;
//     document.getElementById("waypoints").appendChild(waypointDiv);

//     (function(waypointId) {
//         document.getElementById(waypointId).addEventListener("click", () => {
//             currentSelection = "waypoint";
//             clickAndGetLatLng(waypointId);
//             console.log(currentSelection, waypointId);
//         });
//     })(count);
// }


function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];
  
    if (!myroute) return;
  
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }

    total = total / 1000; 
    document.getElementById("total").innerHTML = total + " km";
};


