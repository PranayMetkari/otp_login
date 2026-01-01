async function login() {
  const loginLoader = document.getElementById("loginLoader");
  const message = document.getElementById("message");
  const otpSection = document.getElementById("otpSection");
  const loginSection = document.getElementById("loginSection");

  loginLoader.style.display = "block";
  message.innerHTML = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    message.innerHTML = data.message;
    message.className = res.ok ? "success" : "error";

    if (res.ok) {
      // 🔥 HIDE login, SHOW OTP
      loginSection.style.display = "none";
      otpSection.classList.remove("hidden");
    }
  } catch {
    message.innerHTML = "Login failed";
    message.className = "error";
  }

  loginLoader.style.display = "none";
}


async function verifyOtp() {
  const otpLoader = document.getElementById("otpLoader");
  const message = document.getElementById("message");

  otpLoader.style.display = "block";

  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      message.innerHTML = "Login successful";
      message.className = "success";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      message.innerHTML = data.message;
      message.className = "error";
    }
  } catch {
    message.innerHTML = "OTP verification failed";
    message.className = "error";
  }

  otpLoader.style.display = "none";
}
