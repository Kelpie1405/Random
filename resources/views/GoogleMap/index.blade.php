<!-- <!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Google-Map</title>
    </head>
    <body>
        <h2>一覧</h2>
        <h4><a href="/google-map/map">マップ表示</a></h4>
        <h4><a href="/google-map/route1">ルート表示</a></h4>
    </body>
</html> -->

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Google-Map</title>
        {{-- 外部JavaScriptファイルの読み込み --}}
        <script src="{{ asset('js/GoogleMap/route.js') }}"></script>
    </head>
    <body style="margin: 0;">
        <div style="height: 100vh;">
            {{-- 検索部分 --}}
            <div style="position: absolute; top: 100px; left: 20px; z-index: 5; background-color: white; border:solid black; padding: 5px;">
                <input id="startpoint" type="text" placeholder="出発地"><br>
                <input id="endpoint" type="text" placeholder="目的地">
            </div>
        
            {{-- 地図の表示部分 --}}
            <div id="map" style="height: 100%;"></div>
        </div>

        <script async
            src="https://maps.googleapis.com/maps/api/js?key={{ $api_key }}&libraries=marker,places&callback=initMap&language=ja&region=JP"
        ></script>
    </body>
</html>
