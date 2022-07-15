class MovieList {
  #baseUrl = "http://localhost:4232/";
  #endUrl = "movies/";
  #amountToShow = 4;
  #currentIndex = 0;
  storedData = {};
  #scrollWidth = 270;
  constructor() {
    this.init();
  }
  init = () => {
    const documentBody = document.querySelector("main");

    const leftArrow = document.createElement("button");
    leftArrow.className = "left-arrow";
    leftArrow.id = "left-arrow";
    leftArrow.innerText = "<=";
    leftArrow.addEventListener("click", (event) => this.moveLeft());
    const rightArrow = document.createElement("button");
    rightArrow.className = "right-arrow";
    rightArrow.innerText = "=>";
    rightArrow.addEventListener("click", (event) => this.moveRight());
    documentBody.append(leftArrow);
    documentBody.append(rightArrow);
  };
  moveLeft = () => {
    const movieContainer = document.getElementById("new-movie-container");
    movieContainer.scrollBy(this.#scrollWidth * -1, 0);
    if (movieContainer.scrollLeft == 0) {
      const leftArrow = document.getElementById("left-arrow");
      leftArrow.style.display = "";
    }
  };
  moveRight = () => {
    const leftArrow = document.getElementById("left-arrow");
    if (leftArrow.style.display == "") leftArrow.style.display = "block";
    const movieContainer = document.getElementById("new-movie-container");
    movieContainer.scrollBy(this.#scrollWidth, 0);
    console.log("scrolled");
  };

  set index(newIndex) {
    this.#currentIndex = newIndex;
  }
  get index() {
    return this.#currentIndex;
  }

  retrieveApiData = async () => {
    const data = await fetch(this.#baseUrl + this.#endUrl).then((response) =>
      response.json()
    );

    return data;
  };
  renderItemList = async () => {
    const movieContainer = document.getElementById("new-movie-container");
    for (let i = 0; i < this.storedData.length; i++) {
      const movieElement = document.createElement("li");

      const movieImage = document.createElement("img");
      movieImage.src = this.storedData[i].imgUrl;
      movieElement.append(movieImage);
      const movieName = document.createElement("p");
      movieName.innerText = `Movie: ${this.storedData[i].name}`;
      const movieInfo = document.createElement("p");
      movieInfo.innerText = `Info: ${this.storedData[i].outlineInfo}`;
      movieElement.append(movieName);
      movieElement.append(movieInfo);
      movieContainer.append(movieElement);
    }
  };
  run = async () => {
    this.storedData = await this.retrieveApiData();
    console.log(this.storedData);
    await this.renderItemList();
  };
}

const myApp = new MovieList();
myApp.run();
