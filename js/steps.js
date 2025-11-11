
const steps = document.querySelectorAll(".timeline-step");
const cards = document.querySelectorAll(".timeline-card");
const line = document.querySelector(".timeline-line");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const section = document.querySelector(".timeline-section");
  const rect = section.getBoundingClientRect();
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollProgress = Math.min(
    Math.max((scrollY - sectionTop) / (sectionHeight - window.innerHeight), 0),
    1
  );

  // Update vertical line fill
  line.style.setProperty("--fill", `${scrollProgress * 100}%`);

  // Activate cards & steps
  cards.forEach((card, i) => {
    const cardRect = card.getBoundingClientRect();
    const step = steps[i];
    if (cardRect.top < window.innerHeight * 0.6 && cardRect.bottom > window.innerHeight * 0.3) {
      card.classList.add("active");
      step.classList.add("active");
    } else {
      card.classList.remove("active");
      step.classList.remove("active");
    }
  });
});
