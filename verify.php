<?php
header('Content-Type: application/json');

// Database credentials
$servername = "127.0.0.1:4306";
$username = "root1";
$password = "sajidsajid123456789";
$dbname = "certificate_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $reg_number = $_POST['reg_number'];
    $sql = "SELECT * FROM certificates WHERE registration_number = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $reg_number);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $cert = $result->fetch_assoc();
        echo json_encode($cert);
    } else {
        echo json_encode(['error' => 'Certificate not found']);
    }

    $stmt->close();
}

$conn->close();
?>

