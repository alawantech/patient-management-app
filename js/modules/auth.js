import { showToast } from './toast.js';

// Authentication check function
export function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'auth.html?mode=login';
    }
}

// Logout function
export function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('loginTime');
        showToast('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Get registered users from localStorage
export function getUsers() {
    const usersData = localStorage.getItem('registeredUsers');
    return usersData ? JSON.parse(usersData) : [];
}

// Save users to localStorage
export function saveUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Register a new user
export function registerUser(username, password) {
    const users = getUsers();

    // Check if username already exists
    const exists = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (exists) {
        return { success: false, message: 'Username already exists. Please choose a different one.' };
    }

    // Add new user
    users.push({ username: username, password: password, createdAt: new Date().toISOString() });
    saveUsers(users);
    return { success: true, message: 'Account created successfully!' };
}

// Login user
export function loginUser(username, password) {
    const users = getUsers();

    const user = users.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', user.username);
        localStorage.setItem('loginTime', new Date().toISOString());
        return { success: true, message: 'Signed in as ' + user.username };
    } else {
        return { success: false, message: 'Invalid username or password.' };
    }
}
