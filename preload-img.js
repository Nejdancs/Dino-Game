const images = [
  "./img/cactus1.png",
  "./img/cactus2.png",
  "./img/cactus3.png",
  "./img/cactus4.png",
  "./img/cactus5.png",
  "./img/cactus6.png",
  "./img/cloud.png",
  "./img/dino-run1.png",
  "./img/dino-run2.png",
  "./img/dino-jump.png",
  "./img/dino-crash.png",
  "./img/dino-stay.png",
];

images.map((el) =>
  document.head.insertAdjacentHTML(
    "beforeend",
    `<link rel="preload" as="image" href="${el}">`
  )
);
