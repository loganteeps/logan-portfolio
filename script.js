const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close");

let currentIndex = 0;
let currentImages = [];

// Project data
const projects = {
  "Pelican GEV": {
    title: "Pelican GEV",
    description: "Description of Pelican GEV...",
    images: ["assets/Pelican1.png", "assets/Pelican2.JPG", "assets/Pelican3.png", "assets/Pelican4.JPG", "assets/Pelican5.JPG", "assets/Pelican6.png"]
  },
  "SAE Baja Gearbox": {
    title: "SAE Baja Gearbox",
    description: "Description of the SAE Baja Gearbox...",
    images: ["assets/Gearbox1.png", "assets/Gearbox2.png", "assets/Gearbox3.png",  "assets/Gearbox4.png"]
  },
  "Wing for sUAS Plane": {
    title: "Wing for sUAS Plane",
    description: "Description of Wing for sUAS Plane...",
    images: ["assets/Wing1.png", "assets/Wing2.png", "assets/Wing3.JPG", "assets/Wing4.JPG"]
  },
  "Teeps V1": {
    title: "Teeps V1",
    description: "Description of Teeps V1...",
    images: ["assets/V1_1.JPG", "assets/V1_2.JPG"]
  }
};

// Open modal
document.querySelectorAll(".tile").forEach(tile => {
  tile.addEventListener("click", () => {
    const projectKey = tile.dataset.project;
    const project = projects[projectKey];

    currentImages = project.images;
    currentIndex = 0;

    modalBody.innerHTML = `
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <div class="carousel">
        ${project.images.map((img, i) => `<img src="${img}" class="${i === 0 ? 'active' : ''}" alt="">`).join("")}
        ${project.images.length > 1 ? `
          <button class="arrow left">&#10094;</button>
          <button class="arrow right">&#10095;</button>
        ` : ""}
      </div>
    `;

    modal.style.display = "flex";   // make sure modal is visible
    modal.classList.add("show");     // fade it in
  });
});

// Show specific image in carousel
function showImage(index) {
  const imgs = modalBody.querySelectorAll(".carousel img");
  if (!imgs.length) return;

  imgs[currentIndex].classList.remove("active");
  currentIndex = (index + currentImages.length) % currentImages.length; // wrap around
  imgs[currentIndex].classList.add("active");
}

// Close modal
function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => { modal.style.display = "none"; }, 400);
}

closeBtn.addEventListener("click", closeModal);

// Close when clicking outside modal
window.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

// Keyboard controls
document.addEventListener("keydown", e => {
  if (!modal.classList.contains("show")) return; // only when modal is open

  if (e.key === "Escape") {
    closeModal();
  } else if (e.key === "ArrowLeft" && currentImages.length > 1) {
    showImage(currentIndex - 1);
  } else if (e.key === "ArrowRight" && currentImages.length > 1) {
    showImage(currentIndex + 1);
  }
});

// Arrow button clicks (delegated)
modalBody.addEventListener("click", e => {
  if (e.target.classList.contains("arrow")) {
    if (e.target.classList.contains("left")) {
      showImage(currentIndex - 1);
    } else if (e.target.classList.contains("right")) {
      showImage(currentIndex + 1);
    }
  }
});
