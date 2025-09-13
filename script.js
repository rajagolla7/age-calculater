// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAJQHVnOLtDRuAd9fvA9DheuSQ8HWIsiFI",
  authDomain: "project-1-e58ac.firebaseapp.com",
  projectId: "project-1-e58ac",
  storageBucket: "project-1-e58ac.firebasestorage.app",
  messagingSenderId: "891375561934",
  appId: "1:891375561934:web:b4437c591df458c8bcf49f",
  measurementId: "G-56HTZNGGJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const ageForm = document.getElementById('ageForm');
const result = document.getElementById('result');
const dataList = document.getElementById('dataList');

// Calculate Age
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Handle Form Submit
ageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const age = calculateAge(dob);

    result.innerText = `${name}, your age is ${age} years`;

    // Save to Firestore
    try {
        await addDoc(collection(db, "ageData"), {
            name: name,
            dob: dob,
            age: age
        });
        loadData();
        ageForm.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

// Load Saved Data
async function loadData() {
    dataList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "ageData"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `${data.name} - Age: ${data.age}`;
        dataList.appendChild(li);
    });
}

loadData();
