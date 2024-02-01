import info from "./info.json" assert { type: "json" };
let timerId;
let isTimerStarted = false;

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

function createGameWindow(matrix, saveMatrix, saveTime) {
  isTimerStarted = false;

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

  createHeader();

  const main = document.createElement("main");
  main.className = "play-area";

  const leftArea = document.createElement("section");
  leftArea.className = "play-area__section";

  const templateAndLevel = document.createElement("p");
  templateAndLevel.className = "play-area__display";
  if (infoLevel === "Easy") {
    infoLevel += " 🍣";
  } else if (infoLevel === "Medium") {
    infoLevel += " 🍣🍣";
  } else {
    infoLevel += " 🍣🍣🍣";
  }
  templateAndLevel.innerHTML = `What you should draw: <span> ${infoTemplate} </span> <b> Level: ${infoLevel}`;

  const playAreaTime = document.createElement("div");
  playAreaTime.className = "play-area__time";

  const timeWord = document.createElement("p");
  timeWord.className = "play-area__time__word";
  timeWord.textContent = "Time:";

  const stopwatch = document.createElement("p");
  stopwatch.className = "play-area__time__stopwatch";
  if (saveTime !== undefined) {
    stopwatch.textContent = `${saveTime}`;
  } else {
    stopwatch.textContent = "00:00:00";
  }

  playAreaTime.appendChild(timeWord);
  playAreaTime.appendChild(stopwatch);

  const saveGame = document.createElement("button");
  saveGame.className = "play-area__save";
  saveGame.textContent = "Save Game";
  const saveGameIcon = document.createElement("img");
  saveGameIcon.className = "play-area__save__image";
  saveGameIcon.src = "./assets/save-icon.png";
  saveGameIcon.alt = "Save icon";
  saveGame.appendChild(saveGameIcon);

  leftArea.appendChild(templateAndLevel);
  leftArea.appendChild(playAreaTime);
  leftArea.appendChild(saveGame);

  const playAreaBox = document.createElement("section");
  playAreaBox.className = "play-area__box";

  const hintVertical1 = document.createElement("div");
  hintVertical1.className = "play-area__box__hint-vertical";

  for (let i = 0; i < Math.sqrt(infoNumber); i++) {
    const hintNumber = document.createElement("div");
    hintNumber.className = "play-area__box__hint__numberV";
    const gameObject = createHints(infoMatrix);
    if (Array.isArray(gameObject.colHints[i])) {
      hintNumber.innerHTML = gameObject.colHints[i].join(`<br>`);
    } else {
      gameObject.colHints[i];
    }
    hintVertical1.appendChild(hintNumber);
  }

  const hintAndField = document.createElement("div");
  hintAndField.className = "play-area__box__hint-and-field";

  const hintHorizontal1 = document.createElement("div");
  hintHorizontal1.className = "play-area__box__hint-horizontal-1";

  for (let i = 0; i < Math.sqrt(infoNumber); i++) {
    const hintNumber = document.createElement("div");
    hintNumber.className = "play-area__box__hint__numberH";
    const gameObject = createHints(infoMatrix);
    hintNumber.textContent = gameObject.rowHints[i].join(" ");
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

  // Styles
  if (infoNumber === 225) {
    const squares = document.querySelectorAll(".play-area__box__field__square");
    squares.forEach((square) => {
      square.style.width = "21px";
      square.style.height = "21px";
      square.style.fontSize = "18px";
    });

    const playAreaBox = document.querySelector(".play-area__box");
    playAreaBox.style.marginTop = "15px";

    const vHints = document.querySelectorAll(".play-area__box__hint__numberV");
    vHints[4].style.borderRight = "4px solid #800000";
    vHints[9].style.borderRight = "4px solid #800000";
    vHints.forEach((hint) => {
      hint.style.width = "21px";
      hint.style.height = "auto";
      hint.style.fontSize = "medium";
    });

    const hHints = document.querySelectorAll(".play-area__box__hint__numberH");
    hHints.forEach((hint) => {
      hint.style.width = "70px";
      hint.style.height = "21px";
      hint.style.fontSize = "medium";
    });

    const line = document.querySelector(".play-area__box__hint-vertical");
    line.style.marginLeft = "84.3px";

    const grid = document.querySelector(".play-area__box__field");
    grid.style.gridTemplateColumns = "repeat(15, 1fr)";
  } else if (infoNumber === 100) {
    const squares = document.querySelectorAll(".play-area__box__field__square");
    squares.forEach((square) => {
      square.style.width = "33px";
      square.style.height = "33px";
    });

    const vHints = document.querySelectorAll(".play-area__box__hint__numberV");
    vHints[4].style.borderRight = "5px solid #800000";
    vHints.forEach((hint) => {
      hint.style.width = "33px";
      hint.style.height = "auto";
      hint.style.fontSize = "large";
    });

    const hHints = document.querySelectorAll(".play-area__box__hint__numberH");
    hHints.forEach((hint) => {
      hint.style.width = "50px";
      hint.style.height = "33px";
      hint.style.fontSize = "large";
    });

    const line = document.querySelector(".play-area__box__hint-vertical");
    line.style.marginLeft = "60px";

    const grid = document.querySelector(".play-area__box__field");
    grid.style.gridTemplateColumns = "repeat(10, 1fr)";
  } else if (infoNumber === 25) {
    const squares = document.querySelectorAll(".play-area__box__field__square");
    squares.forEach((square) => {
      square.style.fontSize = "50px";
    });
  }

  // Event Listeners
  const menuButton = document.querySelector(
    ".bottom-dashboard__navigation__menu",
  );

  menuButton.addEventListener("click", () => {
    clearInterval(timerId);
    document.body.innerHTML = "";
    createMenuWindow();
  });

  const squareButtons = document.querySelectorAll(
    ".play-area__box__field__square",
  );

  if (saveMatrix !== undefined) {
    squareButtons.forEach((button, index) => {
      if (saveMatrix[index] === 1) {
        button.classList.add("dark");
      } else if (saveMatrix[index] === 2) {
        button.textContent = "X";
      }
    });
  }

  checkThePicture(infoMatrix, squareButtons, infoTemplate, infoLevel);
  const clickHandler = (event) =>
    handleSquareClick(
      event,
      infoMatrix,
      squareButtons,
      infoTemplate,
      infoLevel,
    );

  squareButtons.forEach((square) => {
    square.addEventListener("click", clickHandler);
    square.addEventListener("contextmenu", (event) =>
      handleContextMenu(event, square),
    );
  });

  const boxField = document.querySelector(".play-area__box__field");
  boxField.addEventListener("click", function () {
    if (!isTimerStarted) {
      startTime();
      isTimerStarted = true;
    }
  });

  boxField.addEventListener("contextmenu", function () {
    if (!isTimerStarted) {
      startTime();
      isTimerStarted = true;
    }
  });

  const saveGameButton = document.querySelector(".play-area__save");
  const resetGameButton = document.querySelector(
    ".bottom-dashboard__navigation__start-again",
  );

  const saveCurrentGameFunction = () => saveCurrentGame(infoTemplate);

  resetGameButton.addEventListener("click", () => {
    saveGameButton.classList.remove("non-working");
    saveGameButton.addEventListener("click", saveCurrentGameFunction);

    clearInterval(timerId);

    const stopwatch = document.querySelector(".play-area__time__stopwatch");
    stopwatch.textContent = "00:00:00";

    isTimerStarted = false;

    squareButtons.forEach((square) => {
      square.addEventListener("click", clickHandler);
      if (square.classList.contains("dark")) {
        square.classList.remove("dark");
      } else if (square.textContent === "X") {
        square.textContent = "";
      }
    });
  });

  const solutionButton = document.querySelector(
    ".bottom-dashboard__navigation__solution",
  );

  solutionButton.addEventListener("click", () => {
    clearInterval(timerId);

    const stopwatch = document.querySelector(".play-area__time__stopwatch");
    stopwatch.textContent = "00:00:00";

    isTimerStarted = true;

    saveGameButton.removeEventListener("click", saveCurrentGameFunction);
    saveGameButton.classList.add("non-working");

    const arr = infoMatrix.flat();
    arr.forEach((elem, index) => {
      const square = squareButtons[index];

      if (elem === 1) {
        square.textContent = "";
        square.classList.add("dark");
      } else {
        square.classList.remove("dark");
        square.textContent = "X";
      }
    });

    squareButtons.forEach((square) => {
      square.removeEventListener("click", clickHandler);
    });
  });

  saveGameButton.addEventListener("click", saveCurrentGameFunction);
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
  continueGameUl.classList.add("menu__navigation__resume-game");
  continueGameUl.textContent = "Resume Game";

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

  // Event Listeners

  const newGameButton = document.querySelector(".menu__navigation__new-game");
  newGameButton.addEventListener("click", () => {
    document.body.innerHTML = "";
    createMenuNewGameWindow();
  });

  const resumeGameButton = document.querySelector(
    ".menu__navigation__resume-game",
  );
  resumeGameButton.addEventListener("click", () => {
    const saveField = localStorage.getItem("saveField");
    const saveMatrix = JSON.parse(saveField);
    const saveTemplate = localStorage.getItem("infoTemplate");
    const saveTime = localStorage.getItem("time");
    const infoObject = info.find(
      (object) => object["template"] === saveTemplate,
    );
    const infoMatrix = infoObject["matrix"];
    document.body.innerHTML = "";
    createGameWindow(infoMatrix, saveMatrix, saveTime);
  });

  const scoreTableButton = document.querySelector(
    ".menu__navigation__score-table",
  );
  scoreTableButton.addEventListener("click", () => {
    document.body.innerHTML = "";

    let winsString = localStorage.getItem("lastWins");
    let wins = JSON.parse(winsString) || [];
    console.log(wins);
    createScoreTable(wins);
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
  arrow.alt = "Arrow back";
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

function createModalWindow(time) {
  const previousModal = document.querySelector(".modal-window-container");
  if (previousModal) {
    previousModal.remove();
  }

  const body = document.body;

  const modalWindowContainer = document.createElement("section");
  modalWindowContainer.classList.add("modal-window-container");

  const modalWindow = document.createElement("div");
  modalWindow.classList.add("modal-window");

  const modalWindowHead = document.createElement("div");
  modalWindowHead.classList.add("modal-window__head");

  const img = document.createElement("img");
  img.classList.add("modal-window__image");
  img.src = "./assets/happy-totoro.png";
  img.alt = "Happy Totoro";

  const congratulation = document.createElement("p");
  congratulation.classList.add("modal-window__congratulation");
  congratulation.textContent = `Great! You have solved the nonogram in ${time} seconds!`;

  modalWindowHead.appendChild(img);
  modalWindowHead.appendChild(congratulation);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("modal-window__buttons-container");

  const buttonMenu = document.createElement("button");
  buttonMenu.classList.add("modal-window__menu-button");
  buttonMenu.textContent = "Menu";

  const buttonStartAgain = document.createElement("button");
  buttonStartAgain.classList.add("modal-window__start-again-button");
  buttonStartAgain.textContent = "Start again";

  modalWindow.appendChild(modalWindowHead);
  modalWindow.appendChild(buttonsContainer);

  buttonsContainer.appendChild(buttonStartAgain);
  buttonsContainer.appendChild(buttonMenu);

  modalWindowContainer.appendChild(modalWindow);
  body.appendChild(modalWindowContainer);

  const buttonMenuBack = document.querySelector(".modal-window__menu-button");
  buttonMenuBack.addEventListener("click", () => {
    document.body.innerHTML = "";
    createMenuWindow();
  });

  const buttonStart = document.querySelector(
    ".modal-window__start-again-button",
  );
  buttonStart.addEventListener("click", () => {
    const modalWindow = document.querySelector(".modal-window-container");
    modalWindow.remove();

    clearInterval(timerId);

    const stopwatch = document.querySelector(".play-area__time__stopwatch");
    stopwatch.textContent = "00:00:00";

    isTimerStarted = false;

    const squareButtons = document.querySelectorAll(
      ".play-area__box__field__square",
    );
    squareButtons.forEach((square) => {
      if (square.classList.contains("dark")) {
        square.classList.remove("dark");
      } else if (square.textContent === "X") {
        square.textContent = "";
      }
    });
  });
}

function createWindowGameSaved() {
  const previousModal = document.querySelector(".saved-modal-window-container");
  if (previousModal) {
    previousModal.remove();
  }

  const body = document.body;

  const modalWindowContainer = document.createElement("section");
  modalWindowContainer.classList.add("saved-modal-window-container");

  const modalWindow = document.createElement("div");
  modalWindow.classList.add("saved-modal-window");

  const gameSaved = document.createElement("p");
  gameSaved.classList.add("saved-modal-window__game-saved");
  gameSaved.textContent = "Game saved successfully";

  const checkMark = document.createElement("img");
  checkMark.classList.add("saved-modal-window__check-mark");
  checkMark.src = "./assets/check-mark.png";
  checkMark.alt = "Check mark";

  modalWindow.appendChild(gameSaved);
  modalWindow.appendChild(checkMark);
  modalWindowContainer.appendChild(modalWindow);
  body.appendChild(modalWindowContainer);
}

function createScoreTable(arr) {
  createHeader();

  const main = document.createElement("main");
  main.classList.add("main-score-table");

  const menuImage = document.createElement("img");
  menuImage.classList.add("menu__image"); // class for the purpose of uniform css styles
  menuImage.src = "./assets/totoro.png";
  menuImage.alt = "Totoro";

  const scoreTable = document.createElement("table");
  scoreTable.classList.add("score-table");

  const scoreTableTitle = document.createElement("h1");
  scoreTableTitle.classList.add("score-table__title");
  scoreTableTitle.innerHTML = `Score Table <br> We Are the Champions!`;

  scoreTable.appendChild(scoreTableTitle);

  const cellNames = ["#️⃣", "Time", "Template", "Level"];
  const cellsHeading = document.createElement("tr");
  cellNames.forEach((cellName) => {
    const cell = document.createElement("td");
    cell.textContent = cellName;
    cellsHeading.appendChild(cell);
  });

  scoreTable.appendChild(cellsHeading);

  const players = arr;

  function timeToSeconds(timeWin) {
    const [hours, minutes, seconds] = timeWin.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  players.sort((a, b) => {
    const timeA = timeToSeconds(a.timeWin);
    const timeB = timeToSeconds(b.timeWin);
    return timeA - timeB;
  });

  for (let i = 1; i <= players.length; i++) {
    const playerRow = createPlayerRow(i, players[i - 1]);
    scoreTable.appendChild(playerRow);
  }

  main.appendChild(scoreTable);
  main.appendChild(menuImage);
  document.body.appendChild(main);

  const footer = document.createElement("footer");
  footer.classList.add("bottom-dashboard-menu");

  const arrow = document.createElement("img");
  arrow.classList.add("bottom-dashboard__image");
  arrow.src = "./assets/arrow.png";
  arrow.alt = "Arrow back";
  footer.appendChild(arrow);

  const backButton = document.createElement("button");
  backButton.classList.add("bottom-dashboard-menu__button");
  backButton.textContent = "Back";
  footer.appendChild(backButton);

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

function checkThePicture(matrix, squareButtons, infoTemplate, infoLevel) {
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
    clearInterval(timerId);
    const stopwatch = document.querySelector(".play-area__time__stopwatch");
    createModalWindow(stopwatch.textContent);

    let wins = JSON.parse(localStorage.getItem("lastWins")) || [];

    wins.push({
      timeWin: stopwatch.textContent,
      templateWin: infoTemplate,
      levelWin: infoLevel,
    });

    if (wins.length > 5) {
      wins = wins.slice(wins.length - 5);
    }

    localStorage.setItem("lastWins", JSON.stringify(wins));
  }
}

function getSquare(field) {
  for (let i = 0; i < 25; i++) {
    const fieldSquare = document.createElement("div");
    fieldSquare.className = "play-area__box__field__square";
    field.appendChild(fieldSquare);
  }
}

function createHints(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const rowHints = [];
  const colHints = [];

  for (let index1 = 0; index1 < numRows; index1++) {
    const row = matrix[index1];
    const rowHint = getHintForRow(row);
    rowHints.push(rowHint);
  }

  for (let index2 = 0; index2 < numCols; index2++) {
    const col = [];
    for (let index1 = 0; index1 < numRows; index1++) {
      col.push(matrix[index1][index2]);
    }
    const colHint = getHintForRow(col);
    colHints.push(colHint);
  }
  return { rowHints, colHints };
}

function getHintForRow(row) {
  const hint = [];
  let count = 0;

  for (const cell of row) {
    if (cell === 1) {
      count++;
    } else if (count > 0) {
      hint.push(count);
      count = 0;
    }
  }

  if (count > 0) {
    hint.push(count);
  } else if (row.every((cell) => cell === 0)) {
    hint.push(0);
  }

  return hint;
}

function handleSquareClick(
  event,
  infoMatrix,
  squareButtons,
  infoTemplate,
  infoLevel,
) {
  checkThePicture(infoMatrix, squareButtons, infoTemplate, infoLevel);

  const square = event.currentTarget;

  if (square.textContent === "X") {
    return;
  }

  if (square.classList.contains("dark")) {
    square.classList.remove("dark");
  } else {
    square.classList.add("dark");
  }

  checkThePicture(infoMatrix, squareButtons, infoTemplate, infoLevel);
}

function handleContextMenu(event, square) {
  event.preventDefault();

  if (square.classList.contains("dark")) {
    return;
  }

  if (square.textContent === "X") {
    square.textContent = "";
  } else {
    square.textContent = "X";
  }
}

function startTime() {
  const stopwatch = document.querySelector(".play-area__time__stopwatch");
  const timeArray = stopwatch.textContent.split(":");
  let count =
    parseInt(timeArray[0], 10) * 3600 +
    parseInt(timeArray[1], 10) * 60 +
    parseInt(timeArray[2], 10);
  timerId = setInterval(() => {
    count++;

    const hours = Math.floor(count / 3600);
    const minutes = Math.floor((count % 3600) / 60);
    const seconds = count % 60;

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

    stopwatch.textContent = formattedTime;
  }, 1000);
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

function saveCurrentGame(infoTemplate) {
  const squareButtons = document.querySelectorAll(
    ".play-area__box__field__square",
  );

  const newSquareButtons = Array.from(squareButtons).map((button) => {
    if (button.classList.contains("dark")) {
      return 1;
    } else if (button.textContent === "X") {
      return 2;
    } else {
      return 0;
    }
  });
  const newSquareButtonsAsNumbers = newSquareButtons.map(Number);
  const time = document.querySelector(
    ".play-area__time__stopwatch",
  ).textContent;
  localStorage.setItem("infoTemplate", infoTemplate);
  localStorage.setItem("saveField", JSON.stringify(newSquareButtonsAsNumbers));
  localStorage.setItem("time", time);

  createWindowGameSaved();
  const windowToRemove = document.querySelector(
    ".saved-modal-window-container",
  );
  setTimeout(() => {
    if (windowToRemove) {
      windowToRemove.parentNode.removeChild(windowToRemove);
    }
  }, 700);
}

function createPlayerRow(playerNumber, playerObj) {
  const playerData = [
    playerNumber.toString(),
    playerObj["timeWin"],
    playerObj["templateWin"],
    playerObj["levelWin"],
  ];

  const playerElements = document.createElement("tr");
  playerData.forEach((elem) => {
    const playerElem = document.createElement("td");
    playerElem.textContent = elem;
    playerElements.appendChild(playerElem);
  });

  return playerElements;
}

// implementation

createGameWindow();
