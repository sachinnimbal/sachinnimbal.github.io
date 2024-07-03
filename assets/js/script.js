"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const skillsSection = document.querySelector("#skills");
  const circles = document.querySelectorAll(".progress-ring__circle");
  const skills = [65, 90, 80, 55, 80, 85, 85, 60, 10];

  circles.forEach((circle, index) => {
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    if (window.innerWidth < 768) {
      const offset = circumference - (skills[index] / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    } else {
      circle.style.strokeDashoffset = circumference;
    }
  });

  if (window.innerWidth >= 768) {
    const animateSkills = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          circles.forEach((circle, index) => {
            setTimeout(() => {
              const radius = circle.r.baseVal.value;
              const circumference = radius * 2 * Math.PI;
              const offset =
                circumference - (skills[index] / 100) * circumference;
              circle.style.transition = "stroke-dashoffset 2s ease-out";
              circle.style.strokeDashoffset = offset;
            }, index * 250);
          });
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(animateSkills, {
      root: null,
      threshold: 0.5,
    });

    observer.observe(skillsSection);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const typedElement = document.querySelector(".title");
  if (typedElement) {
    let typedStrings = typedElement.getAttribute("data-typed-items");
    typedStrings = typedStrings.split(",");
    
    let currentStringIndex = 0;

    function slideUpAnimation() {
      anime({
        targets: typedElement,
        translateY: [-40, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        complete: function() {
          setTimeout(() => {
            slideDownAnimation();
          }, 2000); // Delay before sliding down
        }
      });
    }

    function slideDownAnimation() {
      anime({
        targets: typedElement,
        translateY: [0, 40],
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeInExpo',
        complete: function() {
          currentStringIndex = (currentStringIndex + 1) % typedStrings.length;
          typedElement.textContent = typedStrings[currentStringIndex];
          slideUpAnimation();
        }
      });
    }

    // Initial display
    typedElement.textContent = typedStrings[currentStringIndex];
    slideUpAnimation();
  }
});