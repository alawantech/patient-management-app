# Patient Management System

A complete patient management website built with **HTML, CSS, and Vanilla JavaScript** - perfect for learning web development fundamentals.

## Features

- User authentication (localStorage-based)
- CRUD operations for patient records
- Search functionality
- Pagination
- Form validation
- Responsive design
- Modern UI with smooth animations
- Toast notifications
- Loading states

## Demo Credentials

**Username:** admin
**Password:** admin123

## Project Structure

```
patient-management/
├── index.html          # Login page
├── dashboard.html      # Patient list dashboard
├── patient-form.html   # Add/Edit patient form
├── profile.html        # User profile page
├── style.css           # All styles
├── script.js           # Shared utilities (auth, toast, etc.)
└── README.md          # This file
```

## Pages

### 1. Login Page (index.html)
- Simple username/password login
- Form validation
- Redirects to dashboard on success
- Stores session in localStorage

### 2. Dashboard (dashboard.html)
- Displays all patients in a table
- Search patients by name
- Pagination (10 patients per page)
- Edit and delete buttons
- Loading spinner while fetching data
- Empty state when no patients found

### 3. Patient Form (patient-form.html)
- Add new patients
- Edit existing patients
- Form validation
- Required fields: Name, Age, Gender, Condition
- Success message after save

### 4. Profile Page (profile.html)
- Shows logged-in user info
- Display login time
- About section with tech stack
- Quick navigation to dashboard

## Key Learning Concepts

### 1. localStorage API
```javascript
// Saving data
localStorage.setItem('key', 'value');

// Reading data
const value = localStorage.getItem('key');

// Removing data
localStorage.removeItem('key');
```

### 2. DOM Manipulation
```javascript
// Get element
const element = document.getElementById('myId');

// Update content
element.textContent = 'New text';

// Add event listener
element.addEventListener('click', function() {
    // Handle click
});
```

### 3. CRUD Operations
- **Create:** Add new patient records
- **Read:** Display patient list with pagination
- **Update:** Edit existing patient data
- **Delete:** Remove patient records with confirmation

### 4. Form Handling
- Preventing default form submission
- Getting form values
- Validation
- Displaying error messages

### 5. Search & Filter
- Real-time search
- Array filtering
- Dynamic UI updates

### 6. Pagination
- Calculating pages
- Slicing arrays
- Previous/Next navigation

## How It Works

### Authentication
The app uses localStorage to simulate authentication:
- Login checks username/password
- Sets `isLoggedIn` flag in localStorage
- Protected pages check this flag on load
- Logout clears the session data

### Data Storage
Patient data is stored in localStorage as JSON:
```javascript
const patients = [
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', condition: 'Hypertension' },
    // More patients...
];
localStorage.setItem('patients', JSON.stringify(patients));
```

### Sample Data
The app includes 10 sample patients that are automatically initialized on first load.

## Running the Project

### Option 1: Using Vite (Development)
```bash
npm install
npm run dev
```
Visit `http://localhost:5173`

### Option 2: Direct File Opening
Simply open `index.html` in your browser. All functionality works without a server.

### Option 3: Using Any Web Server
```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# VS Code Live Server extension
Right-click index.html > Open with Live Server
```

## Customization Ideas

1. **Add more fields:** Email, phone number, address
2. **Add filters:** Filter by gender, age range
3. **Add sorting:** Sort by name, age, etc.
4. **Add export:** Export data to CSV
5. **Add charts:** Visualize patient statistics
6. **Add themes:** Dark mode toggle
7. **Add user roles:** Admin, Doctor, Nurse
8. **Add appointments:** Schedule patient visits

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, animations, responsive design
- **JavaScript (ES6+)** - Logic, DOM manipulation, data handling
- **localStorage API** - Data persistence
- **CSS Variables** - Theming and maintainable styles
- **CSS Grid & Flexbox** - Modern layouts

## Notes for Students

This project demonstrates:
- ✅ Clean code structure
- ✅ Separation of concerns
- ✅ Responsive design patterns
- ✅ User experience best practices
- ✅ Form validation techniques
- ✅ State management with localStorage
- ✅ Event handling
- ✅ Dynamic content rendering

Feel free to modify and extend this project as a learning exercise!

## License

MIT License - Feel free to use this for learning and personal projects.
