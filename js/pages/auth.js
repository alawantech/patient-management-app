import { loginUser, registerUser } from '../modules/auth.js';
import { showToast } from '../modules/toast.js';

// ====== Tab Switching ======
window.switchTab = function (tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const successState = document.getElementById('successState');

    // Hide success state
    successState.style.display = 'none';

    // Clear errors
    clearErrors();

    if (tab === 'login') {
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        authTitle.textContent = 'Sign In';
        authSubtitle.textContent = 'Enter your credentials to access the system.';
        document.title = 'Patient Management - Sign In';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Register a new account to get started.';
        document.title = 'Patient Management - Register';
    }
}

function clearErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
}

// ====== Toggle Password Visibility ======
window.togglePassword = function (inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁';
    }
}

// ====== Handle Login ======
window.handleLogin = function (e) {
    e.preventDefault();
    clearErrors();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    let valid = true;
    if (!username) {
        document.getElementById('loginUsernameError').textContent = 'Username is required.';
        valid = false;
    }
    if (!password) {
        document.getElementById('loginPasswordError').textContent = 'Password is required.';
        valid = false;
    }
    if (!valid) return;

    const submitBtn = document.getElementById('loginSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    // Simulate a slight delay for UX
    setTimeout(() => {
        const result = loginUser(username, password);

        if (result.success) {
            showToast(result.message, 'success');
            // Show success state
            document.getElementById('loginForm').style.display = 'none';
            const successState = document.getElementById('successState');
            document.getElementById('successTitle').textContent = 'Welcome Back!';
            document.getElementById('successMsg').textContent = 'Redirecting to dashboard...';
            successState.style.display = 'block';

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showToast(result.message, 'error');
            document.getElementById('loginPasswordError').textContent = result.message;
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign In';
        }
    }, 600);
}

// ====== Handle Register ======
window.handleRegister = function (e) {
    e.preventDefault();
    clearErrors();

    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    let valid = true;
    if (!username) {
        document.getElementById('regUsernameError').textContent = 'Username is required.';
        valid = false;
    } else if (username.length < 3) {
        document.getElementById('regUsernameError').textContent = 'Username must be at least 3 characters.';
        valid = false;
    }
    if (!password) {
        document.getElementById('regPasswordError').textContent = 'Password is required.';
        valid = false;
    } else if (password.length < 4) {
        document.getElementById('regPasswordError').textContent = 'Password must be at least 4 characters.';
        valid = false;
    }
    if (password !== confirmPassword) {
        document.getElementById('regConfirmError').textContent = 'Passwords do not match.';
        valid = false;
    }
    if (!valid) return;

    const submitBtn = document.getElementById('registerSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';

    setTimeout(() => {
        const result = registerUser(username, password);

        if (result.success) {
            showToast(result.message, 'success');
            // Show success state
            document.getElementById('registerForm').style.display = 'none';
            const successState = document.getElementById('successState');
            document.getElementById('successTitle').textContent = 'Account Created!';
            document.getElementById('successMsg').textContent = 'Redirecting to sign in...';
            successState.style.display = 'block';

            setTimeout(() => {
                switchTab('login');
                document.getElementById('loginUsername').value = username;
                document.getElementById('loginPassword').focus();
            }, 1500);
        } else {
            showToast(result.message, 'error');
            document.getElementById('regUsernameError').textContent = result.message;
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
        }
    }, 600);
}

// ====== Init — check URL for mode ======
window.addEventListener('DOMContentLoaded', function () {
    // If already logged in, redirect to dashboard
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    if (mode === 'register') {
        switchTab('register');
    } else {
        switchTab('login');
    }
});
