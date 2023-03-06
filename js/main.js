let backgroundOption = true;
let backgroundInterval;

let settingBox = document.querySelector(".settings-box");
let gearIconContainer = document.querySelector(
  ".settings-box .toggle-settings"
);
let gearIcon = document.querySelector(
  ".settings-box .toggle-settings .main-icon"
);
gearIconContainer.onclick = () => {
  gearIcon.classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
  if (gearIcon.classList.contains("fa-spin")) {
    gearIconContainer.classList.add("toggle-open");
  } else {
    gearIconContainer.classList.remove("toggle-open");
  }
};

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.currentTarget.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const colorsLi = document.querySelectorAll(".settings-box .colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    handleActive(e);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
  });
});
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  colorsLi.forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === mainColor) {
      li.classList.add("active");
    }
  });
}
//start randam at setting=================
const randomBackground = document.querySelectorAll(
  ".settings-box .random-backgrounds span"
);
randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randmizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  randomBackground.forEach((span) => {
    span.classList.remove("active");
  });
  if (backgroundLocalItem == "true") {
    backgroundOption = true;
    document
      .querySelector(".settings-box .random-backgrounds .yes")
      .classList.add("active");
  } else {
    backgroundOption = false;
    document
      .querySelector(".settings-box .random-backgrounds .no")
      .classList.add("active");
  }
}
//end randam at setting=================
let landing = document.querySelector(".landing");
let imgsArray = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.png",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
];
function randmizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landing.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}
randmizeImgs();

let ourSkillSection = document.querySelector(".skills");
let progressSpan = document.querySelectorAll(
  ".skills .box .skill-progress span"
);
window.onscroll = () => {
  let aboutUs = document.querySelector(".about-us");
  if (window.scrollY >= aboutUs.offsetTop - 50) {
    gearIcon.parentElement.style.backgroundColor = "black";
    gearIcon.style.color = "#fff";
  } else {
    gearIcon.parentElement.style.backgroundColor = "#fff";
    gearIcon.style.color = "black";
  }

  if (window.scrollY >= ourSkillSection.offsetTop - 250) {
    progressSpan.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

let galleryImg = document.querySelectorAll(".gallery .box img");

galleryImg.forEach((img) => {
  img.addEventListener("click", () => {
    let overLay = document.createElement("div");
    overLay.classList.add("popupp-overlay");
    document.body.appendChild(overLay);

    let popupp = document.createElement("div");
    popupp.classList.add("popupp");
    document.body.appendChild(popupp);

    if (img.alt !== null) {
      let head = document.createElement("h2");
      let headText = document.createTextNode(img.alt);
      head.appendChild(headText);
      popupp.appendChild(head);
    }

    let popuppImg = document.createElement("img");
    popuppImg.src = img.src;
    popupp.appendChild(popuppImg);
    console.log(img.alt);

    let close = document.createElement("span");
    let closeText = document.createTextNode("X");
    close.appendChild(closeText);
    popupp.appendChild(close);

    close.onclick = () => {
      overLay.remove();
      close.parentElement.remove();
    };
  });
});

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "yes") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "yes");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "no");
    }
    handleActive(e);
  });
});

function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  event.target.classList.add("active");
}

document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
};
