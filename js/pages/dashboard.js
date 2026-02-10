import { checkAuth, logout } from '../modules/auth.js';
import { showToast } from '../modules/toast.js';

// Check authentication
checkAuth();

// Dashboard state
let allPatients = [];
let filteredPatients = [];
let currentPage = 1;
const patientsPerPage = 10;
let patientToDelete = null;

// Initialize dashboard
window.addEventListener("DOMContentLoaded", loadPatients);

// Search functionality
document.getElementById("searchInput").addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    filteredPatients = allPatients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm),
    );
    currentPage = 1;
    displayPatients();
});

// Pagination buttons
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayPatients();
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPatients();
    }
});

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();
    logout();
});

// Load patients from API (simulated with localStorage)
async function loadPatients() {
    showLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Initialize sample data if none exists
    if (!localStorage.getItem("patients")) {
        initializeSampleData();
    }

    // Get patients from localStorage
    const patientsData = localStorage.getItem("patients");
    allPatients = patientsData ? JSON.parse(patientsData) : [];
    filteredPatients = [...allPatients];

    showLoading(false);
    displayPatients();
    updateStats();
}

// Initialize sample data for demo
function initializeSampleData() {
    const samplePatients = [
        { id: 1, name: "John Doe", age: 45, gender: "Male", condition: "Hypertension" },
        { id: 2, name: "Jane Smith", age: 32, gender: "Female", condition: "Diabetes Type 2" },
        { id: 3, name: "Michael Johnson", age: 58, gender: "Male", condition: "Arthritis" },
        { id: 4, name: "Emily Brown", age: 28, gender: "Female", condition: "Asthma" },
        { id: 5, name: "David Wilson", age: 41, gender: "Male", condition: "Migraine" },
        { id: 6, name: "Sarah Davis", age: 35, gender: "Female", condition: "Thyroid Disorder" },
        { id: 7, name: "Robert Miller", age: 52, gender: "Male", condition: "High Cholesterol" },
        { id: 8, name: "Lisa Anderson", age: 39, gender: "Female", condition: "Anxiety" },
        { id: 9, name: "James Taylor", age: 47, gender: "Male", condition: "Back Pain" },
        { id: 10, name: "Maria Garcia", age: 29, gender: "Female", condition: "Allergies" },
    ];
    localStorage.setItem("patients", JSON.stringify(samplePatients));
    localStorage.setItem("patientIdCounter", "11");
}

// Display patients in table with pagination
function displayPatients() {
    const tableBody = document.getElementById("patientsTableBody");
    const emptyState = document.getElementById("emptyState");
    const table = document.getElementById("patientsTable");
    const pagination = document.getElementById("pagination");

    if (filteredPatients.length === 0) {
        table.style.display = "none";
        pagination.style.display = "none";
        emptyState.style.display = "flex";
        return;
    }

    table.style.display = "table";
    pagination.style.display = "flex";
    emptyState.style.display = "none";

    // Calculate pagination
    const startIndex = (currentPage - 1) * patientsPerPage;
    const endIndex = startIndex + patientsPerPage;
    const patientsToShow = filteredPatients.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

    // Update page info
    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;

    // Build table rows
    tableBody.innerHTML = patientsToShow
        .map(
            (patient) => `
            <tr>
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td><span class="badge badge-${patient.gender.toLowerCase()}">${patient.gender}</span></td>
                <td>${patient.condition}</td>
                <td class="action-buttons">
                    <button class="btn btn-small btn-secondary edit-patient-btn" data-id="${patient.id}">Edit</button>
                    <button class="btn btn-small btn-danger delete-patient-btn" data-id="${patient.id}">Delete</button>
                </td>
            </tr>
        `,
        )
        .join("");

    // Add event listeners to newly created buttons
    document.querySelectorAll('.edit-patient-btn').forEach(btn => {
        btn.addEventListener('click', () => editPatient(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.delete-patient-btn').forEach(btn => {
        btn.addEventListener('click', () => deletePatient(parseInt(btn.dataset.id)));
    });
}

// Update statistics
function updateStats() {
    document.getElementById("totalPatients").textContent = allPatients.length;
}

// Edit patient
function editPatient(id) {
    window.location.href = `patient-form.html?id=${id}`;
}

// Delete patient
function deletePatient(id) {
    patientToDelete = id;
    document.getElementById("deleteModal").style.display = "flex";
}

window.closeDeleteModal = function () {
    document.getElementById("deleteModal").style.display = "none";
    patientToDelete = null;
}

document.getElementById("confirmDeleteBtn").addEventListener("click", function () {
    if (patientToDelete) {
        allPatients = allPatients.filter((p) => p.id !== patientToDelete);
        filteredPatients = filteredPatients.filter((p) => p.id !== patientToDelete);
        localStorage.setItem("patients", JSON.stringify(allPatients));

        closeDeleteModal();
        displayPatients();
        updateStats();
        showToast("Patient deleted successfully", "success");
    }
});

// Show/hide loading spinner
function showLoading(show) {
    document.getElementById("loadingSpinner").style.display = show ? "flex" : "none";
}

// Close modal when clicking outside
window.addEventListener("click", function (e) {
    const modal = document.getElementById("deleteModal");
    if (e.target === modal) {
        closeDeleteModal();
    }
});
