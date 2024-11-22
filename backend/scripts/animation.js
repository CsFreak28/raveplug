function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function animateImage() {
  const image = document.getElementById("animatedImage");

  // Randomly change position, scale, and rotation
  const randomX = getRandom(-20, 20); // Random X position shift
  const randomY = getRandom(-20, 20); // Random Y position shift
  const randomScale = getRandom(0.9, 1.2); // Random scaling factor
  const randomRotation = getRandom(-10, 10); // Random rotation in degrees

  image.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale}) rotate(${randomRotation}deg)`;

  // Call the function again after a random time interval
  setTimeout(animateImage, getRandom(1000, 3000)); // Random interval between 1 to 3 seconds
}

// Start the animation when the page loads
window.onload = function () {
  animateImage();
};
