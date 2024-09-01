<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleMapController;

Route::get('/', function () {
    return view('welcome');
});

// Route::prefix('/google-map')->controller(GoogleMapController::class)->group(function () {
//     Route::get('', 'index');
//     Route::get('/map', 'map');
//     Route::get('/route1', 'route1');
//     Route::get('/route2', 'route2');
// });

Route::get('/route', [GoogleMapController::class, 'index']);
