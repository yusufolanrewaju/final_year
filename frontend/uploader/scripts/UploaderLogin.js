document.getElementById("uploaderLoginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    const email = document.getElementById("mail").value;
    const password = document.getElementById("passw").value;
  
    try {
      const response = await fetch("/api/auth/uploader-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Login successful!");
        // Redirect to uploader dashboard or any other page
        window.location.href = "/uploader/dashboard";
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again later.");
    }
  });
  
  // Wallet login button handler (for future implementation)
  document.getElementById("walletLogin").addEventListener("click", () => {
    alert("Wallet login feature coming soon!");
  });

  
  const signupHandler = async (data) => {
    const response = await fetch("/api/auth/consumer/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
  
    if (response.ok) {
      if (data.walletAddress) {
        window.location.href = "/add-email-username";
      } else {
        window.location.href = "/add-wallet";
      }
    } else {
      alert(result.error || "Signup failed!");
    }
  };
  