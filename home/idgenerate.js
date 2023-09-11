const db = firebase.database();
const storage = firebase.storage();
const nameInput = document.getElementById("nameInput");
const fatherNameInput = document.getElementById("fatherNameInput");
const rollNumberInput = document.getElementById("rollNumberInput");
const imageInput = document.getElementById("imageInput");
const generateIDCardBtn = document.getElementById("generateIDCard");
const idCard = document.getElementById("idCard");
const studentDetails = document.getElementById("studentDetails");
const saveToFirebaseBtn = document.getElementById("saveToFirebase");

generateIDCardBtn.addEventListener("click", () => {
    const name = nameInput.value;
    const fatherName = fatherNameInput.value;
    const rollNumber = rollNumberInput.value;
    const imageFile = imageInput.files[0];

    if (name && fatherName && rollNumber && imageFile) {
        // Display student details on the ID card
        studentDetails.innerHTML = `
            <h3>${name}</h3>
            <p>Father's Name: ${fatherName}</p>
            <p>Roll Number: ${rollNumber}</p>
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
    const rollNumber = rollNumberInput.value;
    const imageFile = imageInput.files[0];

    if (name && fatherName && rollNumber && imageFile) {
        // Upload image to Firebase Storage
        const storageRef = storage.ref(`${name}_image.jpg`);
        storageRef.put(imageFile).then(() => {
            // Get the download URL of the uploaded image
            storageRef.getDownloadURL().then((downloadURL) => {
                // Save student information, roll number, and image URL to Firebase Database
                const studentRef = db.ref("students").push();
                studentRef.set({
                    name: name,
                    fatherName: fatherName,
                    rollNumber: rollNumber,
                    imageURL: downloadURL,
                });

                // Reset input fields
                nameInput.value = "";
                fatherNameInput.value = "";
                rollNumberInput.value = "";
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

generateIDCardBtn.addEventListener("click", () => {
    const name = nameInput.value;
    const fatherName = fatherNameInput.value;
    const rollNumber = rollNumberInput.value;
    const imageFile = imageInput.files[0];

    if (name && fatherName && rollNumber && imageFile) {
        const maxWidth = 200; // Set your desired maximum width
        const maxHeight = 200; // Set your desired maximum height
        const reader = new FileReader();
        const img = new Image();

        reader.onload = function (e) {
            img.src = e.target.result;

            img.onload = function () {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                let width = img.width;
                let height = img.height;

                // Calculate new dimensions to maintain aspect ratio
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                // Display the resized image on the ID card
                studentImage.src = canvas.toDataURL("image/jpeg"); // Convert canvas to data URL

                // Show the ID card UI
                idCard.classList.remove("hidden");
            };
        };

        reader.readAsDataURL(imageFile);
    } else {
        alert("Please fill in all the required fields and select an image.");
    }
});
