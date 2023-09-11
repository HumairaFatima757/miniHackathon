
function signup() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create a new student account in Firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Add the student's name to the user's profile
            const user = userCredential.user;
            return user.updateProfile({
                displayName: name
            });
        })
        .then(() => {
            alert('Student registration successful!');
            // Redirect the student to the student dashboard or login page
            window.location.href = './mark1.html';
        })
        .catch((error) => {
            alert('Student registration failed. Please try again.');
            console.error(error);
        });
}
