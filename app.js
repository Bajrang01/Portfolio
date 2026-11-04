(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".nav-link")];
  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  const initialId = window.location.hash.slice(1);
  if (sections.some((section) => section.id === initialId)) setActive(initialId);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.4] });
    sections.forEach((section) => observer.observe(section));
  }
})();
