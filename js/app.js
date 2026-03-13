/* I am creating a dynamic typing effect for the loading badges.
  This loops through the text content to add trailing dots,
  giving the UI a subtle pulse of activity.
*/
const loadingBadges = document.querySelectorAll('.loadingBadge');

setInterval(() => {
  loadingBadges.forEach((badge) => {
    const currentText = badge.textContent;
    if (currentText === 'Loading...') {
      badge.textContent = 'Loading';
    } else {
      badge.textContent += '.';
    }
  });
}, 500);

/*
  I am setting up an Intersection Observer for the scroll animations.
  This triggers the elements to ease in when scrolling down, 
  and ease out when scrolling up, avoiding layout thrashing.
*/
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('inView');
    } else {
      entry.target.classList.remove('inView');
    }
  }
);
}, observerOptions);

/*
  I am attaching the observer to all tech items and the glass card.
  I also initialize them with the hidden class.
*/
const animatedElements = document.querySelectorAll('.techItem, .glassCard');

animatedElements.forEach((element) => {
  element.classList.add('hiddenState');
  scrollObserver.observe(element);
});

/*
  I am implementing the highly engineered 3D tilt effect.
  I calculate the cursor position relative to the card and 
  update CSS variables to maintain strict separation of concerns.
*/
const glassCards = document.querySelectorAll('.glassCard');

glassCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const xPos = event.clientX - rect.left;
    const yPos = event.clientY - rect.top;

    const xPercent = xPos / rect.width;
    const yPercent = yPos / rect.height;

    const rotateX = ((0.5 - yPercent) * 8). toFixed(2);
    const rotateY = ((xPercent - 0.5) * 8). toFixed(2);

    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateX}deg`);
    card.style.setProperty('--translateY', '-4px');
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');
    card.style.setProperty('--translateY', '0px');
  });
});