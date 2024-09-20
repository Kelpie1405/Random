<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Map</title>
    </head>
    <body style="margin: 0;">
        <div style="height: 100vh;">      
            {{-- 地図の表示部分 --}}
            <div id="map" style="height: 100%;"></div>
        </div>
    </body>
</html>
