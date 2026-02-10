import { logout } from '../modules/auth.js';

// ====== Dynamic Navbar & Hero based on login state ======
export function updateHomeUI() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username') || '';
    const navLinks = document.getElementById('navLinks');
    const heroActions = document.getElementById('heroActions');

    // --- NAV ---
    if (isLoggedIn) {
        navLinks.innerHTML = `
      <li><a href="index.html" class="active">Home</a></li>
      <li><a href="dashboard.html">Dashboard</a></li>
      <li><a href="profile.html">Profile</a></li>
      <li><a href="#" id="navLogoutBtn" class="nav-btn-outline">Logout</a></li>
    `;
        document.getElementById('navLogoutBtn').addEventListener('click', function (e) {
            e.preventDefault();
            logout();
            updateHomeUI();
        });
    } else {
        navLinks.innerHTML = `
      <li><a href="index.html" class="active">Home</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="auth.html?mode=login" class="nav-btn-outline">Sign In</a></li>
      <li><a href="auth.html?mode=register" class="nav-btn">Register</a></li>
    `;
    }

    // --- HERO ACTIONS ---
    if (isLoggedIn) {
        heroActions.innerHTML = `
      <a href="dashboard.html" class="hero-btn hero-btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        Go to Dashboard
      </a>
      <a href="patient-form.html" class="hero-btn hero-btn-secondary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
        Add Patient
      </a>
    `;
    } else {
        heroActions.innerHTML = `
      <a href="auth.html?mode=register" class="hero-btn hero-btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
        Get Started
      </a>
      <a href="#features" class="hero-btn hero-btn-secondary">
        Learn More →
      </a>
    `;
    }
}

// ====== Load patient stats for homepage ======
export function loadHomeStats() {
    const patientsData = localStorage.getItem('patients');
    const patients = patientsData ? JSON.parse(patientsData) : [];
    const total = patients.length;
    const male = patients.filter(p => p.gender && p.gender.toLowerCase() === 'male').length;
    const female = patients.filter(p => p.gender && p.gender.toLowerCase() === 'female').length;

    document.getElementById('homeStatPatients').textContent = total;
    document.getElementById('vStatTotal').textContent = total;
    document.getElementById('vStatMale').textContent = male;
    document.getElementById('vStatFemale').textContent = female;
}

// Initialize homepage
window.addEventListener('DOMContentLoaded', function () {
    updateHomeUI();
    loadHomeStats();
});
