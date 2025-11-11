function initAboutConsulting() {
  const menuItems = document.querySelectorAll(".consulting-item");
  const cards = document.querySelectorAll(".consulting-card");

  function setActive(id) {
    menuItems.forEach(item => {
      item.classList.remove("active");
      if (item.dataset.target === id) item.classList.add("active");
    });

    cards.forEach(card => {
      card.classList.remove("active-card");
      if (card.id === id) card.classList.add("active-card");
    });
  }

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetId = item.dataset.target;
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
      setActive(targetId);
    });
  });

  window.addEventListener("scroll", () => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top >= -100 && rect.top <= 200) {
        setActive(card.id);
      }
    });
  });
}
