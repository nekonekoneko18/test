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
        const data = await response.json();

        console.log(data);

        // 検索結果表示エリア
        const results = document.getElementById("results");
        results.innerHTML = "";

        // 検索結果一覧
        const books = data["@graph"][0]["items"];

books.forEach(book => {

    // ISBN取得
    let isbn = "";

    if (book["dc:identifier"]) {

        if (Array.isArray(book["dc:identifier"])) {

            for (const id of book["dc:identifier"]) {

                if (id.startsWith("ISBN")) {

                    isbn = id.replace("ISBN ", "").replace("-", "");
                    break;

                }

            }

        }

    }

    const imageUrl = isbn
        ? `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg`
        : "images/noimage.png";

    results.innerHTML += `
        <div class="book-card">

            <img src="${imageUrl}"
                 onerror="this.src='images/noimage.png'">

            <h3>${book.title}</h3>

            <p>ISBN : ${isbn}</p>

            <p>
                <a href="${book.link["@id"]}" target="_blank">
                    CiNiiで見る
                </a>
            </p>

        </div>
    `;

});
    } catch (error) {

        console.error(error);
        alert("取得できませんでした。");

    }

}