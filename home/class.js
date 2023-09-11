


const database = firebase.database();

const classesRef = database.ref('/classes');

function addClass(event) {
    event.preventDefault();

    const teacherName = document.getElementById('teacherName').value;
    const sectionName = document.getElementById('sectionName').value;
    const courseName = document.getElementById('courseName').value;
    const batchNumber = document.getElementById('batchNumber').value;

    classesRef.push({
        teacherName,
        sectionName,
        courseName,
        batchNumber
    });

    document.getElementById('classForm').reset();
}

function displayClasses() {
    classesRef.on('value', function(snapshot) {
        const classList = document.getElementById('classList');
        classList.innerHTML = '';

        snapshot.forEach(function(childSnapshot) {
            const key = childSnapshot.key;
            const classData = childSnapshot.val();

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${classData.teacherName}</td>
                <td>${classData.sectionName}</td>
                <td>${classData.courseName}</td>
                <td>${classData.batchNumber}</td>
                <td><button onclick="deleteClass('${key}')">Delete</button></td>
            `;

            classList.appendChild(row);
        });
    });
}


function deleteClass(key) {
    classesRef.child(key).remove();
}

document.getElementById('classForm').addEventListener('submit', addClass);
displayClasses();
