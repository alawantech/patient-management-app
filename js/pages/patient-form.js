import { checkAuth, logout } from '../modules/auth.js';
import { showToast } from '../modules/toast.js';

// Check authentication
checkAuth();

// Get patient ID from URL if editing
const urlParams = new URLSearchParams(window.location.search);
const patientId = urlParams.get("id");
const isEditMode = !!patientId;

// Update UI for edit mode
if (isEditMode) {
    document.getElementById("formTitle").textContent = "Edit Patient";
    document.getElementById("submitBtnText").textContent = "Update Patient";
    loadPatientData(parseInt(patientId));
}

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();
    logout();
});

// Load patient data for editing
function loadPatientData(id) {
    const patientsData = localStorage.getItem("patients");
    if (!patientsData) return;

    const patients = JSON.parse(patientsData);
    const patient = patients.find((p) => p.id === id);

    if (patient) {
        document.getElementById("patientName").value = patient.name;
        document.getElementById("patientAge").value = patient.age;
        document.getElementById("patientGender").value = patient.gender;
        document.getElementById("patientCondition").value = patient.condition;
    }
}

// Handle form submission
document.getElementById("patientForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Clear previous errors
    document.getElementById("nameError").textContent = "";
    document.getElementById("ageError").textContent = "";
    document.getElementById("genderError").textContent = "";
    document.getElementById("conditionError").textContent = "";

    // Get form values
    const name = document.getElementById("patientName").value.trim();
    const age = parseInt(document.getElementById("patientAge").value);
    const gender = document.getElementById("patientGender").value;
    const condition = document.getElementById("patientCondition").value.trim();

    // Validation
    let hasError = false;

    if (!name) {
        document.getElementById("nameError").textContent = "Name is required";
        hasError = true;
    }

    if (!age || age < 0 || age > 150) {
        document.getElementById("ageError").textContent = "Please enter a valid age (0-150)";
        hasError = true;
    }

    if (!gender) {
        document.getElementById("genderError").textContent = "Gender is required";
        hasError = true;
    }

    if (!condition) {
        document.getElementById("conditionError").textContent = "Medical condition is required";
        hasError = true;
    }

    if (hasError) return;

    // Disable submit button
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    document.getElementById("submitBtnText").textContent = "Saving...";

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Get existing patients
    const patientsData = localStorage.getItem("patients");
    let patients = patientsData ? JSON.parse(patientsData) : [];

    if (isEditMode) {
        // Update existing patient
        const index = patients.findIndex((p) => p.id === parseInt(patientId));
        if (index !== -1) {
            patients[index] = {
                id: parseInt(patientId),
                name,
                age,
                gender,
                condition,
            };
        }
    } else {
        // Add new patient
        let nextId = parseInt(localStorage.getItem("patientIdCounter") || "1");
        patients.push({
            id: nextId,
            name,
            age,
            gender,
            condition,
        });
        localStorage.setItem("patientIdCounter", (nextId + 1).toString());
    }

    // Save to localStorage
    localStorage.setItem("patients", JSON.stringify(patients));

    // Show success message
    showToast(
        isEditMode ? "Patient updated successfully!" : "Patient added successfully!",
        "success",
    );

    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1500);
});
