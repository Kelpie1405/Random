window.addEventListener('DOMContentLoaded', () => {
    // 地図オブジェクトを作成し、初期表示の中心位置を設定（今回は東京が中心）
    const map = L.map('map').setView([35.6762, 139.6503], 5);

    // fetch APIを用いて、GeoJsonデータを取得
    fetch('/api/geojson')
        .then(response => response.json())
        .then(data => {
            // 取得したGeoJsonデータを地図上に表示（GeoJsonレイヤーを作成）
            L.geoJson(data, {
                // 都道府県の形状に対してスタイルを設定
                style: function (feature) {
                    // 各都道府県に関連するデータ（ID、都道府県名、画像データ）
                    const post = feature.properties;

                    // 画像投稿されている都道府県であるか否かで、都道府県の形の色を変更
                    if (post.picture) {
                        return {
                            fillColor: '#ffcccb',
                            fillOpacity: 0.7,
                            color: 'white',
                            weight: 1
                        };
                    } else {
                        return {
                            fillColor: '#cccccc',
                            color: 'white',
                            weight: 1,
                            fillOpacity: 0.7
                        };
                    }
                },

                // 各フューチャーに、イベントやポップアップを取り付ける
                onEachFeature: function (feature, layer) {
                    const post = feature.properties;

                    // 画像投稿されている都道府県であるか否かで、ポップアップの内容を変更
                    if (post.picture) {
                        layer.bindPopup(`
                            <h4><center>${post.name}</center></h4>
                            <img src="${post.picture}" alt="picture" width="200">
                        `);
                    } else {
                        layer.bindPopup(`
                            <h4><center>${post.name}</center></h4>
                        `);
                    }
                }
            }).addTo(map);
        });
});