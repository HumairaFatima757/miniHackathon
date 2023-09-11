
const db = firebase.database();
const storage = firebase.storage();
const nameInput = document.getElementById("nameInput");
const fatherNameInput = document.getElementById("fatherNameInput");
const imageInput = document.getElementById("imageInput");
const generateIDCardBtn = document.getElementById("generateIDCard");
const idCard = document.getElementById("idCard");
const studentDetails = document.getElementById("studentDetails");
const saveToFirebaseBtn = document.getElementById("saveToFirebase");

generateIDCardBtn.addEventListener("click", () => {
    const name = nameInput.value;
    const fatherName = fatherNameInput.value;
    const imageFile = imageInput.files[0];

    if (name && fatherName && imageFile) {
        // Display student details on the ID card
        studentDetails.innerHTML = `
            <h3>${name}</h3>
            <p>Father's Name: ${fatherName}</p>
            <img src="" alt="Student Image" id="studentImage">
        `;

        const studentImage = document.getElementById("studentImage");
        const reader = new FileReader();

        reader.onload = function (e) {
            // Display the selected image on the ID card
            studentImage.src = e.target.result;
            studentImage.classList.remove("hidden");
        };

        reader.readAsDataURL(imageFile);

        // Show the ID card UI
        idCard.classList.remove("hidden");
    } else {
        alert("Please fill in all the required fields and select an image.");
    }
});

saveToFirebaseBtn.addEventListener("click", () => {
    const name = nameInput.value;
    const fatherName = fatherNameInput.value;
    const imageFile = imageInput.files[0];

    if (name && fatherName && imageFile) {
        // Upload image to Firebase Storage
        const storageRef = storage.ref(`${name}_image.jpg`);
        storageRef.put(imageFile).then(() => {
            // Get the download URL of the uploaded image
            storageRef.getDownloadURL().then((downloadURL) => {
                // Save student information and image URL to Firebase Database
                const studentRef = db.ref("students").push();
                studentRef.set({
                    name: name,
                    fatherName: fatherName,
                    imageURL: downloadURL,
                });

                // Reset input fields
                nameInput.value = "";
                fatherNameInput.value = "";
                imageInput.value = "";

                // Hide the ID card UI
                idCard.classList.add("hidden");

                alert("Student information saved to Firebase.");
            });
        });
    } else {
        alert("Please fill in all the required fields and select an image.");
    }
});






// const db = firebase.database();
// const storage = firebase.storage();
// const classDropdown = document.getElementById("classDropdown");
// const showIDCardBtn = document.getElementById("showIDCard");
// const idCard = document.getElementById("idCard");
// const selectedClassSpan = document.getElementById("selectedClass");
// const studentDetails = document.getElementById("studentDetails");
// const nameInput = document.getElementById("nameInput");
// const fatherNameInput = document.getElementById("fatherNameInput");
// const imageInput = document.getElementById("imageInput");
// const uploadImageBtn = document.getElementById("uploadImage");
// const uploadedImage = document.getElementById("uploadedImage");

showIDCardBtn.addEventListener("click", () => {
    const selectedClass = classDropdown.value;

    if (selectedClass) {
        // Display the ID card UI for the selected class
        selectedClassSpan.textContent = selectedClass;
        idCard.classList.remove("hidden");
        studentDetails.innerHTML = "";
    }
});

uploadImageBtn.addEventListener("click", () => {
    const selectedClass = classDropdown.value;
    const name = nameInput.value;
    const fatherName = fatherNameInput.value;
    const imageFile = imageInput.files[0];

    if (selectedClass && name && fatherName && imageFile) {
        // Upload image to Firebase Storage
        const storageRef = storage.ref(`${selectedClass}/${name}_image.jpg`);
        storageRef.put(imageFile).then(() => {
            // Get the download URL of the uploaded image
            storageRef.getDownloadURL().then((downloadURL) => {
                // Display student details and uploaded image on the card
                studentDetails.innerHTML = `
                    <h3>${name}</h3>
                    <p>Father's Name: ${fatherName}</p>
                    <img src="${downloadURL}" alt="Student Image">
                `;
                uploadedImage.src = downloadURL;
                uploadedImage.classList.remove("hidden");
            });
        });
    } else {
        alert("Please fill in all the required fields and select an image.");
    }
});
