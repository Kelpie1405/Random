<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Google-Map</title>
        <script src="{{ asset('js/GoogleMap/map.js') }}"></script>
    </head>
    <body style="margin: 0;">
        <div style="height: 100vh;">
            {{-- 検索部分 --}}
            <label>検索：
                <input type="text" id="text_search" placeholder="ここに入力してね♪">
            </label>
        
            {{-- 地図の表示部分 --}}
            <div id="map" style="height: 100%;"></div>
        </div>

        <script async
            src="https://maps.googleapis.com/maps/api/js?key={{ $api_key }}&libraries=marker,places&callback=initMap&language=ja&region=JP"
        ></script>
    </body>
</html>