<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Google-Map</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
        <div class="w-screen h-screen bg-purple-100 relative">
            {{-- 検索部分 --}}
            <div class="absolute top-16 left-8 z-10 rounded-md border-black border-2 p-4 bg-white">
                <div class="mb-2">
                    <button type="button" id="startpoint" class="w-full mx-auto rounded-full p-2 bg-purple-700 text-white font-medium">スタート地点を選択</button>
                </div>
                <div id="waypoints"></div>
                <div class="">
                    <button type="button" id="addWaypoint" disabled=true class="w-full mx-auto rounded p-2 bg-amber-400 text-white font-medium">途中地点を追加</button>
                </div>
                <div class="mt-2">
                    <button type="button" id="endpoint" disabled=true class="w-full mx-auto rounded-full p-2 bg-purple-700 text-white font-medium">ゴール地点を選択</button>
                </div>
                <div id="total"></div>
            </div>
        
            {{-- 地図の表示部分 --}}
            <div id="map" class="w-full h-full z-0"></div>
        </div>

        <script src="{{ asset('js/GoogleMap/run1.js') }}"></script>
        <script async
            src="https://maps.googleapis.com/maps/api/js?key={{ $api_key }}&libraries=marker,places&callback=initMap&language=ja&region=JP"
        ></script>
    </body>
</html>