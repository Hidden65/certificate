document.getElementById('verify-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const regNumber = document.getElementById('reg_number').value;
    const resultDiv = document.getElementById('result');

    fetch('verify.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `reg_number=${regNumber}`
    })
    .then(response => response.json())
    .then(data => {
        resultDiv.style.display = 'block';
        if (data.error) {
            resultDiv.innerHTML = `<p style="color: red;">${data.error}</p>`;
        } else {
            resultDiv.innerHTML = `
                <h2>CEC STUDENT RECORD VERIFIED</h2>
                <table>
                    <tr>
                        <td>CEC STUDENT REGISTRATION NUMBER</td>
                        <td>${data.registration_number}</td>
                    </tr>
                    <tr>
                        <td>NAME</td>
                        <td>${data.student_name}</td>
                    </tr>
                    <tr>
                        <td>COURSE</td>
                        <td>${data.course_name}</td>
                    </tr>
                    <tr>
                        <td>DATE ISSUED</td>
                        <td>${data.date_issued}</td>
                    </tr>
                </table>
                <p><a href="index.html">BACK TO HOMEPAGE</a></p>
            `;
        }
    })
    .catch(error => {
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p style="color: red;">An error occurred</p>`;
        console.error('Error:', error);
    });
});
