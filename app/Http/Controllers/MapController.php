<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Prefecture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MapController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function create(Prefecture $prefecture)
    {
        return view('map.create', ['prefectures' => $prefecture->get()]);
    }

    public function store(Request $request)
    {
        // 画像ファイルをStorageディレクトリに保存    
        $file = $request->file('picture');
        $file_name = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $file->storeAs('public/pictures', $file_name);

        // DBに保存
        Post::create([
            'prefecture_id' => $request->input('prefecture'),
            'picture' => '/storage/pictures/' . $file_name, // 画像の保存先のパス
        ]);
        
        return redirect('/map')->with('data', '投稿完了！');
    }

    public function getGeoJson()
    {
        $geoJson = file_get_contents(public_path('geojson/japan.geojson'));

        // デコードされたオブジェクトは連想配列形式
        $decoded_geoJson = json_decode($geoJson, true);

        // 各都道府県を参照渡しで回す
        foreach ($decoded_geoJson['features'] as &$feature) {
            $prefectureId = $feature['properties']['pref'];

            // 対応する都道府県の投稿データを取得
            $post = Post::where('prefecture_id', $prefectureId)->first();

            // 該当する投稿データがあれば、画像のURLをGeoJsonのpropertiesに追加
            if ($post) {
                $feature['properties'] += [
                    'picture' => $post->picture
                ];
            }
        }

        return response()->json($decoded_geoJson);
    }
}