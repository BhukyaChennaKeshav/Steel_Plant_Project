const employeeId =
localStorage.getItem("employeeId");

const userRole =
localStorage.getItem("userRole");

const frame =
document.getElementById("frame");

const navButtons =
Array.from(
  document.querySelectorAll(".nav-item[data-page]")
);

const username =
document.getElementById("username");

const sidebar =
document.getElementById("sidebar");

const menuBtn =
document.getElementById("menuBtn");

/* LOGIN CHECK */

if (!employeeId || userRole !== "employee") {

  window.location.href =
  "role.html";
}

/* USERNAME */

username.textContent =
employeeId;

/* ACTIVE BUTTON */

function setActive(button){

  navButtons.forEach((item)=>{

    item.classList.remove("active");

  });

  button.classList.add("active");
}

/* NAVIGATION */

navButtons.forEach((button)=>{

  button.addEventListener("click",()=>{

    const page =
    button.dataset.page;

    frame.src = page;

    setActive(button);

    /* HIDE SIDEBAR AFTER CLICK */

    if(window.innerWidth <= 980){

      sidebar.classList.remove("active");
    }

  });

});

/* MENU BUTTON */

menuBtn.addEventListener("click",()=>{

  sidebar.classList.toggle("active");

});

/* LOGOUT POPUP */

document.querySelector(".sidebar-logout")
.addEventListener("click",logout);

function logout(){

  document.getElementById("logoutPopup")
  .style.display = "flex";

  /* HIDE SIDEBAR */

  if(window.innerWidth <= 980){

    sidebar.classList.remove("active");
  }
}

/* CLOSE POPUP */

function closePopup(){

  document.getElementById("logoutPopup")
  .style.display = "none";
}

/* CONFIRM LOGOUT */

function confirmLogout(){

  localStorage.clear();

  window.location.href =
  "role.html";
}