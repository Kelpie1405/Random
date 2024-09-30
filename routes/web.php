<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MapController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/map', [MapController::class, 'index']);
Route::get('/map/post/create', [MapController::class, 'create']);
Route::post('/map/post', [MapController::class, 'store']);