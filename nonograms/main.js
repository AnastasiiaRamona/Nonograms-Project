import info from "./info.json" assert { type: "json" };

// main functions

function createHeader() {
  const header = document.createElement("header");
  header.className = "top-dashboard";

  const nav = document.createElement("nav");
  nav.className = "top-dashboard__navigation";

  const soundUl = document.createElement("ul");
  soundUl.className = "top-dashboard__navigation__sound";

  const soundWord = document.createElement("p");
  soundWord.className = "top-dashboard__navigation__sound__word";
  soundWord.textContent = "sound";

  const soundButton = document.createElement("button");
  soundButton.className = "top-dashboard__navigation__sound__button";

  const soundButtonImage = document.createElement("img");
  soundButtonImage.className =
    "top-dashboard__navigation__sound__button__image";
  soundButtonImage.src = "./assets/sound-icon.png";
  soundButtonImage.alt = "Sound Button";

  soundUl.appendChild(soundWord);
  soundButton.appendChild(soundButtonImage);
  soundUl.appendChild(soundButton);

  const title = document.createElement("h1");
  title.className = "top-dashboard__title";
  title.textContent = "Nonograms";

  const themeUl = document.createElement("ul");
  themeUl.className = "top-dashboard__navigation__theme";

  const themeButton = document.createElement("button");
  themeButton.className = "top-dashboard__navigation__theme__button";
  themeButton.textContent = "light";

  const themeWord = document.createElement("p");
  themeWord.className = "top-dashboard__navigation__theme__word";
  themeWord.textContent = "theme";

  themeUl.appendChild(themeButton);
  themeUl.appendChild(themeWord);

  nav.appendChild(soundUl);
  nav.appendChild(title);
  nav.appendChild(themeUl);

  header.appendChild(nav);
  document.body.appendChild(header);
}

