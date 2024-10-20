<?php

namespace App\Http\Controllers;

class GoogleMapController extends Controller
{
    private $api_key;

    public function __construct()
    {
        $this->api_key = config('services.google-map.api_key');
    }

    // public function index()
    // {
    //     return view('GoogleMap.index');
    // }

    public function index()
    {
        $api_key = config('services.google-map.api_key');

        return view('GoogleMap.index', ['api_key' => $api_key]);
    }

    public function map()
    {
        return view('GoogleMap.map', ['api_key' => $this->api_key]);
    }

    public function route1()
    {
        return view('GoogleMap.route1', ['api_key' => $this->api_key]);
    }

    public function route2()
    {
        return view('GoogleMap.route2', ['api_key' => $this->api_key]);
    }

    public function running()
    {
        return view('GoogleMap.running', ['api_key' => $this->api_key]);
    }
}