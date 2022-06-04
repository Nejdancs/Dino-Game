const refs = {
  dino: document.querySelector(".dino"),
  wrapCactus: document.querySelector(".wrap-cactus"),
  ground: document.querySelector(".ground"),
  cloud: document.querySelector(".cloud"),
  gameOver: document.querySelector(".game-over"),
  topScore: document.querySelector(".top-scor"),
  currentScore: document.querySelector(".current-scor"),
};

let jumpTimeoutId;
let topScore = localStorage.getItem("topScore") ?? 0;
let currentScore = 0;
let scoreIntId;

startGame();

function startGame() {
  refs.topScore.innerHTML = String(topScore).padStart(5, "0");

  addEventListener("mousedown", onStart);
  addEventListener("touchstart", onStart);
  addEventListener("keydown", onStart);
}

function onStart(e) {
  if (e.code !== "Space" && e.which !== 1 && e.type !== "touchstart") {
    return;
  }
  console.log(e);

  currentScore = 0;

  addEventListener("mousedown", jumpHandler);
  addEventListener("touchstart", jumpHandler);
  addEventListener("keydown", jumpHandler);

  clearClassList();
  counterCurrentScore();
  cactusRun();

  refs.wrapCactus.innerHTML = createCactus();

  refs.dino.classList.add("dino-run");

  removeEventListener("mousedown", onStart);
  removeEventListener("touchstart", onStart);
  removeEventListener("keydown", onStart);
  checkResult();
}

function counterCurrentScore() {
  scoreIntId = setInterval(() => {
    currentScore += 1;

    refs.currentScore.innerHTML = String(currentScore).padStart(5, "0");
  }, 100);
}

function clearClassList() {
  refs.wrapCactus.classList.remove("cactus-run");
  refs.ground.classList.remove("ground-run");
  refs.wrapCactus.classList.remove("cactus-stop");
  refs.dino.classList.remove("dino-stop");
  refs.dino.classList.remove("dino-crash");
  refs.dino.classList.remove("dino-jump");
  refs.ground.classList.remove("ground-stop");
  refs.cloud.classList.remove("cloud-stop");
  refs.dino.classList.remove("dino-stay");
  refs.gameOver.classList.add("hidden");
}

const cactus = document.querySelector(".cactus");

function createCactus() {
  let cactusMarkup = "";
  const { randomAmount, ramdomSize } = generateSizeAndAmount();
  speedAnimationCactus(randomAmount, ramdomSize);

  for (let i = 1; i <= randomAmount; i += 1) {
    const randomImg = Math.floor(Math.random() * (7 - 1) + 1);
    cactusMarkup += `<div class="cactus" style="width:${
      ramdomSize / 2
    }px ; height: ${ramdomSize}px; background-image: url(./img/cactus${randomImg}.png)"></div>`;
  }
  return cactusMarkup;
}

function cactusRun() {
  refs.wrapCactus.addEventListener("animationend", animationEndHandler);

  setTimeout(() => {
    refs.wrapCactus.classList.add("cactus-run");
    refs.ground.classList.add("ground-run");
    refs.cloud.classList.add("cloud-run");
  }, 0);
}
console.log(Math.floor(Math.random() * (5 - 1) + 1));

function speedAnimationCactus(amount, size) {
  if (amount === 1) {
    refs.wrapCactus.style.setProperty(
      "--var-time-anim",
      `${(size / 2) * amount + 1860}ms`
    );
  } else if (amount === 2) {
    refs.wrapCactus.style.setProperty(
      "--var-time-anim",
      `${(size / 2) * amount + 1900}ms`
    );
  } else if (amount === 3) {
    refs.wrapCactus.style.setProperty(
      "--var-time-anim",
      `${(size / 2) * amount + 1930}ms`
    );
  } else if (amount === 4) {
    refs.wrapCactus.style.setProperty(
      "--var-time-anim",
      `${(size / 2) * amount + 1940}ms`
    );
  }
}
function generateSizeAndAmount() {
  let max = 0;
  let min = 0;
  const randomAmount = Math.floor(Math.random() * (5 - 1) + 1);

  if (currentScore < 500) {
    min = 30;

    if (randomAmount === 4) {
      max = 35;
    } else if (randomAmount === 3) {
      max = 45;
    } else if (randomAmount === 2) {
      max = 55;
    } else if (randomAmount === 1) {
      max = 65;
    }
  } else if (currentScore < 1000) {
    min = 40;

    if (randomAmount === 4) {
      max = 45;
    } else if (randomAmount === 3) {
      max = 55;
    } else if (randomAmount === 2) {
      max = 65;
    } else if (randomAmount === 1) {
      max = 75;
    }
  } else {
    min = 45;

    if (randomAmount === 4) {
      max = 55;
    } else if (randomAmount === 3) {
      max = 60;
    } else if (randomAmount === 2) {
      max = 70;
    } else if (randomAmount === 1) {
      max = 80;
    }
  }

  const ramdomSize = Math.round(Math.random() * (max - min) + min);

  return { randomAmount, ramdomSize };
}

function jumpHandler(e) {
  if (e.code !== "Space" && e.which !== 1 && e.type !== "touchstart") {
    return;
  }
  console.log(e);

  removeEventListener("mousedown", jumpHandler);
  removeEventListener("touchstart", jumpHandler);
  removeEventListener("keydown", jumpHandler);

  refs.dino.classList.add("dino-jump");

  jumpTimeoutId = setTimeout(() => {
    refs.dino.classList.remove("dino-jump");
    addEventListener("mousedown", jumpHandler);
    addEventListener("touchstart", jumpHandler);
    addEventListener("keydown", jumpHandler);
  }, 500);
}

function checkResult() {
  const intId = setInterval(() => {
    const posDino = refs.dino.getBoundingClientRect();
    const posCactus = refs.wrapCactus.getBoundingClientRect();

    if (
      posDino.bottom - 10 >= posCactus.top + 10 &&
      posCactus.left <= posDino.right - 10 &&
      posCactus.right >= posDino.left + 10
    ) {
      clearTimeout(jumpTimeoutId);
      clearInterval(intId);

      removeEventListener("mousedown", jumpHandler);
      removeEventListener("touchstart", jumpHandler);
      removeEventListener("keydown", jumpHandler);

      refs.wrapCactus.removeEventListener("animationend", animationEndHandler);
      topScore = String(
        topScore < currentScore ? currentScore : topScore
      ).padStart(5, "0");

      localStorage.setItem("topScore", topScore);

      setClassList();
      startGame();
      clearInterval(scoreIntId);
      refs.gameOver.classList.remove("hidden");
    }
  }, 0);
}

function setClassList() {
  refs.dino.classList.remove("dino-run");
  refs.dino.classList.add("dino-crash");
  refs.dino.classList.add("dino-stop");
  refs.wrapCactus.classList.add("cactus-stop");
  refs.ground.classList.add("ground-stop");
  refs.cloud.classList.add("cloud-stop");
}

function animationEndHandler() {
  refs.wrapCactus.classList.remove("cactus-run");
  refs.wrapCactus.removeEventListener("animationend", animationEndHandler);
  refs.wrapCactus.innerHTML = createCactus();
  cactusRun();
}

function createGameOverMarkup() {}
