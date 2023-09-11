
const db = firebase.database();


function addStudent(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const fatherName = document.getElementById("fatherName").value;
    const rollNumber = document.getElementById("rollNumber").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const cnicNumber = document.getElementById("cnicNumber").value;
    const courseName = document.getElementById("courseName").value;
    const classAssigned = document.getElementById("classAssigned").value;
    const picture = document.getElementById("picture").files[0];

    // Upload the student picture to Firebase Storage
    const storageRef = firebase.storage().ref(`studentPictures/${rollNumber}`);
    const pictureRef = storageRef.child(picture.name);

    pictureRef.put(picture).then(() => {
        pictureRef.getDownloadURL().then((pictureUrl) => {
            // Add the student data to the Realtime Database
            const newStudentRef = db.ref("students").push();
            newStudentRef.set({
                name,
                fatherName,
                rollNumber,
                contactNumber,
                cnicNumber,
                courseName,
                classAssigned,
                pictureUrl,
            });
        });
    });

    // Clear the form
    document.getElementById("studentForm").reset();
}

// Function to display the list of students
// function displayStudents() {
//     const studentList = document.getElementById("studentList");
//     studentList.innerHTML = "";

//     // Retrieve the student data from the Realtime Database
//     db.ref("students").on("child_added", (snapshot) => {
//         const student = snapshot.val();
//         const li = document.createElement("li");
//         li.innerHTML = `
//             <img src="${student.pictureUrl}" alt="${student.name}'s picture" width="100" height="100">
//             <p><strong>Name:</strong> ${student.name}</p>
//             <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
//             <p><strong>Contact Number:</strong> ${student.contactNumber}</p>
//             <p><strong>Class Assigned:</strong> ${student.classAssigned}</p>
//             <button onclick="deleteStudent('${snapshot.key}')">Delete</button>
//         `;
//         studentList.appendChild(li);
//     });
// }

// // Function to delete a student
// function deleteStudent(key) {
//     db.ref(`students/${key}`).remove();
// }

// // Initialize the page
// document.getElementById("studentForm").addEventListener("submit", addStudent);
// displayStudents();
// Function to display the list of students
function displayStudents() {
    const studentList = document.getElementById("studentList");
    studentList.innerHTML = "";

    // Retrieve the student data from the Realtime Database
    db.ref("students").on("child_added", (snapshot) => {
        const student = snapshot.val();
        const li = document.createElement("li");

        // Create an image element and set its source to the student's pictureUrl
        const img = document.createElement("img");
        img.src = student.pictureUrl;
        img.alt = `${student.name}'s picture`;
        img.width = 100;
        img.height = 100;

        // Create other elements for student information
        const nameElement = document.createElement("p");
        nameElement.innerHTML = `<strong>Name:</strong> ${student.name}`;

        const rollNumberElement = document.createElement("p");
        rollNumberElement.innerHTML = `<strong>Roll Number:</strong> ${student.rollNumber}`;

        const contactNumberElement = document.createElement("p");
        contactNumberElement.innerHTML = `<strong>Contact Number:</strong> ${student.contactNumber}`;

        const classAssignedElement = document.createElement("p");
        classAssignedElement.innerHTML = `<strong>Class Assigned:</strong> ${student.classAssigned}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteStudent(snapshot.key);

        // Append all elements to the list item
        li.appendChild(img);
        li.appendChild(nameElement);
        li.appendChild(rollNumberElement);
        li.appendChild(contactNumberElement);
        li.appendChild(classAssignedElement);
        li.appendChild(deleteButton);

        // Append the list item to the studentList
        studentList.appendChild(li);
    });
}
// Function to delete a student
function deleteStudent(key) {
    db.ref(`students/${key}`).remove();
}

document.getElementById("studentForm").addEventListener("submit", addStudent);
displayStudents();