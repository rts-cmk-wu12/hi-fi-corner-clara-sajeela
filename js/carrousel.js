const container = document.querySelector('.container');
const imageRoll = document.querySelector('.imageroll');
const imageWindow = document.querySelector('.imagewindow');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let currentIndex = 0;
const imageWindowWidth = imageWindow.offsetWidth;

container.addEventListener('click', function(e) {
  let newIndex = currentIndex;
  if (e.target === prev) {
    if (newIndex > 0) {
      newIndex = currentIndex - 1;
    }
  } else if (e.target === next) {
    if (newIndex < imageRoll.children.length - 1) {
      newIndex = currentIndex + 1;
    }
  }
  currentIndex = newIndex;
  const offset = newIndex * imageWindowWidth;

  // First, animate the transition
  imageRoll.animate([{ transform: `translateX(-${offset}px)` }], { duration: 500, fill: 'both' });

  // Then, apply the transformation permanently
  setTimeout(() => {
    imageRoll.style.transform = `translateX(-${offset}px)`;
  }, 500); // Match the duration of the animation
});
