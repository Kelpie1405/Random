/*
【参考】
・基本事項
    https://developers.google.com/maps/documentation/javascript?hl=ja&_gl=1*ouv73c*_up*MQ..*_ga*ODI3MTg4NDU2LjE3MjM5Njc3NjI.*_ga_NRWSTWS78N*MTcyMzk2Nzc2Mi4xLjAuMTcyMzk2Nzc2Mi4wLjAuMA..
・AdvancedMarkerElementクラス
    https://developers.google.com/maps/documentation/javascript/advanced-markers/migration?hl=ja
・Place Serviceクラス
    https://developers.google.com/maps/documentation/javascript/reference/places-service?hl=ja#PlacesServiceStatus
*/

let map;

// 東京ドームの位置情報
const tokyoDome = { lat: 35.7056232, lng: 139.751919 };

// マーカーを保持する配列s
let markers = [];

// blade.phpファイルが読み込まれた際に実行される
async function initMap() {
    // 必要なライブラリを読み込む
    const { Map } = await google.maps.importLibrary("maps");

    // 東京ドームを中心とした地図のインスタンスを作成
    map = new Map(document.getElementById("map"), {
        center: tokyoDome,
        zoom: 17,
        mapId: "DEMO_MAP_ID", // AdvancedMarkerElementを使用する際、mapIdが必要
    });
}

// 入力された場所を検索し、マーカーを表示する
async function findPlaces(placeName) {
    // 必要なライブラリを読み込む
    const { PlacesService } = await google.maps.importLibrary("places");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // 前回検索時のマーカーを削除
    markers.forEach((marker) => {
        marker.setMap(null); // マーカーを地図から削除
    });
    markers = []; // マーカー配列をクリア

    // PlacesServiceクラスのインスタンスを作成し、mapインスタンスと紐づける
    const service = new PlacesService(map);

    // PlacesServiceクラスのtextSearchメソッドの第一引数（TextSearchRequest）
    const request = {
        location: tokyoDome,
        query: placeName,
        radius: 100,
    };

    // 入力された文字列より検索を行い、結果に基づいてマーカーを作成
    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((result) => {
                markers.push(new AdvancedMarkerElement({
                    map,
                    position: result.geometry.location,
                    title: result.name,
                }));
            });
        } else {
            window.alert("No results");
        }
    });
}

// 検索ボックスのイベントリスナーを設定
document.addEventListener('DOMContentLoaded', (event) => {
    const inputEl = document.getElementById("text_search");
    inputEl.addEventListener('change', () => {
        findPlaces(inputEl.value); // 入力値を使って再検索
    });
});