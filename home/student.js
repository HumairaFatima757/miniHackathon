// const db = firebase.database();
// const rollNumberInput = document.getElementById("rollNumberInput");
// const attendanceStatus = document.getElementById("attendanceStatus");
// const markAttendanceBtn = document.getElementById("markAttendance");
// const changeStatusBtn = document.getElementById("changeStatus");

// markAttendanceBtn.addEventListener("click", () => {
//     const rollNumber = rollNumberInput.value;
//     let status = attendanceStatus.value;
//     const classStartTime = new Date().getTime(); // Replace with actual class start time

//     if (rollNumber && status) {
//         // Check if it's late (10 minutes or more after class start time)
//         const currentTime = new Date().getTime();
//         const isLate = (currentTime - classStartTime) >= 10 * 60 * 1000;

//         if (isLate) {
//             // If late, automatically mark as "late"
//             status = "late";
//         }

//         // Store attendance data in Firebase
//         const attendanceRef = db.ref(`attendance/${rollNumber}`);
//         attendanceRef.push({
//             status: status,
//             timestamp: currentTime,
//         });

//         alert(`Attendance marked as "${status}"`);
//     } else {
//         alert("Please enter a roll number and select a status.");
//     }
// });

// changeStatusBtn.addEventListener("click", () => {
//     // Here, you can implement the logic to check for admin password
//     const adminPassword = prompt("Enter admin password:");
//     if (adminPassword === "yourAdminPassword") {
//         // Allow status change logic here
//         const rollNumber = rollNumberInput.value;
//         let status = attendanceStatus.value;
//         const classStartTime = new Date().getTime(); // Replace with actual class start time

//         if (rollNumber && status) {
//             // Check if it's late (10 minutes or more after class start time)
//             const currentTime = new Date().getTime();
//             const isLate = (currentTime - classStartTime) >= 10 * 60 * 1000;

//             if (!isLate) {
//                 // Only allow changing status if not late
//                 const attendanceRef = db.ref(`attendance/${rollNumber}`);
//                 attendanceRef.push({
//                     status: status,
//                     timestamp: currentTime,
//                 });

//                 alert(`Attendance status changed to "${status}"`);
//             } else {
//                 alert("Cannot change status to 'Late' after 10 minutes.");
//             }
//         } else {
//             alert("Please enter a roll number and select a status.");
//         }
//     } else {
//         alert("Admin password is incorrect.");
//     }
// });






// 2nd

// const db = firebase.database();
// const rollNumberInput = document.getElementById("rollNumberInput");
// const attendanceStatus = document.getElementById("attendanceStatus");
// const markAttendanceBtn = document.getElementById("markAttendance");
// const changeStatusBtn = document.getElementById("changeStatus");

// markAttendanceBtn.addEventListener("click", () => {
//     const rollNumber = rollNumberInput.value;
//     let status = attendanceStatus.value;
//     const classStartTime = new Date().getTime(); // Replace with actual class start time

//     if (rollNumber && status) {
//         // Check if it's late (10 minutes or more after class start time)
//         const currentTime = new Date().getTime();
//         const isLate = (currentTime - classStartTime) >= 10 * 60 * 1000;

//         if (isLate) {
//             // If late, automatically mark as "late"
//             status = "late";
//         }

//         // Store attendance data in Firebase
//         const attendanceRef = db.ref(`attendance/${rollNumber}`);
//         attendanceRef.push({
//             status: status,
//             timestamp: currentTime,
//         });

//         alert(`Attendance marked as "${status}"`);
//     } else {
//         alert("Please enter a roll number and select a status.");
//     }
// });

// changeStatusBtn.addEventListener("click", () => {
//     const rollNumber = rollNumberInput.value;
//     alert("Students cannot change their attendance status.");
// });

// Additional logic specific to the student section can be added here





// const db = firebase.database();
// const rollNumberInput = document.getElementById("rollNumberInput");
// const attendanceStatus = document.getElementById("attendanceStatus");
// const markAttendanceBtn = document.getElementById("markAttendance");
// const changeStatusBtn = document.getElementById("changeStatus");

// markAttendanceBtn.addEventListener("click", () => {
//     const rollNumber = rollNumberInput.value;
//     let status = attendanceStatus.value; // Get the selected status from the dropdown
//     const classStartTime = getClassStartTime(); // Get the class start time

//     if (rollNumber && status) {
//         // Check if it's late (10 minutes or more after class start time)
//         const currentTime = new Date().getTime();
//         const isLate = (currentTime - classStartTime) >= 10 * 60 * 1000;

//         if (isLate) {
//             // If late, automatically mark as "late"
//             status = "late";
//         }

//         // Store attendance data in Firebase
//         const attendanceRef = db.ref(`attendance/${rollNumber}`);
//         attendanceRef.push({
//             status: status,
//             timestamp: currentTime,
//         });

