function updateSkillsColumnsAOS() {
  const isMobile = window.matchMedia("(max-width: 710px)").matches;

  const columns = ["skills-column-1", "skills-column-2"];

  columns.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    if (!el.hasAttribute("data-aos-default")) {
      el.setAttribute("data-aos-default", el.getAttribute("data-aos"));
    }

    if (isMobile) {
      el.setAttribute("data-aos", "fade-up");
    } else {
      el.setAttribute("data-aos", el.getAttribute("data-aos-default"));
    }
  });

  AOS.refresh();
}

updateSkillsColumnsAOS();

window.addEventListener("resize", updateSkillsColumnsAOS);