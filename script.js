document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("avatarCanvas");
  const ctx = canvas.getContext("2d");
  const dpi = window.devicePixelRatio || 1;

  adjustCanvasForHighDPI(canvas);

  const imageCache = {};

  function getRandomOption(selectElement) {
    const options = selectElement.options;
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex].value;
  }

  function resetAvatar() {
    const defaults = {
      bg: "bg.png",
      head: "main.png",
      aura: "none.png",
      hat: "none.png",
      eyes: "none.png",
      outfits: "none.png",
      rightHand: "none.png",
    };

    Object.entries(defaults).forEach(([part, defaultValue]) => {
      const selectElement = document.getElementById(part);
      if (selectElement) {
        selectElement.value = defaultValue; // Reset the select element to the default value
        console.log(`Reset ${part} to ${defaultValue}`);
        onPartChange(part, defaultValue); // Update the avatar part
      } else {
        console.error(`Element with id ${part} not found`);
      }
    });
  }

  document.querySelector(".resetBtn").addEventListener("click", resetAvatar);

  document
    .querySelector(".randomizeBtn")
    .addEventListener("click", function () {
      ["bg", "aura", "hat", "eyes", "outfits", "rightHand"].forEach((part) => {
        const selectElement = document.getElementById(part);
        const randomValue = getRandomOption(selectElement);
        selectElement.value = randomValue; // Update the select element with the random value
        onPartChange(part, randomValue); // Update the avatar part
      });
    });

  const selectedParts = {
    bg: "assetsbuilder/images/bg/bg.png",
    aura: "assetsbuilder/images/aura/none.png",
    head: "assetsbuilder/images/head/main.png",
    eyes: "assetsbuilder/images/eyes/none.png",
    hat: "assetsbuilder/images/hat/none.png",
    outfits: "assetsbuilder/images/outfits/none.png",
    rightHand: "assetsbuilder/images/rightHand/none.png",
  };

  function adjustCanvasForHighDPI(canvas) {
    const style = getComputedStyle(canvas);
    const width = parseInt(style.width) * dpi;
    const height = parseInt(style.height) * dpi;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width / dpi}px`;
    canvas.style.height = `${height / dpi}px`;
    ctx.scale(dpi, dpi);
  }

  function loadImage(partPath) {
    return new Promise((resolve, reject) => {
      if (imageCache[partPath]) {
        resolve(imageCache[partPath]);
      } else {
        const img = new Image();
        img.crossOrigin = "anonymous"; // Enable CORS
        img.onload = function () {
          imageCache[partPath] = img;
          resolve(img);
        };
        img.onerror = function () {
          reject(new Error(`Failed to load image: ${partPath}`));
        };
        img.src = partPath;
      }
    });
  }

  async function drawPart(partPath) {
    try {
      const img = await loadImage(partPath);
      ctx.drawImage(img, 0, 0, canvas.width / dpi, canvas.height / dpi);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function updateAvatar() {
    ctx.clearRect(0, 0, canvas.width / dpi, canvas.height / dpi);
    const drawOrder = [
      "bg",
      "aura",
      "head",
      "eyes",
      "hat",
      "outfits",
      "rightHand",
    ];
    for (const part of drawOrder) {
      await drawPart(selectedParts[part]);
    }
  }

  function onPartChange(part, fileName) {
    selectedParts[part] = "assetsbuilder/images/" + part + "/" + fileName;
    updateAvatar();
  }

  ["bg", "aura", "hat", "eyes", "outfits", "rightHand"].forEach((part) => {
    const element = document.getElementById(part);
    if (element) {
      element.addEventListener("change", function () {
        onPartChange(part, this.value);
      });
    } else {
      console.error(`Element with id ${part} not found`);
    }
  });

  document.querySelector(".downloadBtn").addEventListener("click", function () {
    canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.download = "myAvatar.png";
      downloadLink.href = url;
      downloadLink.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  });

  updateAvatar(); // Initialize the avatar with default parts
});