function createGameWindow(matrix) {
  let infoObject = info[Math.floor(Math.random() * 5)];
  let infoTemplate = infoObject["template"];
  let infoLevel = infoObject["level"];
  let infoNumber = infoObject["number"];
  let infoMatrix = infoObject["matrix"];

  if (typeof matrix !== "undefined") {
    infoObject = info.find((object) => object["matrix"] === matrix);
    infoTemplate = infoObject["template"];
    infoLevel = infoObject["level"];
    infoNumber = infoObject["number"];
    infoMatrix = matrix;
  }

  console.log(infoTemplate);

  createHeader();

  const main = document.createElement("main");
  main.className = "play-area";

  const leftArea = document.createElement("section");
  leftArea.className = "play-area__section";

  const playAreaTime = document.createElement("div");
  playAreaTime.className = "play-area__time";

  const timeWord = document.createElement("p");
  timeWord.className = "play-area__time__word";
  timeWord.textContent = "Time:";

  const stopwatch = document.createElement("p");
  stopwatch.className = "play-area__time__stopwatch";
  stopwatch.textContent = "00:00";

  playAreaTime.appendChild(timeWord);
  playAreaTime.appendChild(stopwatch);

  const saveGame = document.createElement("button");
  saveGame.className = "play-area__save";
  saveGame.textContent = "Save Game";

  leftArea.appendChild(playAreaTime);
  leftArea.appendChild(saveGame);

  const playAreaBox = document.createElement("section");
  playAreaBox.className = "play-area__box";

  const hintVertical1 = document.createElement("div");
  hintVertical1.className = "play-area__box__hint-vertical-1";

  for (let i = 0; i < 5; i++) {
    const hintNumber = document.createElement("div");
    hintNumber.className = "play-area__box__hint__number";
    hintNumber.textContent = "1";
    hintVertical1.appendChild(hintNumber);
  }

  const hintAndField = document.createElement("div");
  hintAndField.className = "play-area__box__hint-and-field";

  const hintHorizontal1 = document.createElement("div");
  hintHorizontal1.className = "play-area__box__hint-horizontal-1";

  for (let i = 0; i < 5; i++) {
    const hintNumber = document.createElement("div");
    hintNumber.className = "play-area__box__hint__number";
    hintNumber.textContent = "1";
    hintHorizontal1.appendChild(hintNumber);
  }

  const field = document.createElement("div");
  field.className = "play-area__box__field";

  const repetitions = infoNumber / 25;

  for (let i = 0; i < repetitions; i++) {
    getSquare(field);
  }

  if (infoNumber === 100) {
    const lineField1 = document.createElement("div");
    lineField1.className = "play-area__box__line-field1-10";
    const lineField2 = document.createElement("div");
    lineField2.className = "play-area__box__line-field2-10";
    hintAndField.appendChild(lineField1);
    hintAndField.appendChild(lineField2);
  } else if (infoNumber === 225) {
    for (let i = 1; i <= 4; i++) {
      const lineField = document.createElement("div");
      lineField.className = `play-area__box__line-field${i}-15`;
      hintAndField.appendChild(lineField);
    }
  }

  hintAndField.appendChild(hintHorizontal1);
  hintAndField.appendChild(field);

  playAreaBox.appendChild(hintVertical1);
  playAreaBox.appendChild(hintAndField);

  const playAreaImage = document.createElement("img");
  playAreaImage.className = "play-area__image";
  playAreaImage.src = "./assets/totoro.png";
  playAreaImage.alt = "Totoro";

  main.appendChild(leftArea);
  main.appendChild(playAreaBox);
  main.appendChild(playAreaImage);

  const footer = document.createElement("footer");
  footer.className = "bottom-dashboard";

  const footerNav = document.createElement("nav");
  footerNav.className = "bottom-dashboard__navigation";

  const startAgainUl = document.createElement("ul");
  startAgainUl.className = "bottom-dashboard__navigation__start-again";
  startAgainUl.textContent = "Reset game";

  const solutionUl = document.createElement("ul");
  solutionUl.className = "bottom-dashboard__navigation__solution";
  solutionUl.textContent = "See solution";

  const menuUl = document.createElement("ul");
  menuUl.className = "bottom-dashboard__navigation__menu";
  menuUl.textContent = "Menu";

  footerNav.appendChild(startAgainUl);
  footerNav.appendChild(solutionUl);
  footerNav.appendChild(menuUl);

  footer.appendChild(footerNav);

  document.body.appendChild(main);
  document.body.appendChild(footer);

  const menuButton = document.querySelector(
    ".bottom-dashboard__navigation__menu",
  );

  menuButton.addEventListener("click", () => {
    document.body.innerHTML = "";
    createMenuWindow();
  });

  // Styles
  if (infoNumber === 225) {
    const squares = document.querySelectorAll(".play-area__box__field__square");
    squares.forEach((square) => {
      square.style.width = "21px";
      square.style.height = "21px";
      square.style.fontSize = "18px";
    });

    const grid = document.querySelector(".play-area__box__field");
    grid.style.gridTemplateColumns = "repeat(15, 1fr)";
  } else if (infoNumber === 100) {
    const squares = document.querySelectorAll(".play-area__box__field__square");
    squares.forEach((square) => {
      square.style.width = "33px";
      square.style.height = "33px";
    });

    const grid = document.querySelector(".play-area__box__field");
    grid.style.gridTemplateColumns = "repeat(10, 1fr)";
  } else if (infoNumber === 25) {
    const squares = document.querySelectorAll(".play-area__box__field__square");
    squares.forEach((square) => {
      square.style.fontSize = "50px";
    });
  }

  // Event Listeners
  const squareButtons = document.querySelectorAll(
    ".play-area__box__field__square",
  );
  checkThePicture(infoMatrix, squareButtons);

  squareButtons.forEach((square) => {
    square.addEventListener("click", () => {
      checkThePicture(infoMatrix, squareButtons);
      if (square.textContent === "X") {
        return;
      }

      if (square.classList.contains("dark")) {
        square.classList.remove("dark");
      } else {
        square.classList.add("dark");
      }
      checkThePicture(infoMatrix, squareButtons);
    });

    square.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (square.classList.contains("dark")) {
        return;
      }

      if (square.textContent === "X") {
        square.textContent = "";
      } else {
        square.textContent = "X";
      }
    });
  });
}

