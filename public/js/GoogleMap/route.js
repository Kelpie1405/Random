let map;

// blade.phpファイルが読み込まれた際に実行される
async function initMap() {
    // 必要なライブラリを読み込む
    const { Map } = await google.maps.importLibrary("maps");
    const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary("routes");

    // 東京ドームを中心とした地図のインスタンスを作成
    map = new Map(document.getElementById("map"), {
        center: { lat: 35.7056232, lng: 139.751919 }, // 東京ドームの座標
        zoom: 13,
    });

    // DirectionsServiceクラスとDirectionsRendererクラスをインスタンス化
    const directionsService = new DirectionsService();
    const directionsRenderer = new DirectionsRenderer();

    // ルートを表示する地図を指定する
    directionsRenderer.setMap(map);

    // スタート地点とゴール地点の要素を取得
    const startpoint = document.getElementById("startpoint");
    const endpoint = document.getElementById("endpoint");

    // スタート地点とゴール地点の値が変化したときのイベントを登録
    const onChangeHandler = () => {
        // スタート地点とゴール地点の両方の値が指定されたら実行される
        if (startpoint.value && endpoint.value) {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        }
    };

    // スタート地点とゴール地点の値が変化したときのイベントハンドラーを設定
    startpoint.addEventListener("change", onChangeHandler);
    endpoint.addEventListener("change", onChangeHandler);
}

// ルートの計算と表示の関数
async function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    // ルート検索リクエストを送信する
    directionsService
        .route({
            origin: { query: startpoint.value  }, // スタート地点をクエリ文字列で設定
            destination: { query: endpoint.value }, // ゴール地点をクエリ文字列で設定
            travelMode: "WALKING", // 移動手段を徒歩に設定
        })
        // ルート検索が成功した場合、ルートを表示する
        .then((response) => {
            directionsRenderer.setDirections(response);
        })
        // ルート検索が失敗した場合、エラー文を表示する
        .catch((e) => window.alert("Directions request failed due to " + status));
}