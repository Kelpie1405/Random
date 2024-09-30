<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>投稿作成</title>
    </head>
    <body>
        <form action='/map/post' method='POST' enctype='multipart/form-data'>
            @csrf
            <div>
                <label for='prefecture'>都道府県</label>
                <select name='prefecture' id='prefecture'>
                    @foreach ($prefectures as $prefecture)
                        <option value={{ $prefecture->id }}>{{ $prefecture->name }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label for='picture'>投稿する写真</label>
                <input type='file' name='picture' id='picture' accept='image/jpeg, image/png'/>
            </div>
            <button type='submit'>送信</button>
        </form>
    </body>
</html>