function createMenuWindow() {
  createHeader();

  const main = document.createElement("main");
  main.classList.add("menu");

  const menuNav = document.createElement("nav");
  menuNav.classList.add("menu__navigation");

  const newGameUl = document.createElement("ul");
  newGameUl.classList.add("menu__navigation__new-game");
  newGameUl.textContent = "New Game";

  const continueGameUl = document.createElement("ul");
  continueGameUl.classList.add("menu__navigation__continue-last-game");
  continueGameUl.textContent = "Continue Last Game";

  const scoreTableUl = document.createElement("ul");
  scoreTableUl.classList.add("menu__navigation__score-table");
  scoreTableUl.textContent = "Score Table";

  menuNav.appendChild(newGameUl);
  menuNav.appendChild(continueGameUl);
  menuNav.appendChild(scoreTableUl);

  const menuImage = document.createElement("img");
  menuImage.classList.add("menu__image");
  menuImage.src = "./assets/totoro.png";
  menuImage.alt = "Totoro";

  main.appendChild(menuNav);
  main.appendChild(menuImage);

  document.body.appendChild(main);

  const footer = document.createElement("footer");
  footer.classList.add("bottom-dashboard");
  document.body.appendChild(footer);

  const newGameButton = document.querySelector(".menu__navigation__new-game");

  newGameButton.addEventListener("click", () => {
    document.body.innerHTML = "";
    createMenuNewGameWindow();
  });
}

