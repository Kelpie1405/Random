let map;

// blade.phpファイルが読み込まれた際に実行される
async function initMap() {
    // 必要なライブラリを読み込む
    const { Map } = await google.maps.importLibrary("maps");

    // コメントを書きたい
    const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary("routes");
    console.log(await google.maps.importLibrary("routes"));
    console.log(DirectionsService, DirectionsRenderer);


    // 東京ドームを中心とした地図のインスタンスを作成
    map = new Map(document.getElementById("map"), {
        center: { lat: 35.7056232, lng: 139.751919 }, // 東京ドームの座標
        zoom: 13,
        mapId: "DEMO_MAP_ID",
    });

    // コメントを書きたい
    DirectionsRenderer.setMap(map);

    // コメントを書きたい
    const onChangeHandler = () => {
        calculateAndDisplayRoute(DirectionsService, DirectionsRenderer);
    };

    // コメントを書きたい
    document.getElementById("startpoint").addEventListener("change", onChangeHandler);
    document.getElementById("endpoint").addEventListener("change", onChangeHandler);
    document.getElementById("addWaypoint").addEventListener("click", addWaypoint);
}


async function calculateAndDisplayRoute(DirectionsService, DirectionsRenderer) {
    const waypoints = [];
    const waypointsEl = document.querySelectorAll(".waypoints");
    waypointsEl.forEach((element) => {
        if (element !== "") {
            waypoints.push({
                location: element.value,
                stopover: true,
            })
        }
    });

    DirectionsService.route({
        origin: {
          query: document.getElementById("startpoint").value,
        },
        destination: {
          query: document.getElementById("endpoint").value,
        },
        waypoints: waypoints,
        travelMode: "WALKING",
    })
    .then((response) => {
        directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

const addWaypoint = () => {
    const waypointDiv = document.createElement("div");
    waypointDiv.innerHTML = '<input class="waypoints" type="text" placeholder="途中地点">';
    document.getElementById("waypoints").appendChild(waypointDiv);

    waypointDiv.addEventListener("change", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
}