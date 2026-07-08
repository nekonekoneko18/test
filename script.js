const button = document.getElementById("searchButton");

button.addEventListener("click", searchBooks);

const APP_ID = "oduZ40wWwLsVSEAlJigX";

async function searchBooks() {

    const keyword = document.getElementById("keyword").value;

    if (keyword === "") {
        alert("検索語を入力してください。");
        return;
    }

    const url =
        "https://ci.nii.ac.jp/books/opensearch/search?"
        + "q=" + encodeURIComponent(keyword)
        + "&format=json"
        + "&appid=" + APP_ID;

    console.log(url);

    try {

        const response = await fetch(url);

        console.log(response);

        const data = await response.json();

        console.log(data);

        // 検索結果を画面に表示
        const results = document.getElementById("results");

        results.innerHTML =
            "<pre>" + JSON.stringify(data, null, 2) + "</pre>";

        alert("取得成功！");

    } catch (error) {

        console.error(error);

        alert("取得できませんでした。");
    }

}