//         alert(`Attendance marked as "${status}"`);
//     } else {
//         alert("Please enter a roll number and select a status.");
//     }
// });

// changeStatusBtn.addEventListener("click", () => {
//     const rollNumber = rollNumberInput.value;
//     let status = attendanceStatus.value; // Get the selected status from the dropdown
//     const classStartTime = getClassStartTime(); // Get the class start time

//     if (rollNumber && status) {
//         // Check if it's more than 21 hours after the class start time
//         const currentTime = new Date().getTime();
//         const twentyOneHoursAgo = classStartTime + 21 * 60 * 60 * 1000; // 21 hours ago
//         const canChangeStatus = currentTime >= twentyOneHoursAgo;

//         if (canChangeStatus) {
//             // Store the new status without overwriting the previous ones
//             const attendanceRef = db.ref(`attendance/${rollNumber}`);
//             const newStatusKey = attendanceRef.push().key;
//             attendanceRef.child(newStatusKey).set({
//                 status: status,
//                 timestamp: currentTime,
//             });

//             alert(`Attendance status changed to "${status}" for Roll Number ${rollNumber}`);
//         } else {
//             alert("Cannot change status before 21 hours.");
//         }
//     } else {
//         alert("Please enter a roll number and select a status.");
//     }
// });

// // Function to get the class start time (9:10 AM daily)
// function getClassStartTime() {
//     const now = new Date();
//     const classStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 10, 0, 0);
//     return classStartTime.getTime();
// }







const db = firebase.database();
const rollNumberInput = document.getElementById("rollNumberInput");
const attendanceStatus = document.getElementById("attendanceStatus");
const markAttendanceBtn = document.getElementById("markAttendance");
const changeStatusBtn = document.getElementById("changeStatus");

markAttendanceBtn.addEventListener("click", () => {
    const rollNumber = rollNumberInput.value;
    let status = attendanceStatus.value;
    const classStartTime = getClassStartTime();

    if (rollNumber && status) {
        const currentTime = new Date().getTime();
        const isLate = (currentTime - classStartTime) >= 10 * 60 * 1000;

        if (isLate) {
            status = "late";
            alert("Attendance marked as 'Late' because it's after 9:10 AM.");
        }

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
    const rollNumber = rollNumberInput.value;
    let status = attendanceStatus.value;
    const classStartTime = getClassStartTime();

    if (rollNumber && status) {
        const currentTime = new Date().getTime();
        const twentyOneHoursAgo = classStartTime + 21 * 60 * 60 * 1000;

        if (currentTime >= twentyOneHoursAgo) {
            const adminEmail = prompt("Enter admin email:");

            if (adminEmail) {
                firebase.auth().signInWithEmailAndPassword(adminEmail, "yourAdminPassword")
                    .then((userCredential) => {
                        const user = userCredential.user;
                        if (user.email === "yourAdminEmail") {
                            const attendanceRef = db.ref(`attendance/${rollNumber}`);
                            const newStatusKey = attendanceRef.push().key;
                            attendanceRef.child(newStatusKey).set({
                                status: status,
                                timestamp: currentTime,
                            });

                            alert(`Attendance status changed to "${status}" for Roll Number ${rollNumber}`);
                        } else {
                            alert("You are not authorized to change the status.");
                        }
                    })
                    .catch((error) => {
                        alert("Authentication failed. Please check your email and password.");
                    });
            } else {
                alert("Please enter admin email.");
            }
        } 
    } else {
        alert("Please enter a roll number and select a status.");
    }
});

function getClassStartTime() {
    const now = new Date();
    const classStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 10, 0, 0);
    return classStartTime.getTime();
}
changeStatusBtn.addEventListener("click", () => {
    const rollNumber = rollNumberInput.value;
    let status = attendanceStatus.value;
    const classStartTime = getClassStartTime();

    if (rollNumber && status) {
        const currentTime = new Date().getTime();

        const adminEmail = prompt("Enter admin email:");

        if (adminEmail) {
            firebase.auth().signInWithEmailAndPassword(adminEmail, "yourAdminPassword")
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user.email === "humaira123@gmail.com") {
                        const attendanceRef = db.ref(`attendance/${rollNumber}`);
                        const newStatusKey = attendanceRef.push().key;
                        attendanceRef.child(newStatusKey).set({
                            status: status,
                            timestamp: currentTime,
                        });

                        alert(`Attendance status changed to "${status}" for Roll Number ${rollNumber}`);
                    } else {
                        alert("You are not authorized to change the status.");
                    }
                })
                .catch((error) => {
                    alert("Authentication failed. Please check your email and password.");
                });
        }
    } else {
        alert("Please enter a roll number and select a status.");
    }
});
