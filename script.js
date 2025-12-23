const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close");

let currentIndex = 0;
let currentImages = [];

// Project data
const projects = {
  "Pelican GEV": {
    title: "Pelican GEV",
    description: "A purpose-built ground effect vehicle designed with biomimicry. Optimized for efficient flight and a fast fabrication timeline, the Pelican is composed of LW-PLA 3D printed parts with carbon fiber tubes for structure.  It is controlled by a Pixhawk flight controller to maintain an optimal cruise height. This is achieved through a Lidar sensor control loop. ",
    images: ["assets/Pelican1.png", "assets/Pelican2.JPG", "assets/Pelican3.png", "assets/Pelican4.JPG", "assets/Pelican5.JPG", "assets/Pelican6.png", "assets/Pelican7.JPG"]
  },
  "SAE Baja Gearbox": {
    title: "SAE Baja Gearbox",
    description: "Optimized fixed-ratio gearbox for speed, durability, and torque. Every design decision balanced these objectives in the context of design for manufacturability. ",
    images: ["assets/Gearbox1.png", "assets/Gearbox2.png", "assets/Gearbox3.png",  "assets/Gearbox4.png", "assets/Gearbox5.jpg"]
  },
  "Wing for sUAS Plane": {
    title: "Wing for sUAS Plane",
    description: "Balsa wood and Monokote wing for Olin AERO's sUAS plane. Designed in Onshape and constructed with a custom jig to ensure accuracy and repeatability. Integrated with wing mounted motors and ESCs.",
    images: ["assets/Wing1.png", "assets/Wing2.png", "assets/Wing3.JPG", "assets/Wing4.JPG", "assets/Wing5.JPG"]
  },
  "Heavy Lift Octocopter": {
    title: "Heavy Lift Octocopter",
    description: "175 kg heavy lift octocopter for fire suppression. Machined custom test rig for Instron test to validate composites. Utilizing extensive hand calculations and FEA analysis to optimize performance and efficiency.",
    images: ["assets/Bad1.png", "assets/Bad2.png", "assets/bad4.JPG",]
  },
  "Teeps V1": {
    title: "Teeps V1",
    description: "My first airplane design. Optimized for efficiency and additive manufacturability. Teeps V1 was constructed entirely from 3D printed parts. I taught myself XFLR5 and Onshape to design and analyze the aircraft.",
    images: ["assets/V1_1.JPG", "assets/V1_2.JPG", "assets/AER2.pdf"]
  },
  "Quad VTOL Tail Sitter": {
    title: "Quad VTOL Tail Sitter",
    description: "Small scale quad VTOL tail sitter flying wing. It is an interesting challenge as it is basically a quadcopter and a flying wing in one airframe. Designed in Onshape and flown with a Pixhawk flight controller.",
    images: ["assets/littlewing1.png", "assets/littlewing2.JPG", "assets/littlewing3.jpg"]
  },
  "Moon Beam (Golf Cart)": {
    title: "Moon Beam (Golf Cart)",
    description: "I rebuilt and modified an old gas golf cart. I rebuilt the carburetor, fuel system, and electrical system. This was a super fun hands on project that taught me a lot about small engines and automotive systems.",
    images: ["assets/Moonbeam1.JPG", "assets/Moonbeam2.JPG", "assets/Moonbeam3.jpg"]
  },
  "VTOL Aircraft Prototype": {
    title: "VTOL Aircraft Prototype",
    description: "I build a small VTOL aircraft and got it flying in two days. This was a super fun challenge and exercize in getting a functional minum viable product extremely quickly.",
    images: ["assets/Tuby1.png", "assets/Tuby2.jpg", "assets/Tuby3.jpg"]
  },
  "Swashplateless Helicopter": {
    title: "Swashplateless Helicopter",
    description: "I designed, built, and successfully tuned a swashplateless helicopter. It achieves full cyclic (pitch and roll) control without actuators. Using the inertia of the blades and a magnetic encoder to measure position, the motor’s speed is modulated as a sinusoid to change the lift vector. I achieved steady hover with hours of PID tuning after weeks of long hours testing and building the helicopter. I wrote the control software and selected and integrated all of the electronics. It required various protocols including I2C, PWM, and DSHOT. It took dozens of mechanical iterations to get a good working solution. ",
    images: ["assets/heli1.png", "assets/heli2.JPEG", "assets/heli3.jpeg", "assets/heli4.JPEG", "assets/heli5.jpg"]
  },
  "Custom Longboard": {
    title: "Custom Longboard",
    description: "Outside of engineering, I love surfing and water sports. Surfboard shaping is a fascinating art and utilizes my passions for fluid dynamics and composites. This was the second board I have made. It is a 9'2\" single fin log.",
    images: ["assets/board1.JPG", "assets/board2.JPG", "assets/board3.JPG", "assets/board4.JPG", "assets/board5.JPG"]
  },
  "Linear Algebra in Finite Element Analysis": {
    title: "Linear Algebra in Finite Element Analysis",
    description: "For my Quantitative Engineering Analysis 1 final project, Bradford, Aaditya, and I implemented a Finite Element Analysis solver in MATLAB, then validated our results by Instron machine strain testing a 3D printed part.",
    images: ["assets/FEA_QEA.pdf"]
  },
  "Optimizing Steak Cooking with Thermodynamics": {
    title: "Optimizing Steak Cooking with Thermodynamics",
    description: "A thermodynamics model to optimize steak cooking time implemented in MATLAB. The model was varified with an experiment cooking real steaks.",
    images: ["assets/Thermo1.pdf"]
  },
  "TEDx Talk on Experiential Education": {
    title: "TEDx Talk on Experiential Education",
    description: "Ignited by his experience with project based learning, high school student Logan Teeple explains how his journey serves as a model for other experiential education programs.",
    images: ["https://www.youtube.com/embed/m9l6TX0N8D0"]
  },
  "The Future of Commercial Airplane Design": {
    title: "The Future of Commercial Airplane Design",
    description: "My first deep dive into aerospace engineering, this project explored the next generation of aircraft design and the challenges of increasing efficiency and sustainability in the aerospace industry.",
    images: ["assets/AER1.pdf"]
  },
  "Quotes I live By": {
    title: "Quotes I live By",
    description: "Don't miss the same way twice - Ed Hip Little things done well is the key to success - John Wooden Slow is smooth, smooth is fast - My ex-SEAL father",
    images: ["assets/e.pdf"]
  },
  "Home Essay": {
    title: "Home Essay",
    description: "An essay on home as a metaphor for one's comfort zone.",
    images: ["assets/Home.pdf"]
  },
  "Gradient Descent Flight Path Algorithm": {
    title: "Gradient Descent Flight Path Algorithm",
    description: "An objective and risk balancing flight path algorithm for Olin AERO's sUAS plane. Implemented in Python, the algorithm calculates a rejection vector from boundaries based on proximity and relative heading. Then, it does a linear combination with a goal vector and progressively nears goal waypoint. Automatically splines paths between multiple waypoints in order.",
    images: ["assets/Algorithm1.png"]
  },
  "First Solo": {
    title: "First Solo",
    description: "My first solo flight experience.",
    images: ["assets/flying1.jpg"]
  },
  "Cessna 172": {
    title: "Cessna 172",
    description: "I have 140 hours in Cessna 172s in Socal, Florida, and Massachusetts.",
    images: ["assets/C172.jpg"]
  },
  "Grumman AA5-B Tiger": {
    title: "Grumman AA5-B Tiger",
    description: "I have about 10 hours flying the Grumman AA5-B Tiger.",
    images: ["assets/tiger.png"]
  },
  "Diamond DA40": {
    title: "Diamond DA40",
    description: "The DA40 was my first time flying a FADEC, and stick aircraft.",
    images: ["assets/DA40.jpeg"]
  },
  "Cessna 206": {
    title: "Cessna 206",
    description: "I have about 4 hours flying the rugged and versatile Cessna 206 in the Florida Keys",
    images: ["assets/C206.jpg"]
  },
  "Cessna 208 Caravan": {
    title: "Cessna 208 Caravan",
    description: "I have about 2 hours flying the Caravan to the Bahamas.",
    images: ["assets/c208.png"]
  }

};

