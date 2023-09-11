const db = firebase.database();

// Student Section
const studentRollNumberInput = document.getElementById("studentRollNumberInput");
const studentAttendanceStatus = document.getElementById("attendanceStatus");
const markAttendanceBtn = document.getElementById("markAttendance");
const changeStatusBtn = document.getElementById("changeStatus");

markAttendanceBtn.addEventListener("click", () => {
    const rollNumber = studentRollNumberInput.value;
    const status = studentAttendanceStatus.value;
    const classStartTime = new Date().getTime(); // Replace with actual class start time

    if (rollNumber && status) {
        // Check if it's late (10 minutes or more after class start time)
        const currentTime = new Date().getTime();
        const isLate = (currentTime - classStartTime) >= 10 * 60 * 1000;

        if (isLate) {
            // If late, automatically mark as "late"
            status = "late";
        }

        // Store attendance data in Firebase
        const attendanceRef = db.ref(`attendance/${rollNumber}`);
        attendanceRef.push({
            status: status,
            timestamp: currentTime,
        });

        alert(`Attendance marked as "${status}"`);
    } else {
        alert("Please enter a roll number and select a status.");
    }
});

changeStatusBtn.addEventListener("click", () => {
    // Here, you can implement the logic to check for admin password
    const adminPassword = prompt("Enter admin password:");
    if (adminPassword === "yourAdminPassword") {
        // Allow status change logic here
        const rollNumber = studentRollNumberInput.value;
        const status = studentAttendanceStatus.value;
        const classStartTime = new Date().getTime(); // Replace with actual class start time

        if (rollNumber && status) {
            // Check if it's late (10 minutes or more after class start time)
            const currentTime = new Date().getTime();
            const isLate = (currentTime - classStartTime) >= 10 * 60 * 1000;

            if (!isLate) {
                // Only allow changing status if not late
                const attendanceRef = db.ref(`attendance/${rollNumber}`);
                attendanceRef.push({
                    status: status,
                    timestamp: currentTime,
                });

                alert(`Attendance status changed to "${status}"`);
            } else {
                alert("Cannot change status to 'Late' after 10 minutes.");
            }
        } else {
            alert("Please enter a roll number and select a status.");
        }
    } else {
        alert("Admin password is incorrect.");
    }
});

// Admin Section
const adminRollNumberInput = document.getElementById("adminRollNumberInput");
const adminStatusText = document.getElementById("adminStatusText");
const adminNewStatusInput = document.getElementById("adminNewStatusInput");
const updateAttendanceBtn = document.getElementById("updateAttendance");

// Function to fetch attendance status based on roll number
function fetchAttendanceStatus(rollNumber) {
    const attendanceRef = db.ref(`attendance/${rollNumber}`);

    attendanceRef.on("value", (snapshot) => {
        const data = snapshot.val();

        if (data) {
            // Find the latest attendance record
            const latestRecord = Object.values(data).pop();
            const status = latestRecord.status;
            adminStatusText.textContent = status;
        } else {
            adminStatusText.textContent = "Not found";
        }
    });
}

updateAttendanceBtn.addEventListener("click", () => {
    const rollNumber = adminRollNumberInput.value;
    const newStatus = adminNewStatusInput.value;

    if (rollNumber && newStatus) {
        // Update student's attendance status in Firebase
        const attendanceRef = db.ref(`attendance/${rollNumber}`);
        const currentTime = new Date().getTime();

        attendanceRef.push({
            status: newStatus,
            timestamp: currentTime,
        });

        alert(`Attendance status updated as "${newStatus}" for Roll Number ${rollNumber}`);
    } else {
        alert("Please enter a roll number and select a new status.");
    }
});

// Initially, fetch and display attendance status based on entered roll number
adminRollNumberInput.addEventListener("blur", () => {
    const rollNumber = adminRollNumberInput.value;
    fetchAttendanceStatus(rollNumber);
});

// Function to automatically mark students as absent if their attendance is not marked
function markAbsentStudents() {
    const currentTime = new Date().getTime(); // Current time
    const classStartTime = new Date().setHours(9, 10, 0, 0); // Set class start time to 9:10 AM

    // Check if the current time is beyond a certain threshold (e.g., 10 minutes)
    if (currentTime - classStartTime >= 10 * 60 * 1000) {
        // Fetch a list of students whose attendance is not marked
        db.ref("attendance").once("value", (snapshot) => {
            const attendanceData = snapshot.val();

            if (attendanceData) {
                // Loop through the students and mark them as absent if their attendance is not found
                Object.keys(attendanceData).forEach((rollNumber) => {
                    const studentData = attendanceData[rollNumber];
                    if (!studentData || !studentData.status) {
                        // If attendance data doesn't exist or status is not defined, mark as absent
                        const attendanceRef = db.ref(`attendance/${rollNumber}`);
                        attendanceRef.push({
                            status: "absent",
                            timestamp: currentTime,
                        });
                    }
                });
            }
        });
    }
}

// Schedule the automatic marking of absent students (you can use setInterval to run this periodically)
setInterval(markAbsentStudents, 10 * 60 * 1000); // Run every 10 minutes
