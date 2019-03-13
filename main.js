(function () {
  //aoxis 連結資料庫

  const BASE_URL = "https://movie-list.alphacamp.io";
  const INDEX_URL = BASE_URL + "/api/v1/movies/";
  const POSTER_URL = BASE_URL + "/posters/";
  const data = [];

  axios
    .get(INDEX_URL)
    .then(response => {
      data.push(...response.data.results);
    })
    .catch(err => console.log(err));

  // genre dic
  const dic = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  };

  //dom抓取位置
  const nav = document.getElementById("nav");
  const dataPanel = document.getElementById("data_panel");

  //listen click event
  nav.addEventListener("click", event => {
    if (event.target.matches(".item")) {
      // 從data中找到其中genre包括點擊的genre的moive資料,將其放入moive的物件中
      const movie = [];
      for (i of data) {
        if (i.genres.includes(parseInt(event.target.dataset.genre))) {
          movie.push(i);
        }
      }
      displayMovie(movie);
    }
  });

  function displayMovie(mv) {
    let htmlContent = "";
    mv.forEach(function (item, index) {
      htmlContent += `
       <div class="col-3">
    <div class="card mb-2">
      <img class="card-img-top " src="${POSTER_URL}${
        item.image
        }" alt="Card image cap">
      <div class="card-body ">
        <h2 class="card-title">${item.title}</h2>
      </div>
    <div class="card-footer">
   
      `;
      /*將moive的genre號碼對應到dic的文字轉出
      for(theme of mv.genres){
         htmlContent += `*/
      let genrePool = item.genres;

      for (i of genrePool) {
        htmlContent += `<span>${dic[i]}</span>
      
`;
        console.log(dic[i]);
      }
      htmlContent += `</div> 
</div>
</div>
`;
    });
    dataPanel.innerHTML = htmlContent;
  }
})();
