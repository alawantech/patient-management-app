import { checkAuth, logout } from '../modules/auth.js';

// Check authentication
checkAuth();

// Load user profile data
window.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username") || "admin";
    const loginTime = localStorage.getItem("loginTime");

    document.getElementById("profileUsername").textContent =
        username.charAt(0).toUpperCase() + username.slice(1);
    document.getElementById("usernameValue").textContent = username;

    if (loginTime) {
        const date = new Date(loginTime);
        const formattedDate = date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        document.getElementById("loginTimeValue").textContent = formattedDate;
    }
});

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();
    logout();
});

// Expose logout to window for inline onclick on profile page button
window.logout = logout;
