<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Google-Map</title>
        <script src="{{ asset('js/GoogleMap/route1.js') }}"></script>
    </head>
    <body style="margin: 0;">
        <div style="height: 100vh;">
            {{-- 検索部分 --}}
            <div style="position: absolute; top: 100px; left: 20px; z-index: 5; background-color: white; border:solid black; padding: 5px;">
                <input id="startpoint" type="text" placeholder="出発地">
                <div id="waypoints"></div>
                <button id="addWaypoint">途中地点を追加</button><br>
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