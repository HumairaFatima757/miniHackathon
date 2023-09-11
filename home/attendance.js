
// const db = firebase.database();
// const rollNumberInput = document.getElementById("rollNumberInput");
// const statusInput = document.getElementById("statusInput");
// const updateAttendanceBtn = document.getElementById("updateAttendance");

// updateAttendanceBtn.addEventListener("click", () => {
//     const rollNumber = rollNumberInput.value;
//     const status = statusInput.value;

//     if (rollNumber && status) {
//         // Update student's attendance status in Firebase
//         const attendanceRef = db.ref(`attendance/${rollNumber}`);
//         const currentTime = new Date().getTime();

//         attendanceRef.push({
//             status: status,
//             timestamp: currentTime,
//         });

//         alert(`Attendance status updated as "${status}" for Roll Number ${rollNumber}`);
//     } else {
//         alert("Please enter a roll number and select a status.");
//     }
// });






// attendance.js

const db = firebase.database();
const attendanceTableBody = document.getElementById("attendanceTableBody");

// Function to fetch and display attendance data
function fetchAttendanceData() {
    const attendanceRef = db.ref("attendance");

    attendanceRef.on("value", (snapshot) => {
        attendanceTableBody.innerHTML = ""; // Clear previous data

        snapshot.forEach((childSnapshot) => {
            const rollNumber = childSnapshot.key;
            const data = childSnapshot.val();
            const latestRecord = Object.values(data).pop();
            const status = latestRecord.status;
            
            // Create a table row for each student's attendance
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${rollNumber}</td>
                <td>${status}</td>
                <td><a href="#" class="presentButton" data-roll="${rollNumber}">Present</a></td>
            `;

            attendanceTableBody.appendChild(row);
        });

        // Add click event listeners to "Present" buttons
        const presentButtons = document.querySelectorAll(".presentButton");
        presentButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                const rollNumber = event.target.getAttribute("data-roll");
                markStudentAsPresent(rollNumber); // Call a function to mark the student as present
            });
        });
    });
}

// Call the function to fetch and display attendance data
fetchAttendanceData();

// Function to mark a student as "present" in the Firebase Realtime Database
function markStudentAsPresent(rollNumber) {
    const currentTime = new Date().getTime();
    const attendanceRef = db.ref(`attendance/${rollNumber}`);

    attendanceRef.push({
        status: "present",
        timestamp: currentTime,
    });

    alert(`Attendance marked as "present" for Roll Number ${rollNumber}`);
}
