<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleMapController;

Route::get('/', function () {
    return view('welcome');
});
