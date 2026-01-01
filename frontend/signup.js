async function signup() {
  const loader = document.getElementById("loader");
  const message = document.getElementById("message");

  loader.style.display = "block";
  message.innerHTML = "";

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword })
    });

    const data = await res.json();
    message.innerHTML = data.message;
    message.className = res.ok ? "success" : "error";

    if (res.ok) {
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    }
  } catch {
    message.innerHTML = "Something went wrong";
    message.className = "error";
  }

  loader.style.display = "none";
}