// Open modal
document.querySelectorAll(".tile").forEach(tile => {
  tile.addEventListener("click", () => {
    const projectKey = tile.dataset.project;
    const project = projects[projectKey];
    if (!project) return;

    currentImages = project.images;
    currentIndex = 0;

    // Build modal content
    let content = `<h2>${project.title}</h2>`;
    if (project.description) content += `<p>${project.description}</p>`;
    content += `<div class="carousel">`;

    project.images.forEach((img, i) => {
      if (img.endsWith(".pdf")) {
        content += `<iframe src="${img}" class="${i===0?'active':''}" style="width:100%; height:600px; border:none;" title="${project.title}"></iframe>`;
      } else if (img.includes("youtube.com/embed")) {
        content += `<div class="video-container ${i===0?'active':''}">
                      <iframe src="${img}" frameborder="0" allowfullscreen></iframe>
                    </div>`;
      } else {
        content += `<img src="${img}" class="${i===0?'active':''}" alt="">`;
      }
    });

    // Add arrows if multiple items
    if (project.images.length > 1) {
      content += `
        <button class="arrow left">&#10094;</button>
        <button class="arrow right">&#10095;</button>
      `;
    }

    content += `</div>`;
    modalBody.innerHTML = content;

    modal.style.display = "flex";   // show modal
    modal.classList.add("show");     // fade in
  });
});

// Show specific image/video in carousel
function showImage(index) {
  const items = modalBody.querySelectorAll(".carousel img, .carousel .video-container, .carousel iframe");
  if (!items.length) return;

  items[currentIndex].classList.remove("active");
  currentIndex = (index + currentImages.length) % currentImages.length;
  items[currentIndex].classList.add("active");
}

// Close modal
function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => { modal.style.display = "none"; modalBody.innerHTML = ""; }, 400);
}

closeBtn.addEventListener("click", closeModal);

// Close when clicking outside modal
window.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

// Keyboard controls
document.addEventListener("keydown", e => {
  if (!modal.classList.contains("show")) return;

  if (e.key === "Escape") {
    closeModal();
  } else if (e.key === "ArrowLeft" && currentImages.length > 1) {
    showImage(currentIndex - 1);
  } else if (e.key === "ArrowRight" && currentImages.length > 1) {
    showImage(currentIndex + 1);
  }
});

// Arrow button clicks
modalBody.addEventListener("click", e => {
  if (e.target.classList.contains("arrow")) {
    if (e.target.classList.contains("left")) {
      showImage(currentIndex - 1);
    } else if (e.target.classList.contains("right")) {
      showImage(currentIndex + 1);
    }
  }
});
