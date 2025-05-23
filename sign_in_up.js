const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
  const loginBtn = document.getElementById('login');

  registerBtn.addEventListener('click', () => {
    container.classList.add('active');
  });

  loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
  });

  // Auto-switch based on URL mode
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');

  if (mode === 'signup') {
    container.classList.add('active');
  } else if (mode === 'signin') {
    container.classList.remove('active');
  }
  
  function loginUser(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple check (in real apps, validate on server)
    if (username && password) {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "home.html";
    } else {
      alert("Please fill all fields.");
    }
  }

  function registerUser(e) {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    if (name && email && password) {
      // Optionally save user info (mock, not secure)
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userName", name);
      window.location.href = "home.html";
    } else {
      alert("Please fill all fields.");
    }
  }
  
  
  