alert("script.js が読み込まれました");
const button = document.getElementById("searchButton");

button.addEventListener("click", searchBooks);

async function searchBooks() {

    const keyword = document.getElementById("keyword").value;

    if (keyword === "") {
        alert("検索語を入力してください。");
        return;
    }

    const url =
        "https://ci.nii.ac.jp/books/opensearch/search?q="
        + encodeURIComponent(keyword)
        + "&format=json";

    console.log(url);

    try {

        const response = await fetch(url);

        console.log(response);

        const data = await response.json();

        console.log(data);

        alert("取得成功！");

    } catch (error) {

        console.error(error);

        alert("取得できませんでした。");
    }

}