function createMenuNewGameWindow() {
  createHeader();

  const main = document.createElement("main");
  main.classList.add("menu");

  const nav = document.createElement("nav");
  nav.classList.add("menu__navigation");

  const ulTemplate = document.createElement("ul");
  ulTemplate.classList.add("menu__navigation__template");
  ulTemplate.textContent = "Template";

  const dropdownTemplate = document.createElement("select");
  dropdownTemplate.classList.add("menu__navigation__template-option");
  dropdownTemplate.id = "select-template";

  let optionsObject = info.filter((template) => template.level === "Easy");
  let optionsTemplate = optionsObject.map((template) => template.template);

  optionsTemplate.forEach((optionText, index) => {
    const option = document.createElement("option");
    option.value = "option" + (index + 1);
    option.id = "option-template" + (index + 1);
    option.textContent = optionText;
    dropdownTemplate.appendChild(option);
  });

  ulTemplate.appendChild(dropdownTemplate);
  nav.appendChild(ulTemplate);

  const ulLevel = document.createElement("ul");
  ulLevel.classList.add("menu__navigation__level");
  ulLevel.textContent = "Level of Difficulty";

  const dropdownLevel = document.createElement("select");
  dropdownLevel.classList.add("menu__navigation__level-option");
  dropdownLevel.id = "select-level";

  const optionsLevel = ["Easy", "Medium", "Hard"];
  optionsLevel.forEach((optionText, index) => {
    const option = document.createElement("option");
    option.value = "option" + (index + 1);
    option.id = "option-level" + (index + 1);
    option.textContent = optionText;
    dropdownLevel.appendChild(option);
  });

  ulLevel.appendChild(dropdownLevel);
  nav.appendChild(ulLevel);

  const ulRandomGame = document.createElement("ul");
  ulRandomGame.classList.add("menu__navigation__random-game");
  ulRandomGame.textContent = "Random Game";
  nav.appendChild(ulRandomGame);

  const ulStartGame = document.createElement("ul");
  ulStartGame.classList.add("menu__navigation__start");
  ulStartGame.textContent = "Start Game!";
  nav.appendChild(ulStartGame);

  main.appendChild(nav);

  const img = document.createElement("img");
  img.classList.add("menu__image");
  img.src = "./assets/totoro.png";
  img.alt = "Totoro";
  main.appendChild(img);

  const footer = document.createElement("footer");
  footer.classList.add("bottom-dashboard-menu");

  const arrow = document.createElement("img");
  arrow.classList.add("bottom-dashboard__image");
  arrow.src = "./assets/arrow.png";
  img.alt = "Arrow back";
  footer.appendChild(arrow);

  const backButton = document.createElement("button");
  backButton.classList.add("bottom-dashboard-menu__button");
  backButton.textContent = "Back";
  footer.appendChild(backButton);

  document.body.appendChild(main);
  document.body.appendChild(footer);

  const back = document.querySelector(".bottom-dashboard-menu__button");

  back.addEventListener("click", () => {
    document.body.innerHTML = "";
    createMenuWindow();
  });

  const arrowButton = document.querySelector(".bottom-dashboard__image");

  arrowButton.addEventListener("click", () => {
    document.body.innerHTML = "";
    createMenuWindow();
  });

  // Event listeners

  const select = document.getElementById("select-level");
  const dropdown = document.getElementById("select-template");

  select.addEventListener("change", (event) => {
    dropdown.innerHTML = "";
    checkOptionLevel("option2", "Medium", event, dropdown);
    checkOptionLevel("option3", "Hard", event, dropdown);
    checkOptionLevel("option1", "Easy", event, dropdown);
  });

  const startGame = document.querySelector(".menu__navigation__start");

  const select1 = document.getElementById("select-template");
  const select2 = document.getElementById("select-level");

  startGame.addEventListener("click", () => {
    const selectedOption1 = select1.options[select1.selectedIndex].textContent;
    const selectedOption2 = select2.options[select2.selectedIndex].textContent;
    const selectedObject = info.find(
      (object) =>
        object.template === selectedOption1 && object.level === selectedOption2,
    );
    const selectedMatrix = selectedObject.matrix;
    document.body.innerHTML = "";
    createGameWindow(selectedMatrix);
  });

  const randomGame = document.querySelector(".menu__navigation__random-game");

  randomGame.addEventListener("click", () => {
    const selectedObject = info[Math.floor(Math.random() * info.length)];
    const selectedMatrix = selectedObject.matrix;
    document.body.innerHTML = "";
    createGameWindow(selectedMatrix);
  });
}

// secondary functions

function checkOptionLevel(name, lev, event, dropdown) {
  if (event.target.value === name) {
    const optionsObject = info.filter((template) => template.level === lev);
    const optionsTemplate = optionsObject.map((template) => template.template);
    optionsTemplate.forEach((optionText, index) => {
      const option = document.createElement("option");
      option.value = "option" + (index + 1);
      option.id = "option-template" + (index + 1);
      option.textContent = optionText;
      dropdown.appendChild(option);
    });
  }
}

function checkThePicture(matrix, squareButtons) {
  const arr = matrix.flat();
  const newSquareButtons = Array.from(squareButtons).map((button) => {
    if (button.classList.contains("dark")) {
      return 1;
    } else {
      return 0;
    }
  });
  const newSquareButtonsAsNumbers = newSquareButtons.map(Number);
  if (
    arr.length === newSquareButtonsAsNumbers.length &&
    arr.every((value, index) => value === newSquareButtonsAsNumbers[index])
  ) {
    return alert("ты выиграл!");
  }
}

function getSquare(field) {
  for (let i = 0; i < 25; i++) {
    const fieldSquare = document.createElement("div");
    fieldSquare.className = "play-area__box__field__square";
    field.appendChild(fieldSquare);
  }
}

// implementation

createGameWindow();
