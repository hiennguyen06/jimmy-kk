import { wrapGrid } from "animate-css-grid";
import "./canvas";
import "./style.css";

// Initiate CSS Grid animation tool
const grid = document.querySelector(".grid");
const { forceGridAnimation } = wrapGrid(grid);

// Get all the tiles and the empty tile
const tiles = Array.from(document.querySelectorAll(".tile"));
const emptyTile = document.querySelector(".tile--empty");

// Get congratulations heading
const heading = document.querySelector(".heading");

const resetBtn = document.querySelector(".js-reset-btn");

// A key / value store of what areas to "unlock"
const areaKeys = {
  A: ["B", "D"],
  B: ["A", "C", "E"],
  C: ["B", "F"],
  D: ["A", "E", "G"],
  E: ["B", "D", "F", "H"],
  F: ["C", "E", "I"],
  G: ["D", "H"],
  H: ["E", "G", "I"],
  I: ["F", "H"],
};

let turns = 0;

// show button
const showButton = () => {
  showBtn.style.display = "block";
};

// Add click listener to all tiles
tiles.map((tile) => {
  tile.addEventListener("click", (event) => {
    // Grab the grid area set on the clicked tile and empty tile
    const tileArea = tile.style.getPropertyValue("--area");
    const emptyTileArea = emptyTile.style.getPropertyValue("--area");

    // Swap the empty tile with the clicked tile
    emptyTile.style.setProperty("--area", tileArea);
    tile.style.setProperty("--area", emptyTileArea);

    // add turns count
    turns += 1;
    document.getElementById("moves").innerText = turns;

    // Animate the tiles
    forceGridAnimation();

    // Unlock and lock tiles
    unlockTiles(tileArea);
  });
});

// Unlock or lock tiles based on empty tile position
const unlockTiles = (currentTileArea) => {
  // Cycle through all the tiles and check which should be disabled and enabled
  tiles.map((tile) => {
    const tileArea = tile.style.getPropertyValue("--area");

    // Check if that areaKey has the tiles area in it's values
    // .trim() is needed because the animation lib formats the styles attribute
    if (areaKeys[currentTileArea.trim()].includes(tileArea.trim())) {
      tile.disabled = false;
    } else {
      tile.disabled = true;
    }
  });

  // Check if the tiles are in the right order
  isComplete(tiles);
};

const isComplete = (tiles) => {
  // Get all the current tile area values
  const currentTilesString = tiles
    .map((tile) => tile.style.getPropertyValue("--area").trim())
    .toString();

  // Compare the current tiles with the areaKeys keys
  if (currentTilesString == Object.keys(areaKeys).toString()) {
    heading.children[0].innerHTML = "You won!";
    heading.style = `
			animation: popIn .3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		`;
    showButton();
  } else {
    heading.children[0].innerHTML = "Complete the puzzle to reveal your gift!";
  }
};

// Inversion calculator
const inversionCount = (array) => {
  // Using the reduce function to run through all items in the array
  // Each item in the array is checked against everything before it
  // This will return a new array with each intance of an item appearing before it's original predecessor
  return array.reduce((accumulator, current, index, array) => {
    return array
      .slice(index)
      .filter((item) => {
        return item < current;
      })
      .map((item) => {
        return [current, item];
      })
      .concat(accumulator);
  }, []).length;
};

// Randomise tiles
const shuffledKeys = (keys) =>
  Object.keys(keys).sort(() => 0.5 - Math.random());

// Reset score and board

const initGame = () => {
  // Begin with our in order area keys
  let startingAreas = Object.keys(areaKeys);

  // Use the inversion function to check if the keys will be solveable or not shuffled
  // Shuffle the keys until they are solvable
  while (
    inversionCount(startingAreas) % 2 == 1 ||
    inversionCount(startingAreas) == 0
  ) {
    startingAreas = shuffledKeys(areaKeys);
  }

  // Apply shuffled areas
  tiles.map((tile, index) => {
    tile.style.setProperty("--area", startingAreas[index]);
  });

  // Initial shuffle animation
  forceGridAnimation();

  // Unlock and lock tiles
  unlockTiles(emptyTile.style.getPropertyValue("--area"));
};

// Timer Function
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;

  const countdown = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(countdown);
      heading.children[0].innerHTML = "You lost! The timer beat you.";
      showButton();
    }
  }, 1000);
}

const startCountdown = () => {
  var twoMinutes = 120,
    display = document.querySelector("#time");
  startTimer(twoMinutes, display);
};

setTimeout(() => {
  initGame();
  startCountdown();
}, 2000);

resetBtn.addEventListener("click", () => {
  document.getElementById("moves").innerText = turns;
  initGame();
});

// Transition pages
const showBtn = document.querySelector(".js-show-btn");
const canvasWrapper = document.querySelector(".canvas-wrapper");
showBtn.addEventListener("click", (e) => {
  // container.classList.add("show-canvas");
  canvasWrapper.classList.add("show-canvas");
});

// close present button
const closeBtn = document.querySelector(".js-close-btn");
closeBtn.addEventListener("click", () => {
  canvasWrapper.classList.remove("show-canvas");
});
