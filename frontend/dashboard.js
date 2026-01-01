// protect dashboard
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

// fake username for now (later from backend/JWT)
document.getElementById("username").innerText = "Pranay";

// section switch
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
}

// profile dropdown
function toggleProfile() {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// close dropdown when clicking outside
window.onclick = function (e) {
  if (!e.target.closest(".profile")) {
    document.getElementById("profileDropdown").style.display = "none";
  }
};
